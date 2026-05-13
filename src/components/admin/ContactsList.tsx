"use client";

import { useState, Fragment } from "react";
import { Mail, ChevronDown, ChevronUp } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function ContactsList({ contacts }: { contacts: Contact[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (contacts.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
        <Mail className="mx-auto h-8 w-8 text-gray-300" />
        <p className="mt-2 text-sm text-gray-400">No submissions yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Subject</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {contacts.map((contact) => (
              <Fragment key={contact.id}>
                <tr
                  className="cursor-pointer hover:bg-gray-50/50"
                  onClick={() => toggle(contact.id)}
                >
                  <td className="px-6 py-4 text-sm font-medium text-[#1A1A1A]">
                    {contact.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {contact.subject || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(contact.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        contact.read
                          ? "bg-gray-100 text-gray-600"
                          : "bg-[#C8A97E]/10 text-[#C8A97E]"
                      }`}
                    >
                      {contact.read ? "Read" : "New"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {expandedId === contact.id ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </td>
                </tr>
                {expandedId === contact.id && (
                  <tr key={`${contact.id}-detail`}>
                    <td
                      colSpan={6}
                      className="border-b border-gray-100 bg-gray-50/50 px-6 py-4"
                    >
                      <div className="space-y-2">
                        {contact.phone && (
                          <p className="text-sm text-gray-500">
                            <span className="font-medium text-gray-700">
                              Phone:
                            </span>{" "}
                            {contact.phone}
                          </p>
                        )}
                        <p className="text-sm text-gray-500">
                          <span className="font-medium text-gray-700">
                            Message:
                          </span>
                        </p>
                        <p className="whitespace-pre-wrap text-sm text-gray-600">
                          {contact.message}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
