import {
	EmojiEmotionsRounded,
	ImageRounded,
	VideocamRounded,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import PostModal from "../Modals/PostModal";
const utilObj = [
	{ icon: <VideocamRounded />, title: "Live Video" },
	{ icon: <ImageRounded />, title: "Photo/video" },
	{ icon: <EmojiEmotionsRounded />, title: "Feeling/activity" },
];
import { useState } from "react";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/features/AuthSlice";
import ButtonComp from "../Buttons/Button";
import { UserInfo } from "../../types/Types";
const PostComponent = () => {
	const [isPostModal, setIsPostModal] = useState<boolean>(false);
	const {
		user: {
			userInfo: { profileimage, username },
		},
	} = useSelector(loggedInUser) as {
		user: {
			userInfo: UserInfo;
		};
	};
	return (
		<div className="">
			<div className="flex flex-col bg-primary-200 rounded-2xl p-4 md:p-6 gap-6">
				<div className="flex items-center gap-6">
					<div className="bg-primary-100 p-[3px] rounded-full">
						<img
							src={profileimage}
							className="w-14 h-12  rounded-full object-cover"
						/>
					</div>
					<p
						className="bg-gray-800/50 text-light hover:bg-gray-800 rounded-full transition duration-300 cursor-pointer  w-full p-4"
						onClick={() => setIsPostModal(true)}>
						What's on your mind, <span className="capitalize">{username}</span>?
					</p>
				</div>
				<div className="flex gap-4 justify-between flex-wrap">
					<div className="flex gap-2 md:gap-4 flex-wrap">
						{utilObj.map((obj, index) => (
							<div
								key={index}
								onClick={() => setIsPostModal(true)}
								className={`${index == 3 && "hidden sm:block"} ${
									index == 3 && "hidden md:block"
								} `}>
								<ButtonComp color="#010A13">
									<span
										className={`text-${
											index == 0
												? "green-500"
												: index == 1
												? "yellow-400"
												: index == 2
												? "sky-800"
												: "gray-400"
										}`}>
										{obj.icon}
									</span>
									{obj?.title}
								</ButtonComp>
							</div>
						))}
					</div>

					<Button
						sx={{
							color: "white",
							backgroundColor: "#0C88EF",
							textTransform: "capitalize",
							"&:hover": { backgroundColor: "#0C88EF" },
						}}
						onClick={() => setIsPostModal(true)}>
						Post
					</Button>
				</div>
				{isPostModal && <PostModal setIsPostModal={setIsPostModal} />}
			</div>
		</div>
	);
};
export default PostComponent;
