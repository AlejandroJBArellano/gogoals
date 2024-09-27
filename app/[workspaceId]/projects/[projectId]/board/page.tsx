import BoardTasks from "@/app/components/drag";
import { prisma } from "@/prisma";

export default async function Page({
  params,
}: {
  params: { projectId: string };
}) {
  const tasks = await prisma.task.findMany({
    where: { projectId: params.projectId },
  });
  return (
    <div className="flex justify-center items-center">
      <div className="w-4/6">
        <BoardTasks tasks={tasks} />
      </div>
    </div>
  );
}
