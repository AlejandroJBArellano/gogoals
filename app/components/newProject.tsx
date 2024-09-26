"use client";

import { useState } from "react";

export const NewProject = () => {
  const [projectName, setProjectName] = useState("");

  const close = () => {
    const dialog = document.getElementById("dialog") as HTMLDialogElement;
    if (dialog) {
      dialog.close();
    }
    setProjectName("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: projectName }),
      });
      if (response.ok) {
        close();
      } else {
        // Handle error
        console.error("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          const dialog = document.getElementById("dialog") as HTMLDialogElement;
          if (dialog) {
            dialog.showModal();
          }
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create new project
      </button>

      <dialog
        id="dialog"
        className="p-4 rounded shadow-lg backdrop:bg-black backdrop:opacity-50"
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Create New Project</h2>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project name"
            className="border rounded p-2 w-full mb-4"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={close}
              className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};
