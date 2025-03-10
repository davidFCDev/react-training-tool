"use client";

import AuthForm from "../../components/user/AuthForm";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const { handleAuth, errorMessage } = useAuth("register");

  return (
    <AuthForm
      errorMessage={errorMessage}
      linkHref="/login"
      linkText="Already have an account?"
      subtitle="Please enter your email and password to register"
      title="Register"
      onSubmit={handleAuth}
    />
  );
}
