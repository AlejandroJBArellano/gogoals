import { auth } from "@/auth";
import { prisma } from "@/prisma";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default async function DashboardLayout({
  children,
  params,
}: PropsWithChildren<{
  params: {
    workspaceId: string;
  };
}>) {
  const session = await auth();

  const workspaces = await prisma.workspace.findMany({
    where: {
      ownerId: session?.user?.id,
    },
  });
  return (
    <main className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-2">Workspaces</h2>
          <ul>
            {workspaces.map((workspace) => (
              <li key={workspace.id} className="mb-2">
                <Link
                  href={`/${workspace.id}/`}
                  className="text-blue-600 hover:underline"
                >
                  {workspace.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/new"
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Create New Workspace
          </Link>
        </div>
        <nav className="p-4">
          <ul>
            {[
              { path: `/${params.workspaceId}/team`, name: "My team" },
              { path: `/${params.workspaceId}/projects`, name: "My projects" },
              {
                path: `/${params.workspaceId}/configuration`,
                name: "Configuration",
              },
              { path: `/${params.workspaceId}/account`, name: "Account" },
              { path: `/${params.workspaceId}/billing`, name: "Billing" },
            ].map((item) => (
              <li key={item.path} className="mb-2">
                <Link
                  href={item.path}
                  className="text-blue-600 hover:underline"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {children}
    </main>
  );
}
