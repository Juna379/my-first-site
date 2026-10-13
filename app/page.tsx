import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 bg-[#F5F1E7] dark:bg-[#2A2421] text-[#4A3B32] dark:text-[#E8E4DF]">
      <div className="max-w-2xl w-full text-center space-y-8 sm:space-y-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D5CABD] dark:border-[#4A3B32] bg-white/60 dark:bg-black/30 backdrop-blur-sm text-xs font-medium text-[#7B5C4D] dark:text-[#BCAAA4] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-500 animate-pulse"></span>
          프로젝트 준비 완료
        </div>

        {/* Header */}
        <div className="space-y-6 sm:space-y-8 flex flex-col items-center text-center w-full px-2 sm:px-0">
          <h1 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight text-balance break-words text-[#3E2723] dark:text-[#EFEBE9]">
            안녕하세요, <span className="text-[#1B4D3E] dark:text-[#2D6A4F]">서주형</span>입니다
          </h1>
          
          <Image
            src="/tree.jpg"
            alt="나무 그림"
            width={160}
            height={160}
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover shadow-lg border-4 border-white dark:border-[#4A3B32] shrink-0"
            priority
          />

          <p className="text-[0.95rem] sm:text-lg lg:text-xl text-[#5D4037] dark:text-[#D7CCC8] max-w-lg font-medium leading-relaxed text-balance break-words">
            내 하루의 이야기가 가장 생생한 영어 문장이 됩니다
          </p>
          <p className="-mt-4 sm:-mt-6 text-[0.95rem] sm:text-lg lg:text-xl text-[#5D4037] dark:text-[#D7CCC8] max-w-lg font-medium leading-relaxed text-balance break-words">
            방문해 주셔서 감사합니다, 만나서 반가워요!
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-[#D5CABD] dark:border-[#4A3B32] bg-white/50 dark:bg-[#3E2723]/30 shadow-sm hover:border-[#8D6E63] dark:hover:border-[#8D6E63] transition">
            <p className="text-sm font-bold text-[#3E2723] dark:text-[#EFEBE9]">Next.js App Router</p>
            <p className="text-xs text-[#795548] dark:text-[#BCAAA4] mt-1">최신 앱 라우터 기반 구조</p>
          </div>
          <div className="p-4 rounded-xl border border-[#D5CABD] dark:border-[#4A3B32] bg-white/50 dark:bg-[#3E2723]/30 shadow-sm hover:border-[#8D6E63] dark:hover:border-[#8D6E63] transition">
            <p className="text-sm font-bold text-[#3E2723] dark:text-[#EFEBE9]">TypeScript</p>
            <p className="text-xs text-[#795548] dark:text-[#BCAAA4] mt-1">엄격하고 안전한 타입 검사</p>
          </div>
          <div className="p-4 rounded-xl border border-[#D5CABD] dark:border-[#4A3B32] bg-white/50 dark:bg-[#3E2723]/30 shadow-sm hover:border-[#8D6E63] dark:hover:border-[#8D6E63] transition">
            <p className="text-sm font-bold text-[#3E2723] dark:text-[#EFEBE9]">Tailwind CSS</p>
            <p className="text-xs text-[#795548] dark:text-[#BCAAA4] mt-1">유연하고 빠른 유틸리티 스타일</p>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="p-4 rounded-xl bg-[#3E2723] text-[#EFEBE9] dark:bg-[#1A1614] dark:border dark:border-[#3E2723] text-left font-mono text-xs sm:text-sm space-y-2 shadow-md">
          <div className="flex items-center justify-between text-[#BCAAA4] border-b border-[#5D4037] pb-2">
            <span>PowerShell 실행 명령어</span>
            <span className="text-[11px] text-[#A1887F]">Local Dev Server</span>
          </div>
          <p className="text-amber-400 select-all">$ npm run dev</p>
        </div>
      </div>
    </main>
  );
}
