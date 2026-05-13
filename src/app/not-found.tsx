import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-bold text-[#C8A97E]">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-900">
        Page Not Found
      </h2>
      <p className="mt-2 text-gray-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-full bg-[#1A1A1A] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#C8A97E]"
        >
          Go Home
        </Link>
        <Link
          href="/shop"
          className="rounded-full border border-[#1A1A1A] px-8 py-3 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-white"
        >
          Visit Shop
        </Link>
      </div>
    </div>
  );
}
