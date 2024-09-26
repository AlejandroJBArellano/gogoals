import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return (
    <main>
      <aside>
        <p>Mis proyectos</p>
      </aside>
      <section>
        <p>Mis proyectos</p>
      </section>
    </main>
  );
}
