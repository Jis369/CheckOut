export default function OrderSummary({ amount, delivery, discount }) {
	return (
		<div>
			
			<div className="text-center mb-3"> 
            <h1 className="text-2xl pt-2 font-medium text-gray-700 font-bold">Order Summary</h1>
        </div>
			<div>
				<div className="flex justify-between text-base font-medium text-gray-900">
					<p>Order Amount</p>
					<p>&#8377; {amount}</p>
				</div>
				<div className="flex justify-between text-base font-medium text-gray-900">
					<p>Delivery Fee</p>
					<p>&#8377; {delivery}</p>
				</div>
				<div className="flex justify-between text-base font-medium text-gray-900">
					<p>Discount</p>
					<p>&#8377; {discount}</p>
				</div>
			</div>
		</div>
	);
}
