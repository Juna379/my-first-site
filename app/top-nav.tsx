"use client";

import Image from "next/image";

type NavSectionKey = "intro" | "keyword" | "steps" | "mission";

const NAV_ITEMS: { key: NavSectionKey; label: string }[] = [
  { key: "intro", label: "소개" },
  { key: "keyword", label: "일상 키워드" },
  { key: "steps", label: "3단계 루틴" },
  { key: "mission", label: "스피킹 미션" },
];

function findSectionElement(key: NavSectionKey): Element | null {
  if (typeof document === "undefined") return null;

  switch (key) {
    case "intro":
      return document.getElementById("hero-section");
    case "keyword":
      return (
        document
          .querySelector('input[aria-label="일상 키워드 입력"]')
          ?.closest("section") ?? null
      );
    case "steps":
      return (
        document.querySelector('button[aria-expanded]')?.parentElement ?? null
      );
    case "mission": {
      const missionSpan = Array.from(document.querySelectorAll("span")).find(
        (el) => el.textContent?.trim() === "Today's Speaking Mission"
      );
      return missionSpan?.closest("div.rounded-lg") ?? null;
    }
  }
}

function scrollToSection(key: NavSectionKey) {
  const target = findSectionElement(key);
  if (!target) return;

  const navOffset = 76;
  const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export default function TopNav() {
  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const navOffset = 76;
      const top =
        contactSection.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      return;
    }

    const openBtn = document.getElementById("open-contact-button");
    openBtn?.click();
  };

  return (
    <nav
      aria-label="상단 내비게이션"
      className="sticky top-0 z-30 w-full border-b border-[#E9E9E7] dark:border-[#2F2F2F] bg-[#FFFFFF]/95 dark:bg-[#191919]/95 backdrop-blur-xs"
    >
      <div className="max-w-2xl md:max-w-[900px] mx-auto px-4 sm:px-8 md:px-12 h-15 flex items-center justify-between gap-3">
        {/* Left: Circular Sprout Character Logo + Brand Title */}
        <button
          type="button"
          onClick={() => scrollToSection("intro")}
          className="flex items-center gap-2.5 text-left cursor-pointer shrink-0"
        >
          <span className="relative w-9 h-9 shrink-0">
            <Image
              src="/character-logo.png"
              alt="친구할까 영어랑 캐릭터 로고"
              fill
              sizes="36px"
              className="object-contain dark:invert"
              priority
            />
          </span>
          <span className="text-sm sm:text-base font-bold tracking-tight text-[#37352F] dark:text-[#FFFFFFCF]">
            친구할까 영어랑
          </span>
        </button>

        {/* Right: Section Links + Action Buttons */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-5 text-sm font-medium text-[#787774] dark:text-[#9B9A97]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => scrollToSection(item.key)}
                className="hover:text-[#37352F] dark:hover:text-[#FFFFFFCF] transition cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleContactClick}
              className="inline-flex items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-full border border-[#E9E9E7] dark:border-[#373737] bg-[#F7F6F3] dark:bg-[#252525] text-xs font-medium text-[#37352F] dark:text-[#FFFFFFCF] hover:bg-[#F1F1EF] dark:hover:bg-[#2F2F2F] transition cursor-pointer"
            >
              <span>문의하기</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("keyword")}
              className="inline-flex items-center gap-1 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#37352F] dark:bg-[#FFFFFFCF] text-xs font-medium text-white dark:text-[#191919] hover:bg-[#2F2D28] dark:hover:bg-white transition cursor-pointer"
            >
              <span>루틴 시작하기</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

