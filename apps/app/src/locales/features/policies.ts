export const policies = {
	dashboard: {
		title: "Overview",
		all: "Policies",
		policy_status: "Policy by Status",
		policies_by_assignee: "Policies by Assignee",
		policies_by_framework: "Policies by Framework",
		sub_pages: {
			overview: "Overview",
			edit_policy: "Edit Policy",
		},
	},
	overview: {
		title: "Policy Overview",
		form: {
			update_policy: "Update Policy",
			update_policy_description:
				"Update the policy title or description.",
			update_policy_success: "Policy updated successfully",
			update_policy_error: "Failed to update policy",
			update_policy_title: "Policy Name",
			status: "Status",
			status_placeholder: "Select status",
			description: "Description",
			description_placeholder: "Enter policy description",
			review_frequency: "Review Frequency",
			review_frequency_placeholder: "Select a review frequency",
			review_date: "Review Date",
			review_date_placeholder: "Select a review date",
			signature_required: "Require employees signature",
			signature_not_required: "Do not ask employees to sign",
			signature_requirement: "Signature Requirement",
			signature_requirement_placeholder: "Select signature requirement",
			policy_department: "Department",
			policy_department_placeholder: "Select a department",
			policy_status: "Policy Status",
			policy_status_placeholder: "Select a policy status",
			policy_assignee: "Assignee",
			policy_assignee_placeholder: "Select an assignee",
		},
	},
	new: {
		success: "Policy successfully created",
		error: "Failed to create policy",
		details: "Policy Details",
		title: "Enter a title for the policy",
		description: "Enter a description for the policy",
	},
	table: {
		name: "Policy Name",
		statuses: {
			draft: "Draft",
			published: "Published",
			archived: "Archived",
		},
		filters: {
			owner: {
				label: "Assignee",
				placeholder: "Filter by assignee",
			},
		},
	},
	filters: {
		search: "Search policies...",
		all: "All Policies",
	},
	status: {
		draft: "Draft",
		published: "Published",
		needs_review: "Needs Review",
		archived: "Archived",
		relevant: "Relevant",
		"not-relevant": "Not Relevant",
	},
	policies: "policies",
	title: "Policies",
	create_new: "Create New Policy",
	search_placeholder: "Search policies...",
	status_filter: "Filter by status",
	all_statuses: "All statuses",
	no_policies_title: "No policies yet",
	no_policies_description: "Get started by creating your first policy",
	create_first: "Create first policy",
	last_updated: "Last updated: {{date}}",
	save: "Save",
	policy_details: "Policy Details",
	archive: {
		tooltip: "Archive policy",
		restore_tooltip: "Restore policy",
		title: "Archive Policy",
		restore_title: "Restore Policy",
		description: "Are you sure you want to archive this policy?",
		restore_description: "Are you sure you want to restore this policy?",
		confirm: "Archive",
		restore_confirm: "Restore",
		cancel: "Cancel",
		success: "Policy archived successfully",
		restore_success: "Policy restored successfully",
		error: "Failed to update policy archive status",
		status: "This policy is archived",
		archived_on: "Archived on",
	},
	edit: {
		tooltip: "Edit policy",
	},
} as const;
