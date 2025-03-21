"use client";

import { Spinner } from "@nextui-org/spinner";
import { redirect } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/context/authContext";

const withAuth = (Component: React.FC) => {
  return function ProtectedRoute(props: any) {
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!loading && !user) {
        redirect("/");
      }
    }, [user, loading]);

    if (loading)
      return (
        <div className="flex justify-center items-center h-80">
          <Spinner color="success" size="lg" />
        </div>
      );

    return user ? <Component {...props} /> : null;
  };
};

export default withAuth;
