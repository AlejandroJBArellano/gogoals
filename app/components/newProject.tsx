"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar } from "./calendar";

export const NewProject = () => {
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [dueDate, setDueDate] = useState<Date>();

  const { workspaceId } = useParams();

  const close = () => {
    const dialog = document.getElementById("dialog") as HTMLDialogElement;
    if (dialog) {
      dialog.close();
    }
    setProjectName("");
    setStartDate(new Date());
    setDueDate(new Date(new Date().setDate(new Date().getDate() + 30)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName,
          startDate: startDate,
          dueDate: dueDate,
          assignees: [],
        }),
      });
      if (response.ok) {
        const result = await response.json();
        const { object } = result;

        // Create the project using the generated data
        const createProjectResponse = await fetch("/api/project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            workspaceId,
            name: projectName,
            description: object.project.description,
            generatedTasks: object.project.tasks,
            startDate: startDate,
            dueDate: dueDate,
          }),
        });

        if (createProjectResponse.ok) {
          const { project } = await createProjectResponse.json();
          // Redirect to the new project page
          window.location.href = `/${project.workspaceId}/projects/${project.id}`;
        } else {
          console.error("Failed to create project");
        }
        close();
      } else {
        // Handle error
        console.error("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  useEffect(() => {
    console.log({ startDate, dueDate });
  }, [startDate, dueDate]);

  return (
    <div>
      <button
        onClick={() => {
          const dialog = document.getElementById("dialog") as HTMLDialogElement;
          if (dialog) {
            dialog.showModal();
          }
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
      >
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Create New Project
        </span>
      </button>

      <dialog
        id="dialog"
        className="p-6 rounded-lg shadow-xl backdrop:bg-black backdrop:opacity-60 w-full max-w-md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Create New Project
          </h2>
          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <Calendar
              mode="range"
              selected={{
                from: startDate,
                to: dueDate,
              }}
              onSelect={(range) => {
                setStartDate(range?.from || new Date());
                setDueDate(range?.to || new Date());
              }}
              className="border rounded-md p-2 w-full"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition duration-300 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Create Project
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};
