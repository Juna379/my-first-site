import Image from "next/image";
import ContactForm from "./contact-form";
import DailyRoutine from "./daily-routine";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center py-10 sm:py-16 px-4 sm:px-8 bg-[#FFFFFF] dark:bg-[#191919] text-[#37352F] dark:text-[#FFFFFFCF]">
      <div className="max-w-2xl w-full space-y-6 sm:space-y-8">
        {/* Notion Page Header & Icon */}
        <header className="space-y-4 text-left border-b border-[#E9E9E7] dark:border-[#2F2F2F] pb-6">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F1F1EF] dark:bg-[#252525] text-xs font-medium text-[#787774] dark:text-[#9B9A97]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#448361]"></span>
              오늘의 30분 루틴
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
            <Image
              src="/tree.jpg"
              alt="나무 그림"
              width={160}
              height={160}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#E9E9E7] dark:border-[#2F2F2F] shrink-0"
              priority
            />
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-[#37352F] dark:text-[#FFFFFFCF]">
                친구할까 영어랑
              </h1>
              <p className="text-sm sm:text-base font-medium text-[#787774] dark:text-[#9B9A97] break-keep">
                내 하루의 이야기가 가장 생생한 영어 문장이 됩니다
              </p>
            </div>
          </div>

          {/* Notion Callout Block for Intro */}
          <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-lg bg-[#F7F6F3] dark:bg-[#202020] border border-[#E9E9E7] dark:border-[#2F2F2F] text-sm sm:text-[15px] leading-relaxed text-[#37352F] dark:text-[#FFFFFFCF] break-keep">
            <span className="text-base sm:text-lg select-none shrink-0 mt-0.5">
              💡
            </span>
            <p>
              매일 30분, 내 소소한 일상이 가장 확실한 영어 회화가 되는 곳.{" "}
              <br className="hidden sm:inline" />
              오늘의 데일리 루틴을 확인해 보세요!
            </p>
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
