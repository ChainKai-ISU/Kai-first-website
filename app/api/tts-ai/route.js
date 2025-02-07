import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {
    try {
        const { text, voice = "alloy" } = await request.json();

        if (!text) {
            return NextResponse.json(
                { error: '請提供要轉換的文字' },
                { status: 400 }
            );
        }

        // 支援的聲音類型檢查
        const validVoices = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"];
        if (!validVoices.includes(voice)) {
            return NextResponse.json(
                { error: '不支援的聲音類型' },
                { status: 400 }
            );
        }

        // 使用 OpenAI 的 TTS API 生成語音
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: voice,
            input: text,
        });

        // 將音訊轉換為 base64
        const buffer = Buffer.from(await mp3.arrayBuffer());
        const base64Audio = buffer.toString('base64');

        return NextResponse.json({
            audio: base64Audio,
            format: 'mp3',
            voice: voice
        });

    } catch (error) {
        console.error('TTS API error:', error);
        return NextResponse.json(
            { error: '語音生成時發生錯誤' },
            { status: 500 }
        );
    }
} 