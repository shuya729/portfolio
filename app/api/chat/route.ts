import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { SYSTEM_PROMPT } from "./prompts/system-prompt";
import { appImageTools } from "./tools";

export async function POST(req: Request) {
	const { messages }: { messages: UIMessage[] } = await req.json();

	const result = streamText({
		model: openai.responses("gpt-5-mini"),
		system: SYSTEM_PROMPT,
		messages: await convertToModelMessages(messages),
		tools: appImageTools,
		providerOptions: {
			openai: {
				reasoningEffort: "low",
				textVerbosity: 'low',
			},
		},
	});

	return result.toUIMessageStreamResponse({
		sendReasoning: false,
	});
}
