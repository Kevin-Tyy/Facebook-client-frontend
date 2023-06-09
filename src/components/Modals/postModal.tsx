import { useEffect, useState, useRef } from "react";
import {
	CloseRounded,
	PeopleAltRounded,
	EmojiEmotionsOutlined,
	GifBoxRounded,
	MoreHoriz,
} from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { Image } from "@mui/icons-material";
import axios from "axios";
import { BaseURL } from "../../utils/Link";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import { UserInfo } from "../../types/Types";
import EmojiPicker from "emoji-picker-react";
import { Emoji } from "../../types/Types";
interface Props {
	setIsPostModal: (value: any) => void;
}

const utilIcons = [
	<EmojiEmotionsOutlined fontSize="large" />,
	<GifBoxRounded fontSize="large" />,
	<MoreHoriz fontSize="large" />,
];

const PostModal = ({ setIsPostModal }: Props) => {
	const [postText, setPostText] = useState<string>("");
	const [postMedia, setPostMedia] = useState<any>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showPicker, setShowPicker] = useState<boolean>(false);
	const pickerRef = useRef<HTMLDivElement | null>(null);
	const {
		user: {
			userInfo: { userId, username, profileimage },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};

	const submitPostDetails = async (url: string) => {
		try {
			setIsLoading(true);
			const { data } = await axios.post(url, {
				postText,
				postMedia,
				userId,
			});
			if (data) {
				setIsLoading(false);
				if (data.success) {
					toast.success(data.msg);
				} else {
					toast.error(data.msg);
				}
			}
		} catch (error) {
			setIsLoading(false);
			toast.error("Something went wrong, try again later");
		}
	};
	const handleSubmit = (e: any) => {
		e.preventDefault();
		submitPostDetails(`${BaseURL}/post`);
	};
	const handleFileInput = (e: any) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			const result = reader.result;
			setPostMedia(result);
		};
	};
	const handleClickOutside = (event: any) => {
		if (pickerRef.current && !pickerRef.current.contains(event.target)) {
			setShowPicker(false);
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	const onEmojiClick = (emojiObject: Emoji) => {
		setPostText((prevInput) => prevInput + emojiObject.emoji);
	};

	return (
		<div
			className="backdrop-blur-sm bg-gray-950/50 h-screen w-full fixed top-0 right-0 bottom-0 left-0 z-[10] flex justify-center items-center "
			onClick={() => setIsPostModal(false)}>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.1 }}
				transition={{ duration: 0.2, delay: 0.2 }}
				variants={{
					hidden: { opacity: 0, y: -30 },
					visible: { opacity: 1, y: 0 },
				}}
				onClick={(e) => e.stopPropagation()}
				className="relative bg-primary-200 w-full  max-w-[550px] p-3 rounded-lg ">
				<div className="p-3 border-b border-gray-700">
					<h1 className="text-2xl text-center font-bold text-light">
						Create a post
					</h1>

					<div
						onClick={() => setIsPostModal(false)}
						className="hover:bg-gray-700 rounded-full p-1.5 absolute top-5 right-3 cursor-pointer ">
						<CloseRounded sx={{ color: "#fff" }} />
					</div>
				</div>
				<div className="p-2">
					<div className="flex items-center gap-2">
						<div className="bg-primary-100 p-1 rounded-full">
							<div className="bg-primary-200 p-1 rounded-full">
								<img src={profileimage} className="w-12 h-12  rounded-full" />
							</div>
						</div>
						<div className="flex flex-col items-start">
							<p className="text-light font-semibold capitalize">{username}</p>
							<div className="text-light bg-gray-700 px-1 py-[1px] rounded-md flex items-center gap-1 cursor-pointer transition duration-100 active:bg-gray-600">
								<PeopleAltRounded sx={{ fontSize: 15 }} />
								Friends
							</div>
						</div>
					</div>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<textarea
							rows={7}
							onChange={(e) => setPostText(e.target.value)}
							value={postText}
							className={`w-full resize-none outline-none  bg-transparent text-2xl text-light p-2 ${
								postMedia ? "h-20" : "h-40"
							}`}
							placeholder={`What's on your mind, ${username}?`}></textarea>
						{postMedia && (
							<img
								src={postMedia}
								className="my-3  h-60 object-cover mx-auto rounded-lg"
							/>
						)}
						<div className="w-full border border-gray-700 py-3 rounded-md flex items-center justify-between px-4">
							<p className="text-light">Add to your post</p>
							<div className="flex gap-3">
								<label htmlFor="imagepost">
									<Image
										className="text-green-500 cursor-pointer"
										fontSize="large"
									/>
								</label>
								<input
									id="imagepost"
									type="file"
									accept="image/png, image/jpeg"
									className="hidden"
									onChange={handleFileInput}
								/>

								{utilIcons.map((icon, index) => (
									<span
										onClick={() => setShowPicker(true)}
										key={index}
										className={` cursor-pointer ${
											index == 0
												? "text-yellow-400"
												: index == 1
												? "text-sky-800"
												: "text-gray-600"
										}`}>
										{icon}
									</span>
								))}
							</div>
						</div>
						<Button
							type="submit"
							disabled={isLoading}
							sx={{
								backgroundImage:
									"linear-gradient(to right , #04477e , #791fe0  )",
								p: 1.5,
								color: "#d5d5d5",
								textTransform: "capitalize",
							}}
							className="text-white rounded-md transtition duration-75">
							{isLoading ? (
								<CircularProgress size={24} sx={{ color: "#f5f5f5" }} />
							) : (
								"Post"
							)}
						</Button>
					</form>
				</div>
				{showPicker && (
					<div ref={pickerRef} className="absolute -bottom-40 -right-40">
						<EmojiPicker onEmojiClick={onEmojiClick} theme='dark' />
					</div>
				)}
			</motion.div>
			<Toaster />
		</div>
	);
};

export default PostModal;
