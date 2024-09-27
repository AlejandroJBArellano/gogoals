"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function ProjectDetailTemplate({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspaceId: string; projectId: string };
}) {
  const pathname = usePathname();

  const { workspaceId, projectId } = useParams();

  const tabs = [
    {
      name: "Tasks",
      href: `/${workspaceId}/projects/${projectId}`,
    },
    {
      name: "Board",
      href: `/${workspaceId}/projects/${projectId}/board`,
    },
    {
      name: "Settings",
      href: `/${workspaceId}/projects/${projectId}/settings`,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={`${
                  pathname === tab.href
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm transition duration-150 ease-in-out`}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">{children}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
