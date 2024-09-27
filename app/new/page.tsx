"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NewWorkspacePage() {
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [availableCollaborators, setAvailableCollaborators] = useState<
    string[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    fetchAvailableCollaborators();
  }, []);

  const fetchAvailableCollaborators = async () => {
    try {
      const response = await fetch("/api/collaborators", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const collaborators = await response.json();
        setAvailableCollaborators(
          collaborators.map((collaborator: any) => collaborator.user.email)
        );
      } else {
        console.error("Failed to fetch collaborators");
      }
    } catch (error) {
      console.error("Error fetching collaborators:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/workspaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: workspaceName,
          description,
          collaborators,
        }),
      });

      if (response.ok) {
        const { id } = await response.json();
        toast.success("Workspace created successfully!");
        router.push(`/${id}`);
      } else {
        const errorData = await response.json();
        if (errorData.error === "Invalid email format for collaborators") {
          toast.error(
            `Invalid email format for collaborators: ${errorData.invalidEmails.join(
              ", "
            )}`
          );
        } else {
          toast.error(errorData.error || "Failed to create workspace");
        }
      }
    } catch (error) {
      console.error("Error creating workspace:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const handleCollaboratorChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCollaborators = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setCollaborators(selectedCollaborators);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create New Workspace</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="workspaceName"
            className="block text-sm font-medium text-gray-700"
          >
            Workspace Name
          </label>
          <input
            type="text"
            id="workspaceName"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={3}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="collaborators"
            className="block text-sm font-medium text-gray-700"
          >
            Collaborators
          </label>
          <select
            id="collaborators"
            multiple
            value={collaborators}
            onChange={handleCollaboratorChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {availableCollaborators.map((collaborator) => (
              <option key={collaborator} value={collaborator}>
                {collaborator}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Workspace
        </button>
      </form>
    </div>
  );
}
