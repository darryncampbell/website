# Updating the Turn Detector Model

> TL;DR
> 
> 1. Update your version of `livekit-agents`  
> 2. Run `uv run <agent.py> download-files` or `pnpm run download-files` to download files locally
> 3. Re-deploy your agent, to trigger a re-download of the model for your hosted agent.


Your LiveKit agent knows when to start listening, and when to respond using turn detection.  The concept of turn detection, and how it applies to LiveKit is explained in [our documentation](https://docs.livekit.io/agents/logic/turns/), and the functionality is delivered [by a plugin](https://docs.livekit.io/agents/logic/turns/turn-detector/).

This article assumes you are familiar with turn detection, and will explain how to find out which version of the model you are using, and how to update to the latest model version.

## Which method of turn detection does this apply to?

The turn detector model is the recommended approach for most developers, but there are good reasons why you might choose to not use it, for example:

- Your application needs to work with a language not recognized by the model
- You are using a realtime model, that already has built-in turn detection
- Your use case does not require turn detection, such as push-to-talk (PTT)

**This article only applies to the LiveKit turn detector model**.

```python
# Python
session = AgentSession(
    turn_detection=MultilingualModel(),

    vad=silero.VAD.load(),
    # ... stt, tts, llm, etc.
)
```

```js
//  Node.js
const session = new voice.AgentSession({
  turnDetection: new livekit.turnDetector.MultilingualModel(),
  vad: await silero.VAD.load(),
  // ... stt, tts, llm, etc.
});
```

## How is the model downloaded?

There are two ways to build a LiveKit agent:
- Start in the Browser, with our hosted [Agent Builder](https://docs.livekit.io/agents/start/builder/)
- Start in code.  This can be done in a few ways, such as by following our [voice agent quickstart guide](https://docs.livekit.io/agents/start/voice-ai/), or by using the CLI and our [agent template](https://docs.livekit.io/intro/basics/cli/templates/).

Regardless of how you build your agent, you will at some stage need to run the following command for Python agents:

`uv run python myagent.py download-files`

Or this command for Node.js agents

`pnpm run download-files`

If you created your agent with Agent Builder, and used the ‘Deploy Agent’ button, this step was done automatically for you; if you followed our voice agent quick start guide, this was one of the steps; if you used the CLI, you were prompted to run this command after `lk app create`.  When deploying your agent from code, you will need to have this command in your dockerfile ([template](https://docs.livekit.io/deploy/agents/builds/#templates)).


**Whenever you redeploy your application, the build process will download the model files for your hosted agent each time**, but for local development you will have to re-run the `download-files` command yourself to update the model.

## What version of the model am I running?

The turn detector model is delivered as part of the agents package and is installed through `uv add "livekit-agents[turn-detector]~=X.X"` or `pnpm install @livekit/agents-plugin-livekit` for Python and Node.js respectively. The source code can be found on GitHub, [here](https://github.com/livekit/agents/tree/main/livekit-plugins/livekit-plugins-turn-detector/livekit/plugins/turn_detector) for Python and [here](https://github.com/livekit/agents-js/tree/main/plugins/livekit/src/turn_detector) for Node.js. If you look at the code, you will see it is pulling in the models version through `models.py` or `constants.ts` respectively - in all cases you should use the `MultilingualModel`, as explained later.

So, the version of the model is directly tied to the version of LiveKit agents you are using (or, specifically for Python, the version of the [turn detector package](https://pypi.org/project/livekit-plugins-turn-detector/))

Model files will be downloaded from HuggingFace, [https://huggingface.co/livekit/turn-detector](https://huggingface.co/livekit/turn-detector).  

Note: The latest model on HuggingFace is **not** on the main branch but is located on a branch with a named version.  You can use the `models.py` or `constants.ts` file described previously to find the specific release name.  *Also note that the version for the English model is about a year behind the version for the multilingual model at the time of writing; which is why we recommended using the newer multilingual model for English*.

## How can I make sure I’m using the latest version of the model?

1. Update your version of `livekit-agents`  
2. Re-run the script to download files locally
3. Re-deploy your agent, to trigger a re-download of the model for your hosted agent.

## Where is the model located on disk?

Model files are downloaded to and loaded from the location specified by the `HF_HUB_CACHE` environment variable. If not set, this defaults to `$HF_HOME/hub` (typically `~/.cache/huggingface/hub`).

## Should I use the EnglishModel?  Or the MultilingualModel model?

**Always use the MultilingualModel** as this superseded the English model at the beginning of 2025.  The MultilingualModel supports 14 languages, including English, and will always perform better than the older English-only model.

**If your AI assistant recommends the EnglishModel, it is a very strong indication that you should install our [MCP server](https://docs.livekit.io/intro/mcp-server/)**. Doing so will make your development 10x easier and you will end up with more reliable LiveKit voice agents.