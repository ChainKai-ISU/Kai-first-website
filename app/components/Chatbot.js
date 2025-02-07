'use client';
import { useState } from 'react';
import { faRobot } from '@fortawesome/free-solid-svg-icons/faRobot';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { 
            id: 1, 
            text: '您好！我是義守大學資訊工程學系的客服助理。我可以為您解答任何關於本系或學校的問題，例如課程資訊、入學管道、未來發展等。請問有什麼我可以協助您的嗎？', 
            isBot: true 
        }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || isLoading) return;

        // 添加使用者訊息
        const userMessage = {
            id: Date.now(),
            text: newMessage,
            isBot: false
        };
        
        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');
        setIsLoading(true);

        try {
            // 呼叫 API
            const response = await fetch('/api/chat-ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userMessage: newMessage
                })
            });

            const data = await response.json();

            if (response.ok) {
                // 添加 AI 回覆
                const botMessage = {
                    id: Date.now() + 1,
                    text: data.message,
                    isBot: true
                };
                setMessages(prev => [...prev, botMessage]);
            } else {
                // 處理錯誤
                const errorMessage = {
                    id: Date.now() + 1,
                    text: data.error || '抱歉，我現在無法回應，請稍後再試。',
                    isBot: true,
                    isError: true
                };
                setMessages(prev => [...prev, errorMessage]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            // 添加錯誤訊息
            const errorMessage = {
                id: Date.now() + 1,
                text: '抱歉，發生了一些技術問題，請稍後再試。',
                isBot: true,
                isError: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* 聊天機器人按鈕 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-green-600 text-white p-4 rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-200"
            >
                <FontAwesomeIcon icon={faRobot} className="w-6 h-6" />
            </button>

            {/* 聊天視窗 */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-96 bg-green-50 rounded-lg shadow-xl">
                    {/* 視窗標題 */}
                    <div className="flex justify-between items-center p-4 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-t-lg">
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faRobot} className="w-5 h-5" />
                            <span className="font-medium">義守資工系客服</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200 transition-colors duration-200"
                        >
                            <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                        </button>
                    </div>

                    {/* 訊息區域 */}
                    <div className="h-96 overflow-y-auto p-4 space-y-4">
                        {messages.map(message => (
                            <div
                                key={message.id}
                                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 ${
                                        message.isBot
                                            ? 'bg-gradient-to-br from-green-500 to-green-700 text-white rounded-tr-lg rounded-tl-lg rounded-br-lg'
                                            : 'bg-gradient-to-br from-green-500 to-green-700 text-white rounded-tr-lg rounded-tl-lg rounded-bl-lg'
                                    } ${message.isError ? 'from-red-500 to-red-700' : ''}`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 text-gray-600 p-3 rounded-lg">
                                    正在思考...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 輸入區域 */}
                    <form onSubmit={handleSubmit} className="p-4 border-t border-green-200">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="輸入訊息..."
                                disabled={isLoading}
                                className="flex-1 px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-200 inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
                                送出
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
} 