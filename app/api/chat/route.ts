import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { appImageTools } from "./tools";

export async function POST(req: Request) {
	const { messages }: { messages: UIMessage[] } = await req.json();

	const result = streamText({
		model: openai.responses("gpt-5-mini"),
		system:
			"あなたは Shuya のポートフォリオサイトのアシスタントです。アプリの画面画像、スクリーンショット、ロゴを見せる必要がある場合は、対応する画像表示ツールを使ってください。",
		messages: await convertToModelMessages(messages),
		tools: appImageTools,
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
