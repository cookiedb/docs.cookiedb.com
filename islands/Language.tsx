import { useEffect, useState } from "preact/hooks";

export const languages = {
  typescript: "Typescript",
  bash: "Curl",
};

interface LanguageProps {
  language: keyof typeof languages;
}

export default function Language(props: LanguageProps) {
  const [language, setLanguage] = useState<keyof typeof languages>(
    props.language,
  );
  const [show, setShow] = useState(false);

  return (
    <div class="w-52">
      <button
        class={`w-full text-left flex justify-between ${
          show ? "rounded-t" : "rounded"
        } border border-gray-700 px-4 py-2 transition-all shadow cursor-pointer hover:text-gray-400`}
        onClick={() => {
          setShow(!show);
        }}
      >
        {languages[language]}
        <span
          class={`text-gray-900 transition-all duration-300 ${
            show ? "rotate-180" : "rotate-0"
          }`}
        >
          ↓
        </span>
      </button>
      {show && (
        <div class="absolute w-52">
          {(Object.entries(languages) as {
            [K in keyof typeof languages]: [K, typeof languages[K]];
          }[keyof typeof languages][]).map(([raw, name], i) => (
            language === raw ? null : (
              <button
                onClick={() => {
                  setShow(!show);
                  setLanguage(raw);
                  document.cookie = `language=${raw}; path=/; max-age=31536000`;
                  location.reload();
                }}
                class={`${
                  i === Object.keys(languages).length - 2 ? "rounded-b" : ""
                } text-left w-full border-b border-r border-l border-gray-700 px-4 py-2 transition-all shadow cursor-pointer hover:text-gray-400`}
              >
                {name}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
}
