import { createAppImageTool } from "./create-app-image-tool";

export const appImageTools = {
	"show-personal-projects-images": createAppImageTool(
		"show-personal-projects-images",
	),
	"show-swit-study-images": createAppImageTool("show-swit-study-images"),
	"show-bipick-images": createAppImageTool("show-bipick-images"),
	"show-limeseeds-images": createAppImageTool("show-limeseeds-images"),
	"show-text-count-images": createAppImageTool("show-text-count-images"),
	"show-focory-images": createAppImageTool("show-focory-images"),
};
