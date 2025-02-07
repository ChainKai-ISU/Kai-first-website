'use client';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // 這裡可以加入表單提交的邏輯
        console.log('Form submitted:', formData);
        alert('感謝您的來信，我們會盡快回覆！');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-green-800 text-center mb-6">聯絡我們</h1>
                <div className="text-center mb-12">
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                        回到首頁
                    </a>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* 聯絡資訊 */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-green-800 mb-6">聯絡資訊</h2>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">📍</span>
                                    <div>
                                        <h3 className="font-semibold text-green-800">地址</h3>
                                        <p className="text-gray-600">台北市教育大道一段100號</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">📧</span>
                                    <div>
                                        <h3 className="font-semibold text-green-800">Email</h3>
                                        <p className="text-gray-600">contact@example.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">📱</span>
                                    <div>
                                        <h3 className="font-semibold text-green-800">Line</h3>
                                        <p className="text-gray-600">@teachingresource</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">⏰</span>
                                    <div>
                                        <h3 className="font-semibold text-green-800">服務時間</h3>
                                        <p className="text-gray-600">週一至週五 9:00-18:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 聯絡表單 */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-green-800 mb-6">傳送訊息</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        姓名
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                        主旨
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        訊息內容
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                                >
                                    送出訊息
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 