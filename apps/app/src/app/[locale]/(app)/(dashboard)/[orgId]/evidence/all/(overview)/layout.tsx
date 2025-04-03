import { auth } from "@comp/auth";
import { getI18n } from "@/locales/server";
import { SecondaryMenu } from "@comp/ui/secondary-menu";
import { headers } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getI18n();
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const organizationId = session?.session.activeOrganizationId;

  return (
    <div className="max-w-[1200px] m-auto">
      <SecondaryMenu
        items={[
          {
            path: `/${organizationId}/evidence`,
            label: t("evidence.dashboard.layout"),
          },
          {
            path: `/${organizationId}/evidence/all`,
            label: t("evidence.list"),
          },
        ]}
      />

      <main className="mt-8">{children}</main>
    </div>
  );
}
