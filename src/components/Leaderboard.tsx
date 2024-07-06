import { User } from "@/lib/data";
import clsx from "clsx";
import { ChevronDown, Medal } from "lucide-react";

export default function Leaderboard({
	users,
	showLeaderboard,
	setShowLeaderboard,
}: {
	users: User[];
	showLeaderboard: boolean;
	setShowLeaderboard: any;
}) {
	return (
		<>
			<button
				onClick={() => setShowLeaderboard((state: boolean) => !state)}
				className={`w-full p-4 flex justify-between bg-red text-white tracking-wide items-center drop-shadow-leaderboard cursor-pointer hover:drop-shadow-button transition`}>
				<Medal stroke="white" />
				<span className="uppercase text-lg sm:text-xl">
					leaderboard
				</span>
				<ChevronDown stroke="white" />
			</button>
			<div
				className={clsx(
					"bg-red p-4 text-white mt-8 drop-shadow-main text-base sm:text-xl uppercase",
					showLeaderboard ? "block" : "hidden",
				)}>
				{users?.map((user) => {
					return (
						<div
							key={user.id}
							className="flex justify-between items-center border-b-2 border-white pb-1 mb-2">
							<p>{user.username}</p>
							<p className="ml-5">{user.score}</p>
						</div>
					);
				})}
			</div>
		</>
	);
}
