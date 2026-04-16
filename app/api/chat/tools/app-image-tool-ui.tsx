"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";
import Image from "next/image";
import {
	type AppImageGallery,
	type AppImageToolName,
	appImageGalleries,
} from "./app-image-galleries";

type EmptyInput = Record<string, never>;

type AppImageGalleryViewProps = {
	gallery: AppImageGallery;
	isLoading: boolean;
};

const createAppImageToolUI = (toolName: AppImageToolName) =>
	makeAssistantToolUI<EmptyInput, AppImageGallery>({
		toolName,
		render: ({ result, status }) => (
			<AppImageGalleryView
				gallery={result ?? appImageGalleries[toolName]}
				isLoading={status.type === "running" && !result}
			/>
		),
	});

export const SwitStudyImagesToolUI = createAppImageToolUI(
	"show-swit-study-images",
);
export const PersonalProjectsImagesToolUI = createAppImageToolUI(
	"show-personal-projects-images",
);
export const BipickImagesToolUI = createAppImageToolUI("show-bipick-images");
export const LimeseedsImagesToolUI = createAppImageToolUI(
	"show-limeseeds-images",
);
export const TextCountImagesToolUI = createAppImageToolUI(
	"show-text-count-images",
);
export const FocoryImagesToolUI = createAppImageToolUI("show-focory-images");

export const AppImageToolUIs = () => {
	return (
		<>
			<PersonalProjectsImagesToolUI />
			<SwitStudyImagesToolUI />
			<BipickImagesToolUI />
			<LimeseedsImagesToolUI />
			<TextCountImagesToolUI />
			<FocoryImagesToolUI />
		</>
	);
};

const AppImageGalleryView = ({
	gallery,
	isLoading,
}: AppImageGalleryViewProps) => {
	return (
		<section className="my-3 w-full" aria-label={`${gallery.title} の画像`}>
			<div className="mb-2 flex items-center justify-between gap-3 px-1">
				<h3 className="font-medium text-foreground text-sm">{gallery.title}</h3>
			</div>
			<div className="-mx-2 overflow-x-auto overscroll-x-contain px-2 pb-2">
				<div className="flex w-max gap-3">
					{gallery.images.map((image) => (
						<div
							key={image.src}
							className="relative shrink-0 overflow-hidden rounded-lg border bg-muted/40 shadow-sm"
							style={{
								width: image.displayWidth,
								height: image.displayHeight,
							}}
						>
							<Image
								src={image.src}
								alt={image.alt}
								fill
								sizes={`${image.displayWidth}px`}
								className={`object-contain transition-opacity ${
									isLoading ? "opacity-60" : "opacity-100"
								}`}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
