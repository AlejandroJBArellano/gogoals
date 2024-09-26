import { auth } from "@/auth";
import { InviteUser } from "@/components/invite-user";
import { prisma } from "@/prisma";

export default async function TeamFromUser() {
  const session = await auth();

  const collaborators = await prisma.user.findMany();

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
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* We'll map through users here */}
            {/* This is a placeholder, replace with actual data */}
            {collaborators.map((collaborator) => (
              <tr key={collaborator.id} className="border-b">
                <td className="p-4 font-medium">{collaborator.name}</td>
                <td className="p-4 text-gray-600">{collaborator.email}</td>
                <td className="p-4 text-right">
                  <button className="text-red-500 hover:text-red-700">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
