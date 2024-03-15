"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
	const [merchantLogo, setMerchantLogo] = useState(null);
	const [merchantName, setMerchantName] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTheme = async () => {
			try {
				const response = await fetch(
					"https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata"
				);
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const jsonData = await response.json();
				setMerchantName(jsonData?.merchantName);
				setMerchantLogo(jsonData?.merchantLogo);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		fetchTheme();
	}, []);
	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>{error?.message}</div>;
	}

	return (
		<>
			<header className="block fixed top-0 z-50 w-full bg-slate-200 pl-2">
				<div className="container mx-auto px-8">
					<div className="grid grid-cols-2 h-15 items-center">
						{/* Left Side */}
						<div>
							<Link
								href="/"
								className="text-2xl flex font-bold text-apple-white"
							>
								<img className="h-10 " src={merchantLogo} alt="logo" />
								<h3 className="p-2">{merchantName}</h3>
							</Link>
						</div>
						{/* Right Side */}
						<div className="flex justify-end z-50">
							<Image src="/user.png" height={41} width={41} />
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
