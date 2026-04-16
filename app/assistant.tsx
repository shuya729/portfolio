"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import {
	AssistantChatTransport,
	useChatRuntime,
} from "@assistant-ui/react-ai-sdk";
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { AppImageToolUIs } from "@/app/api/chat/tools/app-image-tool-ui";
import { Thread } from "@/components/assistant-ui/thread";
import { chatApiFetch, showChatErrorToast } from "@/lib/chat/chat-api-error";

export const Assistant = () => {
	const runtime = useChatRuntime({
		onError: showChatErrorToast,
		sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
		transport: new AssistantChatTransport({
			api: "/api/chat",
			fetch: chatApiFetch,
		}),
	});

	return (
		<AssistantRuntimeProvider runtime={runtime}>
			<AppImageToolUIs />
			<main className="h-dvh w-full overflow-hidden bg-background">
				<Thread />
			</main>
		</AssistantRuntimeProvider>
	);
};
