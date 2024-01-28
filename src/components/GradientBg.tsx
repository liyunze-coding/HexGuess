import React, { useEffect, useRef, useCallback, useMemo } from "react";

export default function GradientBg() {
	const colors = useMemo(
		() => [
			[62, 35, 255],
			[60, 255, 60],
			[255, 35, 98],
			[45, 175, 230],
			[255, 0, 255],
			[255, 128, 0],
		],
		[]
	);

	const alpha = 1.0;

	const step = useRef(0);
	let colorIndices = Array.from({ length: colors.length }, (_, i) => i);
	const gradientSpeed = 0.0009;
	const gradientElement = useRef<HTMLDivElement>(null);

	const updateGradient = useCallback(() => {
		if (!gradientElement.current) return;

		const c0_0 = colors[colorIndices[0]];
		const c0_1 = colors[colorIndices[1]];
		const c1_0 = colors[colorIndices[2]];
		const c1_1 = colors[colorIndices[3]];

		const istep = 1 - step.current;
		const r1 = Math.round(istep * c0_0[0] + step.current * c0_1[0]);
		const g1 = Math.round(istep * c0_0[1] + step.current * c0_1[1]);
		const b1 = Math.round(istep * c0_0[2] + step.current * c0_1[2]);
		const color1 = `rgba(${r1},${g1},${b1},${alpha})`;

		const r2 = Math.round(istep * c1_0[0] + step.current * c1_1[0]);
		const g2 = Math.round(istep * c1_0[1] + step.current * c1_1[1]);
		const b2 = Math.round(istep * c1_0[2] + step.current * c1_1[2]);
		const color2 = `rgba(${r2},${g2},${b2},${alpha})`;

		gradientElement.current.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
		gradientElement.current.style.background = `-moz-linear-gradient(left, ${color1} 0%, ${color2} 100%)`;

		step.current += gradientSpeed;
		if (step.current >= 1) {
			step.current %= 1;
			colorIndices[0] = colorIndices[1];
			colorIndices[2] = colorIndices[3];

			colorIndices[1] =
				(colorIndices[1] +
					Math.floor(1 + Math.random() * (colors.length - 1))) %
				colors.length;
			colorIndices[3] =
				(colorIndices[3] +
					Math.floor(1 + Math.random() * (colors.length - 1))) %
				colors.length;
		}
	}, [colorIndices, colors]);

	useEffect(() => {
		const intervalId = setInterval(updateGradient, 10);
		return () => clearInterval(intervalId);
	}, [updateGradient]);

	return (
		<div
			ref={gradientElement}
			className="fixed w-screen h-screen top-0 left-0 -z-10 p-0 m-0"
		></div>
	);
}
