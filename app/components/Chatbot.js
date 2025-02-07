'use client';
import { useState } from 'react';
import { faRobot } from '@fortawesome/free-solid-svg-icons/faRobot';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Update the message styling
const Message = ({ message, isBot }) => (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
        <div
            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                isBot
                    ? 'bg-indigo-100 text-indigo-900'
                    : 'bg-purple-100 text-purple-900'
            }`}
        >
            {message}
        </div>
    </div>
);

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
        <div className="fixed bottom-4 right-4 w-96">
            <div className="bg-white rounded-lg shadow-lg">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-lg">
                    <h2 className="text-lg font-semibold">智慧客服</h2>
                </div>
                
                <div className="h-96 p-4 overflow-y-auto bg-gray-50">
                    {messages.map((msg) => (
                        <Message
                            key={msg.id}
                            message={msg.text}
                            isBot={msg.isBot}
                        />
                    ))}
                    {isLoading && (
                        <div className="flex justify-start mb-4">
                            <div className="bg-indigo-100 text-indigo-900 rounded-lg px-4 py-2">
                                思考中...
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="p-4 border-t">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="請輸入您的問題..."
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            發送
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 