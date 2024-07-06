"use client";
import Leaderboard from "@/components/Leaderboard";
import QuizPage from "@/components/QuizPage";
import StartPage from "@/components/StartPage";
import SummaryPage from "@/components/SummaryPage";
import {
	Answer,
	Question,
	User,
	getQuestions,
	getUsers,
	pressStart2P,
} from "@/lib/data";
import clsx from "clsx";
import { ChevronDown, Medal, Plus } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function Home() {
	const [currentPage, setCurrentPage] = useState("start");
	const [username, setUsername] = useState("");
	const [currentQuestion, setCurrentQuestion] = useState(1);
	const [questions, setQuestions] = useState<Question[]>([]);
	const [answers, setAnswers] = useState<Answer[]>([]);
	const [score, setScore] = useState(0);
	const [time, setTime] = useState(0);
	const [showLeaderboard, setShowLeaderboard] = useState(false);
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		async function getData() {
			const dataQuestions: Question[] = await getQuestions();
			setQuestions(dataQuestions);
		}

		getData();
	}, []);

	useEffect(() => {
		async function getData() {
			const dataUsers: User[] = await getUsers();
			setUsers(dataUsers);
		}

		getData();
	}, [showLeaderboard]);

	return (
		<div className="w-full max-w-xl">
			<Link
				href={"/add-question"}
				className={`w-full p-4 flex bg-green text-white tracking-wide items-center drop-shadow-leaderboard cursor-pointer hover:drop-shadow-button transition mb-5`}>
				<Plus
					stroke="white"
					className="self-start"
				/>
				<span className="uppercase text-lg sm:text-xl w-full text-center">
					bikin soal
				</span>
			</Link>
			<Leaderboard {...{ users, showLeaderboard, setShowLeaderboard }} />
			<div
				className={clsx(
					"p-4 bg-blue text-white mt-8 drop-shadow-main mb-10 sm:mb-0",
					showLeaderboard && "hidden",
				)}>
				{currentPage == "start" && (
					<StartPage {...{ setUsername, setTime, setCurrentPage }} />
				)}
				{currentPage == "quiz" && (
					<QuizPage
						{...{
							questions,
							currentQuestion,
							answers,
							setAnswers,
							setCurrentQuestion,
							setScore,
							time,
							setTime,
							setCurrentPage,
						}}
					/>
				)}
				{currentPage == "summary" && (
					<SummaryPage
						{...{ score, time, username, setShowLeaderboard }}
					/>
				)}
			</div>
		</div>
	);
}
