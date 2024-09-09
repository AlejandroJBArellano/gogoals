"use client";

import { CSVLink } from "react-csv";

export const ExportToCSV = ({
  project,
}: {
  project: {
    tasks: {
      name: string;
      description: string;
      startDate: string;
      endDate: string;
      priority: "low" | "medium" | "high";
      assignees: string[];
    }[];
    name: string;
  };
}) => {
  const onClick = async () => {
    console.log("Exporting to CSV");
  };
  return (
    <CSVLink
      data={project.tasks.map((task) => ({
        ...task,
        assignees: task.assignees.join(", "),
      }))}
      filename={`${project.name}.csv`}
      className="border-2 border-black p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
    >
      Export to CSV
    </CSVLink>
  );
};
