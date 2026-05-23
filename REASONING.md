## Agnost
This repo contains the demo (plan) on how we can integrate tools like Agnost with agents built via opneai, vercel or mastra.
There are 2 plans, which can improve the overall dx, onboarding and integration a smooth ride. 

Plan 1
Plan 2


## Plan 1
This plan is really simple. 
As in the [agnost docs](https://docs.agnost.ai/typescript-conversation) it is clearly documented on how we can integarte it with agents built via vercel ai sdk or others.
But I feel the setup a bit overwhelming. 

### Questions/doubts
- Why not just hide these pain points under the hood?
- Why not just open a unified builder when building agents with such tools?

### What I would've done to make it better
Just open a builder, which handles the connection/setup with opentelemetary and all the config handling under the hood. The user should only need to pass the `org-id` 
and other props or flags if needed (maybe model name) ---> Passing the model name may help setting the configs and exposing the functions properly and securely 
with respective to the providers ability and nature. 

### Structure of plan-1 
- `core.ts` - This file contains the builder, it handles all the config and function exposing work.
- `vercel.ts` and `openai.ts` - these 2 files has a small demo of how the final usage by the end users would look like.


## Plan 2 
This plan is a bit different and if implemented needs huge architectural changes in the core system. 

### Questions/doubts
- If at last agnost is handling the telemetry, why not just pass the provider instances to it?

### What I would've done to make it better
We can pass the provider instances such as `openai(gpt-4o)` or any other provider intance we're using to agnost builder, as demonstrated in the code. 
This helps the agnost to easily trace the operations and here also we can hide all the complex setup of opentelemetary and just ask the user to pass the instance 
of the provider they are using.

> [!NOTE]
> Until now I've focused mainly on the two providers that are openai and vercel ai sdk in both the plans. But what about mastra?
> Mastra has buit different architecture from the above 2 providers. It has got in-built support for telemetary, we just need to direct those to agnost.
> So, tbh the setup already not very bad in dx, but if anyhow we've to improve it a bit without overdoing and oversimplifying the things, below is
> the small code snippet demonstrating, on how we can make it better as well as for the other providers too.

```js
import agnost from "asgnostai"
... other imports

export const mastra = new Mastra({
  agents: { agent },
  observability: new Observability({
    configs: {
      default: {
        serviceName: 'my-mastra-app',
        exporters: [
          new OtelExporter({
            provider: {
              custom: {
                baseConfig: agnost.mastra.config, // here we can just pass the statis and default config
                others: // some other dynamic config if any
              }
            }
          }),
        ],
      },
    },
  }),
});
```


So these are 2 of the many plans I've think that can actually make sense and improve the dx a lot better.

Some plans I'd like to mention but not there in the code. 
1. A plugin like architecture, where the user will install provider speciif packages for agnost.
```js
npm i @agnostai/vercelaisdk
npm i @agnostai/openai
```

2. Using agnost as langchain uses langsmith 
