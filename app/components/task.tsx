import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@prisma/client";

const TaskCard = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 mb-4"
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <h3 className="text-lg font-semibold mb-2">{task.name}</h3>
      <p className="text-gray-600 mb-3">{task.description}</p>
      <div className="flex justify-between items-center text-sm">
        <span
          className={`px-2 py-1 rounded-full ${
            task.status === "COMPLETED"
              ? "bg-green-100 text-green-800"
              : task.status === "IN_PROGRESS"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {task.status}
        </span>
        <div className="flex space-x-4">
          <span>
            Start:{" "}
            {task.startDate
              ? new Date(task.startDate).toLocaleDateString("es-ES")
              : "Not set"}
          </span>
          <span>
            Due:{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString("es-ES")
              : "Not set"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
