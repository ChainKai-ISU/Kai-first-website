export default function Home() {
    return (
        <>
            <header className="bg-gradient-to-br from-indigo-200 to-purple-200 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-indigo-800">
                            歡迎來到我的網站
                        </h1>
                        <p className="text-xl md:text-2xl text-indigo-700 mb-8">
                            我是一名熱愛教育與分享的教師
                        </p>
                        <div className="flex justify-center gap-4">
                            <a
                                href="/about"
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-600 hover:shadow-[0_4px_12px_rgba(79,70,229,0.25)] transition-all duration-500"
                            >
                                關於本站
                            </a>
                            <a
                                href="/faq"
                                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-600 hover:shadow-[0_4px_12px_rgba(147,51,234,0.25)] transition-all duration-500"
                            >
                                常見問答
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-indigo-800 text-center">
                            關於我
                        </h2>
                        <div className="space-y-6 text-lg text-gray-700">
                            <p>
                                大家好！我是一位充滿熱情的教師，致力於創造有趣且有意義的學習體驗。在教育的道路上，我深信每個學生都是獨特的個體，都擁有無限的潛能。
                            </p>
                            <p>
                                作為一名教師，我不僅關注學生的學術發展，更重視培養他們的創造力、批判性思維和終身學習的能力。我喜歡運用創新的教學方法，讓課堂充滿互動和樂趣。
                            </p>
                            <p>
                                在這個空間裡，我將分享我的教學心得、課堂趣事，以及各種教育相關的想法和經驗。期待能與更多關心教育的朋友一起交流，共同成長！
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-indigo-800 text-center">
                        作品專區
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        <div className="bg-white rounded-lg shadow-[0_4px_12px_rgba(79,70,229,0.1)] hover:shadow-[0_6px_16px_rgba(79,70,229,0.2)] transition-shadow duration-300 overflow-hidden">
                            <img 
                                src="/images/photo1.png" 
                                alt="創意教學課程" 
                                className="w-full aspect-[4/3] object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-indigo-800">創意教學課程</h3>
                                <div className="flex gap-2 mb-3">
                                    <span className="text-sm text-purple-600">#創新教學</span>
                                    <span className="text-sm text-purple-600">#多媒體教學</span>
                                </div>
                                <p className="text-gray-600">運用多媒體與互動式教學，激發學生的學習興趣與創造力。包含實作案例與教學成果展示。</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-[0_4px_12px_rgba(79,70,229,0.1)] hover:shadow-[0_6px_16px_rgba(79,70,229,0.2)] transition-shadow duration-300 overflow-hidden">
                            <img 
                                src="/images/photo2.png" 
                                alt="教學資源分享" 
                                className="w-full aspect-[4/3] object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-indigo-800">教學資源分享</h3>
                                <div className="flex gap-2 mb-3">
                                    <span className="text-sm text-purple-600">#教材分享</span>
                                    <span className="text-sm text-purple-600">#教學資源</span>
                                </div>
                                <p className="text-gray-600">精心製作的教材與學習單，適合不同程度的學生使用。包含完整的教學指引與評量方式。</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-[0_4px_12px_rgba(79,70,229,0.1)] hover:shadow-[0_6px_16px_rgba(79,70,229,0.2)] transition-shadow duration-300 overflow-hidden">
                            <img 
                                src="/images/photo3.png" 
                                alt="專題研究計畫" 
                                className="w-full aspect-[4/3] object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-indigo-800">專題研究計畫</h3>
                                <div className="flex gap-2 mb-3">
                                    <span className="text-sm text-purple-600">#跨領域學習</span>
                                    <span className="text-sm text-purple-600">#專題研究</span>
                                </div>
                                <p className="text-gray-600">帶領學生進行的跨領域研究專案，培養問題解決能力與團隊合作精神。</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-[0_4px_12px_rgba(79,70,229,0.1)] hover:shadow-[0_6px_16px_rgba(79,70,229,0.2)] transition-shadow duration-300 overflow-hidden">
                            <img 
                                src="/images/photo4.png" 
                                alt="教育工作坊" 
                                className="w-full aspect-[4/3] object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-indigo-800">教育工作坊</h3>
                                <div className="flex gap-2 mb-3">
                                    <span className="text-sm text-purple-600">#教師成長</span>
                                    <span className="text-sm text-purple-600">#專業發展</span>
                                </div>
                                <p className="text-gray-600">定期舉辦的教師專業成長工作坊，分享創新教學方法與經驗交流。</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-[0_4px_12px_rgba(79,70,229,0.1)] hover:shadow-[0_6px_16px_rgba(79,70,229,0.2)] transition-shadow duration-300 overflow-hidden">
                            <img 
                                src="/images/photo5.png" 
                                alt="學生作品集" 
                                className="w-full aspect-[4/3] object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-indigo-800">學生作品集</h3>
                                <div className="flex gap-2 mb-3">
                                    <span className="text-sm text-purple-600">#學習成果</span>
                                    <span className="text-sm text-purple-600">#作品展示</span>
                                </div>
                                <p className="text-gray-600">展示學生們的優秀作品與學習成果，記錄成長與進步的軌跡。</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-[0_4px_12px_rgba(79,70,229,0.1)] hover:shadow-[0_6px_16px_rgba(79,70,229,0.2)] transition-shadow duration-300 overflow-hidden">
                            <img 
                                src="/images/photo6.png" 
                                alt="教育科技應用" 
                                className="w-full aspect-[4/3] object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-indigo-800">教育科技應用</h3>
                                <div className="flex gap-2 mb-3">
                                    <span className="text-sm text-purple-600">#教育科技</span>
                                    <span className="text-sm text-purple-600">#數位學習</span>
                                </div>
                                <p className="text-gray-600">結合最新教育科技，打造互動式學習環境，提升教學效能與學習成效。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
