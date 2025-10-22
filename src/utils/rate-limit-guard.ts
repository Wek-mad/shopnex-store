import { getClientIp } from "./get-client-ip";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { PayloadRequest } from "payload";

const rateLimiter = new RateLimiterMemory({
    duration: 60,
    points: 5,
});

type GuardResult = { ok: true; ip: string } | { ok: false; response: Response };

export const rateLimitGuard = async (
    req: PayloadRequest
): Promise<GuardResult> => {
    const ip = getClientIp(req);

    if (!ip) {
        return {
            ok: false,
            response: Response.json(
                { message: "Missing IP address.", statusCode: 400 },
                { status: 400 }
            ),
        };
    }

    try {
        await rateLimiter.consume(ip, 1);
    } catch (err: any) {
        return {
            ok: false,
            response: Response.json(
                { message: "Rate limit exceeded.", statusCode: 429 },
                { status: 429 }
            ),
        };
    }

    return { ok: true, ip };
};
