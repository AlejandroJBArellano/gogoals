import { auth } from "@/auth";
import { prisma } from "@/prisma";

export default async function TeamFromUser() {
  const session = await auth();

  const collaborators = await prisma.user.findMany();

  return (
    <section className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-6">My Team</h1>

      {/* Add User Form */}
      <form className="mb-8">
        <div className="flex items-center">
          <input
            type="email"
            placeholder="Enter user email"
            className="flex-grow mr-2 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add User
          </button>
        </div>
      </form>

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
