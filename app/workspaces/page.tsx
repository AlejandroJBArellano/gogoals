import { auth } from "@/auth";
import { prisma } from "@/prisma";
import Link from "next/link";

interface Workspace {
  id: string;
  name: string;
}

export default async function WorkspacesSelector() {
  const session = await auth();
  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  const workspaces = await prisma.workspace.findMany({
    where: {
      OR: [
        { ownerId: session.user.id },
        {
          collaborators: {
            some: {
              userId: session.user.id,
            },
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Select a Workspace</h1>
      {workspaces.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 mb-6">
          {workspaces.map((workspace) => (
            <li
              key={workspace.id}
              className="bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <Link
                href={`/${workspace.id}`}
                className="block w-full p-4 text-left text-gray-800 hover:text-blue-600"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    {workspace.name}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-4 text-gray-600">No workspaces found.</p>
      )}
      <Link
        href="/new"
        className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center"
      >
        Create New Workspace
      </Link>
    </div>
  );
}
