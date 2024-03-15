import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
// import { store } from "../lib/store";
// import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Groww",
	description: "Trading App",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{/* <Provider store={store}> */}
				<Navbar />
				{children}
				{/* </Provider> */}
			</body>
		</html>
	);
}
