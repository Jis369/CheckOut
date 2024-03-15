"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Promocode from "../../components/Promocode";
import OrderSummary from "../../components/OrderSummary";
import PaymentComponent from "../payment/page";
// import countries from "../../data/countries"
import emptyBasket from "../../public/emptyBasket.png";

export default function Page() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [total, setTotal] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [delivery, setDelivery] = useState(0);
	const [amount, setAmount] = useState(0);
	const [isUserInfoSaved, setIsUserInfoSaved] = useState(false);
	const [formError, setFormError] = useState("");
	const [EFirstName, setEFirstName] = useState(false);
	const [ELastName, setELastName] = useState(false);
	const [EEmail, setEEmail] = useState(false);
	const [EPhoneNumber, setEPhoneNumber] = useState(false);
	const [ECountry, setECountry] = useState(false);
	const [EStreetAddress, setEStreetAddress] = useState(false);
	const [ECity, setECity] = useState(false);
	const [EState, setEState] = useState(false);
	const [EPostalCode, setEPostalCode] = useState(false);
	const [ValidEmail, setValidEmail] = useState(true);
	const [isPaymentPage, setIsPaymentPage] = useState(false)
	const [userInfo, setUserInfo] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		address: {
			country: "",
			streetAddress: "",
			city: "",
			state: "",
			postalCode: "",
		},
	});

	//console.log(countries)

	useEffect(() => {
		const fetchCart = async () => {
			try {
				const response = await fetch(
					"https://groww-intern-assignment.vercel.app/v1/api/order-details"
				);
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const jsonData = await response.json();
				setProducts(jsonData?.products);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		fetchCart();
	}, []);

	useEffect(() => {
		const calculateTotal = () => {
			let sum = 0;
			products.forEach((product) => {
				sum += product.price * 100;
			});
			setAmount(sum / 100);
		};

		calculateTotal();
	}, [products]);

	useEffect(() => {
		setTotal(amount - discount - delivery);
	}, [amount, discount, delivery]);

	const countries = ["NA", "India", "United States", "Canada", "Mexico"];

	const handleChange = (event) => {
		event.preventDefault();
		setFormError("");
		setEFirstName(false);
		setELastName(false);
		setEEmail(false);
		setEPhoneNumber(false);
		setECountry(false);
		setEStreetAddress(false);
		setECity(false);
		setEState(false);
		setEPostalCode(false);
		const { name, value } = event.target;
		if (name.includes(".")) {
			const [fieldName, subFieldName] = name.split(".");
			setUserInfo({
				...userInfo,
				[fieldName]: {
					...userInfo[fieldName],
					[subFieldName]: value,
				},
			});
		} else {
			setUserInfo({
				...userInfo,
				[name]: value,
			});
		}
	};
	const handleEditAddress = () => {
		if (!isUserInfoSaved) {
			handleAddress()
		} else {
			setIsUserInfoSaved(false)
		}
	}
	const handleAddress = () => {
		if (
			!userInfo.firstName ||
			!userInfo.lastName ||
			!userInfo.email ||
			!userInfo.phoneNumber ||
			!userInfo.address.country ||
			!userInfo.address.streetAddress ||
			!userInfo.address.city ||
			!userInfo.address.state ||
			!userInfo.address.postalCode
		) {
			if (!userInfo.firstName) setEFirstName(true);

			if (!userInfo.lastName) setELastName(true);
			if (!userInfo.email) setEEmail(true);
			if (!userInfo.phoneNumber) setEPhoneNumber(true);
			if (!userInfo.address.country) setECountry(true);
			if (!userInfo.address.streetAddress) setEStreetAddress(true);
			if (!userInfo.address.city) setECity(true);
			if (!userInfo.address.state) setEState(true);
			if (!userInfo.address.postalCode) setEPostalCode(true);
			window.scrollTo({ top: 0, behavior: "smooth" });
			setFormError("Please fill all the required fields");
			return;
		}
		setIsUserInfoSaved(true);
	};
	const removeItem = (id) => {
		const updatedProducts = products.filter((product) => product.id !== id);
		setProducts(updatedProducts);
	};

	console.log(isUserInfoSaved)
	const router = useRouter();

	const handleCheckout = () => {
		if (!isUserInfoSaved) {
			return;
		}
		//router.push("/payment");
		setIsPaymentPage(true);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}
	return (
		<div>
			<div className="fixed inset-y-0 flex max-w-full mt-1">
				<div className="pointer-events-auto w-screen">
					<div className="flex h-full flex-row overflow-y-scroll bg-white shadow-xl md:grid-col-2">
						<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:w-4/5 lg:w-4/5">
							<h1 className="text-4xl mt-10 text-center font-medium text-gray-900">
								Checkout
							</h1>
							<h1 className="text-2xl font-medium text-gray-700 ">
								Delivery Detail
							</h1>
							<div className="border-b border-gray-900/10">
								{isUserInfoSaved ? (
									<div>
										<div className="mt-2 border-t border-gray-100">
											<dl className="divide-y divide-gray-100 sm:grid sm:grid-cols-2 sm:gap-1 sm:px-0">
												<div className="flex px-2">
													<dt className="text-sm font-medium leading-6 text-gray-900">
														Full name :
													</dt>
													<dd className="ml-4 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
														{`${userInfo.firstName} ${userInfo.lastName}`}
													</dd>
												</div>

												<div className="flex px-2 ">
													<dt className="text-sm font-medium leading-6 text-gray-900">
														Email address :
													</dt>
													<dd className="ml-4 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
														{userInfo.email}
													</dd>
												</div>
												<div className="flex px-2  ">
													<dt className="text-sm font-medium leading-6 text-gray-900">
														Phone number :
													</dt>
													<dd className="ml-4 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
														{userInfo.phoneNumber}
													</dd>
												</div>
												<div className="flex px-2">
													<dt className="text-sm font-medium leading-6 text-gray-900">
														Address :
													</dt>
													<dd className="ml-4 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
														{`${userInfo.address.streetAddress}, ${userInfo.address.city} - ${userInfo.address.postalCode}, ${userInfo.address.state}, ${userInfo.address.country}`}
													</dd>
												</div>
											</dl>
										</div>
									</div>
								) : (
									<div className="">
										<div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
											<div className="sm:col-span-3">
												<label
													htmlFor="firstName"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													First name{" "}
													{EFirstName && (
														<span style={{ color: "red" }}>*</span>
													)}
												</label>
												<div>
													<input
														type="text"
														name="firstName"
														id="firstName"
														autoComplete="given-name"
														value={userInfo?.firstName}
														onChange={handleChange}
														className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>

											<div className="sm:col-span-3">
												<label
													htmlFor="lastName"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Last name{" "}
													{ELastName && <span style={{ color: "red" }}>*</span>}
												</label>
												<div >
													<input
														type="text"
														name="lastName"
														id="lastName"
														autoComplete="family-name"
														value={userInfo?.lastName}
														onChange={handleChange}
														className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>

											<div className="sm:col-span-3">
												<label
													htmlFor="email"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Email address{" "}
													{EEmail && <span style={{ color: "red" }}>*</span>}
													{!ValidEmail && (
														<span style={{ color: "red" }}>
															Enter valid Email
														</span>
													)}
												</label>
												<div >
													<input
														id="email"
														name="email"
														type="email"
														autoComplete="email"
														value={userInfo?.email}
														onChange={handleChange}
														className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														onBlur={(e) => {
															const emailInput = e.target;
															const emailPattern =
																/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

															if (!emailPattern.test(emailInput.value)) {
																setValidEmail(false);
																emailInput.setCustomValidity(
																	"Please enter a valid email address."
																);
															} else {
																setValidEmail(true);
																emailInput.setCustomValidity("");
															}
														}}
													/>
												</div>
											</div>
											<div className="sm:col-span-3">
												<label
													htmlFor="phoneNumber"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Phone Number{" "}
													{EPhoneNumber && (
														<span style={{ color: "red" }}>*</span>
													)}
												</label>
												<div >
													<input
														id="phoneNumber"
														name="phoneNumber"
														type="text"
														autoComplete="phone"
														value={userInfo?.phoneNumber}
														onChange={handleChange}
														onKeyDown={(e) => {
															if (
																(e.key < "0" || e.key > "9") &&
																e.key !== "Backspace" &&
																e.key !== "Delete" &&
																e.key !== "ArrowLeft" &&
																e.key !== "ArrowRight" &&
																e.key !== "Tab" &&
																e.key !== "Home" &&
																e.key !== "End"
															) {
																e.preventDefault();
															}
														}}
														className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>

											<div className="sm:col-span-3">
												<label
													htmlFor="country"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Country{" "}
													{ECountry && <span style={{ color: "red" }}>*</span>}
												</label>
												<div >
													<select
														id="country"
														name="address.country"
														autoComplete="country-name"
														value={userInfo?.address?.country}
														onChange={handleChange}
														className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													>
														{countries.map((country, index) => (
															<option key={index} value={country}>
																{country}
															</option>
														))}
													</select>
												</div>
											</div>
											<div className="sm:col-span-3">
												<label
													htmlFor="state"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													State{" "}
													{EState && <span style={{ color: "red" }}>*</span>}
												</label>
												<div className="mt-0">
													<input
														type="text"
														name="address.state"
														id="state"
														autoComplete="address-level1"
														value={userInfo?.address?.state}
														onChange={handleChange}
														className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>


											<div className="sm:col-span-3 sm:col-start-1">
												<label
													htmlFor="city"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													City{" "}
													{ECity && <span style={{ color: "red" }}>*</span>}
												</label>
												<div className="mt-0">
													<input
														type="text"
														name="address.city"
														id="city"
														autoComplete="address-level2"
														value={userInfo?.address?.city}
														onChange={handleChange}
														className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>



											<div className="sm:col-span-3">
												<label
													htmlFor="postalCode"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													ZIP / Postal code{" "}
													{EPostalCode && (
														<span style={{ color: "red" }}>*</span>
													)}
												</label>
												<div className="mt-0">
													<input
														type="text"
														name="address.postalCode"
														id="postalCode"
														autoComplete="postal-code"
														value={userInfo?.address?.postalCode}
														onChange={handleChange}
														maxLength={6}
														onKeyDown={(e) => {
															if (
																(e.key < "0" || e.key > "9") &&
																e.key !== "Backspace" &&
																e.key !== "Delete" &&
																e.key !== "ArrowLeft" &&
																e.key !== "ArrowRight" &&
																e.key !== "Tab" &&
																e.key !== "Home" &&
																e.key !== "End"
															) {
																e.preventDefault();
															}
														}}
														className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>
											<div className="col-span-full">
												<label
													htmlFor="streetAddress"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													Street address{" "}
													{EStreetAddress && (
														<span style={{ color: "red" }}>*</span>
													)}
												</label>
												<div className="mt-0">
													<input
														type="text"
														name="address.streetAddress"
														id="streetAddress"
														autoComplete="street-address"
														value={userInfo?.address?.streetAddress}
														onChange={handleChange}
														className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>
										</div>
									</div>
								)}
								<div className="mt-7">
									{formError && (
										<span style={{ color: "red" }}>
											* {formError}
										</span>
									)}
									{!isPaymentPage && (
										<button
											onClick={handleEditAddress}
											className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 mt-2 mb-3"
										>
											{isUserInfoSaved ? "Edit Address" : "Save Address"}
										</button>
									)}
								</div>
							</div>
							<h1 className="text-2xl pt-2 font-medium text-gray-700">
								Order List
							</h1>
							<div className="mt-6">
								{(products.length === 0) && (
									<div className="text-center">
										<div className="text-xl mb-2 flex flex-col items-center ">
											<img src="emptyBasket.png" className="w-24 h-24 mb-2" />
											<div>Opps! No items in the cart</div>
										</div>
										<Link
											href="/"
											className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 "
										>
											Continue Shopping
											<span aria-hidden="true"> &rarr;</span>
										</Link>
									</div>
								)}
								<div className="flow-root">
									<ul role="list" className="-my-6 divide-y divide-gray-200">
										{products?.map((product) => (
											<li key={product.id} className="flex py-6">
												<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
													<img
														src={product.image}
														className="h-full w-full object-cover object-center"
													/>
												</div>

												<div className="ml-4 flex flex-1 flex-col">
													<div>
														<div className="flex justify-between text-base font-medium text-gray-900">
															<h3>{product.title}</h3>
															<p className="ml-4">
																<span>&#8377;</span> {product.price}
															</p>
														</div>
													</div>
													<div className="flex flex-1 items-end justify-between text-sm">
														<p className="text-gray-500">
															Qty {product.quantity}
														</p>

														<div className="flex">
															<button
																onClick={() => removeItem(product.id)}
																type="button"
																className="font-medium text-indigo-600 hover:text-indigo-500"
															>
																Remove
															</button>
														</div>
													</div>
												</div>
											</li>
										))}
									</ul>
								</div>
							</div>



						</div>
						{(!isPaymentPage) ? (
							<div className="flex-shrink-0 border-t w-96 border-gray-200 px-4 py-6 sm:px-6">

								<div className="mt-6">
									<div className="mt-4">
										<OrderSummary
											amount={amount}
											discount={discount}
											delivery={delivery}
										/>
										<div className="flex justify-between text-base font-medium text-gray-900 ">
											<p>Total</p>
											<p>&#8377; {total}</p>
										</div>
										<Promocode />
									</div>
									<button
										onClick={handleCheckout}
										className={`flex w-full items-center justify-center rounded-md border border-transparent ${products.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
											} px-6 py-3 text-base font-medium text-white shadow-sm mt-8`}
										disabled={products.length === 0} // Disable the button if products.length is 0
									>

										Checkout
									</button>
									<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
										<Link
											href="/"
											className="font-medium text-indigo-600 hover:text-indigo-500"
										>
											or Continue Shopping
											<span aria-hidden="true"> &rarr;</span>
										</Link>
									</div>
								</div>

							</div>)
							: (
								<PaymentComponent />
							)}
					</div>
				</div>
			</div>
		</div >
	);
}
