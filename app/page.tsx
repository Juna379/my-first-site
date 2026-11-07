import Image from "next/image";
import ContactForm from "./contact-form";
import DailyRoutine from "./daily-routine";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 bg-[#F5F1E7] dark:bg-[#2A2421] text-[#4A3B32] dark:text-[#E8E4DF]">
      <div className="max-w-2xl w-full text-center space-y-8 sm:space-y-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D5CABD] dark:border-[#4A3B32] bg-white/60 dark:bg-black/30 backdrop-blur-sm text-xs font-medium text-[#7B5C4D] dark:text-[#BCAAA4] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-500 animate-pulse"></span>
          오늘의 30분 루틴
        </div>

        {/* Header */}
        <div className="space-y-6 sm:space-y-8 flex flex-col items-center text-center w-full px-2 sm:px-0">
          <h1 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight text-balance break-words text-[#3E2723] dark:text-[#EFEBE9]">
            친구할까 영어랑
          </h1>
          
          <Image
            src="/tree.jpg"
            alt="나무 그림"
            width={160}
            height={160}
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover shadow-lg border-4 border-white dark:border-[#4A3B32] shrink-0"
            priority
          />

          <div className="max-w-xl mx-auto pt-2 pb-1 space-y-3 break-keep">
            <p className="text-xl sm:text-2xl font-bold tracking-tight leading-snug text-[#3E2723] dark:text-[#EFEBE9]">
              내 하루의 이야기가 가장 생생한 영어 문장이 됩니다
            </p>
            <p className="text-sm sm:text-base font-normal leading-relaxed text-[#3D2B1F]/80 dark:text-[#D7CCC8]/80">
              매일 30분, 내 소소한 일상이 가장 확실한 영어 회화가 되는 곳.{" "}
              <br className="hidden sm:inline" />
              오늘의 데일리 루틴을 확인해 보세요!
            </p>
          </div>
        </div>

        {/* Daily Routine Accordion Cards */}
        <DailyRoutine />

        {/* Today's Speaking Mission */}
        <div className="p-4 rounded-xl bg-[#3E2723] text-[#EFEBE9] dark:bg-[#1A1614] dark:border dark:border-[#3E2723] text-left font-mono text-xs sm:text-sm space-y-2 shadow-md">
          <div className="flex items-center justify-between text-[#BCAAA4] border-b border-[#5D4037] pb-2">
            <span className="font-bold text-[#EFEBE9]">Today&apos;s Speaking Mission</span>
            <span className="text-[11px] text-[#A1887F]">오늘의 한 줄 스피킹 미션</span>
          </div>
          <p className="text-amber-400 font-semibold text-sm sm:text-base select-all">
            &ldquo;It&apos;s a perfect day for a quiet walk with a warm cup of coffee.&rdquo;
          </p>
          <p className="text-xs text-[#D7CCC8] font-sans">
            (소리 내어 3번 읽어보세요! 입술 근육이 기억합니다.)
          </p>
        </div>

        <p className="text-sm sm:text-base font-medium text-[#C84726]">
          오늘의 30분 영어 루틴을 완료했어요! 🎉
        </p>

        {/* Inquiry Form */}
        <ContactForm />
      </div>
    </main>
  );
}
