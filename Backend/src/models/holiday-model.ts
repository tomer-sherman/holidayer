import { Document, model, Schema, Types } from "mongoose";



export interface IHolidayModel extends Document {

    _id: Types.ObjectId;
    destination: string,
    startAt: Date;
    finishAt: Date;
    price: number,
    fileName: string,
}

export const HolidaySchema = new Schema<IHolidayModel>({

    destination: {
        type: String,
        required: [true, "Destination is a required field."],
        match: [/^(?=.{2,100})[A-Z][a-z]+$/, "Destination name must contain only english letters between 2-100, first chat must be uppercase."],
    },
    startAt: {
        type: Date,
        required: [true, "You must choose a starting date for the holiday."],


    },
    finishAt: {
        type: Date,
        required: [true, " You must choose a ending date for the holiday."],
        validate: {
            validator: function (value: Date){
                const doc = this as unknown as IHolidayModel;
                return value > doc.startAt
            },
            message: "End date must be after the start date.",
        }

    },
    price: {
        type: Number,
        required: [true, "Holiday must be priced."],
        min: [0 , "Price cannot be lower than 0."],
        max: [99999,"Price cannot be higher than 99,999"],
    }
}, {
    versionKey: false,
    id: false
})

export const HolidayModel = model<IHolidayModel>("HolidayModel", HolidaySchema, "holidays");
