'use client';
import { useState } from 'react';

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-semibold text-green-800">{question}</h3>
                <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>
            <div className={`mt-2 text-gray-700 transition-all duration-200 ${isOpen ? 'block' : 'hidden'}`}>
                {answer}
            </div>
        </div>
    );
}

export default function FAQ() {
    const faqs = [
        {
            question: "如何取得教學資源？",
            answer: "您可以在網站的「作品專區」中找到各種教學資源，包括教案、教材和學習單。所有資源都經過精心設計和整理，適合不同程度的學生使用。"
        },
        {
            question: "如何分享我的教學經驗？",
            answer: "我們非常歡迎教師分享教學經驗！您可以透過網站的聯絡方式與我們聯繫，我們會協助您整理和發布您的教學心得。"
        },
        {
            question: "教學資源是否需要付費？",
            answer: "目前網站上的大部分資源都是免費提供的。部分特殊教材或工作坊可能需要付費，但我們會在相關頁面清楚標示。"
        },
        {
            question: "如何參與教師工作坊？",
            answer: "我們定期舉辦線上和實體的教師工作坊，您可以關注網站公告或訂閱我們的電子報，獲得最新活動資訊。報名方式會在活動頁面詳細說明。"
        },
        {
            question: "可以轉載網站內容嗎？",
            answer: "網站內容採用創用CC授權，在註明出處的情況下可以轉載。但若要商業使用，請先與我們聯繫取得授權。"
        },
        {
            question: "如何提供網站改善建議？",
            answer: "我們非常重視使用者的意見！您可以透過網站的聯絡表單或電子郵件提供建議，我們會認真考慮每一個改善建議。"
        },
        {
            question: "網站內容多久更新一次？",
            answer: "我們每週都會更新網站內容，包括新增教學資源、分享教育新知等。重大更新會在首頁公告。"
        },
        {
            question: "忘記密碼怎麼辦？",
            answer: "您可以點擊登入頁面的「忘記密碼」連結，依照指示進行密碼重設。如果仍有問題，請聯繫我們的客服人員。"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-green-800 text-center mb-6">常見問答</h1>
                <div className="text-center mb-12">
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                        回到首頁
                    </a>
                </div>
                
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
                    <p className="text-gray-700 mb-8">
                        以下是我們收集的一些常見問題，如果您有其他問題，歡迎聯繫我們。
                    </p>
                    
                    <div className="space-y-2">
                        {faqs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-green-50 rounded-lg">
                        <h2 className="text-xl font-bold text-green-800 mb-4">還有其他問題？</h2>
                        <p className="text-gray-700">
                            如果您在上面沒有找到想要的答案，歡迎透過以下方式聯繫我們：
                        </p>
                        <ul className="mt-4 space-y-2 text-gray-700">
                            <li>📧 Email：contact@example.com</li>
                            <li>📱 Line：@teachingresource</li>
                            <li>⏰ 服務時間：週一至週五 9:00-18:00</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
} 