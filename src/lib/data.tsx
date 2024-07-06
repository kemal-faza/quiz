import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	limit,
	orderBy,
	query,
	setDoc,
} from "firebase/firestore";
import { app } from "./db";
import { Press_Start_2P, Russo_One } from "next/font/google";
import { randomUUID } from "crypto";

const db = getFirestore(app);

export type Answer = {
	id: string;
	answer: string;
};

export type User = {
	id: string;
	username: string;
	score: number;
};

export type Question = {
	id: string;
	question: string;
	answer: string;
	options: string[];
	date: number;
};

export const russoOne = Russo_One({ subsets: ["latin"], weight: "400" });
export const pressStart2P = Press_Start_2P({
	subsets: ["latin"],
	weight: "400",
});

export const QUESTIONS_LENGTH = 2;

export async function getQuestions() {
	const q = query(collection(db, "questions"), orderBy("date", "desc"));
	const querySnapshot = await getDocs(q);
	const questions: Question[] = querySnapshot.docs.map((doc) => {
		return {
			id: doc.id,
			question: doc.data().question,
			options: doc.data().options,
			answer: doc.data().answer,
			date: doc.data().date,
		};
	});
	return questions;
}

export async function getUsers() {
	const q = query(
		collection(db, "users"),
		orderBy("score", "desc"),
		limit(10),
	);
	const snapshot = await getDocs(q);
	const users: User[] = snapshot.docs.map((doc) => {
		return {
			id: doc.id,
			username: doc.data().username,
			score: doc.data().score,
		};
	});
	return users;
}

export async function addUser(username: string, score: number) {
	await setDoc(doc(db, "users", username), {
		username,
		score,
	});
}

export async function addQuestion(data: any, collectionName: string) {
	await addDoc(collection(db, collectionName), data);
}

export async function getQuestion(id: string) {
	const snapshot = await getDoc(doc(db, "questions", id));
	const data: Question = {
		id: snapshot.id,
		question: snapshot.data()?.question,
		options: snapshot.data()?.options,
		answer: snapshot.data()?.answer,
		date: snapshot.data()?.date,
	};
	return data;
}

export async function editQuestion(data: any, id: string) {
	await setDoc(doc(db, "questions", id), data);
}

export async function deleteQuestion(id: string) {
	await deleteDoc(doc(db, "questions", id));
}
