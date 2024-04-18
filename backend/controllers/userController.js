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

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(
            new ErrorHandler("please provide email, password", 400)
        );
    }
    const user = await User.findOne({ email }).select("password");;

    if (!user) {
        return next(new ErrorHandler("Invalid Email or password"));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }
    sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncError(async (req, res, next) => {
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
        .json({
            success: true,
            message: "User Logged Out Successfully"
        })
})