import Image from "next/image";
import ContactForm from "./contact-form";
import DailyRoutine from "./daily-routine";
import TopNav from "./top-nav";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] dark:bg-[#191919] text-[#37352F] dark:text-[#FFFFFFCF]">
      <TopNav />
      <main className="flex-1 flex flex-col items-center py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12">
        <div className="max-w-2xl md:max-w-[900px] w-full space-y-6 sm:space-y-8 md:space-y-10">
          {/* Notion Page Header & Rectangular Photo Collage */}
          <header
            id="hero-section"
            className="space-y-4 md:space-y-5 text-left border-b border-[#E9E9E7] dark:border-[#2F2F2F] pb-6 md:pb-8"
          >
          {/* Top Routine Tag Badge (Notion Style) */}
          <div className="flex items-center justify-center sm:justify-start">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F1F1EF] dark:bg-[#252525] text-xs font-medium text-[#787774] dark:text-[#9B9A97]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#448361]" />
              <span>Today&apos;s 30-Minute Routine</span>
            </div>
          </div>

          {/* 2-Column Hero Split: Straight Rectangular 4-Photo Collage + Typography */}
          <div className="grid grid-cols-1 sm:grid-cols-[205px_1fr] md:grid-cols-[240px_1fr] items-center gap-5 sm:gap-6 md:gap-8 pt-1">
            {/* Left: Straight Rectangular 4-Photo Collage (No Tilt, Fits Outer Frame) */}
            <div className="mx-auto sm:mx-0 w-[220px] h-[175px] sm:w-[205px] sm:h-[165px] md:w-[240px] md:h-[192px] overflow-hidden rounded-lg border border-[#E9E9E7] dark:border-[#2F2F2F] bg-[#F7F6F3] dark:bg-[#202020] p-1.5 grid grid-rows-[48%_1fr] gap-1.5 shrink-0">
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

            {/* Right: Hero Title, English Serif Tagline & Korean Subtitle */}
            <div className="text-center sm:text-left space-y-2.5">
              <h1 className="text-[21px] sm:text-3xl font-bold tracking-tight leading-snug text-[#37352F] dark:text-[#FFFFFFCF] break-keep">
                매일 30분, 내 소소한 일상이
                <br />
                가장 확실한 영어 회화가 되는 곳.
              </h1>
              <p className="font-serif italic text-xs sm:text-sm text-[#787774] dark:text-[#9B9A97]">
                My Everyday Life, My English Story.
              </p>
              <p className="text-xs sm:text-sm font-medium leading-relaxed text-[#787774] dark:text-[#9B9A97] break-keep">
                내 하루의 이야기가 가장 생생한 영어 문장이 됩니다.
              </p>
            </div>
          </div>
        </header>

        {/* Daily Routine Keyword Input, Accordion Cards & Speaking Mission */}
        <DailyRoutine />

        {/* Inquiry Form */}
        <ContactForm />
        </div>
      </main>
    </div>
  );
}
