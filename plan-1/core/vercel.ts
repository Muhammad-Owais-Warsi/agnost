import { AgnostCore } from "./core";
import { generateText } from "ai";

const agnostopenai = new AgnostCore({
    orgId: "org-123",
});

agnostopenai.init();

await generateText({
    model: openai("gpt-4o"), // or any other supported model
    prompt: "Hello",
    experimental_telemetry: {
        isEnabled: true,
        metadata: {
            userId: "user-42",
            sessionId: "conv-abc123",
        },
    },
});
