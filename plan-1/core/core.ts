import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { OpenAIInstrumentation } from "@arizeai/openinference-instrumentation-openai";
import OpenAI from "openai";
import { context } from "@opentelemetry/api";
import { setUser, setSession } from "@arizeai/openinference-core";

type AgnostConfig = {
    orgId: string;
};

export class AgnostCore {
    private openAIInstrumentation;
    private sdk;
    private orgId;

    constructor(config: AgnostConfig) {
        this.orgId = config.orgId;
        this.openAIInstrumentation = new OpenAIInstrumentation();
    }

    async init() {
        this.sdk = new NodeSDK({
            traceExporter: new OTLPTraceExporter({
                url: "https://otel.agnost.ai/v1/traces",
                headers: { "X-Agnost-Org-ID": this.orgId! },
            }),
            instrumentations: [this.openAIInstrumentation],
        });
        this.sdk.start();
        this.openAIInstrumentation.manuallyInstrument(OpenAI as never);
    }

    async withContext<T>(
        userId: string,
        sessionId: string,
        fn: () => Promise<T>,
    ): Promise<T> {
        let ctx = context.active();
        ctx = setUser(ctx, { userId: userId });
        ctx = setSession(ctx, { sessionId: sessionId });

        return context.with(ctx, fn);
    }

    async shutdown() {
        await this.sdk.shutdown();
    }
}
