import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import path from "path";
import { saver } from "smart-saver";
import { userController } from "./controllers/user-controller";
import { errorMiddleware } from "./middleware/error-middleware";
import { securityMiddleware } from "./middleware/security-middleware";
import { appConfig } from "./utils/app-config";
import mongoose from "mongoose";
import { holidayController } from "./controllers/holiday-controller";
import { holidayAdminControllertroller } from "./controllers/holiday-admin-service";

class App {

    public async start(): Promise<void> {

        // Connect to mongoDb:
        await mongoose.connect(appConfig.mongoConnectionString);

        // Configure smart-saver - images path:
        saver.config(path.join(__dirname, "assets", "images"));

        // Create our server object:
        const server = express();

        // System middleware:
        securityMiddleware.registerRateLimit(server);
        securityMiddleware.headerProtection(server);
        server.use(cors());
        server.use(express.json());
        server.use(expressFileUpload());

        server.use(securityMiddleware.preventXss);

        // Register controllers:
        server.use(userController.router);
        server.use(holidayController.router);
        server.use(holidayAdminControllertroller.router);

        // Register "after" middleware:
        server.use(errorMiddleware.routeNotFound);
        server.use(errorMiddleware.catchAll);

        // Run server:
        server.listen(appConfig.port, () => console.log("Listening..."));
    }

}

const app = new App();
app.start();

// taskkill /F /IM node.exe
