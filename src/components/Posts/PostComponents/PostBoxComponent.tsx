import { Avatar } from "@mui/material";
import CommentComponent from "./CommentComponent";
import useDateFormatter from "../../../hooks/useDate";
import { MoreVert } from "@mui/icons-material";
interface Props {
    postMedia : string;
    postText : string;
	createdAt : Date;
}

const Box = ({ postMedia , postText , createdAt }: Props) => {
    const { formattedDate } = useDateFormatter(createdAt);

	return (
		<div className="bg-primary-200 rounded-lg py-3 px-6 flex flex-col gap-4 ">
			<div className="flex py-3 justify-between border-b border-gray-600"> 
				<div className="flex gap-4 items-center">
					<Avatar sx={{backgroundColor : 'violet'}}>J</Avatar>
					<div className="flex flex-col">
						<p className="text-light">John Smith</p>
						<p className="text-light/60">{formattedDate}</p>
					</div>
				</div>
				<div className="text-primary-100 hover:bg-gray-950/50 rounded-full w-12 flex justify-center items-center cursor-pointer transition duration-300 active:bg-primary-300 p-2 ">
					<MoreVert/>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="text-white">{postText}</h1>
				<div className="flex flex-col gap-2">
					<img src={postMedia} className="w-full max-h-[500px] object-cover rounded-xl" />
					<CommentComponent/>	

				</div>

			</div>
		</div>
	);
};

export default Box;
