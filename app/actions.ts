"use server";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: {
    name?: string;
    email?: string;
    message?: string;
  };
  fields?: {
    name: string;
    email: string;
    message: string;
  };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitInquiry(
  _prevState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: InquiryState["errors"] = {};
  if (!name) errors.name = "이름을 입력해 주세요.";
  else if (name.length > 50) errors.name = "이름은 50자 이내로 입력해 주세요.";

  if (!email) errors.email = "이메일을 입력해 주세요.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "올바른 이메일 형식이 아니에요.";

  if (!message) errors.message = "문의 내용을 입력해 주세요.";
  else if (message.length < 5) errors.message = "문의 내용을 5자 이상 입력해 주세요.";
  else if (message.length > 1000) errors.message = "문의 내용은 1000자 이내로 입력해 주세요.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "입력 내용을 다시 확인해 주세요.",
      errors,
      fields: { name, email, message },
    };
  }

  // TODO: 실제 저장/전송 로직 연결 (예: 이메일 발송 서비스, 데이터베이스 등)
  // 현재는 서버 로그(터미널 / 배포 서비스 로그)에 문의 내용을 기록합니다.
  console.log("[문의 접수]", {
    name,
    email,
    message,
    receivedAt: new Date().toISOString(),
  });

  return {
    status: "success",
    message: `${name}님, 문의가 접수되었어요. 빠르게 답변드릴게요!`,
  };
}
