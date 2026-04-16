export type AppImage = {
	src: string;
	alt: string;
	width: number;
	height: number;
	displayWidth: number;
	displayHeight: number;
};

export type AppImageGallery = {
	title: string;
	images: AppImage[];
};

export type AppImageToolName =
	| "show-personal-projects-images"
	| "show-swit-study-images"
	| "show-bipick-images"
	| "show-limeseeds-images"
	| "show-text-count-images"
	| "show-focory-images";

export const appImageGalleries: Record<AppImageToolName, AppImageGallery> = {
	"show-personal-projects-images": {
		title: "個人開発プロジェクト",
		images: [
			{
				src: "/images/limeseeds/screenshot_1.png",
				alt: "Lime Seeds のスクリーンショット 1",
				width: 1284,
				height: 2778,
				displayWidth: 180,
				displayHeight: 389,
			},
			{
				src: "/images/swit-study/screenshot_home.png",
				alt: "SWiT Study のホーム画面",
				width: 2796,
				height: 1290,
				displayWidth: 320,
				displayHeight: 148,
			},
			{
				src: "/images/bipick/screenshot_home.png",
				alt: "BiPick のホーム画面",
				width: 1290,
				height: 2796,
				displayWidth: 180,
				displayHeight: 390,
			},
		],
	},
	"show-swit-study-images": {
		title: "SWiT Study",
		images: [
			{
				src: "/images/swit-study/screenshot_home.png",
				alt: "SWiT Study のホーム画面",
				width: 2796,
				height: 1290,
				displayWidth: 320,
				displayHeight: 148,
			},
			{
				src: "/images/swit-study/screenshot_layout.png",
				alt: "SWiT Study の学習レイアウト画面",
				width: 2796,
				height: 1290,
				displayWidth: 320,
				displayHeight: 148,
			},
			{
				src: "/images/swit-study/screenshot_friend.png",
				alt: "SWiT Study のフレンド画面",
				width: 2796,
				height: 1290,
				displayWidth: 320,
				displayHeight: 148,
			},
			{
				src: "/images/swit-study/screenshot_log.png",
				alt: "SWiT Study のログ画面",
				width: 2796,
				height: 1290,
				displayWidth: 320,
				displayHeight: 148,
			},
		],
	},
	"show-bipick-images": {
		title: "BiPick",
		images: [
			{
				src: "/images/bipick/screenshot_home.png",
				alt: "BiPick のホーム画面",
				width: 1290,
				height: 2796,
				displayWidth: 180,
				displayHeight: 390,
			},
			{
				src: "/images/bipick/screenshot_ask.png",
				alt: "BiPick の質問画面",
				width: 1290,
				height: 2796,
				displayWidth: 180,
				displayHeight: 390,
			},
			{
				src: "/images/bipick/screenshot_pick.png",
				alt: "BiPick の選択画面",
				width: 1290,
				height: 2796,
				displayWidth: 180,
				displayHeight: 390,
			},
			{
				src: "/images/bipick/screenshot_get.png",
				alt: "BiPick の結果画面",
				width: 1290,
				height: 2796,
				displayWidth: 180,
				displayHeight: 390,
			},
		],
	},
	"show-limeseeds-images": {
		title: "Lime Seeds",
		images: [
			{
				src: "/images/limeseeds/screenshot_1.png",
				alt: "Lime Seeds のスクリーンショット 1",
				width: 1284,
				height: 2778,
				displayWidth: 180,
				displayHeight: 389,
			},
			{
				src: "/images/limeseeds/screenshot_2.png",
				alt: "Lime Seeds のスクリーンショット 2",
				width: 1284,
				height: 2778,
				displayWidth: 180,
				displayHeight: 389,
			},
			{
				src: "/images/limeseeds/screenshot_3.png",
				alt: "Lime Seeds のスクリーンショット 3",
				width: 1284,
				height: 2778,
				displayWidth: 180,
				displayHeight: 389,
			},
			{
				src: "/images/limeseeds/screenshot_4.png",
				alt: "Lime Seeds のスクリーンショット 4",
				width: 1284,
				height: 2778,
				displayWidth: 180,
				displayHeight: 389,
			},
		],
	},
	"show-text-count-images": {
		title: "Text Count",
		images: [
			{
				src: "/images/text-count/screenshot.png",
				alt: "Text Count のスクリーンショット",
				width: 1320,
				height: 686,
				displayWidth: 320,
				displayHeight: 166,
			},
		],
	},
	"show-focory-images": {
		title: "Focory",
		images: [
			{
				src: "/images/focory/logo.png",
				alt: "Focory のロゴ",
				width: 2550,
				height: 1050,
				displayWidth: 320,
				displayHeight: 132,
			},
		],
	},
};
