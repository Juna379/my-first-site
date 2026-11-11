import Image from "next/image";
import ContactForm from "./contact-form";
import DailyRoutine from "./daily-routine";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center py-10 sm:py-16 px-4 sm:px-8 bg-[#FFFFFF] dark:bg-[#191919] text-[#37352F] dark:text-[#FFFFFFCF]">
      <div className="max-w-2xl w-full space-y-6 sm:space-y-8">
        {/* Notion Page Header & Rectangular Photo Collage */}
        <header className="space-y-4 text-left border-b border-[#E9E9E7] dark:border-[#2F2F2F] pb-6">
          {/* Top Routine Tag Badge (Notion Style) */}
          <div className="flex items-center justify-start">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F1F1EF] dark:bg-[#252525] text-xs font-medium text-[#787774] dark:text-[#9B9A97]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#448361]" />
              <span>Today&apos;s 30-Minute Routine</span>
            </div>
          </div>

          {/* 2-Column Hero Split: Straight Rectangular 4-Photo Collage + Typography */}
          <div className="grid grid-cols-1 sm:grid-cols-[205px_1fr] items-center gap-5 sm:gap-6 pt-1">
            {/* Left: Straight Rectangular 4-Photo Collage (No Tilt, Fits Outer Frame) */}
            <div className="mx-auto sm:mx-0 w-[220px] h-[175px] sm:w-[205px] sm:h-[165px] overflow-hidden rounded-lg border border-[#E9E9E7] dark:border-[#2F2F2F] bg-[#F7F6F3] dark:bg-[#202020] p-1.5 grid grid-rows-[48%_1fr] gap-1.5 shrink-0">
              <div className="grid grid-cols-[56%_1fr] gap-1.5 min-h-0">
                <div className="relative w-full h-full overflow-hidden rounded-sm bg-[#FFFFFF] dark:bg-[#252525]">
                  <Image
                    src="/hero-lantern.jpg"
                    alt="밤하늘 아래 은은하게 빛나는 전통 등불 풍경"
                    fill
                    sizes="120px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="relative w-full h-full overflow-hidden rounded-sm bg-[#FFFFFF] dark:bg-[#252525]">
                  <Image
                    src="/tree.jpg"
                    alt="연필로 정성스럽게 그린 나무 스케치"
                    fill
                    sizes="100px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="grid grid-cols-[45%_1fr] gap-1.5 min-h-0">
                <div className="relative w-full h-full overflow-hidden rounded-sm bg-[#FFFFFF] dark:bg-[#252525]">
                  <Image
                    src="/hero-brunch.jpg"
                    alt="햇살 좋은 카페에서의 여유로운 브런치 테이블"
                    fill
                    sizes="100px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="relative w-full h-full overflow-hidden rounded-sm bg-[#FFFFFF] dark:bg-[#252525]">
                  <Image
                    src="/hero-flight.jpg"
                    alt="비행기 창문 너머로 보이는 푸른 하늘과 구름"
                    fill
                    sizes="120px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right: Hero Title, Korean Subtitle & English Serif Tagline */}
            <div className="text-center sm:text-left space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-[#37352F] dark:text-[#FFFFFFCF]">
                친구할까 영어랑
              </h1>
              <p className="text-sm sm:text-base font-medium leading-relaxed text-[#787774] dark:text-[#9B9A97] break-keep">
                매일 30분, 내 소소한 일상이 가장 확실한 영어 회화가 되는 곳.
              </p>
              <p className="font-serif italic text-xs sm:text-sm text-[#787774] dark:text-[#9B9A97]">
                My Everyday Life, My English Story.
              </p>
            </div>
          </div>

          {/* Notion Callout Block */}
          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-lg bg-[#F7F6F3] dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] text-sm sm:text-[15px] leading-relaxed text-[#37352F] dark:text-[#FFFFFFCF] break-keep">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 shrink-0 text-[#787774] dark:text-[#9B9A97]"
              aria-hidden="true"
            >
              <path d="M5 11h11v4a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5v-4Z" />
              <path d="M16 12h1.5a2.5 2.5 0 0 1 0 5H16" />
              <path d="M4 20h14" />
              <path d="M8.5 7.5c0-1 .8-1.4.8-2.5" />
              <path d="M12 7.5c0-1 .8-1.4.8-2.5" />
            </svg>
            <span
              className="h-4 w-px bg-[#E9E9E7] dark:bg-[#373737] shrink-0"
              aria-hidden="true"
            />
            <span>내 하루의 이야기가 가장 생생한 영어 문장이 됩니다.</span>
          </div>
        </header>

        {/* Daily Routine Keyword Input, Accordion Cards & Speaking Mission */}
        <DailyRoutine />

        {/* Inquiry Form */}
        <ContactForm />
      </div>
    </main>
  );
}
