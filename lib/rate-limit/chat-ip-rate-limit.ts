import { Redis } from "@upstash/redis";
import {
	CHAT_RATE_LIMIT_MAX_REQUESTS_PER_HOUR,
	CHAT_RATE_LIMIT_WINDOW_SECONDS,
} from "@/lib/rate-limit/constants";

const redis = Redis.fromEnv();

export type ChatIpRateLimitResult = {
	allowed: boolean;
	count: number;
	key: string;
	limit: number;
	remaining: number;
	resetAt: Date;
	retryAfterSeconds: number;
};

export const consumeChatIpRateLimit = async (
	request: Request,
	now = new Date(),
): Promise<ChatIpRateLimitResult> => {
	const ip = getClientIp(request);
	const { hourKey, resetAt, ttlSeconds } = getHourlyWindow(now);
	const key = `rl:chat:ip:${ip}:hour:${hourKey}`;

	const [count] = await redis
		.pipeline()
		.incr(key)
		.expire(key, ttlSeconds)
		.exec();
	const remaining = Math.max(CHAT_RATE_LIMIT_MAX_REQUESTS_PER_HOUR - count, 0);

	return {
		allowed: count <= CHAT_RATE_LIMIT_MAX_REQUESTS_PER_HOUR,
		count,
		key,
		limit: CHAT_RATE_LIMIT_MAX_REQUESTS_PER_HOUR,
		remaining,
		resetAt,
		retryAfterSeconds: ttlSeconds,
	};
};

const getClientIp = (request: Request) => {
	const forwardedFor = getFirstHeaderValue(
		request.headers.get("x-forwarded-for"),
	);
	const realIp = getFirstHeaderValue(request.headers.get("x-real-ip"));
	const cfConnectingIp = getFirstHeaderValue(
		request.headers.get("cf-connecting-ip"),
	);
	const forwarded = getForwardedFor(request.headers.get("forwarded"));

	return normalizeIp(
		forwardedFor ?? realIp ?? cfConnectingIp ?? forwarded ?? "unknown",
	);
};

const getFirstHeaderValue = (value: string | null) =>
	value
		?.split(",")
		.map((item) => item.trim())
		.find(Boolean);

const getForwardedFor = (value: string | null) => {
	if (!value) return undefined;

	const forwardedFor = value
		.split(",")
		.flatMap((entry) => entry.split(";"))
		.map((item) => item.trim())
		.find((item) => item.toLowerCase().startsWith("for="));

	return forwardedFor?.slice("for=".length);
};

const normalizeIp = (ip: string) => {
	let normalized = ip.trim().replace(/^"|"$/g, "");
	const bracketedIpv6 = normalized.match(/^\[([^\]]+)\](?::\d+)?$/);
	if (bracketedIpv6) normalized = bracketedIpv6[1];

	const ipv4WithPort = normalized.match(/^(\d{1,3}(?:\.\d{1,3}){3}):\d+$/);
	if (ipv4WithPort) normalized = ipv4WithPort[1];

	return normalized || "unknown";
};

const getHourlyWindow = (date: Date) => {
	const year = date.getUTCFullYear();
	const month = date.getUTCMonth();
	const day = date.getUTCDate();
	const hour = date.getUTCHours();
	const resetAt = new Date(Date.UTC(year, month, day, hour + 1));
	const ttlSeconds = Math.max(
		1,
		Math.ceil((resetAt.getTime() - date.getTime()) / 1000),
	);

	return {
		hourKey: formatUtcHourKey(date),
		resetAt,
		ttlSeconds: Math.min(ttlSeconds, CHAT_RATE_LIMIT_WINDOW_SECONDS),
	};
};

const formatUtcHourKey = (date: Date) => {
	const yyyy = String(date.getUTCFullYear()).padStart(4, "0");
	const MM = String(date.getUTCMonth() + 1).padStart(2, "0");
	const dd = String(date.getUTCDate()).padStart(2, "0");
	const HH = String(date.getUTCHours()).padStart(2, "0");

	return `${yyyy}${MM}${dd}${HH}`;
};
