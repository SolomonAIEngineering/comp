import { auth } from "@bubba/auth";
import { headers } from "next/headers";
import { setStaticParamsLocale } from "next-international/server";
import { redirect } from "next/navigation";
import { FrameworkControls } from "./components/FrameworkControls";
import { FrameworkOverview } from "./components/FrameworkOverview";
import { getFramework } from "./data/getFramework";
import { getFrameworkRequirements } from "./data/getFrameworkRequirements";
import { FrameworkId } from "@bubba/data";
interface PageProps {
	params: Promise<{
		frameworkId: FrameworkId;
		locale: string;
	}>;
}

export default async function FrameworkPage({ params }: PageProps) {
	const { frameworkId, locale } = await params;
	setStaticParamsLocale(locale);

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/");
	}

	const organizationId = session.session.activeOrganizationId;

	if (!frameworkId) {
		redirect("/");
	}

	if (!organizationId) {
		redirect("/");
	}

	const requirements = await getFrameworkRequirements(
		frameworkId,
		organizationId,
	);

	const frameworkInstance = await getFramework(frameworkId, organizationId);

	if (!frameworkInstance) {
		redirect("/");
	}

	return (
		<div className="flex flex-col gap-6">
			<FrameworkOverview
				requirements={requirements}
				frameworkInstance={frameworkInstance}
			/>
			<FrameworkControls
				requirements={requirements}
				frameworkId={frameworkId}
			/>
		</div>
	);
}
