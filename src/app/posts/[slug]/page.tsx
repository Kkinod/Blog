import Image from "next/image";
import xss from "xss";
import defaultImgPost from "../../../../public/defaultImgPost.webp";
import { Comments } from "@/components/molecules/Comments/Comments";
import { getDataSinglePost } from "@/utils/services/singlePost/request";
import { labels } from "@/views/labels";
import "./singlePage.css";

interface Params {
	slug: string;
}

const SinglePage = async ({ params }: { params: Params }) => {
	const { slug } = params;
	let data;

	try {
		data = await getDataSinglePost(slug);
	} catch (error) {
		return (
			<div className="flex flex-1 items-center justify-center text-[2rem]">
				{labels.errors.postNotFound}
			</div>
		);
	}

	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };

		return new Date(dateString).toLocaleDateString("en-US", options);
	};

	const cleanHtml: string = xss(data?.desc);

	return (
		<div className="singlePage">
			<div className="singlePage__titleWrapper">
				<div className="text__userTextContainer">
					<span className="text__userDate">{formatDate(data?.createdAt).toUpperCase()}</span>
				</div>
				<h1 className="singlePage__textTitle">{data?.title}</h1>
				<div className="singlePage__textTitle_divider" />
			</div>
			<div className="singlePage__post">
				<div className="singlePage__infoContainer">
					<div className="singlePage__imageContainer">
						<Image
							src={data?.img || defaultImgPost}
							alt="post image"
							layout="responsive"
							width={700}
							height={475}
							className="singlePage__image"
						/>
					</div>
				</div>
				<div className="singlePage__content">
					<div className="content__post">
						<div
							className="content__postDescription"
							dangerouslySetInnerHTML={{ __html: cleanHtml }}
						/>
						<div className="content__comment">
							<Comments postSlug={slug} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SinglePage;
