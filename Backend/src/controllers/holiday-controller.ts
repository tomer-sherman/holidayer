import express, { Request, Response, Router } from "express";
import { holidayService } from "../services/holiday-service";
import { securityMiddleware } from "../middleware/security-middleware";


class HolidayController {

    public router: Router = express.Router();

    public constructor() {
        this.router.get("/api/holidays", securityMiddleware.verifyLogin, this.getAllHolidays);
        this.router.get("/api/holidays/:_id", securityMiddleware.verifyLogin, this.getOneHoliday);
    }

    private async getAllHolidays(request: Request, response: Response): Promise<void> {

        const holidays = await holidayService.getAllHolidays();
        response.json(holidays);

    }

    private async getOneHoliday(request: Request, response: Response): Promise<void> {

        const _id = request.params._id as string;
        const holidays = await holidayService.getOneHoliday(_id);
        response.json(holidays);

    }





}

export const holidayController = new HolidayController();