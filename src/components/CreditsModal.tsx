import Modal from "antd/lib/modal";

type CreditsProps = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	okButtonProps: {
		style: {
			backgroundColor: string;
		};
	};
};

const CreditsModal = ({
	isOpen,
	setIsOpen,
	okButtonProps,
}: CreditsProps): JSX.Element => {
	return (
		<Modal
			okButtonProps={okButtonProps}
			title="Credits"
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
				This game is largely inspired by{" "}
				<a
					href="https://hexcodle.com/"
					target="_blank"
					className="underline hover:underline text-blue-500"
				>
					Hexcodle
				</a>{" "}
				by{" "}
				<a
					href="https://www.github.com/hannah-larsen"
					target="_blank"
					className="underline hover:underline text-blue-500"
				>
					hannah-larsen (Github)
				</a>
				.
				<br />
				<br />
				Developed by{" "}
				<a
					href="https://www.github.com/liyunze-coding"
					target="_blank"
					className="underline hover:underline text-blue-500"
				>
					liyunze-coding (Github)
				</a>{" "}
				aka{" "}
				<a
					href="https://www.twitch.tv/RythonDev"
					target="_blank"
					className="underline hover:underline text-blue-500"
				>
					RythonDev (Twitch)
				</a>
			</p>
		</Modal>
	);
};

export default CreditsModal;
