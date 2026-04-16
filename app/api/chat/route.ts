import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import {
	convertToModelMessages,
	type JSONSchema7,
	streamText,
	type UIMessage,
} from "ai";

export async function POST(req: Request) {
	const {
		messages,
		system,
		tools,
	}: {
		messages: UIMessage[];
		system?: string;
		tools?: Record<string, { description?: string; parameters: JSONSchema7 }>;
	} = await req.json();

	const result = streamText({
		model: openai.responses("gpt-5-mini"),
		messages: await convertToModelMessages(messages),
		system,
		tools: {
			...frontendTools(tools ?? {}),
		},
		providerOptions: {
			openai: {
				reasoningEffort: "low",
				reasoningSummary: "auto",
			},
		},
	});

	return result.toUIMessageStreamResponse();
}
