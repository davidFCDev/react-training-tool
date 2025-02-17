"use client";

import { Input } from "@heroui/input";
import { Button } from "@nextui-org/button";
import { Form } from "@nextui-org/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import authService from "../service/auth.service";

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setErrorMessage(null);
    toast.success(null);

    const result = await authService.login(email, password);

    if (typeof result === "string") {
      setErrorMessage(result);
    } else {
      toast.success("Login successful");
      setTimeout(() => router.push("/"), 100);
    }
  };

  return (
    <div className="w-full min-w-80 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Login</h1>

      <Form
        className="w-full max-w-xs flex flex-col gap-4 mt-10"
        validationBehavior="native"
        onSubmit={handleLogin}
      >
        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

        <Input
          isRequired
          errorMessage="Please enter a valid password"
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
        />

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <div className="flex gap-2">
          <Button color="success" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="flat">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}
