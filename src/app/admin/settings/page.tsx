import { Settings, Store, Mail, MapPin, Phone } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Settings</h1>
        <p className="text-sm text-gray-500">Store information and configuration</p>
      </div>

      {/* Store Info */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C8A97E]/10">
            <Store className="h-5 w-5 text-[#C8A97E]" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#1A1A1A]">
              Store Information
            </h2>
            <p className="text-xs text-gray-400">
              Read-only store details
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-start gap-4 rounded-lg border border-gray-100 bg-gray-50/50 p-4">
            <Store className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Store Name
              </p>
              <p className="mt-1 text-sm font-medium text-[#1A1A1A]">
                Altareb Global
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg border border-gray-100 bg-gray-50/50 p-4">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Contact Email
              </p>
              <p className="mt-1 text-sm font-medium text-[#1A1A1A]">
                support@altarebglobal.com
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg border border-gray-100 bg-gray-50/50 p-4">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Phone
              </p>
              <p className="mt-1 text-sm font-medium text-[#1A1A1A]">
                +1 (555) 000-0000
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg border border-gray-100 bg-gray-50/50 p-4">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Address
              </p>
              <p className="mt-1 text-sm font-medium text-[#1A1A1A]">
                123 Commerce Street, Suite 100
              </p>
              <p className="text-sm text-gray-500">
                New York, NY 10001, United States
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
            <Settings className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#1A1A1A]">
              System
            </h2>
            <p className="text-xs text-gray-400">
              Platform information
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Platform
            </p>
            <p className="mt-1 text-sm font-medium text-[#1A1A1A]">
              Next.js 15
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Database
            </p>
            <p className="mt-1 text-sm font-medium text-[#1A1A1A]">
              PostgreSQL
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              ORM
            </p>
            <p className="mt-1 text-sm font-medium text-[#1A1A1A]">
              Prisma
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Payments
            </p>
            <p className="mt-1 text-sm font-medium text-[#1A1A1A]">
              Stripe + COD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
