import { labels } from "@/views/labels";
import { Button } from "@/components/ui/button";

interface PublishButtonProps {
	onPublish: () => void;
	disabled?: boolean;
}

export const PublishButton = ({ onPublish, disabled = false }: PublishButtonProps) => {
	return (
		<div className="writePage__publishContainer">
			<Button
				onClick={onPublish}
				aria-label={labels.writePost.publishAriaLabel}
				className="writePage__publish"
				disabled={disabled}
			>
				{labels.publish}
			</Button>
		</div>
	);
};
