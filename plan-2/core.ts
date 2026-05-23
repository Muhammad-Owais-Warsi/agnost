import * as agnost from "agnostai";

agnost.init("your-org-id");

agnost.generateText({
    provider: openai("gpt-4o"), // or any other supported provider
    // other configs
});
