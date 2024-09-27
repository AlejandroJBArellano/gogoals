"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProjectSettings({
  params,
}: {
  params: { workspaceId: string; projectId: string };
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteProject = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    ) {
      setIsDeleting(true);
      try {
        const response = await fetch(`/api/projects/${params.projectId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          router.push(`/${params.workspaceId}/projects`);
        } else {
          throw new Error("Failed to delete project");
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Project Settings</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
        <p className="text-gray-600 mb-4">
          Deleting a project will permanently remove all associated data,
          including tasks and files. This action cannot be undone.
        </p>
        <button
          onClick={handleDeleteProject}
          disabled={isDeleting}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          {isDeleting ? "Deleting..." : "Delete Project"}
        </button>
      </div>
    </div>
  );
}
