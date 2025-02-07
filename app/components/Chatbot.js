'use client';
import { useState } from 'react';
import { faRobot } from '@fortawesome/free-solid-svg-icons/faRobot';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons/faVolumeHigh';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Update the message styling
const Message = ({ message, isBot }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [isTranslating, setIsTranslating] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioError, setAudioError] = useState('');

    const handleTranslate = async (language) => {
        if (!language) return;
        
        setSelectedLanguage(language);
        setIsTranslating(true);

        try {
            const response = await fetch('/api/translator-ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: message,
                    targetLanguage: language
                })
            });

            const data = await response.json();
            if (response.ok) {
                setTranslatedText(data.translatedText);
            } else {
                console.error('Translation error:', data.error);
                setTranslatedText('翻譯時發生錯誤，請稍後再試。');
            }
        } catch (error) {
            console.error('Translation error:', error);
            setTranslatedText('翻譯時發生錯誤，請稍後再試。');
        } finally {
            setIsTranslating(false);
        }
    };

    const handlePlayAudio = async () => {
        if (isPlaying) return;
        
        setIsPlaying(true);
        setAudioError('');

        try {
            const response = await fetch('/api/tts-ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: message,
                    voice: "alloy"  // 可以根據需求更改聲音
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
                
                audio.onended = () => {
                    setIsPlaying(false);
                };
                
                audio.onerror = () => {
                    setIsPlaying(false);
                    setAudioError('音訊播放失敗');
                };

                await audio.play();
            } else {
                setAudioError(data.error || '語音生成失敗');
                setIsPlaying(false);
            }
        } catch (error) {
            console.error('Audio playback error:', error);
            setAudioError('語音生成失敗');
            setIsPlaying(false);
        }
    };

    return (
        <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
            <div className="max-w-[80%]">
                <div
                    className={`rounded-lg px-4 py-2 ${
                        isBot
                            ? 'bg-indigo-100 text-indigo-900'
                            : 'bg-purple-100 text-purple-900'
                    }`}
                >
                    {message}
                </div>
                
                {isBot && (
                    <div className="mt-2 space-y-2">
                        <div className="flex gap-2 items-center">
                            <select
                                value={selectedLanguage}
                                onChange={(e) => handleTranslate(e.target.value)}
                                className="text-sm px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                disabled={isTranslating}
                            >
                                <option value="">選擇翻譯語言</option>
                                <option value="英文">English</option>
                                <option value="日文">日本語</option>
                                <option value="德文">Deutsch</option>
                                <option value="韓文">한국어</option>
                                <option value="中文">中文</option>
                            </select>

                            <button
                                onClick={handlePlayAudio}
                                disabled={isPlaying}
                                className={`px-2 py-1 rounded text-sm ${
                                    isPlaying 
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                } transition-colors duration-200 flex items-center gap-1`}
                                title="播放語音"
                            >
                                <FontAwesomeIcon 
                                    icon={faVolumeHigh} 
                                    className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`}
                                />
                                {isPlaying ? '播放中...' : '播放語音'}
                            </button>
                        </div>
                        
                        {audioError && (
                            <div className="text-sm text-red-500">
                                {audioError}
                            </div>
                        )}
                        
                        {isTranslating && (
                            <div className="text-sm text-gray-500">
                                翻譯中...
                            </div>
                        )}
                        
                        {translatedText && !isTranslating && (
                            <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-800">
                                {translatedText}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

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
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                title="智慧客服"
            >
                <FontAwesomeIcon 
                    icon={faRobot} 
                    className={`w-6 h-6 ${isOpen ? 'rotate-360' : ''} transition-transform duration-300`}
                />
            </button>

            {/* 聊天視窗 */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-96">
                    <div className="bg-white rounded-lg shadow-lg">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                            <h2 className="text-lg font-semibold">智慧客服</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-gray-200 transition-colors duration-200"
                            >
                                <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                            </button>
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
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
                                    發送
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
} 