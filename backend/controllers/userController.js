import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../model/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, role, password } = req.body;
    if (!name || !email || !phone || !role || !password) {
        return next(new ErrorHandler("please fill in full registration form"));
    }

    const isEmail = await User.findOne({ email });

    if (isEmail) {
        return next(new ErrorHandler("email already exist"));
    }

    const user = await User.create({
        name,
        email,
        phone,
        password,
        role,
    });
    sendToken(user, 200, res, "User Registered Successfully");
});