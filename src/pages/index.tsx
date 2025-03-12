import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home"); // Redirect to the home page
    } else if (status === "unauthenticated") {
      router.push("/auth/signin"); // Redirect to the sign-in page
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return null; // Return null to avoid rendering anything before redirection
}
