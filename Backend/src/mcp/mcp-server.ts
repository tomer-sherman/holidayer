import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { mcpRegister } from "./mcp-register";

class HolidayMcpServer {

    public create(): McpServer {

        const mcpServer = new McpServer({
            name: "holiday-mcp-server",
            version: "1.0.0"
        });

        //register Tools:
        mcpRegister.registerGetAllHolidays(mcpServer);
        mcpRegister.registerGetOneHoliday(mcpServer);

        return mcpServer;

    }

}

export const holidayMcpServer = new HolidayMcpServer();
