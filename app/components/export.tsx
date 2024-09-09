"use client";

export const ExportToCSV = ({ project }: { project: any }) => {
  const onClick = async () => {
    console.log("Exporting to CSV");
  };
  return (
    <button
      onClick={onClick}
      className="border-2 border-black p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
    >
      Export to CSV
    </button>
  );
};
