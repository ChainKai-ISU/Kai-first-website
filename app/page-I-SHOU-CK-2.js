export default function Home() {
    return (
        <>
            <header className="bg-gradient-to-br from-yellow-100 to-green-100 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-700">
                            歡迎來到我的個人網站
                        </h1>
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
