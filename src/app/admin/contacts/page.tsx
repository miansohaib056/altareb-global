export const dynamic = "force-dynamic";

import { Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import ContactsList from "@/components/admin/ContactsList";

async function getContacts() {
  return prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function ContactsPage() {
  const contacts = await getContacts();
  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">
          Contact Submissions
        </h1>
        <p className="text-sm text-gray-500">
          {contacts.length} submission{contacts.length !== 1 ? "s" : ""}
          {unreadCount > 0 && (
            <span className="ml-2 inline-flex rounded-full bg-[#C8A97E]/10 px-2 py-0.5 text-xs font-medium text-[#C8A97E]">
              {unreadCount} unread
            </span>
          )}
        </p>
      </div>

      {/* Contacts List (client component for expandable rows) */}
      <ContactsList contacts={JSON.parse(JSON.stringify(contacts))} />
    </div>
  );
}
