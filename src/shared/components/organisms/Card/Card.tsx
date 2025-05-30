"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import defaultImage from "../../../../../public/defaultImgPost.webp";
import { type ListPost } from "@/app/api/posts/route";
import { CategoryItem } from "@/shared/components/atoms/CategoryItem/CategoryItem";
import { getLocalizedRoutes } from "@/shared/utils/routes";
import { i18nConfig } from "@/i18n/settings";
import { labels } from "@/shared/utils/labels";
import "./card.css";

export type PostCard = ListPost;

interface CardProps {
	item: PostCard;
	locale?: string;
}

export const Card = ({ item, locale = "pl" }: CardProps) => {
	const { t, i18n } = useTranslation();
	const currentLocale = i18n.language || locale || i18nConfig.defaultLocale;
	const localizedRoutes = getLocalizedRoutes(currentLocale);
	const [isImageLoading, setIsImageLoading] = useState(true);

	return (
		<div className="post__wrapper">
			<Link href={localizedRoutes.post(item.slug, item.catSlug)} className="post__imageContainer">
				<div
					className={`post__image-placeholder ${isImageLoading ? "visible" : "hidden"}`}
					style={{
						backgroundColor: `var(--category-${item.catSlug}, #666)`,
						opacity: 0.2,
					}}
				/>
				<Image
					src={item.img || defaultImage}
					alt="main post photo"
					fill
					className={`post__image ${isImageLoading ? "post__image--loading" : "post__image"}`}
					placeholder="blur"
					blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P//fwAJMAP6jQC5dQAAAABJRU5ErkJggg=="
					onLoadingComplete={() => setIsImageLoading(false)}
				/>
				<div className="textContainer">
					<CategoryItem category={item.catSlug} />
					<h1 className="textContainer__title">{item.title}</h1>
					<div className="mt-8 flex justify-between">
						<div className="textContainer__link">
							{t("card.readMore", { defaultValue: labels.card.readMore })}
						</div>
						<span className="textContainer__date">{item.createdAt.substring(0, 10)}</span>
					</div>
				</div>
			</Link>
		</div>
	);
};
