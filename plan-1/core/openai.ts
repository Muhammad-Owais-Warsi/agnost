import { AgnostCore } from "./core";

const agnostopenai = new AgnostCore({
    orgId: "org-123",
});

agnostopenai.init();

agnostopenai.withContext("user-123", "session-123", async () => {
  return client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: 'Hello' }],
    }),
});
