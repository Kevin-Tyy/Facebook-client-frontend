import Box from "../../../components/Posts/PostComponents/PostBoxComponent";
import ProfileDetail from "../../../components/Detail/ProfileDetail";
import Skeleton from "react-loading-skeleton";
import PostSkeleton from "../../../components/Loaders/Skeleton/Post";
import PostComponent from "../../../components/Posts/Post";
import { Posts, Userdata } from "../../../types/Types";
interface Props {
	loading : boolean
	userData : Userdata | null
	userId : string
	isOpen : boolean
	setIsOpen : any
	posts : Posts[] | null
}
const PostLayout = ({ loading , userData , userId , isOpen , setIsOpen , posts }: Props) => {
	return (
		<div>
			<div className="flex flex-col items-start lg:flex-row gap-5">
				<div className="bg-primary-200 w-full lg:max-w-[550px] p-5 xl:sticky top-[160px] rounded-lg border border-gray-700/50">
					<div>
						{loading ? (
							<Skeleton height={40} />
						) : (
							<h1 className="text-2xl text-light text-center">
								About{" "}
								<span className="capitalize text-primary-100">
									{userData?.userId == userId ? "You" : userData?.username}
								</span>
							</h1>
						)}
						<hr className="border-1 border-gray-700 my-6" />
						<ProfileDetail
							userId={userId}
							userData={userData}
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							loading={loading}
						/>
					</div>
				</div>
				<div className="w-full flex flex-col gap-4">
					{userData?.userId == userId && <PostComponent />}
					{userData?.username && (
						<div className="bg-primary-200 p-2 rounded-md border border-gray-800">
							<h1 className="text-light text-3xl text-center capitalize">
								{userData?.userId == userId
									? "Your"
									: `${userData?.username}'s`}{" "}
								Posts
							</h1>
						</div>
					)}
					{loading ? (
						<PostSkeleton />
					) : (
						<div>
							{posts && posts.length ? (
								<div className="flex flex-col gap-6 ">
									{posts.map((post: object, index: number) => (
										<div key={index}>
											<Box {...(post as Posts)} />
										</div>
									))}
								</div>
							) : (
								<p className="text-center text-light text-xl mt-4">
									😞
									{userData?.userId == userId ? (
										"You haven't"
									) : (
										<span className="capitalize">
											{userData?.username} hasn't
										</span>
									)}{" "}
									posted anything yet
								</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PostLayout;
