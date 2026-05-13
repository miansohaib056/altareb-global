import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin | Altareb Global",
  description: "Altareb Global admin dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar
        user={{
          name: session.user.name,
          email: session.user.email,
        }}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
