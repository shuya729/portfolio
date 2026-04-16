import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Shuya's Portfolio",
	description:
		"Shuya のスキルや開発実績について、チャット形式で確認できるポートフォリオサイトです。",
	openGraph: {
		title: "Shuya's Portfolio",
		description:
			"Shuya のスキルや開発実績について、チャット形式で確認できるポートフォリオサイトです。",
		locale: "ja_JP",
		siteName: "Shuya's Portfolio",
		type: "website",
	},
	twitter: {
		card: "summary",
		title: "Shuya's Portfolio",
		description:
			"Shuya のスキルや開発実績について、チャット形式で確認できるポートフォリオサイトです。",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<TooltipProvider>{children}</TooltipProvider>
			</body>
		</html>
	);
}
