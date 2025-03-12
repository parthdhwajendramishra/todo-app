import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home"); // Redirect to the home page upon successful sign-in
    }
  }, [status, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome to Todo App
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Please sign in to view your todos
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 cursor-pointer flex items-center justify-center w-full"
          onClick={() => signIn("google")}
        >
          <img
            src={process.env.NEXT_PUBLIC_GOOGLE_LOGO}
            alt="Google Logo"
            className="w-6 h-6 mr-2"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
