import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Chatbot from './components/Chatbot';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "教育資源分享平台",
  description: "分享教育資源與教學經驗的專業平台",
};

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="text-xl font-bold text-green-800">
            教育資源平台
          </a>
          <div className="flex space-x-4">
            <a
              href="/about"
              className="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              關於本站
            </a>
            <a
              href="/faq"
              className="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              常見問答
            </a>
            <a
              href="/contact"
              className="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              聯絡資訊
            </a>
            <a
              href="/todo-list"
              className="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              待辦事項
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />

        <main className="flex-grow pt-16">
          {children}
        </main>

        <footer className="bg-gray-100 mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">聯絡資訊</h3>
              <p>Email: contact@example.com</p>
              <p>電話: (02) 1234-5678</p>
              <p>地址: 台北市某區某路123號</p>
            </div>
          </div>
        </footer>
        <Chatbot />
      </body>
    </html>
  );
}
