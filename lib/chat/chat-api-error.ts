"use client";

import { toast } from "sonner";
import {
	CHAT_RATE_LIMIT_ERROR_CODE,
	CHAT_RATE_LIMIT_ERROR_MESSAGE,
} from "@/lib/rate-limit/constants";

type ChatApiErrorPayload = {
	error?: {
		code?: string;
		message?: string;
	};
};

export class ChatRateLimitError extends Error {
	readonly code = CHAT_RATE_LIMIT_ERROR_CODE;

	constructor(message = CHAT_RATE_LIMIT_ERROR_MESSAGE) {
		super(message);
		this.name = "ChatRateLimitError";
	}
}

export const chatApiFetch: typeof fetch = async (input, init) => {
	const response = await fetch(input, init);
	if (response.status !== 429) return response;

	const payload = await readChatApiErrorPayload(response.clone());
	if (payload?.error?.code !== CHAT_RATE_LIMIT_ERROR_CODE) return response;

	throw new ChatRateLimitError(payload.error.message);
};

export const showChatErrorToast = (error: Error) => {
	if (!isChatRateLimitError(error)) return;

	toast.error("送信回数の上限に達しました", {
		id: "chat-rate-limit",
		description: error.message,
	});
};

const isChatRateLimitError = (error: Error) =>
	error instanceof ChatRateLimitError ||
	error.name === "ChatRateLimitError" ||
	error.message.includes(CHAT_RATE_LIMIT_ERROR_CODE);

const readChatApiErrorPayload = async (
	response: Response,
): Promise<ChatApiErrorPayload | undefined> => {
	try {
		return (await response.json()) as ChatApiErrorPayload;
	} catch {
		return undefined;
	}
};
