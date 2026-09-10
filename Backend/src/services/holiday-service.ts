import { ClientError, StatusCode } from "error-color-logger";
import { HolidayModel, IHolidayModel } from "../models/holiday-model";


class HolidayService {

    public async getAllHolidays(): Promise<IHolidayModel[]> {

        const dbHolidays = await HolidayModel.find().exec() as IHolidayModel[];
        return dbHolidays;

    }

    public async getOneHoliday(_id: string): Promise<IHolidayModel> {

        const dbHoliday = await HolidayModel.findById(_id).exec() as IHolidayModel;

        if (!dbHoliday) throw new ClientError(StatusCode.NotFound, `The holiday you are trying to find does not exist.`)

        return dbHoliday;


    }



}

export const holidayService = new HolidayService();