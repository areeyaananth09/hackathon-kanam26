import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black text-black dark:text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 lg:px-8 border-b border-gray-100 dark:border-zinc-800">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            HackApp
          </Link>
        </div>
        <div className="flex gap-x-4">
          <Link
            href="/login"
            className="rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center px-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Build something <span className="text-indigo-600">amazing</span>.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            This is your new landing page. You can customize this section to describe your hackathon project or product.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/signup"
              className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
            >
              Get started
            </Link>
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Log in <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-600">
        © {new Date().getFullYear()} HackApp. All rights reserved.
      </footer>
    </div>
  );
}
