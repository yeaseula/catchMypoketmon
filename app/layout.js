import LocalFont from 'next/font/local'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/main.css"
import "../styles/sub.css"
import Header from "./components/Header.js";

export const metadata = {
  title: "Catch My Pokemon!",
  description: "나만의 포켓몬을 잡아라! 포켓몬 도감 수집 웹사이트",
  icons: {
    icon: [
        { url: "/images/favicon.png", type: "image/png" },
    ],
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  openGraph: {
    title: "Catch My Pokemon!",
    description: "나만의 포켓몬을 잡아라! 포켓몬 도감 수집 웹사이트",
    url: "https://catch-mypoketmon.vercel.app/",
    siteName: "Catch My Pokemon",
    images: [
      {
        url: "/images/og-image.jpg",   // 대표 이미지
        width: 1200,
        height: 630
      }
    ],
    locale: "ko_KR",
    type: "website"
  }
};
const myFont = LocalFont({
  src : [
    {path : '../public/fonts/Paperlogy-4Regular.woff2', weight : '400', style : 'normal'},
    {path : '../public/fonts/Paperlogy-7Bold.woff2', weight : '700', style : 'normal'},
    {path : '../public/fonts/Paperlogy-8ExtraBold.woff2', weight : '800', style : 'normal'},
  ],
  display : 'swap',
  fallback : ['sans-serif']
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
        <body className={`${myFont.className} ${geistSans.variable} ${geistMono.variable}`}>
        <div id="all-container">
          <Header />
          <main>
            {children}
          </main>
        </div>
        </body>
    </html>
  );
}
