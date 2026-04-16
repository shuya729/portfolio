import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export async function POST(req: Request) {
	const { messages }: { messages: UIMessage[] } = await req.json();

	const result = streamText({
		model: openai.responses("gpt-5-mini"),
		messages: await convertToModelMessages(messages),
		providerOptions: {
			openai: {
				reasoningEffort: "low",
				reasoningSummary: "auto",
			},
		},
	});

	return result.toUIMessageStreamResponse({
		sendReasoning: false,
	});
}
