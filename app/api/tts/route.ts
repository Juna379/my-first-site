import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get("text")?.trim();

  if (!text || text.length > 500) {
    return new Response("Invalid text", { status: 400 });
  }

  const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
    text
  )}&tl=en&client=tw-ob&ttsspeed=0.9`;

  try {
    const response = await fetch(ttsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      return new Response("Failed to fetch TTS audio", { status: 502 });
    }

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch {
    return new Response("TTS service error", { status: 500 });
  }
}

