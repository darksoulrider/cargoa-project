import mongoose from "mongoose";


const notify_Schema = new mongoose.Schema({
    initiatedID: {
        type: String,
        required: [true, "user id required."]
    },
    affectedID: {
        type: String,
        required: [true, "user id required."]
    },
    message: {
        type: String,
        required: [true, "message required."]
    },
    viewed: {
        type: Boolean,
        default: false
    }
}, {
    validateBeforeSave: true,
    timestamps: true
})

const notify_modal = mongoose.model('Notification', notify_Schema);

export default notify_modal;