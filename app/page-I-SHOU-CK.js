export default function Home() {
    return (
        <>
            <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            歡迎來到我的個人網站
                        </h1>
                        <p className="text-xl md:text-2xl mb-8">
                            我是一名熱愛創造與分享的開發者
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                                查看作品集
                            </button>
                            <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                                聯絡我
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
