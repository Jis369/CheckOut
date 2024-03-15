"use client";
import { useRef, useEffect } from "react";
import lottie from "lottie-web";
import animationData1 from "../public/Success_Animation.json";
import animationData2 from "../public/Failure_Animation.json";
import animationData3 from "../public/Pending_Animation.json";
const LottieAnimation = ({ status }) => {
	const container = useRef(null);
	function selectFile(status) {
		if (status === "success") {
			return animationData1
		}
		else if (status === "failure") {
			return animationData2
		}
		
		else {
			return animationData3
		}

	}
	useEffect(() => {
		const instance = lottie.loadAnimation({
			container: container.current,
			animationData: selectFile(status),
			renderer: "svg",
			loop: status === "pending", 
			autoplay: true,
		});

		return () => instance.destroy();
	}, []);

	return <div ref={container}></div>;
};

export default LottieAnimation;
