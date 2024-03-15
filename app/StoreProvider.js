"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";
// import { productSlice } from "../lib/features/product/productSlice";

export default function StoreProvider({ children }) {
	const storeRef = useRef();
	if (!storeRef.current) {
		storeRef.current = makeStore();
		// storeRef.current.dispatch(productSlice());
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
}
