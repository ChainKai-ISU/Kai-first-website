export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-green-800 text-center mb-6">關於本站</h1>
                <div className="text-center mb-12">
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                        回到首頁
                    </a>
                </div>
                
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-green-700">網站宗旨</h2>
                        <p className="text-gray-700 leading-relaxed">
                            本網站致力於提供優質的教育資源和經驗分享平台，希望能夠連結更多對教育充滿熱情的教師，
                            共同建立一個互相學習、成長的專業社群。
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-green-700">網站特色</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-green-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-green-800 mb-3">創新教學資源</h3>
                                <p className="text-gray-700">提供多元化的教學資源，包含教案設計、教材分享、教學策略等。</p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-green-800 mb-3">經驗交流平台</h3>
                                <p className="text-gray-700">分享教學心得與實務經驗，促進教師間的專業對話與交流。</p>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-green-800 mb-3">教育新知分享</h3>
                                <p className="text-gray-700">定期更新教育相關新知，掌握最新教育趨勢與發展。</p>
                            </div>
                            <div className="bg-yellow-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-green-800 mb-3">教學成果展示</h3>
                                <p className="text-gray-700">展示優秀的教學案例與學生作品，分享教學成功經驗。</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-green-700">未來展望</h2>
                        <p className="text-gray-700 leading-relaxed">
                            我們期待能持續擴充網站內容，提供更多元化的教育資源，並建立更完善的互動機制。
                            同時，我們也計畫舉辦更多線上和實體的教育工作坊，促進教育工作者之間的交流與成長。
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-green-700">聯絡資訊</h2>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <p className="text-gray-700 mb-2">📧 Email：contact@example.com</p>
                            <p className="text-gray-700 mb-2">📱 Line：@teachingresource</p>
                            <p className="text-gray-700">💬 Facebook：教育資源分享平台</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
} 