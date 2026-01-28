import Link from 'next/link';

export default function SignupPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-black p-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white dark:bg-zinc-900 p-10 shadow-xl ring-1 ring-gray-900/5 dark:ring-white/10">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Get started with your new account
                    </p>
                </div>

                <form className="mt-8 space-y-6" action="#" method="POST">
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                            >
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-zinc-800 dark:text-white dark:ring-zinc-700 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    placeholder="johndoe"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-zinc-800 dark:text-white dark:ring-zinc-700 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                            >
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-zinc-800 dark:text-white dark:ring-zinc-700 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
