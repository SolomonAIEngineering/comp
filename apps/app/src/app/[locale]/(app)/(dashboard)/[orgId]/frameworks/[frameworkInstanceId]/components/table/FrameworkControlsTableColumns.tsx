"use client";

import { StatusIndicator, StatusType } from "@/components/status-indicator";
import { useI18n } from "@/locales/client";
import type { Policy, PolicyStatus } from "@comp/db/types";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@comp/ui/tooltip";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useParams } from "next/navigation";

export type OrganizationControlType = {
	id: string;
	name: string;
	description: string | null;
	frameworkInstanceId: string;
	policies: Policy[];
};

export function getControlStatusForPolicies(
	policies: Policy[],
): StatusType {
	if (!policies || policies.length === 0) return "not_started";

	const totalPolicies = policies.length;

	const completedPolicies = policies.filter((policy) => {
		return policy.status === "published";
	}).length;

	if (completedPolicies === 0) return "not_started";
	if (completedPolicies === totalPolicies) return "completed";
	return "in_progress";
}

function isPolicyCompleted(policy: Policy): boolean {
	if (!policy) return false;
	return policy.status === "published";
}

export function FrameworkControlsTableColumns(): ColumnDef<OrganizationControlType>[] {
	const t = useI18n();
	const { orgId } = useParams<{ orgId: string }>();

	return [
		{
			id: "name",
			accessorKey: "name",
			header: t("frameworks.controls.table.control"),
			cell: ({ row }) => {
				return (
					<div className="flex flex-col w-[300px]">
						<Link
							href={`/${orgId}/controls/${row.original.id}`}
							className="flex flex-col"
						>
							<span className="font-medium truncate">
								{row.original.name}
							</span>
						</Link>
					</div>
				);
			},
		},
		{
			id: "category",
			accessorKey: "name",
			header: t("risk.vendor.table.category"),
			cell: ({ row }) => (
				<div className="w-[200px]">
					<span className="text-sm">{row.original.name}</span>
				</div>
			),
		},
		{
			id: "status",
			accessorKey: "policies",
			header: t("frameworks.controls.table.status"),
			cell: ({ row }) => {
				const policies = row.original.policies || [];
				const status = getControlStatusForPolicies(policies);

				const totalPolicies = policies.length;
				const completedPolicies = policies.filter(isPolicyCompleted).length;

				return (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className="w-[200px]">
									<StatusIndicator status={status} />
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<div className="text-sm">
									<p>
										Progress:{" "}
										{Math.round(
											(completedPolicies /
												totalPolicies) *
												100,
										) || 0}
										%
									</p>
									<p>
										Completed: {completedPolicies}/{totalPolicies} policies
									</p>
								</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
			},
		},
	];
}
