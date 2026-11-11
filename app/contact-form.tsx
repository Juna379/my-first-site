"use client";

import { useState, useEffect } from "react";

const inputClass =
  "w-full rounded-md border border-[#E9E9E7] dark:border-[#373737] bg-[#FFFFFF] dark:bg-[#191919] px-3.5 py-2.5 text-sm text-[#37352F] dark:text-[#FFFFFFCF] placeholder:text-[#9B9A97] outline-none transition focus:border-[#2383E2] focus:ring-2 focus:ring-[#2383E2]/20 aria-[invalid=true]:border-[#EB5757]";

export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

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
          (typeof data === "string"
            ? data
            : `오류가 발생했습니다 (${res.status})`);
        setFeedbackMessage(errMsg);
      }
    } catch (err: unknown) {
      setStatus("error");
      const errMsg =
        err instanceof Error ? err.message : "전송 중 오류가 발생했습니다.";
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
      <div className="pt-2 border-t border-[#E9E9E7] dark:border-[#2F2F2F] flex justify-center w-full">
        <button
          id="open-contact-button"
          type="button"
          onClick={() => setIsOpen(true)}
          className="group mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-[#37352F] dark:bg-[#FFFFFFCF] px-5 py-2.5 text-sm font-medium text-white dark:text-[#191919] transition hover:bg-[#2F2D28] dark:hover:bg-white cursor-pointer"
        >
          <span>✉️</span>
          <span>문의사항 남기기</span>
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>
    );
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="w-full text-left rounded-lg border border-[#E9E9E7] dark:border-[#2F2F2F] bg-[#F7F6F3] dark:bg-[#202020] p-5 sm:p-6 transition-all"
    >
      <div className="mb-5 flex items-start justify-between gap-4 border-b border-[#E9E9E7] dark:border-[#2F2F2F] pb-3.5">
        <div className="space-y-0.5">
          <h2
            id="contact-title"
            className="text-base sm:text-lg font-semibold tracking-tight text-[#37352F] dark:text-[#FFFFFFCF]"
          >
            문의사항 남기기
          </h2>
          <p className="text-xs sm:text-sm text-[#787774] dark:text-[#9B9A97]">
            궁금한 점이나 하고 싶은 말을 자유롭게 남겨 주세요.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-xs font-medium text-[#787774] dark:text-[#9B9A97] hover:text-[#37352F] dark:hover:text-[#FFFFFFCF] px-2.5 py-1 rounded-md border border-[#E9E9E7] dark:border-[#373737] bg-[#FFFFFF] dark:bg-[#252525] hover:bg-[#F1F1EF] dark:hover:bg-[#2F2F2F] transition shrink-0 cursor-pointer"
        >
          닫기 ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="contact-name"
              className="text-xs sm:text-sm font-medium text-[#37352F] dark:text-[#FFFFFFCF]"
            >
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
                if (errors.name)
                  setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="홍길동"
              required
              aria-invalid={!!errors.name}
              aria-describedby="contact-name-error"
              className={inputClass}
            />
            <p
              id="contact-name-error"
              className="min-h-4 text-xs text-[#EB5757]"
            >
              {errors.name}
            </p>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="contact-email"
              className="text-xs sm:text-sm font-medium text-[#37352F] dark:text-[#FFFFFFCF]"
            >
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
                if (errors.email)
                  setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="you@example.com"
              required
              aria-invalid={!!errors.email}
              aria-describedby="contact-email-error"
              className={inputClass}
            />
            <p
              id="contact-email-error"
              className="min-h-4 text-xs text-[#EB5757]"
            >
              {errors.email}
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="contact-message"
              className="text-xs sm:text-sm font-medium text-[#37352F] dark:text-[#FFFFFFCF]"
            >
              문의 내용
            </label>
            <span className="text-xs text-[#787774] tabular-nums">
              {message.length} / 1000
            </span>
          </div>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message)
                setErrors((prev) => ({ ...prev, message: undefined }));
            }}
            name="message"
            rows={5}
            maxLength={1000}
            placeholder="문의하실 내용을 적어 주세요."
            required
            aria-invalid={!!errors.message}
            aria-describedby="contact-message-error"
            className={`${inputClass} resize-y min-h-28`}
          />
          <p
            id="contact-message-error"
            className="min-h-4 text-xs text-[#EB5757]"
          >
            {errors.message}
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
          <p
            aria-live="polite"
            className={`text-sm font-medium ${
              status === "success"
                ? "text-[#448361] dark:text-[#65A983]"
                : "text-[#EB5757]"
            }`}
          >
            {feedbackMessage}
          </p>
          <button
            id="contact-submit"
            type="submit"
            disabled={pending}
            className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#37352F] dark:bg-[#FFFFFFCF] px-5 py-2.5 text-sm font-medium text-white dark:text-[#191919] transition hover:bg-[#2F2D28] dark:hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {pending ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                보내는 중...
              </>
            ) : (
              <>
                문의 보내기
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
