import express, { Request, Response, Router } from "express";
import { aiService } from "../services/ai-service";
import { security } from "../utils/security";
import { securityMiddleware } from "../middleware/security-middleware";



class AiController {


    public router: Router = express.Router();

    // Constructor - register routes:
    public constructor() {
        this.router.post("/api/mcp/ask", this.getMcpCompletion);
        this.router.post("/api/ai/recomendation", this.getAiRecomendation);

    }


    private async getMcpCompletion(request: Request, response: Response): Promise<void> {

        const userPrompt = request.body.userPrompt as string;
        const completion = await aiService.getMcpCompletion(userPrompt);
        response.json(completion);



    }
    private async getAiRecomendation(request: Request, response: Response): Promise<void> {

        const userPrompt = request.body.userPrompt as string;
        const recomendation = await aiService.getAiRecomendation(userPrompt);

        response.json(recomendation);
    }






}

export const aiController = new AiController();
