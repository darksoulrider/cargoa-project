
import mongoose from "mongoose";
import { DateTime } from "luxon";

const orderSchema = new mongoose.Schema({
    orderCreatedBy: {
        type: String,
        required: [true, 'user info needed']
    },
    vendor: {
        type: String,
        required: [true, 'vendor info needed']
    },
    title: {
        type: String,
        required: [true, "Product title is required"],
        minLength: [2, "Minimum 2 Characters required"],
        maxLength: [50, "Maximum 20 Characters required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, 'quantity can not be less than or equal to 0']
    },
    date_of_shipping: {
        type: String, // as mentioned string a option in pdf
        required: [true, 'shipping date is required'],


    },
    shipping_schedule_1: {
        type: String, // date 
    },
    shipping_schedule_2: {
        type: String, // date
    },
    shipping_schedule_3: {
        type: String, // date
    },
    vendorAction: {
        type: Boolean,
        default: false,
    },
    userAction: {
        type: Boolean,
        default: false,
    },
    confirmed_schedule: {
        type: String,
    },
    orderpdf: {
        type: String,
        required: [true, "Purchase order pdf is required"]
    }

}, { validateBeforeSave: true, timestamps: true })



const orderModal = mongoose.model("order", orderSchema);
export default orderModal;