import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

export default async function NewProjectPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/api/auth/signin");
  }

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

  if (!workspace) {
    return redirect("/dashboard");
  }

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const assigneeIds = formData.getAll("assignees") as string[];

    console.log({
      name,
      description,
      assigneeIds,
    });

    // await prisma.project.create({
    //   data: {
    //     name,
    //     description,
    //     workspace: { connect: { id: params.workspaceId } },
    //     assignees: {
    //       connect: assigneeIds.map(id => ({ id })),
    //     },
    //   },
    // });

    redirect(`/${params.workspaceId}/projects`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
      <form action={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Project Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full p-2 border rounded"
            rows={3}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block mb-2">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="block mb-2">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Assignees</label>
          {workspace.collaborators.map((collaborator) => (
            <div key={collaborator.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`assignee-${collaborator.id}`}
                name="assignees"
                value={collaborator.id}
                className="mr-2"
              />
              <label htmlFor={`assignee-${collaborator.id}`}>
                {collaborator.user.name}
              </label>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}
