"use client";

import { useState } from "react";

const dialogues = [
  {
    speaker: "A",
    en: "Are you ready for our morning walk?",
    ko: "(아침 산책 갈 준비 됐어?)",
  },
  {
    speaker: "B",
    en: "Almost! Let me grab my tumbler first.",
    ko: "(거의 다 됐어! 텀블러 먼저 챙길게.)",
  },
  {
    speaker: "A",
    en: "It feels so refreshing outside today.",
    ko: "(오늘 밖에 나오니 정말 상쾌하다.)",
  },
  {
    speaker: "B",
    en: "Exactly! It's a perfect day for a quiet stroll.",
    ko: "(그러게! 조용히 산책하기 딱 좋은 날이야.)",
  },
];

const expressions = [
  {
    num: "1)",
    expr: "Let me grab ~",
    meaning: "~을 얼른 챙길게 / 집어 들다",
  },
  {
    num: "2)",
    expr: "It feels refreshing.",
    meaning: "기분이 상쾌해 (날씨·공기가 상쾌할 때)",
  },
  {
    num: "3)",
    expr: "It's a perfect day for ~",
    meaning: "~하기에 딱 좋은 날이야 (a quiet stroll: 한적한 산책)",
  },
];

export default function DailyRoutine() {
  const [openSteps, setOpenSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (step: number) => {
    setOpenSteps((prev) => ({
      ...prev,
      [step]: !prev[step],
    }));
  };

  const handleSpeak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
      {/* Card 1 Trigger */}
      <button
        type="button"
        onClick={() => toggleStep(1)}
        aria-expanded={!!openSteps[1]}
        className={`sm:order-1 w-full p-4 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
          openSteps[1]
            ? "border-[#1B4D3E] dark:border-[#2D6A4F] bg-white/80 dark:bg-[#3E2723]/50 shadow-md"
            : "border-[#D5CABD] dark:border-[#4A3B32] bg-white/50 dark:bg-[#3E2723]/30 shadow-sm hover:border-[#8D6E63] dark:hover:border-[#8D6E63]"
        }`}
      >
        <div className="flex items-start justify-between gap-2 w-full">
          <p className="text-sm font-bold text-[#3E2723] dark:text-[#EFEBE9]">
            Step 1. Speaking (15분)
          </p>
          <span
            className={`text-xs text-[#795548] dark:text-[#BCAAA4] transition-transform duration-200 shrink-0 mt-0.5 ${
              openSteps[1] ? "rotate-180 text-[#1B4D3E] dark:text-[#52B788]" : ""
            }`}
          >
            ▼
          </span>
        </div>
        <p className="text-xs text-[#795548] dark:text-[#BCAAA4] mt-1">
          일상 대화 티키타카
        </p>
      </button>

      {/* Card 1 Content */}
      {openSteps[1] && (
        <div className="sm:order-4 sm:col-span-3 p-5 rounded-xl border border-[#D5CABD] dark:border-[#4A3B32] bg-white/75 dark:bg-[#3E2723]/40 shadow-sm space-y-4">
          <div className="border-b border-[#D5CABD]/70 dark:border-[#4A3B32] pb-2.5">
            <span className="text-[11px] font-bold text-[#1B4D3E] dark:text-[#52B788] uppercase tracking-wider">
              Step 1 · Speaking
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#3E2723] dark:text-[#EFEBE9] mt-0.5">
              A Cup of Coffee and a Morning Walk - 커피 한 잔과 산책
            </h3>
          </div>

          <div className="space-y-3">
            {dialogues.map((line, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[#F5F1E7]/70 dark:bg-[#1A1614]/50 border border-[#D5CABD]/60 dark:border-[#4A3B32]/60 space-y-1"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm sm:text-base font-semibold text-[#3E2723] dark:text-[#EFEBE9]">
                    <span className="text-[#1B4D3E] dark:text-[#52B788] font-bold mr-1.5">
                      {line.speaker}:
                    </span>
                    {line.en}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleSpeak(line.en)}
                    className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1B4D3E] dark:bg-[#2D6A4F] text-white text-xs font-semibold shadow-xs hover:bg-[#153D31] active:scale-95 transition cursor-pointer"
                  >
                    듣기 🔊
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-[#795548] dark:text-[#BCAAA4]">
                  {line.ko}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Card 2 Trigger */}
      <button
        type="button"
        onClick={() => toggleStep(2)}
        aria-expanded={!!openSteps[2]}
        className={`sm:order-2 w-full p-4 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
          openSteps[2]
            ? "border-[#1B4D3E] dark:border-[#2D6A4F] bg-white/80 dark:bg-[#3E2723]/50 shadow-md"
            : "border-[#D5CABD] dark:border-[#4A3B32] bg-white/50 dark:bg-[#3E2723]/30 shadow-sm hover:border-[#8D6E63] dark:hover:border-[#8D6E63]"
        }`}
      >
        <div className="flex items-start justify-between gap-2 w-full">
          <p className="text-sm font-bold text-[#3E2723] dark:text-[#EFEBE9]">
            Step 2. Reading (7분)
          </p>
          <span
            className={`text-xs text-[#795548] dark:text-[#BCAAA4] transition-transform duration-200 shrink-0 mt-0.5 ${
              openSteps[2] ? "rotate-180 text-[#1B4D3E] dark:text-[#52B788]" : ""
            }`}
          >
            ▼
          </span>
        </div>
        <p className="text-xs text-[#795548] dark:text-[#BCAAA4] mt-1">
          오늘의 1분 미니 에세이
        </p>
      </button>

      {/* Card 2 Content */}
      {openSteps[2] && (
        <div className="sm:order-5 sm:col-span-3 p-5 rounded-xl border border-[#D5CABD] dark:border-[#4A3B32] bg-white/75 dark:bg-[#3E2723]/40 shadow-sm space-y-3">
          <div className="border-b border-[#D5CABD]/70 dark:border-[#4A3B32] pb-2">
            <span className="text-[11px] font-bold text-[#1B4D3E] dark:text-[#52B788] uppercase tracking-wider">
              Step 2 · Reading
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#3E2723] dark:text-[#EFEBE9] mt-0.5">
              오늘의 1분 미니 에세이
            </h3>
          </div>
          <div className="p-3.5 rounded-lg bg-[#F5F1E7]/70 dark:bg-[#1A1614]/50 border border-[#D5CABD]/60 dark:border-[#4A3B32]/60 space-y-2">
            <p className="text-sm sm:text-base font-semibold leading-relaxed text-[#3E2723] dark:text-[#EFEBE9]">
              &ldquo;A warm cup of coffee and a short walk make my day complete.
              Even small moments become special stories.&rdquo;
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-[#795548] dark:text-[#BCAAA4]">
              (따뜻한 커피 한 잔과 짧은 산책이 나의 하루를 완성합니다. 소소한
              순간도 특별한 이야기가 됩니다.)
            </p>
          </div>
        </div>
      )}

      {/* Card 3 Trigger */}
      <button
        type="button"
        onClick={() => toggleStep(3)}
        aria-expanded={!!openSteps[3]}
        className={`sm:order-3 w-full p-4 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
          openSteps[3]
            ? "border-[#1B4D3E] dark:border-[#2D6A4F] bg-white/80 dark:bg-[#3E2723]/50 shadow-md"
            : "border-[#D5CABD] dark:border-[#4A3B32] bg-white/50 dark:bg-[#3E2723]/30 shadow-sm hover:border-[#8D6E63] dark:hover:border-[#8D6E63]"
        }`}
      >
        <div className="flex items-start justify-between gap-2 w-full">
          <p className="text-sm font-bold text-[#3E2723] dark:text-[#EFEBE9]">
            Step 3. Vocab &amp; Expression (8분)
          </p>
          <span
            className={`text-xs text-[#795548] dark:text-[#BCAAA4] transition-transform duration-200 shrink-0 mt-0.5 ${
              openSteps[3] ? "rotate-180 text-[#1B4D3E] dark:text-[#52B788]" : ""
            }`}
          >
            ▼
          </span>
        </div>
        <p className="text-xs text-[#795548] dark:text-[#BCAAA4] mt-1">
          오늘 건진 필수 표현
        </p>
      </button>

      {/* Card 3 Content */}
      {openSteps[3] && (
        <div className="sm:order-6 sm:col-span-3 p-5 rounded-xl border border-[#D5CABD] dark:border-[#4A3B32] bg-white/75 dark:bg-[#3E2723]/40 shadow-sm space-y-3">
          <div className="border-b border-[#D5CABD]/70 dark:border-[#4A3B32] pb-2">
            <span className="text-[11px] font-bold text-[#1B4D3E] dark:text-[#52B788] uppercase tracking-wider">
              Step 3 · Vocab &amp; Expression
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#3E2723] dark:text-[#EFEBE9] mt-0.5">
              오늘 건진 필수 표현
            </h3>
          </div>
          <ul className="space-y-2.5">
            {expressions.map((item, idx) => (
              <li
                key={idx}
                className="p-3 rounded-lg bg-[#F5F1E7]/70 dark:bg-[#1A1614]/50 border border-[#D5CABD]/60 dark:border-[#4A3B32]/60 text-xs sm:text-sm text-[#3E2723] dark:text-[#EFEBE9]"
              >
                <span className="font-bold text-[#1B4D3E] dark:text-[#52B788] mr-1.5">
                  {item.num} {item.expr}
                </span>
                <span className="text-[#795548] dark:text-[#BCAAA4]">
                  : {item.meaning}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

