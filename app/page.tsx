"use client";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import Image from "next/image";

import { subtitle } from "@/components/utils/primitives";
import { useAuth } from "@/context/authContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="relative flex flex-col items-center justify-center gap-4 py-8 md:py-20">
      <div className="inline-block max-w-2xl text-center justify-center text-7xl font-extrabold leading-tight anton-regular">
        <span>The perfect&nbsp;</span>
        <span className="text-success">Training&nbsp;</span>
        <br />
        <span className="flex items-center justify-center gap-4">
          tool with AI{" "}
          <Image alt="Logo bot" height={100} src="/bot.png" width={100} />
        </span>{" "}
      </div>

      <div className={`${subtitle({ class: "mt-4" })} text-center italic`}>
        Easy, fast and free.
      </div>

      <div className="flex gap-3">
        {!user ? (
          <>
            <Link
              className={buttonStyles({
                radius: "lg",
                variant: "light",
                color: "success",
              })}
              href="/login"
            >
              Login
            </Link>
            <Link
              className={buttonStyles({ variant: "bordered", radius: "lg" })}
              href="/register"
            >
              Register
            </Link>
          </>
        ) : (
          <Link
            className={buttonStyles({
              radius: "lg",

              variant: "ghost",
            })}
            href="/create"
          >
            Start creating
          </Link>
        )}
      </div>
    </section>
  );
}
