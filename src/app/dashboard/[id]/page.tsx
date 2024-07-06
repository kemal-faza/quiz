"use client";
import { updateQuestion } from "@/lib/action";
import { getQuestion, pressStart2P, Question } from "@/lib/data";
import clsx from "clsx";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardEditQuestion({
	params,
}: {
	params: { id: string };
}) {
	const [question, setQuestion] = useState<Question>();
	const handleEditQuestion = updateQuestion.bind(null, question?.id ?? "");

	useEffect(() => {
		async function getData() {
			const dataQuestion = await getQuestion(params.id);
			setQuestion(dataQuestion);
		}

		getData();
	}, [params.id]);

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
						Ubah soal
					</h1>
				</div>
				<form
					className="flex flex-col items-center"
					action={handleEditQuestion}>
					<textarea
						name="questions"
						className={clsx(
							"px-4 py-2 w-full block border-2 border-black drop-shadow-leaderboard hover:drop-shadow-button text-black mb-8 placeholder:text-base outline-none placeholder:uppercase",
						)}
						placeholder="soal"
						defaultValue={question?.question}
						required
					/>
					<textarea
						name="answer"
						className={clsx(
							"px-4 py-2 w-full block border-2 border-black drop-shadow-leaderboard hover:drop-shadow-button text-black mb-8 placeholder:text-base outline-none placeholder:uppercase",
						)}
						placeholder="jawaban"
						defaultValue={question?.answer}
						required
					/>
					{question?.options?.map((option, index) => (
						<div
							className="w-full"
							key={`${question?.id}-${index + 1}`}>
							<textarea
								name={`option-${index + 1}`}
								className={clsx(
									"px-4 py-2 w-full block border-2 border-black drop-shadow-leaderboard hover:drop-shadow-button text-black placeholder:text-base outline-none placeholder:uppercase",
								)}
								placeholder="pilihan jawaban"
								defaultValue={option}
								required
							/>
							<p className="mb-3 ml-2 mt-2 self-start">
								*opsional
							</p>
						</div>
					))}
					<button
						type="submit"
						className={clsx(
							"uppercase px-6 py-3 bg-red text-sm border-2 border-black drop-shadow-button hover:drop-shadow-button-hover lg:focus:drop-shadow-button-hover focus:drop-shadow-none transition",
							pressStart2P.className,
						)}>
						ubah
					</button>
				</form>
			</div>
		</div>
	);
}
