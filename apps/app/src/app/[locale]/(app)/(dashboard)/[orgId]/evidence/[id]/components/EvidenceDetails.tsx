"use client";

import { Alert, AlertDescription, AlertTitle } from "@comp/ui/alert";
import { FileIcon } from "lucide-react";
import type { EvidenceDetailsProps } from "../types";
import { EditEvidenceForm } from "./EditEvidenceForm";
import { ReviewSection } from "./ReviewSection";

export function EvidenceDetails({ assignees, evidence }: EvidenceDetailsProps) {
	return (
		<div className="flex flex-col gap-4">
			{evidence.status === "not_relevant" && (
				<div className="bg-yellow-800 border border-yellow-600 rounded-md p-3 mt-4 text-yellow-300 text-sm">
					This evidence has been marked as not relevant and will not be included
					in compliance reports.
				</div>
			)}
			<Alert>
				<FileIcon className="h-4 w-4" />
				<AlertTitle>{evidence.name} Evidence</AlertTitle>
				<AlertDescription className="mt-4">
					{evidence.description || "No description provided."}
				</AlertDescription>
			</Alert>
			<ReviewSection
				evidence={evidence}
				lastPublishedAt={evidence.lastPublishedAt}
				frequency={evidence.frequency}
				department={evidence.department || null}
				currentAssigneeId={evidence.assigneeId}
				assignees={assignees}
			/>
			<EditEvidenceForm />
		</div>
	);
}
