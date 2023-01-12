import { JSX } from "preact";
import { Logo } from "./Logo.tsx";

export function Header(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <div class="w-full flex justify-center pb-4">
      <div class="w-full max-w-screen-lg p-4 flex gap-4 items-center">
        <a href="/">
          <Logo />
        </a>
      </div>
    </div>
  );
}
