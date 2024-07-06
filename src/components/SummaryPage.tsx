"use client";
import { addUser, pressStart2P } from "@/lib/data";
import clsx from "clsx";
import { toString } from "lodash";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SummaryPage({
	score,
	time,
	username,
	setShowLeaderboard,
}: {
	score: number;
	time: number;
	username: string;
	setShowLeaderboard: any;
}) {
	useEffect(() => {
		document.title = `Ringkasan | Quizzzy`;

		async function saveUser() {
			await addUser(username, score - time);
		}

		saveUser();
	});

	return (
		<div>
			<h1 className="text-2xl sm:text-3xl text-center">Summary</h1>
			<div className="flex justify-between text-lg sm:text-xl mb-1">
				<p>Skor Benar</p>
				<p>{toString(score)}</p>
			</div>
			<div className="flex justify-between text-lg sm:text-xl mb-1">
				<p>Waktu</p>
				<p>{toString(time)} detik</p>
			</div>
			<div className="flex justify-between text-lg sm:text-xl mt-10 border-t border-white pt-2">
				<p>Total Skor :</p>
				<p>{toString(score - time)}</p>
			</div>
			<div className="flex flex-col sm:flex-row justify-center mt-10">
				<button
					onClick={() =>
						setShowLeaderboard((state: boolean) => !state)
					}
					className={clsx(
						"uppercase px-6 py-3 bg-red text-xs sm:text-sm border-2 border-black drop-shadow-button hover:drop-shadow-button-hover lg:focus:drop-shadow-button-hover focus:drop-shadow-none transition my-2 sm:my-0 sm:mx-2",
						pressStart2P.className,
					)}>
					cek leaderboard
				</button>
				<button
					onClick={() => {
						window.location.reload();
					}}
					className={clsx(
						"uppercase px-6 py-3 bg-red text-xs sm:text-sm border-2 border-black drop-shadow-button hover:drop-shadow-button-hover lg:focus:drop-shadow-button-hover focus:drop-shadow-none transition my-2 sm:my-0 sm:mx-2",
						pressStart2P.className,
					)}>
					main lagi
				</button>
			</div>
		</div>
	);
}
