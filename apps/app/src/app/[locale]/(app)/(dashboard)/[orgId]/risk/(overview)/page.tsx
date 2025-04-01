import { auth } from "@/auth";
import { RiskOverview } from "@/components/risks/charts/risk-overview";
import { RisksAssignee } from "@/components/risks/charts/risks-assignee";
import { getI18n } from "@/locales/server";
import type { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import { redirect } from "next/navigation";

export default async function RiskManagement({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session || !session.user.organizationId) {
    redirect("/");
  }

  setStaticParamsLocale(locale);

  return (
    <div className="space-y-4 sm:space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RiskOverview />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <RisksAssignee />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getI18n();

  return {
    title: t("sidebar.risk"),
  };
}
