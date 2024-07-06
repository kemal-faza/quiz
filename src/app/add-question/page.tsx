"use client";
import { handleQuestion } from "@/lib/action";
import { pressStart2P } from "@/lib/data";
import clsx from "clsx";
import { Plus, Text } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function AddQuestionPage() {
	useEffect(() => {
		document.title = `Bikin Soal | Quizzzy`;
	});

	return (
		<div className="w-full max-w-xl">
			<Link
				href={"/"}
				className={`w-full p-4 flex bg-red text-white tracking-wide items-center drop-shadow-leaderboard cursor-pointer hover:drop-shadow-button transition mb-5`}>
				<Text
					stroke="white"
					className="self-start"
				/>
				<span className="uppercase text-xl w-full text-center">
					main quiz
				</span>
			</Link>

			<div className="p-5 bg-blue text-white mt-8 drop-shadow-main mb-10 sm:mb-0">
				<h1
					className={clsx(
						"uppercase text-2xl sm:text-3xl text-center mb-10",
					)}>
					bikin soalmu sendiri!!
				</h1>
				<form
					action={handleQuestion}
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
							"px-4 py-2 w-full block border-2 border-black drop-shadow-leaderboard hover:drop-shadow-button text-black placeholder:text-base outline-none placeholder:uppercase",
						)}
						placeholder="pilihan jawaban"
					/>
					<p className="mb-3 ml-2 mt-2 self-start">*opsional</p>
					<textarea
						name="option-2"
						className={clsx(
							"px-4 py-2 w-full block border-2 border-black drop-shadow-leaderboard hover:drop-shadow-button text-black placeholder:text-base outline-none placeholder:uppercase",
						)}
						placeholder="pilihan jawaban"
					/>
					<p className="mb-3 ml-2 mt-2 self-start">*opsional</p>
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
