"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const InviteUser = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { workspaceId } = useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role, workspaceId }),
      });

      if (response.ok) {
        toast.success("Invitation sent successfully!");
        setEmail("");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to send invitation");
      }
    } catch (error) {
      console.error("Error sending invitation:", error);
      toast.error("An error occurred while sending the invitation");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter user email"
          className="p-2 border rounded"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 border rounded"
          required
        >
          <option value="">Select role</option>
          <option value="MEMBER">Member</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Invite User
        </button>
      </div>
    </form>
  );
};
