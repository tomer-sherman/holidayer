import express, { Request, Response, Router } from "express";
import { holidayService } from "../services/holiday-service";
import { securityMiddleware } from "../middleware/security-middleware";
import { AuthRequest } from "../models/user-model";
import { StatusCode } from "error-color-logger";
import { bsonType } from "bson";
import { HolidayModel, HolidaySchema, IHolidayModel } from "../models/holiday-model";
import { holidayAdminService } from "../services/holiday-admin-service";


class HolidayAdminControllertroller {

    public router: Router = express.Router();

    public constructor() {
        this.router.post("/api/holidays", securityMiddleware.verifyAdminn, this.addHoliday);
        this.router.delete("/api/holidays/:_id", securityMiddleware.verifyAdminn, this.deleteHoliday);
        this.router.put("/api/holidays/:_id", securityMiddleware.verifyAdminn, this.deleteHoliday);




    }

    public async addHoliday(request: Request, response: Response): Promise<void> {

        const holiday = new HolidayModel(request.body);
        const dbHoliday = await holidayAdminService.addHoliday(holiday);
        response.status(StatusCode.Created).json(dbHoliday);

    }

    public async updateHoliday(request: Request, response: Response): Promise<void> {

        //Extract id too the Body:
        request.body._id = request.params._id.toString();

        const holiday = new HolidayModel(request.body);
        const dbHoliday = await holidayAdminService.updateHoliday(holiday);
        response.json(dbHoliday);

    }

    public async deleteHoliday(request: Request, response: Response): Promise<void> {

        const _id = request.params._id as string;
        await holidayAdminService.deleteHoliday(_id);

        response.status(StatusCode.NoContent).json();

    }








}

export const holidayAdminControllertroller = new HolidayAdminControllertroller();