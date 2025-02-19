"use client";

import AuthForm from "../../components/AuthForm";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { handleAuth, errorMessage } = useAuth("login");

  return (
    <AuthForm
      errorMessage={errorMessage}
      linkHref="/register"
      linkText="Don't have an account yet?"
      subtitle="Please enter your email and password to login"
      title="Login"
      onSubmit={handleAuth}
    />
  );
}
