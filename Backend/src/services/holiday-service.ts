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

    public async like(userId: string, holidayId: string): Promise<void> {

        const holidayToLike = await HolidayModel.findByIdAndUpdate(holidayId,
            { $addToSet: { likes: userId } },
            { returnDocument: "after" }
        ).exec();

        if (!holidayToLike) throw new ClientError(StatusCode.NotFound, "The holiday you are trying to like does not exist.");

    }

     public async unLike(userId: string, holidayId: string): Promise<void> {

        const holidayToLike = await HolidayModel.findByIdAndUpdate(holidayId,
            { $pull: { likes: userId } },
            { returnDocument: "after" }
        ).exec();

        if (!holidayToLike) throw new ClientError(StatusCode.NotFound, "The holiday you are trying to like does not exist.");

    }


}

export const holidayService = new HolidayService();