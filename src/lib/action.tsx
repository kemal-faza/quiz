"use server";
import { revalidatePath } from "next/cache";
import { addQuestion, deleteQuestion, editQuestion } from "./data";
import { redirect } from "next/navigation";

export async function handleQuestion(formData: FormData) {
	const data = {
		question: formData.get("questions"),
		answer: formData.get("answer"),
		options: [formData.get("option-1"), formData.get("option-2")],
		date: Date.now(),
	};

	await addQuestion(data, "request-questions");

	redirect("/add-question");
}

export async function handleDashboardAddQuestion(formData: FormData) {
	const data = {
		question: formData.get("questions"),
		answer: formData.get("answer"),
		options: [formData.get("option-1"), formData.get("option-2")],
		date: Date.now(),
	};

	await addQuestion(data, "questions");

	revalidatePath("/dashboard");
	redirect("/dashboard");
}

export async function updateQuestion(id: string, formData: FormData) {
	const data = {
		question: formData.get("questions"),
		answer: formData.get("answer"),
		options: [formData.get("option-1"), formData.get("option-2")],
		date: Date.now(),
	};

	await editQuestion(data, id);

	revalidatePath("/dashboard");
	redirect("/dashboard");
}

export async function handleDeleteQuestion(id: string) {
	await deleteQuestion(id);
	revalidatePath("/dashboard");
}
