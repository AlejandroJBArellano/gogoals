export default async function page({
  searchParams: { project },
}: {
  searchParams: {
    project: string;
  };
}) {
  const columns = [
    { id: "todo", title: "To Do", tasks: [] },
    { id: "inProgress", title: "In Progress", tasks: [] },
    { id: "done", title: "Done", tasks: [] },
  ];

  const projectParsed = await JSON.parse(project);

  const tasks: string[] = projectParsed.project.tasks;

  return (
    <div className="flex flex-nowrap overflow-x-auto gap-8 pb-4">
      {columns.map((column, columnIndex) => (
        <div
          key={column.id}
          className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] min-w-[300px] max-w-[400px] flex-1"
        >
          <h2 className="text-2xl font-bold mb-4">{column.title}</h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task}
                className="bg-blue-200 border-2 border-black p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
              >
                <p className="text-lg font-semibold mb-2">{task}</p>
                {/* <div className="flex justify-between">
                    <button
                      disabled={columnIndex === 0}
                      className="bg-orange-400 hover:bg-orange-500 text-black font-bold py-2 px-4 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-50"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      disabled={columnIndex === columns.length - 1}
                      className="bg-purple-400 hover:bg-purple-500 text-black font-bold py-2 px-4 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-50"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div> */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
