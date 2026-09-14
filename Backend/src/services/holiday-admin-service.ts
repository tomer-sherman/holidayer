import { ClientError, StatusCode } from "error-color-logger";
import { HolidayModel, IHolidayModel } from "../models/holiday-model";


class HolidayAdminService {


    public async addHoliday(holiday: IHolidayModel): Promise<IHolidayModel> {
        const dbHoliday = await holiday.save();
        return dbHoliday;
    }


    public async deleteHoliday(_id: string): Promise<void> {
        const dbHoliday = await HolidayModel.findByIdAndDelete(_id).exec();
        if (!dbHoliday) throw new ClientError(StatusCode.NotFound, `Holiday ${_id} not found.`);
    }

    public async updateHoliday(holiday: IHolidayModel): Promise<IHolidayModel> {

        const dbHoliday = await HolidayModel.findByIdAndUpdate(holiday._id, holiday, { returnDocument: "after" }).exec();
        if (!dbHoliday) throw new ClientError(StatusCode.NotFound, `Holiday ${holiday._id} not found.`);
        return dbHoliday;

    }

    public async getAllHolidayLikes(): Promise<string[]> {

        const dbHolidays = await HolidayModel.aggregate<string>([
            { $project: { destination: 1, likesCount: { $size: "$likes" } } }
        ])

        return dbHolidays;

    }


}

export const holidayAdminService = new HolidayAdminService();