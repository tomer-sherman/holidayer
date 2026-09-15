import { ClientError, errorColorLogger } from "error-color-logger";
import { mongoErrorLogger } from "./mongo-error-logger";
import mongoose from "mongoose";

export function logError(err: any): void {
    switch (true) {
        case err instanceof ClientError:
            errorColorLogger.logError(err);
            break;
        case err instanceof mongoose.Error.ValidationError:
            mongoErrorLogger.logValidationError(err);
            break;
        default:
            console.log(err);
            break;
    }
}