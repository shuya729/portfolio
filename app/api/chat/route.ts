import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { NextResponse } from "next/server";
import { consumeChatIpRateLimit } from "@/lib/rate-limit/chat-ip-rate-limit";
import {
	CHAT_RATE_LIMIT_ERROR_CODE,
	CHAT_RATE_LIMIT_ERROR_MESSAGE,
} from "@/lib/rate-limit/constants";
import { SYSTEM_PROMPT } from "./prompts/system-prompt";
import { appImageTools } from "./tools";

export async function POST(req: Request) {
	const rateLimit = await consumeChatIpRateLimit(req);
	if (!rateLimit.allowed) {
		return NextResponse.json(
			{
				error: {
					code: CHAT_RATE_LIMIT_ERROR_CODE,
					message: CHAT_RATE_LIMIT_ERROR_MESSAGE,
					limit: rateLimit.limit,
					remaining: rateLimit.remaining,
					resetAt: rateLimit.resetAt.toISOString(),
				},
			},
			{
				status: 429,
				headers: {
					"Retry-After": String(rateLimit.retryAfterSeconds),
				},
			},
		);
	}

	const { messages }: { messages: UIMessage[] } = await req.json();

	const result = streamText({
		model: openai.responses("gpt-5-mini"),
		system: SYSTEM_PROMPT,
		messages: await convertToModelMessages(messages),
		tools: appImageTools,
		providerOptions: {
			openai: {
				reasoningEffort: "low",
				textVerbosity: "low",
			},
		},
	});

	return result.toUIMessageStreamResponse({
		sendReasoning: false,
	});
}
