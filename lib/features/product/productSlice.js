import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL =
	"https://groww-intern-assignment.vercel.app/v1/api/order-details";
export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async () => {
		const response = await fetch(API_URL);
		const data = await response.json();
		return data.products;
	}
);

const productSlice = createSlice({
	name: "products",
	initialState: {
		list: [],
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = "succeeded";
				console.log(action.payload);
				state.list = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default productSlice.reducer;
