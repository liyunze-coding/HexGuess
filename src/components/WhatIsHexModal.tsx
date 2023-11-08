import Modal from "antd/lib/modal";

type WhatIsHexProps = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	okButtonProps: {
		style: {
			backgroundColor: string;
		};
	};
};

const WhatIsHex = ({
	isOpen,
	setIsOpen,
	okButtonProps,
}: WhatIsHexProps): JSX.Element => {
	return (
		<Modal
			okButtonProps={okButtonProps}
			title="How the HEX do hex codes work?"
			open={isOpen}
			onOk={() => {
				setIsOpen(false);
			}}
			onCancel={() => {
				setIsOpen(false);
			}}
			cancelButtonProps={{ style: { display: "none" } }}
		>
			<p>
				A hex code can be represented as RRGGBB where R represents
				red, G represents green and B represents the blue values.
				The digits/letters in these locations denote the intensity
				of that colour; 0 being the lowest, and F being the highest.
			</p>
			<br />
			<p>
				0-9 are the first 10 values and A-F can be represented as
				digits 11-16, where 0 is the lowest intensity, and 16, or F,
				is the hightest intensity.
			</p>
			<br />
			<p>
				Some common hex codes are as follows:
				<ul className="list-disc list-inside">
					<li style={{ color: "#B5B5B1" }}>
						#FFFFFF: White (full intensity for all RGB
						components)
					</li>
					<li>
						#000000: Black (no intensity for all RGB
						components)
					</li>
					<li style={{ color: "red" }}>
						#FF0000: Red (full intensity for red, no intensity
						for green and blue)
					</li>
					<li style={{ color: "green" }}>
						#00FF00: Green (full intensity for green, no
						intensity for red and blue)
					</li>
					<li style={{ color: "blue" }}>
						#0000FF: Blue (full intensity for blue, no
						intensity for red and green)
					</li>
				</ul>
			</p>
			<br />
			<p>
				Still a little confused? No stress! Try the{" "}
				<a
					href="https://htmlcolorcodes.com/"
					target="_blank"
					className="underline text-blue-500 hover:underline"
				>
					hex colour codes
				</a>{" "}
				website.
			</p>
		</Modal>
	);
};

export default WhatIsHex;
