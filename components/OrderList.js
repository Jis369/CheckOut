"use client";
import { useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "../lib/hooks";
import { fetchProducts } from "../lib/features/product/productSlice";

export default function OrderList({ product }) {
	const store = useAppStore();
	const initialized = useRef(false);
	if (!initialized.current) {
		store.dispatch(initializeProduct(product));
		initialized.current = true;
	}
	const products = useAppSelector((state) => state.products);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	return (
		<div>
			<h1>Product List</h1>
			{products.status === "loading" ? (
				<h1>Loading</h1>
			) : (
				<ul>
					{products.map((product) => (
						<li key={product.id}>{product.title}</li>
					))}
				</ul>
			)}
		</div>
	);
}
