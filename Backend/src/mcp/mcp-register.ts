import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { mcpTools } from "./mcp-tools";
import z from "zod";

class McpRegister {

    public registerGetAllHolidays(mcpServer: McpServer): void {
        console.log("Using get all tool.")!
        const name = "get_all_holidays";
        const config = {
            description: "Get all data base holidays."
        }

        mcpServer.registerTool(name, config, mcpTools.getAllHolidayTool);
    }

    public registerGetOneHoliday(mcpServer: McpServer): void {
        console.log("Using get one tool!")
        const name = "get_one_holiday";
        const config = {
            description: "Get one holiday data by id.",
            inputSchema: z.object({ _id: z.string() })
        }

        mcpServer.registerTool(name, config, mcpTools.getOneHoliday)
    }


}

export const mcpRegister = new McpRegister();