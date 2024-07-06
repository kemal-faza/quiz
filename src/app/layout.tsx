import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { russoOne } from "@/lib/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Quizzzy",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={clsx(
					"bg-yellow flex justify-center items-center p-4 min-h-screen",
					russoOne.className,
				)}>
				{children}
			</body>
		</html>
	);
}
