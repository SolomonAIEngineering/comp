export const risk = {
	risks: "risks",
	overview: "Overview",
	create: "Create New Risk",
	comments: "Risk Comments",
	risk_overview: "Risk Overview",
	form: {
		update_inherent_risk_success: "Inherent risk updated successfully",
		update_inherent_risk_error: "Failed to update inherent risk",
		update_inherent_risk: "Update Inherent Risk",
		update_inherent_risk_description:
			"Adjust the inherent risk before any controls are applied",
		update_residual_risk_success: "Residual risk updated successfully",
		update_residual_risk_error: "Failed to update residual risk",
		update_residual_risk: "Update Residual Risk",
		update_residual_risk_description:
			"Adjust the residual risk after controls have been applied",
		update_risk_success: "Risk updated successfully",
		update_risk_error: "Failed to update risk",
		update_risk: "Update Risk",
		update_risk_description: "Update risk details and metadata",
		create_risk_success: "Risk created successfully",
		create_risk_error: "Failed to create risk",
		risk_title: "Risk Title",
		risk_title_description: "Enter risk title",
		risk_details: "Risk Details",
		risk_category: "Category",
		risk_category_placeholder: "Select risk category",
		risk_description: "Description",
		risk_description_description: "Enter risk description",
		risk_department: "Department",
		risk_department_placeholder: "Select department",
		risk_status: "Status",
		risk_status_placeholder: "Select status",
	},
	register: {
		title: "Risks",
		table: {
			risk: "Risk",
		},
		empty: {
			create_risk: "Create Risk",
			no_risks: {
				title: "No risks yet",
				description: "Get started by creating your first risk",
			},
		},
	},
	dashboard: {
		title: "Overview",
		by_department: "Risks by Department",
		status: "Risks by Status",
		risks_by_assignee: "Risks by Assignee",
		overview: "Overview",
		inherent_risk_description:
			"Initial risk level before any controls are applied",
		residual_risk_description:
			"Remaining risk level after controls are applied",
	},
	metrics: {
		probability: "Probability",
		impact: "Impact",
		inherentRisk: "Inherent Risk",
		residualRisk: "Residual Risk",
	},
	tasks: {
		title: "Tasks",
		task_overview: "Task Overview",
		attachments: "Attachments",
		overview: "Overview",
		sheet: {
			title: "Create Task",
			update: "Update Task",
			update_description: "Update task details and metadata",
		},
		form: {
			title: "Task Details",
			task_title: "Task Title",
			task_title_description: "Enter task title",
			description: "Description",
			description_description: "Enter task description",
			due_date: "Due Date",
			success: "Task created successfully",
			error: "Failed to create task",
			update_success: "Task updated successfully",
			update_error: "Failed to update task",
			status: "Status",
			status_placeholder: "Select status",
		},
	},
	vendor: {
		title: "Vendor Management",
		dashboard: {
			title: "Vendor Dashboard",
			overview: "Vendor Overview",
			vendor_status: "Vendor Status",
			vendor_category: "Vendor Categories",
			inherent_risk_description:
				"Initial risk level before any controls are applied",
			residual_risk_description:
				"Remaining risk level after controls are applied",
		},
		register: {
			title: "Vendor Register",
			table: {
				name: "Name",
				category: "Category",
				status: "Status",
				owner: "Owner",
			},
		},
		assessment: {
			title: "Vendor Assessment",
			inherent_risk: "Inherent Risk",
			residual_risk: "Residual Risk",
		},
		form: {
			vendor_details: "Vendor Details",
			vendor_name: "Name",
			vendor_name_placeholder: "Enter vendor name",
			vendor_website: "Website",
			vendor_website_placeholder: "Enter vendor website",
			vendor_description: "Description",
			vendor_description_placeholder: "Enter vendor description",
			vendor_category: "Category",
			vendor_category_placeholder: "Select category",
			vendor_status: "Status",
			vendor_status_placeholder: "Select status",
			create_vendor_success: "Vendor created successfully",
			create_vendor_error: "Failed to create vendor",
		},
		table: {
			name: "Name",
			category: "Category",
			status: "Status",
			owner: "Owner",
		},
		filters: {
			search_placeholder: "Search vendors...",
			status_placeholder: "Filter by status",
		},
		empty_states: {
			no_vendors: {
				title: "No vendors yet",
				description: "Get started by creating your first vendor",
			},
			no_results: {
				title: "No results found",
				description: "No vendors match your search",
				description_with_filters: "Try adjusting your filters",
			},
		},
		actions: {
			create: "Create Vendor",
		},
		status: {
			not_assessed: "Not Assessed",
			in_progress: "In Progress",
		},
		risk_level: {
			low: "Low Risk",
			medium: "Medium Risk",
			high: "High Risk",
		},
		tasks: {
			empty: {
				no_results: "No results found",
				no_results_description: "Try adjusting your search or filters",
				clear_filters: "Clear filters",
				no_tasks: "No tasks found",
			},
			filters: {
				search: "Search tasks...",
				status: "Filter by status",
				all_statuses: "All statuses",
				not_started: "Not started",
				in_progress: "In progress",
				completed: "Completed",
				assignee: "Filter by assignee",
				all_assignees: "All assignees",
				clear: "Clear filters",
			},
		},
	},
} as const;
