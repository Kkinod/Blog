import dynamic from "next/dynamic";
import { toast } from "sonner";
import { labels } from "@/shared/utils/labels";
import { AnimatedText } from "@/shared/components/atoms/AnimatedText/AnimatedText";
import { useClientTranslation } from "@/i18n/client-hooks";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/monokai.css";
import "./ContentEditor.css";

type ImageActionsModule = {
	ImageActions: unknown;
};

type ImageFormatsModule = {
	ImageFormats: unknown;
};

const EditorLoadingComponent = () => {
	const { t } = useClientTranslation();
	return (
		<div className="writePage__editor-loading">
			<AnimatedText
				text={t("loading", { defaultValue: labels.loading })}
				theme="matrix"
				size="large"
			/>
		</div>
	);
};

const ReactQuill = dynamic(
	async () => {
		const { default: RQ } = await import("react-quill");

		if (typeof window !== "undefined") {
			try {
				// Imports Quill and image resizer
				// eslint-disable-next-line import/no-unresolved
				const Quill = await import("quill");

				// Import Image Modules for alignment
				const imageActionsModule = (await import(
					"@xeger/quill-image-actions"
				)) as ImageActionsModule;
				const imageFormatsModule = (await import(
					"@xeger/quill-image-formats"
				)) as ImageFormatsModule;

				const hljs = await import("highlight.js");

				// Register image modules
				Quill.default.register("modules/imageActions", imageActionsModule.ImageActions);
				Quill.default.register("modules/imageFormats", imageFormatsModule.ImageFormats);

				// Configure highlight.js globally
				window.hljs = hljs.default;
			} catch (error) {
				toast.error(labels.errors.errorRegisteringModules);
			}
		}

		return RQ;
	},
	{
		ssr: false,
		loading: EditorLoadingComponent,
	},
);

interface ContentEditorProps {
	content: string;
	onContentChange: (content: string) => void;
	hasError: boolean;
}

declare global {
	interface Window {
		hljs: {
			highlightAuto: (text: string) => { value: string };
		};
	}
}

const modules = {
	toolbar: {
		container: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			["bold", "italic", "underline", "strike"],
			["blockquote", "code-block"],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ align: [] }],
			["link", "image", "video"],
			[{ color: [] }, { background: [] }],
			["clean"],
		],
	},
	syntax: {
		highlight: (text: string) => {
			if (typeof window !== "undefined" && window.hljs) {
				return window.hljs.highlightAuto(text).value;
			}
			return text;
		},
	},
	clipboard: {
		matchVisual: false,
	},
	// Add new modules
	imageActions: {},
	imageFormats: {},
};

const formats = [
	"header",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"code-block",
	"list",
	"bullet",
	"link",
	"video",
	"image",
	"align",
	"color",
	"background",
	"width",
	"height",
	"list-ordered",
	"list-bullet",
	"indent",
	// Add new formats
	"float",
	"style",
];

export const ContentEditor = ({ content, onContentChange, hasError }: ContentEditorProps) => {
	const { t } = useClientTranslation();

	return (
		<div className="writePage__contentWrapper quill-editor-container">
			<ReactQuill
				theme="snow"
				value={content}
				onChange={onContentChange}
				placeholder={t("writePost.contentPlaceholder", {
					defaultValue: labels.writePost.contentPlaceholder,
				})}
				aria-label={t("writePost.contentAriaLabel", {
					defaultValue: labels.writePost.contentAriaLabel,
				})}
				className={`writePage__textArea quill-editor ${hasError ? "writePage__textArea--error" : ""}`}
				modules={modules}
				formats={formats}
			/>
			{hasError && (
				<span className="writePage__error editor-error">
					{t("errors.contentRequired", { defaultValue: labels.errors.contentRequired })}
				</span>
			)}
		</div>
	);
};
