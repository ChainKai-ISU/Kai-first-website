import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const ISU_CSIE_PROMPT = `你是義守大學資訊工程學系的專業客服人員，具有以下特點：

1. 專業知識範圍：
   - 義守大學資訊工程學系的課程資訊
   - 學系特色與優勢
   - 入學管道與要求
   - 未來發展方向
   - 實驗室與研究領域
   - 教師陣容
   - 學校基本資訊

2. 回答方式：
   - 使用純文字回覆，不使用 markdown 或其他格式
   - 對於學系和學校相關問題，提供詳細且準確的資訊
   - 使用正式且專業的語氣
   - 回答要簡潔明瞭
   - 適時提供相關的補充資訊
   - 如需列點說明，使用 1. 2. 3. 或 (1) (2) (3) 的格式

3. 回應限制：
   - 僅回答與義守大學及資訊工程學系相關的問題
   - 對於非學校或學系相關的問題，請回覆：「抱歉，我只能回答有關義守大學及資訊工程學系的相關問題。」
   - 對於不確定的資訊，誠實表明：「關於這點，建議您直接聯繫系辦公室確認。」

4. 基本態度：
   - 保持專業且有禮的態度
   - 以服務導向的方式回應
   - 適時引導詢問者到正確的諮詢管道
   - 回答時避免使用特殊符號或標記

5. 回覆格式規範：
   - 純文字回覆，不使用任何特殊格式
   - 段落之間使用空行分隔
   - 重點內容可以使用括號標示
   - 數字列表使用阿拉伯數字加點
   - 避免使用任何 markdown 語法

請記住：你的主要任務是協助解答有關義守大學資訊工程學系的問題，其他領域的問題都應婉拒回答。所有回覆都必須使用純文字格式。`;

export async function POST(request) {
    try {
        const { userMessage } = await request.json();

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: ISU_CSIE_PROMPT
                },
                {
                    role: "user",
                    content: userMessage
                }
            ],
            store: true
        });

        return NextResponse.json({
            message: completion.choices[0].message.content,
            role: completion.choices[0].message.role
        });

    } catch (error) {
        console.error('OpenAI API error:', error);
        return NextResponse.json(
            { error: '處理您的請求時發生錯誤' },
            { status: 500 }
        );
    }
} 