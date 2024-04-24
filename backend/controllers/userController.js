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
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return next(
            new ErrorHandler("Please provide email ,password and role.", 400)
        );
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or password"));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }

    if (user.role !== role) {
        return next(
            new ErrorHandler(`User with provided email and ${role}, user.role ${user.role} not found!`, 404)
        );
    }
    sendToken(user, 201, res, "User Logged In!");
});


export const logout = catchAsyncError(async (req, res, next) => {
    res.clearCookie("token").status(201).json({
        success: true,
        message: "Logged Out Successfully.",
    });
});

export const getUser = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});