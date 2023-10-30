import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
const usertype = ['user', 'vendor'];

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First name required"],
        minLength: [2, "Minimum 2 Characters required"],
        maxLength: [20, "Maximum 20 Characters required"],
    },
    lastname: {
        type: String,
        required: [true, "Last name required"],
        minLength: [2, "Minimum 2 Characters required"],
        maxLength: [20, "Maximum 20 Characters required"],
    },
    email: {
        type: String,
        required: [true, "Eamil is required."],
        validate: [validator.isEmail, "Email address is not valid"],
        unique: [true, "Email address must be unique"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "password length must be 8 characters long"],

    },
    usertype: {
        type: String,
        enum: {
            values: usertype,
            message: "Usertype is not valid"
        },
        required: [true, "no user type is given"]
    }
}, {
    validateBeforeSave: true,
    timestamps: true
    // created at and all
}
)

//  write coustom methods here --

UserSchema.methods.comparepwd = async function (password) {
    return bcryptjs.compare(password, this.password);
}

UserSchema.methods.getJWTtoken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            usertype: this.usertype
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: "5d",
        }
    )
}

UserSchema.methods.gethash = async function (password) {
    hashpwd = await bcryptjs.hash(password, 12);
    return hashpwd;
}





const UserModal = mongoose.model("User", UserSchema);
export default UserModal;