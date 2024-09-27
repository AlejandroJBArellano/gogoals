import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

export default async function AccountPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!user) {
    return <div></div>;
  }

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    await prisma.user.update({
      where: { id: user.id },
      data: { name, email },
    });

    redirect(`/${params.workspaceId}/account`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
      <form action={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={user.name || ""}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={user.email || ""}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Account
        </button>
      </form>
    </div>
  );
}
