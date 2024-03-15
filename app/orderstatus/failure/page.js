import Link from "next/link";
import LottieAnimation from "../../../components/Animation";

const Failure = () => {
	return (
		<div className="max-w-sm mt-20 mx-auto">
			<LottieAnimation status={"failure"} />

			<div className="text-center">
				<h1 className="text-red-600 text-3xl font-bold">Payment Failed!</h1>
				<p>Money has not been debited from your account</p>
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
};

export default Failure;
