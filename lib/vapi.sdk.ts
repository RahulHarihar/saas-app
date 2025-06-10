import Vapi from "@vapi-ai/web";

let vapiInstance: Vapi | null = null;

if (typeof window !== "undefined") {
	const apiKey = process.env.NEXT_PUBLIC_VAPI_TOKEN;
	if (!apiKey) {
		console.warn("Vapi API key is missing.");
	}
	vapiInstance = new Vapi(apiKey!);
}

export const vapi = vapiInstance;
