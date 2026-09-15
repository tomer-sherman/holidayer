import mongoose from "mongoose";
import colors from "colors";

class MongoErrorLogger {

    private readonly line = "─".repeat(60);

    public logValidationError(err: mongoose.Error.ValidationError) {

        const status = "400";
        const type = "Validation error";

        // One line per failed field (e.g. "destination: Path `destination` is required.").
        // Falls back to the raw message when no per-field details exist:
        const details = err.errors
            ? Object.values(err.errors).map(fieldErr => `${fieldErr.path}: ${fieldErr.message}`)
            : [err.message];

        console.log();
        console.log(colors.red(this.line));
        console.log(colors.yellow.bold("Status:        " + status));
        console.log(colors.red.bold("Error Type:    " + type));
        console.log(colors.red("Error Message:"));
        for (const detail of details) {
            console.log(colors.red("  • " + detail));
        }
        console.log(colors.red(this.line));
        console.log();
    }

}

export const mongoErrorLogger = new MongoErrorLogger();
