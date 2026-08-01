
import Link from "next/link";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center ">
        <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
          {/* Form generic text */}
          <div className="space-y-2 text-center">
            <h1 className=" text-3xl font-bold">Welcome Back!</h1>
            <p className="text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>
          {/* Form  */}
          <LoginForm />
          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
