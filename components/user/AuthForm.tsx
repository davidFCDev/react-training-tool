"use client";

import { Input } from "@heroui/input";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Form } from "@nextui-org/form";
import Link from "next/link";

import { AuthFormProps } from "@/types";

export default function AuthForm({
  title,
  subtitle,
  onSubmit,
  errorMessage,
  linkText,
  linkHref,
}: AuthFormProps) {
  return (
    <div className="w-full min-w-80 flex flex-col items-start justify-center">
      <div className="flex flex-col gap-2 max-w-xs mx-auto text-left mb-4">
        <h1 className="title">{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </div>

      <Divider className="w-full" />

      <Form
        className="w-full max-w-xs flex flex-col gap-4 my-6"
        validationBehavior="native"
        onSubmit={onSubmit}
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
          <Button color="success" type="submit" variant="ghost">
            Submit
          </Button>
          <Button type="reset" variant="flat">
            Reset
          </Button>
        </div>
      </Form>

      <Divider className="w-full" />

      <div className="mt-6 text-sm flex items-center justify-between w-full font-light">
        {linkText}
        <Link
          className="text-success hover:underline font-normal"
          href={linkHref}
        >
          Click here
        </Link>
      </div>
    </div>
  );
}
