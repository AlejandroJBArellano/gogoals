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
      <header className="mb-8 bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-3 text-gray-800">
          {project.name}
        </h1>
        <p className="text-gray-600 text-lg">{project.description}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <span className="mr-4">
            Created: {new Date(project.createdAt).toLocaleDateString()}
          </span>
          <span>
            Last updated: {new Date(project.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        {project.tasks && project.tasks.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {project.tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {task.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {task.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : task.status === "IN_PROGRESS"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {task.startDate
                          ? new Date(task.startDate).toLocaleDateString()
                          : "Not set"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString()
                          : "Not set"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic">
            No tasks found for this project.
          </p>
        )}
      </section>
    </div>
  );
}
