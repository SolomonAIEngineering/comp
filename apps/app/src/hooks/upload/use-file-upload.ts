"use client";

import { uploadFile } from "@/actions/files/upload-file";
import type { UPLOAD_TYPE } from "@/actions/types";
import { useToast } from "@comp/ui/use-toast";
import axios, { type AxiosProgressEvent } from "axios";
import { useCallback, useState } from "react";

type UploadType = (typeof UPLOAD_TYPE)[keyof typeof UPLOAD_TYPE];

interface UploadUrlResponse {
	uploadUrl: string;
	fileUrl: string;
}

interface ServerResponse {
	data: {
		data: UploadUrlResponse;
	};
	serverError?: string;
}

interface UseFileUploadProps {
	uploadType: UploadType;
	evidenceId?: string;
	taskId?: string;
	onSuccess: () => Promise<void>;
}

interface UseFileUploadReturn {
	isUploading: boolean;
	handleFileUpload: (file: File) => Promise<void>;
}

export function useFileUpload({
	uploadType,
	evidenceId,
	taskId,
	onSuccess,
}: UseFileUploadProps): UseFileUploadReturn {
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const { toast } = useToast();

	const handleFileUpload = useCallback(
		async (file: File): Promise<void> => {
			if (!file) {
				toast({
					title: "Error",
					description: "Missing file",
					variant: "destructive",
				});
				return;
			}

			setIsUploading(true);

			try {
				// Get the presigned URL
				const urlResult = (await uploadFile({
					uploadType,
					evidenceId: evidenceId || "",
					taskId: taskId || "",
					fileName: file.name,
					fileType: file.type,
				})) as ServerResponse;

				// Validate server response
				if (!urlResult?.data?.data?.uploadUrl) {
					throw new Error(
						urlResult?.serverError || "Failed to get upload URL",
					);
				}

				const { uploadUrl } = urlResult.data.data;

				// Upload to S3
				await axios.put<void>(uploadUrl, file, {
					headers: {
						"Content-Type": file.type,
					},
					transformRequest: [(data: File): File => data],
					onUploadProgress: (
						progressEvent: AxiosProgressEvent,
					): void => {
						if (progressEvent.total) {
							const percentCompleted = Math.round(
								(progressEvent.loaded * 100) /
									progressEvent.total,
							);
							console.debug(
								`Upload progress: ${percentCompleted}%`,
							);
						}
					},
				});

				// Only call onSuccess if it exists and the upload was successful
				await onSuccess();

				toast({
					title: "Success",
					description: "File uploaded successfully",
				});
			} catch (error) {
				console.error("Error uploading file:", error);

				// Handle specific error types
				const errorMessage = axios.isAxiosError(error)
					? error.response?.data?.message || error.message
					: error instanceof Error
						? error.message
						: "Failed to upload file";

				toast({
					title: "Error",
					description: errorMessage,
					variant: "destructive",
				});
			} finally {
				setIsUploading(false);
			}
		},
		[evidenceId, taskId, uploadType, onSuccess, toast],
	);

	return {
		isUploading,
		handleFileUpload,
	};
}
