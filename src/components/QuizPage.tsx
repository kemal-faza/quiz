import { Answer, Question, pressStart2P } from "@/lib/data";
import clsx from "clsx";
import { find, findIndex, isEqual, round, shuffle } from "lodash";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function QuizPage({
	questions,
	currentQuestion,
	answers,
	setAnswers,
	setCurrentQuestion,
	setScore,
	time,
	setTime,
	setCurrentPage,
}: {
	questions: Question[];
	currentQuestion: number;
	answers: Answer[];
	setAnswers: any;
	setCurrentQuestion: any;
	setScore: any;
	time: number;
	setTime: any;
	setCurrentPage: any;
}) {
	useEffect(() => {
		document.title = `Nomor ${currentQuestion} | Quizzzy`;
	});

	let question: Question = questions[currentQuestion - 1];
	let options = shuffle([question?.answer, ...(question?.options ?? [])]);

	function saveAnswer(answer: string) {
		const data = { id: question.id, answer };
		let newAnswers = answers;
		let dataIndex = findIndex(answers, function (obj) {
			return obj.id === question.id;
		});

		if (dataIndex === -1) {
			newAnswers.push(data);
		} else {
			newAnswers[dataIndex] = data;
		}

		setAnswers(newAnswers);
	}

	function confirmDone() {
		const popUp = Swal.mixin({
			background: "#10439F",
			color: "#FFFFFF",
			buttonsStyling: false,
			customClass: {
				popup: "rounded-none ",
				confirmButton: clsx(
					pressStart2P.className,
					"uppercase px-6 py-3 bg-green text-xs border-2 border-black drop-shadow-button hover:drop-shadow-button-hover lg:focus:drop-shadow-button-hover focus:drop-shadow-none transition mr-5",
				),
				cancelButton: clsx([
					pressStart2P.className,
					"uppercase px-6 py-3 bg-red text-xs border-2 border-black drop-shadow-button hover:drop-shadow-button-hover lg:focus:drop-shadow-button-hover focus:drop-shadow-none transition",
				]),
			},
		});
		popUp
			.fire({
				title: "Yakin sudah selesai?",
				text: "Cek kembali jawaban kamu!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "iya",
				cancelButtonText: "tidak",
				focusConfirm: false,
			})
			.then((result) => {
				if (result.isConfirmed) {
					answers.forEach((answer) => {
						const question = find(questions, function (obj) {
							return obj.id === answer.id;
						});
						isEqual(answer.answer, question?.answer) &&
							setScore((score: number) => score + 20);
					});

					const spendTime = round((Date.now() - time) / 1000);
					setTime(spendTime);

					setCurrentPage("summary");
				}
			});
	}

	return (
		<div>
			<p className="text-sm mb-5">No. {currentQuestion}</p>
			<p className="text-justify text-base">{question?.question}</p>
			<form className="block mt-5 text-base">
				{options.map((option) => {
					const answer = find(answers, {
						id: question?.id,
					});

					if (option && question) {
						return (
							<label
								key={`${question?.id}-${option}`}
								htmlFor={`${question?.id}-${option}`}
								className="relative px-3 py-2 flex items-center w-full mb-6 transition overflow-hidden drop-shadow-button cursor-pointer hover:drop-shadow-button-hover bg-red">
								<span>{option}</span>
								<input
									type="radio"
									className="peer invisible"
									id={`${question?.id}-${option}`}
									name="option"
									defaultChecked={answer?.answer == option}
									onChange={(e) => {
										saveAnswer(option);
									}}
								/>
								<span className="h-full w-full bg-green absolute left-0 -z-10 -translate-x-full peer-checked:translate-x-0 transition"></span>
							</label>
						);
					} else {
						return null;
					}
				})}
			</form>
			<div className="flex flex-col sm:flex-row sm:justify-between">
				<button
					onClick={() =>
						currentQuestion > 1 &&
						setCurrentQuestion((state: number) => state - 1)
					}
					disabled={currentQuestion == 1}
					className={clsx(
						"uppercase px-6 py-3 bg-red text-xs border-2 border-black drop-shadow-button hover:drop-shadow-button-hover lg:focus:drop-shadow-button-hover focus:drop-shadow-none  transition disabled:bg-gray-700 disabled:cursor-not-allowed my-3 sm:my-0",
						pressStart2P.className,
					)}>
					sebelumnya
				</button>
				<button
					onClick={() =>
						currentQuestion < questions.length &&
						setCurrentQuestion((state: number) => state + 1)
					}
					disabled={currentQuestion == questions.length}
					className={clsx(
						"uppercase px-6 py-3 bg-red text-xs border-2 border-black drop-shadow-button hover:drop-shadow-button-hover lg:focus:drop-shadow-button-hover focus:drop-shadow-none  transition disabled:hidden",
						pressStart2P.className,
					)}>
					selanjutnya
				</button>
				<button
					onClick={() =>
						currentQuestion == questions.length && confirmDone()
					}
					disabled={currentQuestion !== questions.length}
					className={clsx(
						"uppercase px-6 py-3 bg-green text-xs border-2 border-black drop-shadow-button hover:drop-shadow-button-hover lg:focus:drop-shadow-button-hover focus:drop-shadow-none  transition disabled:hidden",
						pressStart2P.className,
					)}>
					selesai
				</button>
			</div>
		</div>
	);
}
