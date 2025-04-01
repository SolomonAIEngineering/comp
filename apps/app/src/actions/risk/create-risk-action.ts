// create-risk-action.ts

"use server";

import { db } from "@bubba/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";
import { createRiskSchema } from "../schema";
import { Likelihood } from "@bubba/db/types";
import { Impact } from "@bubba/db/types";

export const createRiskAction = authActionClient
  .schema(createRiskSchema)
  .metadata({
    name: "create-risk",
    track: {
      event: "create-risk",
      channel: "server",
    },
  })
  .action(async ({ parsedInput, ctx }) => {
    const { title, description, category, department } = parsedInput;
    const { user, session } = ctx;

    if (!user.id || !session.activeOrganizationId) {
      throw new Error("Invalid user input");
    }

    try {
      await db.risk.create({
        data: {
          title,
          description,
          category,
          department,
          likelihood: Likelihood.very_unlikely,
          impact: Impact.insignificant,
          ownerId: user.id,
          organizationId: session.activeOrganizationId,
        },
      });

      revalidatePath(`/${session.activeOrganizationId}/risk`);
      revalidatePath(`/${session.activeOrganizationId}/risk/register`);
      revalidateTag(`risk_${session.activeOrganizationId}`);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  });
