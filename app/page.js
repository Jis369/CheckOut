// import OrderList from "@/components/OrderList";
import Link from "next/link";

export default function Page() {
	return (
		<div>
			<div className="mt-20">
				<Link
					href="/checkout"
					className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
				>
					Get Started
				</Link>
				{/* <OrderList /> */}
			</div>
		</div>
	);
}
