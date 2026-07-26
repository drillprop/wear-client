import { useEffect, useState } from "react";

export const useWindowSize = () => {
	const client = typeof window !== "undefined";
	const [windowSize, setWindowSize] = useState([
		client ? window.innerWidth : 0,
		client ? window.innerHeight : 0,
	]);
	useEffect(() => {
		if (!client) {
			return;
		}
		const handleResize = () => {
			setWindowSize([window.innerWidth, window.innerHeight]);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [client]);
	return windowSize;
};
