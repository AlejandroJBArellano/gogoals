"use client";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "@prisma/client";
import TaskCard from "./task";

const BoardTasks = ({ tasks }: { tasks: Task[] }) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log("active", active.id);
    console.log("over", over?.id);

    if (!(active.id !== over?.id)) {
      //   setPeople((people) => {
      //     const oldIndex = people.findIndex((person) => person.id === active.id);
      //     const newIndex = people.findIndex((person) => person.id === over.id);
      //     console.log(arrayMove(people, oldIndex, newIndex));
      //     return arrayMove(people, oldIndex, newIndex);
      //   });
    }

    console.log("drag end");
  };
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <h1 className="text-2xl font-bold">Users List</h1>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default BoardTasks;
