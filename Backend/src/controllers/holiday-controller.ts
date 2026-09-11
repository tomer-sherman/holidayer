import express, { Request, Response, Router } from "express";
import { holidayService } from "../services/holiday-service";
import { securityMiddleware } from "../middleware/security-middleware";
import { AuthRequest } from "../models/user-model";
import { StatusCode } from "error-color-logger";
import { bsonType } from "bson";


class HolidayController {

    public router: Router = express.Router();

    public constructor() {
        this.router.get("/api/holidays", securityMiddleware.verifyLogin, this.getAllHolidays);
        this.router.get("/api/holidays/:_id", securityMiddleware.verifyLogin, this.getOneHoliday);
        this.router.post("/api/holidays/like/:_id", securityMiddleware.verifyLogin, this.likeHoliday)
        this.router.post("/api/holidays/unlike/:_id", securityMiddleware.verifyLogin, this.unlikeHoliday)
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

    private async likeHoliday(request: Request, response: Response): Promise<void> {

        const userId = (request as AuthRequest).user._id.toString();
        const holidayId = request.params._id as string;
        await holidayService.like(userId, holidayId);
        response.status(StatusCode.NoContent).json();

    }

    private async unlikeHoliday(request: Request, response: Response): Promise<void> {

        const userId = (request as AuthRequest).user._id.toString();
        const holidayId = request.params._id as string;
        await holidayService.unLike(userId, holidayId);
        response.status(StatusCode.NoContent).json();

    }






}

export const holidayController = new HolidayController();