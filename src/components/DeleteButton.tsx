"use client";
import { handleDeleteQuestion } from "@/lib/action";
import { pressStart2P } from "@/lib/data";
import clsx from "clsx";
import { Trash } from "lucide-react";
import Swal from "sweetalert2";

export default function DeleteButton({ id }: { id: string }) {
	const handleDelete = handleDeleteQuestion.bind(null, id);
	function confirmDelete() {
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
				title: "Yakin ingin menghapus soal?",
				text: "Soal tidak dapat dipulihkan.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "iya",
				cancelButtonText: "tidak",
				focusConfirm: false,
			})
			.then((result) => {
				if (result.isConfirmed) {
					handleDelete();
					popUp.fire({
						title: "Dihapus!",
						text: "Data telah dihapus.",
						icon: "success",
					});
				}
			});
	}

	return (
		<button
			onClick={confirmDelete}
			className="px-4 py-2 bg-red drop-shadow-button hover:drop-shadow-button-hover transition block w-fit">
			<Trash />
		</button>
	);
}
