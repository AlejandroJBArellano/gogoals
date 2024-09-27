import { auth } from "@/auth";
import { InviteUser } from "@/components/invite-user";
import { prisma } from "@/prisma";
import { notFound } from "next/navigation";

export default async function TeamFromUser({
  params,
}: {
  params: { workspaceId: string };
}) {
  const session = await auth();

  const workspace = await prisma.workspace.findUnique({
    where: { id: params.workspaceId },
    include: {
      collaborators: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!workspace) return notFound();

  return (
    <section className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-6">My Team</h1>

      {/* Add User Form */}
      <InviteUser />

      {/* User List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Team Members</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {/* We'll map through users here */}
            {/* This is a placeholder, replace with actual data */}
            {workspace.collaborators.map((collaborator) => (
              <tr key={collaborator.id} className="border-b">
                <td className="p-4 font-medium">{collaborator.user.name}</td>
                <td className="p-4 text-gray-600">{collaborator.user.email}</td>
                <td className="p-4 text-gray-600">{collaborator.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
