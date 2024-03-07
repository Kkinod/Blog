import { MenuPost } from "../ATOMIC_DESIGN/molecules/MenuPost/MenuPost";
import { MenuCategories } from "../ATOMIC_DESIGN/molecules/MenuCategories/MenuCategories";
import { editorsPickPosts, mostPopularPosts } from "./config";
import "./menu.css";

export const Menu = () => {
	return (
		<div className="menu">
			<h2 className="menu__subtitle">{"What's hot"}</h2>
			<h1 className="menu__title">Most Popular</h1>
			{mostPopularPosts.map((config) => (
				<MenuPost
					key={config.id}
					withImage={config.withImage}
					linkHref={config.linkHref}
					categoryTitle={config.categoryTitle}
					text={config.text}
					textName={config.textName}
					textDate={config.textDate}
				/>
			))}

			<h2 className="menu__subtitle">Discover by topic</h2>
			<h1 className="menu__title">Categories</h1>
			<MenuCategories />

			<h2 className="menu__subtitle">Chosen by the editor</h2>
			<h1 className="menu__title">Editors Pick</h1>
			{editorsPickPosts.map((config) => (
				<MenuPost
					key={config.id}
					withImage={config.withImage}
					linkHref={config.linkHref}
					itemImageSrc={config.itemImageSrc}
					itemImageAlt={config.itemImageAlt}
					categoryTitle={config.categoryTitle}
					text={config.text}
					textName={config.textName}
					textDate={config.textDate}
				/>
			))}
		</div>
	);
};
