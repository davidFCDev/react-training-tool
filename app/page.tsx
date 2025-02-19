"use client";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

import { subtitle } from "@/components/primitives";
import { useAuth } from "@/context/authContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="relative flex flex-col items-center justify-center gap-4 py-8 md:py-20">
      <div className="inline-block max-w-xl text-center justify-center text-7xl font-extrabold leading-tight anton-regular">
        <span>Create&nbsp;</span>
        <span className="text-success">WORKOUTS&nbsp;</span>
        <br />
        <span>easy with AI</span>
      </div>

      <div className={`${subtitle({ class: "mt-4" })} text-center `}>
        Easy, fast and free.
      </div>

      <div className="flex gap-3">
        {!user ? (
          <>
            <Link
              className={buttonStyles({
                color: "success",
                radius: "full",
                variant: "ghost",
              })}
              href="/login"
            >
              Login
            </Link>
            <Link
              className={buttonStyles({ variant: "bordered", radius: "full" })}
              href="/register"
            >
              Register
            </Link>
          </>
        ) : (
          <Link
            className={buttonStyles({
              color: "success",
              radius: "full",
              variant: "ghost",
            })}
            href="/create"
          >
            Create Workout
          </Link>
        )}
      </div>
    </section>
  );
}
