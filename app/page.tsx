import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { button as buttonStyles } from "@nextui-org/theme";

import { subtitle, title } from "@/components/primitives";

export default function Home() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center text-">
        <span className={title()}>Create&nbsp;</span>
        <span className={title({ color: "green" })}>WORKOUTS&nbsp;</span>
        <br />
        <span className={title()}>easy with AI</span>
        <div className={subtitle({ class: "mt-4" })}>Easy, fast and free.</div>
      </div>

      <div className="flex gap-3">
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
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol>
          <span>Get your first training today!</span>
        </Snippet>
      </div>
    </section>
  );
}
