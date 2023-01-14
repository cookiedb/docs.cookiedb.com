import { JSX } from "preact";
import { Logo } from "./Logo.tsx";
import Language, { languages } from "islands/Language.tsx";

interface HeaderProps {
  language: keyof typeof languages;
}

export function Header(props: HeaderProps) {
  return (
    <div class="w-full flex justify-center pb-4">
      <div class="w-full max-w-screen-lg p-4 flex gap-4 items-center">
        <a href="/">
          <Logo />
        </a>
        <div class="ml-auto">
          <Language language={props.language} />
        </div>
      </div>
    </div>
  );
}
