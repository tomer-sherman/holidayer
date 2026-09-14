import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { holidayService } from "../services/holiday-service";

class McpTools {

    public async getAllHolidayTool(): Promise<CallToolResult> {

        const holidays = await holidayService.getAllHolidays();
        const result: CallToolResult = {
            content: [{
                type: "text",
                text: JSON.stringify(holidays)
            }]
        }

        return result;


    }

    public async getOneHoliday(args: { _id: string }): Promise<CallToolResult> {
        const holiday = await holidayService.getOneHoliday(args._id);
        const result: CallToolResult = {
            content: [{
                type: "text",
                text: JSON.stringify(holiday)
            }]
        }

        return result;
    }


}

export const mcpTools = new McpTools();