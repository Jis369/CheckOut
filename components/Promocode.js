import { useState } from "react";

export default function Promocode() {
	const [promoCode, setPromoCode] = useState("");
	const [isPromoCodeValid, setIsPromoCodeValid] = useState(false);
	const validPromoCodes = [
		{ code: "Groww50", discount: "50%" },
		{ code: "Groww100", discount: 100 },
	];

	const handlePromoCode = () => {
		const validCode = validPromoCodes.find((code) => code.code === promoCode);
		if (validCode) {
			setIsPromoCodeValid(true);
			// return validCode.discount;
		} else {
			setIsPromoCodeValid(false);
			// return null;
		}
	};

	return (
		<div className="col-span-full pt-2">
			<label
				htmlFor="promoCode"
				className="text-lg pt-2 font-medium text-gray-700"
			>
				Promo Code
			</label>
			<div className="mt-2">
				<input
					type="text"
					name="promoCode"
					id="promoCode"
					value={promoCode}
					onChange={(e) => setPromoCode(e.target.value)}
					className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
				{isPromoCodeValid ? (
					<span className="text-green-500 text-sm">Successfully applied</span>
				) : (
					<span className="text-red-500 text-sm">Invalid promo code</span>
				)}
				<button
					onClick={handlePromoCode}
					className="flex mt-2 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
				>
					Apply
				</button>
			</div>
		</div>
	);
}
