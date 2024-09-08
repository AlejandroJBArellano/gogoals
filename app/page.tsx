"use client";

export default function Home() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submit");
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const response = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ name: formData.name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log({ data });
  };
  return (
    <main>
      <div className="min-h-screen bg-yellow-200 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8">
          <h1 className="text-4xl font-bold mb-6 text-center">
            AI Kanban Generator
          </h1>
          <p className="text-xl mb-8 text-center">
            Enter your project idea, and we'll create a Notion Kanban board for
            you!
          </p>
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Enter your project idea"
              className="w-full border-2 border-black text-lg p-4 placeholder-gray-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-[0px_0px_0_0_rgba(0,0,0,1)]"
            >
              Generate
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
