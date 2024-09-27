import { auth } from "@/auth";
import { prisma } from "@/prisma";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

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
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold mb-4">Workspaces</h2>
          <ul className="space-y-2">
            {workspaces.map((workspace) => (
              <li key={workspace.id}>
                <Link
                  href={`/${workspace.id}/`}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {workspace.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/new"
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 text-center block"
          >
            Create New Workspace
          </Link>
        </div>
        <nav className="p-4 flex-grow">
          <ul className="space-y-3">
            {[
              {
                path: `/${params.workspaceId}/team`,
                name: "My Team",
                icon: "👥",
              },
              {
                path: `/${params.workspaceId}/projects`,
                name: "My Projects",
                icon: "📁",
              },
              {
                path: `/${params.workspaceId}/configuration`,
                name: "Configuration",
                icon: "⚙️",
              },
              {
                path: `/${params.workspaceId}/account`,
                name: "Account",
                icon: "👤",
              },
              {
                path: `/${params.workspaceId}/billing`,
                name: "Billing",
                icon: "💳",
              },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {children}
      <Toaster />
    </main>
  );
}
