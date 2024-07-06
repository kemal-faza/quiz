import { pressStart2P } from "@/lib/data";
import clsx from "clsx";
import { useEffect } from "react";

export default function StartPage({
	setUsername,
	setTime,
	setCurrentPage,
}: any) {
	function handleSubmit(formData: FormData) {
		setUsername(formData.get("name")?.toString().toUpperCase() as string);

		setTime(Date.now());

		setCurrentPage("quiz");
	}

	return (
		<div>
			<h1
				className={clsx(
					"uppercase text-2xl sm:text-3xl text-center mb-20",
				)}>
				dari pertanyaan receh hingga paling mind-blowing
			</h1>
			<form
				action={handleSubmit}
				className="flex flex-col items-center">
				<input
					type="text"
					name="name"
					className={clsx(
						"px-8 py-4 w-full block border-2 border-black drop-shadow-leaderboard hover:drop-shadow-button uppercase text-center text-black text-xl mb-8 placeholder:text-base outline-none",
						pressStart2P.className,
					)}
					placeholder="nama"
					required
				/>
				<button
					className={clsx(
						"uppercase px-8 py-4 bg-red text-sm border-2 border-black drop-shadow-button hover:drop-shadow-button-hover lg:focus:drop-shadow-button-hover focus:drop-shadow-none  transition",
						pressStart2P.className,
					)}>
					mulai
				</button>
			</form>
		</div>
	);
}
