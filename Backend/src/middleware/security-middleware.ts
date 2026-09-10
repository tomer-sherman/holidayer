import { Express, NextFunction, Request, Response } from "express";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";
import striptags from "striptags";
import { ClientError } from "error-color-logger";
import { StatusCode } from "error-color-logger";
import { security } from "../utils/security";

class SecurityMiddleware {


    public verifyLogin(request: Request, response: Response, next: NextFunction): void {

        const auth = request.headers.authorization;// "Bearer the-token...";
        const token = auth?.substring(7);

        if (security.verifyJwtToken(token!)) {
            next();
        }
        else {
            const err = new ClientError(StatusCode.Unauthorized, "You are not logged in.");
            next(err);
        }



    }


    public verifyAdminn(request: Request, response: Response, next: NextFunction): void {

        const auth = request.headers.authorization;
        const token = auth?.substring(7);

        if (security.isAdmin(token!)) {
            next();
        }
        else {
            const err = new ClientError(StatusCode.Forbidden, "You are not authorized.");
            next(err);
        }

    }

    // Prevent XSS attack:
    public preventXss(request: Request, response: Response, next: NextFunction): void {

        // Run on body object:
        for (const prop in request.body) {

            // Take prop value: 
            const value = request.body[prop];

            // If string: 
            if (typeof value === "string") {

                // Remove tags:
                request.body[prop] = striptags(value);
            }
        }

        // Continue:
        next();
    }

    // Prevent DoS attack:
    public registerRateLimit(server: Express): void {

        // General rate-limit:
        server.use(expressRateLimit({
            windowMs: 1000, // Time window in milliseconds.
            limit: 5, // How many requests allowed in that window.
        }));

    }

    // Use helmet to protect header attacks: 
    public headerProtection(server: Express): void {
        server.use(helmet({
            crossOriginResourcePolicy: { policy: "same-site" } // Enable CORS on images.
        }));
    }

}

export const securityMiddleware = new SecurityMiddleware();
