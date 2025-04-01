"use server";

import { db } from "@bubba/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";
import { z } from "zod";

const archivePolicySchema = z.object({
  id: z.string(),
  action: z.enum(["archive", "restore"]).optional(),
});

export const archivePolicyAction = authActionClient
  .schema(archivePolicySchema)
  .metadata({
    name: "archive-policy",
    track: {
      event: "archive-policy",
      channel: "server",
    },
  })
  .action(async ({ parsedInput, ctx }) => {
    const { id, action } = parsedInput;
    const { user } = ctx;

    if (!user.id || !user.organizationId) {
      return {
        success: false,
        error: "Not authorized",
      };
    }

    try {
      const policy = await db.policy.findUnique({
        where: {
          id,
          organizationId: user.organizationId,
        },
      });

      if (!policy) {
        return {
          success: false,
          error: "Policy not found",
        };
      }

      // Determine if we should archive or restore based on action or current state
      const shouldArchive =
        action === "archive" || (action === undefined && policy.status !== "archived");

      await db.policy.update({
        where: { id },
        data: {
          status: shouldArchive ? "archived" : "published",
        },
      });

      revalidatePath(`/${user.organizationId}/policies/all/${id}`);
      revalidatePath(`/${user.organizationId}/policies/all`);
      revalidatePath(`/${user.organizationId}/policies`);
      revalidateTag("policies");

      return {
        success: true,
        status: shouldArchive ? "archived" : "published",
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: "Failed to update policy archive status",
      };
    }
  });
