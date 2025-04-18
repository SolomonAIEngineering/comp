"use server";

import { auth } from "@/utils/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { authActionClient } from "../safe-action";
import type { ActionResponse } from "../types";

const inviteMemberSchema = z.object({
	email: z.string().email(),
	role: z.enum(["owner", "admin", "member", "auditor"]),
});

export const inviteMember = authActionClient
	.metadata({
		name: "invite-member",
		track: {
			event: "invite_member",
			channel: "organization",
		},
	})
	.schema(inviteMemberSchema)
	.action(
		async ({
			parsedInput,
			ctx,
		}): Promise<ActionResponse<{ invited: boolean }>> => {
			if (!ctx.session.activeOrganizationId) {
				return {
					success: false,
					error: "Organization not found",
				};
			}

			try {
				revalidatePath(
					`/${ctx.session.activeOrganizationId}/settings/members`,
				);
				revalidateTag(`user_${ctx.user.id}`);

				return {
					success: true,
					data: { invited: true },
				};
			} catch (error) {
				console.error("Error inviting member:", error);
				return {
					success: false,
					error: "Failed to invite member",
				};
			}
		},
	);
