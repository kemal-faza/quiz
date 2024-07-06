"use client";
import DeleteButton from "@/components/DeleteButton";
import {
	deleteQuestion,
	getQuestions,
	pressStart2P,
	Question,
} from "@/lib/data";
import clsx from "clsx";
import { Pencil, Plus, Text, Trash } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
	const [questions, setQuestions] = useState<Question[]>();
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		async function getData() {
			const dataQuestions = await getQuestions();
			setQuestions(dataQuestions);
		}

		getData();
	}, []);

	function handleLogin(formData: FormData) {
		if (
			formData.get("username") == "kemalfaza17" &&
			formData.get("password") == "kemalfaza"
		) {
			setIsLogged(true);
		} else {
			redirect("/");
		}
	}

	return (
		<div className="w-full max-w-7xl mb-10">
			{isLogged && (
				<div className="w-full">
					<div className="flex flex-col sm:flex-row items-center justify-center">
						<Link
							href={"/"}
							className={`w-full p-4 flex bg-red text-white tracking-wide items-center drop-shadow-leaderboard cursor-pointer hover:drop-shadow-button transition sm:mr-5`}>
							<Text
								stroke="white"
								className="self-start"
							/>
							<span className="uppercase text-xl w-full text-center">
								main quiz
							</span>
						</Link>
						<Link
							href={"/add-question"}
							className={`w-full p-4 flex bg-green text-white tracking-wide items-center drop-shadow-leaderboard cursor-pointer hover:drop-shadow-button transition`}>
							<Plus
								stroke="white"
								className="self-start"
							/>
							<span className="uppercase text-lg sm:text-xl w-full text-center">
								bikin soal
							</span>
						</Link>
					</div>
					<div className="p-4 bg-blue text-white mt-8 drop-shadow-main mb-10 sm:mb-0">
						<div className="flex mb-5">
							<Link
								href={`/dashboard/add-question`}
								className="px-4 py-2 bg-yellow text-black drop-shadow-button hover:drop-shadow-button-hover transition block w-fit">
								<Plus />
							</Link>
							<h1
								className={clsx(
									"w-full uppercase text-2xl sm:text-3xl text-center",
								)}>
								daftar soal
							</h1>
						</div>
						<div className="w-full overflow-x-auto">
							<table className="w-full text-center">
								<thead className="tracking-widest bg-black/20">
									<tr>
										<th
											className="px-6 py-3"
											scope="col">
											No
										</th>
										<th
											className="px-6 py-3"
											scope="col">
											Soal
										</th>
										<th
											className="px-6 py-3"
											scope="col">
											Jawaban
										</th>
										<th
											className="px-6 py-3"
											scope="col">
											Opsi 1
										</th>
										<th
											className="px-6 py-3"
											scope="col">
											Opsi 2
										</th>
										<th
											className="px-6 py-3"
											scope="col">
											Tombol
										</th>
									</tr>
								</thead>
								<tbody className="tracking-wide">
									{questions?.map((question, index) => (
										<tr key={question.id}>
											<td className="px-6 py-4">
												{index + 1}
											</td>
											<td className="px-6 py-4 text-justify">
												{question?.question}
											</td>
											<td className="px-6 py-4 text-justify">
												{question?.answer}
											</td>
											<td className="px-6 py-4 text-justify">
												{question?.options[0]}
											</td>
											<td className="px-6 py-4 text-justify">
												{question?.options[1]}
											</td>
											<td className="px-6 py-4 flex justify-center items-center">
												<Link
													href={`/dashboard/${question.id}`}
													className="px-4 py-2 mr-3 bg-green drop-shadow-button hover:drop-shadow-button-hover transition block w-fit">
													<Pencil className="" />
												</Link>
												<DeleteButton
													{...{ id: question.id }}
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
			{!isLogged && (
				<div className="p-4 bg-blue text-white mt-8 drop-shadow-main mb-10 sm:mb-0">
					<h1
						className={clsx(
							"w-full uppercase text-2xl sm:text-3xl text-center mb-5",
						)}>
						Login
					</h1>
					<form
						action={handleLogin}
						className="flex flex-col items-center">
						<input
							name="username"
							type="text"
							className={clsx(
								"text-center px-6 py-3 w-full block border-2 border-black drop-shadow-leaderboard hover:drop-shadow-button text-black mb-8 placeholder:text-base outline-none placeholder:uppercase",
								pressStart2P.className,
							)}
							placeholder="username"
							required
						/>
						<input
							name="password"
							type="password"
							className={clsx(
								"text-center px-6 py-3 w-full block border-2 border-black drop-shadow-leaderboard hover:drop-shadow-button text-black mb-8 placeholder:text-base outline-none placeholder:uppercase",
								pressStart2P.className,
							)}
							placeholder="username"
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
			)}
		</div>
	);
}
