"use client";
import { handleDashboardAddQuestion } from "@/lib/action";
import { pressStart2P } from "@/lib/data";
import clsx from "clsx";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardAddQuestion() {
	const [isLogged, setIsLogged] = useState(false);

	return (
		<div className="w-full max-w-7xl">
			<div className="p-4 bg-blue text-white mt-8 drop-shadow-main mb-10 sm:mb-0">
				<div className="flex mb-5">
					<Link
						href={`/dashboard`}
						className="px-4 py-2 bg-yellow text-black drop-shadow-button hover:drop-shadow-button-hover transition block w-fit">
						<ArrowLeftFromLine />
					</Link>
					<h1
						className={clsx(
							"w-full uppercase text-2xl sm:text-3xl text-center",
						)}>
						Tambah soal
					</h1>
				</div>
				<form
					action={handleDashboardAddQuestion}
					className="flex flex-col items-center">
					<textarea
						name="questions"
						className={clsx(
							"px-4 py-2 w-full block border-2 border-black drop-shadow-leaderboard hover:drop-shadow-button text-black mb-8 placeholder:text-base outline-none placeholder:uppercase",
						)}
						placeholder="soal"
						required
					/>
					<textarea
						name="answer"
						className={clsx(
							"px-4 py-2 w-full block border-2 border-black drop-shadow-leaderboard hover:drop-shadow-button text-black mb-8 placeholder:text-base outline-none placeholder:uppercase",
						)}
						placeholder="jawaban"
						required
					/>
					<textarea
						name="option-1"
						className={clsx(
							"mb-8 px-4 py-2 w-full block border-2 border-black drop-shadow-leaderboard hover:drop-shadow-button text-black placeholder:text-base outline-none placeholder:uppercase",
						)}
						placeholder="pilihan jawaban"
						required
					/>
					<textarea
						name="option-2"
						className={clsx(
							"mb-8 px-4 py-2 w-full block border-2 border-black drop-shadow-leaderboard hover:drop-shadow-button text-black placeholder:text-base outline-none placeholder:uppercase",
						)}
						placeholder="pilihan jawaban"
						required
					/>
					<button
						type="submit"
						className={clsx(
							"uppercase px-6 py-3 bg-red text-sm border-2 border-black drop-shadow-button hover:drop-shadow-button-hover lg:focus:drop-shadow-button-hover focus:drop-shadow-none transition",
							pressStart2P.className,
						)}>
						buat
					</button>
				</form>
			</div>
		</div>
	);
}
