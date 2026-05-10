import { jsonSchema, tool } from "ai";
import {
	type AppImageGallery,
	type AppImageToolName,
	appImageGalleries,
} from "./app-image-galleries";

type EmptyInput = Record<string, never>;

const emptyInputSchema = jsonSchema<EmptyInput>({
	type: "object",
	properties: {},
	additionalProperties: false,
});

const descriptions: Record<AppImageToolName, string> = {
	"show-personal-projects-images":
		"個人開発プロジェクト全体の代表画像を横並びの画像ギャラリーとして表示する。Lime Seeds、SWiT Study、BiPick、AI文字数調整くん、Focory を横断して、個人開発の一覧、代表作、開発経験全体の画像やスクリーンショットを見せる必要があるときに使う。",
	"show-swit-study-images":
		"SWiT Study のスクリーンショットを横並びの画像ギャラリーとして表示する。SWiT Study の画面、画像、スクリーンショットを見せる必要があるときに使う。",
	"show-bipick-images":
		"BiPick のスクリーンショットを横並びの画像ギャラリーとして表示する。BiPick の画面、画像、スクリーンショットを見せる必要があるときに使う。",
	"show-limeseeds-images":
		"Lime Seeds のスクリーンショットを横並びの画像ギャラリーとして表示する。Lime Seeds の画面、画像、スクリーンショットを見せる必要があるときに使う。",
	"show-text-count-images":
		"AI文字数調整くん のスクリーンショットを画像ギャラリーとして表示する。AI文字数調整くん の画面、画像、スクリーンショットを見せる必要があるときに使う。",
	"show-focory-images":
		"Focory のロゴとスクリーンショットを画像ギャラリーとして表示する。Focory の画面、画像、ロゴ、スクリーンショットを見せる必要があるときに使う。",
};

export const createAppImageTool = (toolName: AppImageToolName) =>
	tool<EmptyInput, AppImageGallery>({
		description: descriptions[toolName],
		inputSchema: emptyInputSchema,
		execute: () => appImageGalleries[toolName],
	});
