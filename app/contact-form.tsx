"use client";

import { useState, useEffect } from "react";

const inputClass =
  "w-full rounded-xl border border-[#D5CABD] dark:border-[#4A3B32] bg-white/70 dark:bg-[#1A1614]/60 px-4 py-3 text-sm sm:text-base text-[#3E2723] dark:text-[#EFEBE9] placeholder:text-[#A1887F] shadow-sm outline-none transition focus:border-[#1B4D3E] dark:focus:border-[#2D6A4F] focus:ring-4 focus:ring-[#1B4D3E]/15 dark:focus:ring-[#2D6A4F]/25 aria-[invalid=true]:border-[#C84726]";

export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) newErrors.name = "이름을 입력해 주세요.";
    if (!email.trim()) newErrors.email = "이메일을 입력해 주세요.";
    if (!message.trim()) newErrors.message = "문의 내용을 입력해 주세요.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setPending(true);
    setStatus("idle");
    setFeedbackMessage("");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setStatus("success");
        setFeedbackMessage("보냈어요!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        const errMsg =
          data?.error ||
          (typeof data === "string" ? data : `오류가 발생했습니다 (${res.status})`);
        setFeedbackMessage(errMsg);
      }
    } catch (err: unknown) {
      setStatus("error");
      const errMsg = err instanceof Error ? err.message : "전송 중 오류가 발생했습니다.";
      setFeedbackMessage(errMsg);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const el = document.getElementById("contact");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isOpen]);

  if (!isOpen) {
    return (
      <div className="pt-2 flex justify-center w-full">
        <button
          id="open-contact-button"
          type="button"
          onClick={() => setIsOpen(true)}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#1B4D3E] dark:bg-[#2D6A4F] px-8 py-3.5 text-base sm:text-lg font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#153D31] hover:shadow-lg active:translate-y-0"
        >
          <span className="text-xl">✉️</span>
          <span>문의사항 남기기</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    );
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="w-full text-left rounded-2xl border border-[#D5CABD] dark:border-[#4A3B32] bg-white/50 dark:bg-[#3E2723]/30 backdrop-blur-sm p-5 sm:p-8 shadow-md transition-all"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h2
            id="contact-title"
            className="text-xl sm:text-2xl font-black tracking-tight text-[#3E2723] dark:text-[#EFEBE9]"
          >
            문의사항 남기기
          </h2>
          <p className="text-sm text-[#795548] dark:text-[#BCAAA4]">
            궁금한 점이나 하고 싶은 말을 자유롭게 남겨 주세요.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-xs sm:text-sm font-semibold text-[#795548] dark:text-[#BCAAA4] hover:text-[#3E2723] dark:hover:text-[#EFEBE9] px-3 py-1.5 rounded-lg border border-[#D5CABD] dark:border-[#4A3B32] hover:bg-black/5 dark:hover:bg-white/5 transition shrink-0"
        >
          닫기 ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="contact-name" className="text-sm font-bold text-[#4A3B32] dark:text-[#D7CCC8]">
              이름
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={50}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="홍길동"
              required
              aria-invalid={!!errors.name}
              aria-describedby="contact-name-error"
              className={inputClass}
            />
            <p id="contact-name-error" className="min-h-4 text-xs text-[#C84726]">
              {errors.name}
            </p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-email" className="text-sm font-bold text-[#4A3B32] dark:text-[#D7CCC8]">
              이메일
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="you@example.com"
              required
              aria-invalid={!!errors.email}
              aria-describedby="contact-email-error"
              className={inputClass}
            />
            <p id="contact-email-error" className="min-h-4 text-xs text-[#C84726]">
              {errors.email}
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="contact-message" className="text-sm font-bold text-[#4A3B32] dark:text-[#D7CCC8]">
              문의 내용
            </label>
            <span className="text-xs text-[#A1887F] tabular-nums">{message.length} / 1000</span>
          </div>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
            }}
            name="message"
            rows={5}
            maxLength={1000}
            placeholder="문의하실 내용을 적어 주세요."
            required
            aria-invalid={!!errors.message}
            aria-describedby="contact-message-error"
            className={`${inputClass} resize-y min-h-32`}
          />
          <p id="contact-message-error" className="min-h-4 text-xs text-[#C84726]">
            {errors.message}
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
          <p
            aria-live="polite"
            className={`text-sm font-medium ${
              status === "success"
                ? "text-[#1B4D3E] dark:text-[#52B788]"
                : "text-[#C84726]"
            }`}
          >
            {feedbackMessage}
          </p>
          <button
            id="contact-submit"
            type="submit"
            disabled={pending}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#1B4D3E] dark:bg-[#2D6A4F] px-6 py-3 text-sm sm:text-base font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#153D31] hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {pending ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                보내는 중...
              </>
            ) : (
              <>
                문의 보내기
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
