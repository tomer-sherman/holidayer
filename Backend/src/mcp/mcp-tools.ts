import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { vacationService } from "../services/vacation-service";

class McpTools {

    public async getAllVacationTool(): Promise<CallToolResult> {

        const vacations = await vacationService.getAllVacations();
        const result: CallToolResult = {
            content: [{
                type: "text",
                text: JSON.stringify(vacations)
            }]
        }

        return result;


    }

    public async getOneVacation(args: { _id: string }): Promise<CallToolResult> {
        const vacation = await vacationService.getOneVacation(args._id);
        const result: CallToolResult = {
            content: [{
                type: "text",
                text: JSON.stringify(vacation)
            }]
        }

        return result;
    }


}

export const mcpTools = new McpTools();
