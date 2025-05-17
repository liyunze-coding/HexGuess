import { useEffect, useRef, useCallback, useMemo } from "react";

const GRADIENT_SPEED = 0.0009;
const INTERVAL_MS = 10;

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
    const colorIndices = useRef([0, 1, 2, 3]);
    const gradientElement = useRef<HTMLDivElement>(null);

    const updateGradient = useCallback(() => {
        if (!gradientElement.current) return;

        const [i0, i1, i2, i3] = colorIndices.current;
        const c0_0 = colors[i0];
        const c0_1 = colors[i1];
        const c1_0 = colors[i2];
        const c1_1 = colors[i3];

        const istep = 1 - step.current;
        const color1 = `rgba(
            ${Math.round(istep * c0_0[0] + step.current * c0_1[0])},
            ${Math.round(istep * c0_0[1] + step.current * c0_1[1])},
            ${Math.round(istep * c0_0[2] + step.current * c0_1[2])},
            ${alpha}
        )`;
        const color2 = `rgba(
            ${Math.round(istep * c1_0[0] + step.current * c1_1[0])},
            ${Math.round(istep * c1_0[1] + step.current * c1_1[1])},
            ${Math.round(istep * c1_0[2] + step.current * c1_1[2])},
            ${alpha}
        )`;

        gradientElement.current.style.background = `linear-gradient(to right, ${color1}, ${color2})`;

        step.current += GRADIENT_SPEED;
        if (step.current >= 1) {
            step.current %= 1;
            colorIndices.current[0] = colorIndices.current[1];
            colorIndices.current[2] = colorIndices.current[3];

            colorIndices.current[1] =
                (colorIndices.current[1] +
                    Math.floor(1 + Math.random() * (colors.length - 1))) %
                colors.length;
            colorIndices.current[3] =
                (colorIndices.current[3] +
                    Math.floor(1 + Math.random() * (colors.length - 1))) %
                colors.length;
        }
    }, [colors]);

    useEffect(() => {
        const intervalId = setInterval(updateGradient, INTERVAL_MS);
        return () => clearInterval(intervalId);
    }, [updateGradient]);

    return (
        <div
            ref={gradientElement}
            className="fixed w-screen h-screen top-0 left-0 -z-10 p-0 m-0"
            aria-hidden="true"
        />
    );
}