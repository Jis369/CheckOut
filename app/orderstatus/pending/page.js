"use client";
import React from "react";
import LottieAnimation from "../../../components/Animation";
import Link from "next/link";

export default function Success() {
	return (
		<div className="max-w-sm mt-20 mx-auto">
			<LottieAnimation status={"pending"} />

			<div className="text-center">
				<h1 className="text-brown-600 text-3xl font-bold">There is unusual traffic</h1>
			</div>

			<div className="flex items-center justify-center mt-4">
				<Link
					href="/"
					className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
				>
					Try again!
				</Link>
			</div>
		</div>
	);
}

Success;
