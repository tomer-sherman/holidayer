
import OpenAi from "openai"
import { appConfig } from "../utils/app-config";
import { promptHolder } from "../utils/prompt-holder";

class AiService {

    private openai = new OpenAi({
        apiKey: appConfig.openaiApiKey
    })

    public async getMcpCompletion(prompt: string): Promise<string> {

        const response = await this.openai.responses.create({
            model: "gpt-4o-mini",
            input: prompt,

            tools: [{
                type: "mcp",
                server_label: "holiday-mcp-server",
                server_description: "A mcp server that externelizes a list of holidays.",
                server_url: "https://timothy-sulfate-hatbox.ngrok-free.dev/sse",
                require_approval: "never",
            }]
        });

        const completion = response.output_text;
        return completion;

    }


    public async getAiRecomendation(userPrompt: string): Promise<string> {


        const promptToSend =
            "systemPrompt: " + promptHolder.systemPrompt +
            "instructions: " + promptHolder.instructions +
            "userQuestion: " + userPrompt +
            "security instructions: " + promptHolder.securityCheck;

        "Your answer : ";

        const completion = await this.getMcpCompletion(promptToSend);

        return completion;

    }


}

export const aiService = new AiService();