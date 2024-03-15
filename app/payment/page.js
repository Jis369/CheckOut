"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentComponent() {
	const [total, setTotal] = useState(0);
	const [upiId, setUpiId] = useState("");
	const [isUpiIDValid, setIsUpiIDValid] = useState({
		state: null,
		message: "",
	});
	const [isCardValid, setIsCardValid] = useState({
		state: null,
		message: "",
	});
	const [cardInfo, setCardInfo] = useState({
		cardNumber: "",
		cardName: "",
		expiryDate: "",
		cvv: "",
	});
	const [paymentOption, setPaymentOption] = useState("");

	const handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		setCardInfo({
			...cardInfo,
			[name]: value,
		});
		return;
	};

	const router = useRouter();

	const handlePayment = (paymentOption, isCardValid, isUpiIDValid) => {
		if (paymentOption === null) {
			return;
		}
		if (paymentOption === "debit" && isCardValid.state) {
			router.push("/orderstatus");
			return;
		}
		if (paymentOption === "upi" && isUpiIDValid.state) {
			router.push("/orderstatus");
			return;
		}
	};

	const handleVerifyUpiID = (upiId) => {
		if (upiId.includes("@")) {
			setIsUpiIDValid({
				state: true,
				message: "Verified successfully",
			});
		} else if (upiId === "") {
			setIsUpiIDValid({
				state: null,
				message: "",
			});
		} else {
			setIsUpiIDValid({
				state: false,
				message: "Invalid ID. Please check your ID.",
			});
		}
	};

	const handleVerifyCard = (cardInfo) => {
		console.log(cardInfo);
		if (cardInfo.cardNumber === "") {
			setIsCardValid({
				state: false,
				message: "Please enter card details",
			});
		} else if (cardInfo.cardName === "") {
			setIsCardValid({
				state: false,
				message: "Enter Name",
			});
		} else if (cardInfo.cvv === "") {
			setIsCardValid({
				state: false,
				message: "Please enter card cvv",
			});
		} else if (cardInfo.expiryDate === "") {
			setIsCardValid({
				state: false,
				message: "Please enter card expiry date",
			});
		} else {
			setIsCardValid({
				state: true,
				message: "",
			});
		}
		console.log(isCardValid);
	};

	const handlePaymentOptionChange = (option) => {
		setPaymentOption(option);
	};

	return (

		<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
			<div className="flex-1 mt-20 overflow-y-auto px-4 py-6 sm:px-6">
				
				<h1 className="text-xl font-medium text-gray-700">
					Payment Option
				</h1>
				<form className="mt-5 grid gap-6">
					<div className="relative">
						<div>
							<input
								className="peer hidden"
								id="radio_1"
								type="radio"
								name="radio"
								checked={paymentOption === "upi"}
								onChange={() => handlePaymentOptionChange("upi")}
							/>
							<span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
							<label
								className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
								htmlFor="radio_1"
							>
								<img className="w-14 object-contain" src="/upi.svg" />
								<div className="ml-5">
									<span className="mt-2 font-semibold">UPI</span>
								</div>
							</label>
						</div>
					</div>
					{paymentOption === "upi" && (
						<div className="mt-2">
							<label
								htmlFor="upi"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								UPI ID
							</label>
							<div className="flex">
								<input
									id="upiId"
									name="upiId"
									type="text"
									value={upiId}
									onChange={(e) => setUpiId(e.target.value)}
									className="block flex-1 rounded-md border-0 py-1 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
								<div className="ml-2">
									<button
										type="button"
										onClick={() => handleVerifyUpiID(upiId)}
										className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-1.5 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
									>
										Verify
									</button>
								</div>
							</div>
							<span>{isUpiIDValid?.message}</span>
						</div>
					)}

					<div className="relative">
						<input
							className="peer hidden"
							id="radio_2"
							type="radio"
							name="radio"
							checked={paymentOption === "debit"}
							onChange={() => handlePaymentOptionChange("debit")}
						/>
						<span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
						<label
							className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
							htmlFor="radio_2"
						>
							<img
								className="w-14 object-contain"
								src="/debit-card.svg"
								alt=""
							/>
							<div className="ml-5">
								<span className="mt-2 font-semibold">
									Debit/Credit Card
								</span>
							</div>
						</label>
					</div>
					{paymentOption === "debit" && (
						<div className="">
							<div className="">
								<label
									htmlFor="cardNumber"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Card Number
								</label>
								<div className="mt-2">
									<input
										id="cardNumber"
										name="cardNumber"
										type="text"
										autoComplete="cardNumber"
										value={cardInfo.cardNumber}
										onChange={handleChange}
										className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div className="">
								<label
									htmlFor="cardName"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Name on card
								</label>
								<div className="mt-2">
									<input
										id="cardName"
										name="cardName"
										type="text"
										value={cardInfo.cardName}
										onChange={handleChange}
										className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div className="">
								<label
									htmlFor="expiryDate"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Expiration date (MM/YY)
								</label>
								<div className="mt-2">
									<input
										id="expiryDate"
										name="expiryDate"
										type="date"
										autoComplete="expiryDate"
										value={cardInfo.expiryDate}
										onChange={handleChange}
										className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="">
								<label
									htmlFor="cvv"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									CVV
								</label>
								<div className="mt-2">
									<input
										id="cvv"
										name="cvv"
										type="text"
										value={cardInfo.cvv}
										onChange={handleChange}
										className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<span>{isCardValid?.message}</span>
							<div className="mt-2">
								<button
									type="button"
									onClick={() => handleVerifyCard(cardInfo)}
									className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-1.5 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
								>
									Verify
								</button>
							</div>
						</div>
					)}
				</form>
			</div>

			<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
				<div className="flex justify-between text-base font-medium text-gray-900">
					<p>Service fee</p>
					<p>0</p>
				</div>
				<div className="flex justify-between text-base font-medium text-gray-900">
					<p>Total</p>
					<p>{total}</p>
				</div>
				<p className="mt-0.5 text-sm text-gray-500">
					Shipping and taxes calculated at checkout.
				</p>
				<div className="mt-6">
					<button
						type="button"
						onClick={() =>
							handlePayment(paymentOption, isCardValid, isUpiIDValid)
						}
						className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
					>
						Make a payment
					</button>
				</div>
			</div>
		</div>
	);
}
