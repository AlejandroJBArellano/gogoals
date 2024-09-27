import { prisma } from "@/prisma";

export default async function ProjectDetailPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await prisma.project.findUnique({
    where: { id: params.projectId },
    include: { tasks: true },
  });
  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{project.name}</h1>
      <p className="text-gray-600 mb-8">{project.description}</p>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        {project.tasks && project.tasks.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Task Name</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {project.tasks.map((task) => (
                <tr key={task.id} className="border-b">
                  <td className="p-4 font-bold">{task.name}</td>
                  <td className="p-4 text-gray-600">{task.description}</td>
                  <td className="p-4">{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tasks found for this project.</p>
        )}
      </div>
    </div>
  );
}
