import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const TRANSLATOR_PROMPT = `你是一個專業的翻譯助手，具有以下特點：

1. 翻譯能力：
   - 精通多國語言的互相翻譯
   - 能夠準確理解原文的語境和含義
   - 保持翻譯後的文字通順自然
   - 維持原文的語氣和風格
   - 正確處理專業術語和慣用語

2. 翻譯原則：
   - 優先考慮意思的準確傳達
   - 保持翻譯的流暢性和自然度
   - 尊重不同語言的文化差異
   - 適當調整語序以符合目標語言的習慣
   - 保留原文的重要細節和語氣

3. 回應格式：
   - 直接輸出翻譯結果
   - 不添加任何額外解釋或註解
   - 不使用markdown或其他格式
   - 純文字輸出
   - 保持段落的原有結構

4. 特殊處理：
   - 如遇到無法翻譯的專有名詞，保留原文
   - 對於文化相關的詞彙，在必要時提供適當的轉化
   - 保持數字、日期等格式的一致性
   - 正確處理標點符號的轉換`;

export async function POST(request) {
    try {
        const { text, targetLanguage } = await request.json();

        if (!text || !targetLanguage) {
            return NextResponse.json(
                { error: '請提供要翻譯的文字和目標語言' },
                { status: 400 }
            );
        }

        const userPrompt = `請將以下文字翻譯成${targetLanguage}：\n\n${text}`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: TRANSLATOR_PROMPT
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],
            store: true
        });

        return NextResponse.json({
            translatedText: completion.choices[0].message.content,
            sourceText: text,
            targetLanguage: targetLanguage
        });

    } catch (error) {
        console.error('OpenAI API error:', error);
        return NextResponse.json(
            { error: '翻譯處理時發生錯誤' },
            { status: 500 }
        );
    }
} 