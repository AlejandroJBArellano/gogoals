import { auth } from "@/auth";
import { prisma } from "@/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NewProject } from "../../components/newProject";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    console.log({ session });
    return redirect("/api/auth/signin");
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <section className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-6">Mis proyectos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <Link
              href={`/dashboard/project/${project.id}`}
              className="text-blue-600 hover:underline"
            >
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <NewProject />
      </div>
    </section>
  );
}
