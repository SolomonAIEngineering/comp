// update-task-action.ts

"use server";

import { db } from "@bubba/db";
import type { TaskStatus } from "@bubba/db/types";
import { revalidatePath, revalidateTag } from "next/cache";
import { authActionClient } from "@/actions/safe-action";
import { updateVendorTaskSchema } from "../schema";

export const updateVendorTaskAction = authActionClient
	.schema(updateVendorTaskSchema)
	.metadata({
		name: "update-vendor-task",
		track: {
			event: "update-vendor-task",
			channel: "server",
		},
	})
	.action(async ({ parsedInput, ctx }) => {
		const { id, title, description, dueDate, status, ownerId } = parsedInput;
		const { session } = ctx;

		if (!session.activeOrganizationId) {
			throw new Error("Invalid user input");
		}

		try {
			const task = await db.task.findUnique({
				where: {
					id: id,
				},
				select: {
					relatedId: true,
				},
			});

			if (!task) {
				throw new Error("Task not found");
			}

			await db.task.update({
				where: {
					id: id,
					organizationId: session.activeOrganizationId,
				},
				data: {
					title,
					description,
					dueDate,
					status: status as TaskStatus,
					userId: ownerId,
				},
			});

			revalidatePath(
				`/${session.activeOrganizationId}/vendors/${task.relatedId}`,
			);
			revalidatePath(
				`/${session.activeOrganizationId}/vendors/${task.relatedId}/tasks/${id}`,
			);
			revalidateTag(`vendor_${session.activeOrganizationId}`);

			return { success: true };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	});
