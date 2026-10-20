import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !contactEmail) {
    return NextResponse.json(
      { error: "버셀(또는 .env)에 RESEND_API_KEY · CONTACT_EMAIL 이 있는지 확인하세요" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "이름, 이메일, 문의 내용을 모두 입력해 주세요." },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: contactEmail,
      replyTo: email,
      subject: `[문의사항] ${name}님의 새로운 문의`,
      text: `이름: ${name}\n이메일: ${email}\n\n문의 내용:\n${message}`,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "메일 전송에 실패했습니다." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "메일 전송 중 오류가 발생했습니다.";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
