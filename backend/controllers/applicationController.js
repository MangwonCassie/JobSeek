import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHanlder from "../middlewares/error.js";
import { Application } from "../model/application.js";

export const jobseekerGetAllApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;

    if (role === "Employer") {
        return next(
            new ErrorHanlder(
                "Job Seeker is not allowed to access these resources!",
                400
            )
        )
    }

    const { _id } = req.user;
    const applications = await Application.find({ 'applicationId.user:': _id });
    res.status(200).json({
        success: true,
        applications
    })
})

export const jobseekerDeleteApplication = catchAsyncErrors(
    async (req, res, next) => {
        const { role } = req.user;
        if (role === "Employer") {
            return next(
                new ErrorHandler("Employer not allowed to access this resource.", 400)
            );
        }
        const { id } = req.params;
        const application = await Application.findById(id);
        if (!application) {
            return next(new ErrorHandler("Application not found!", 404));
        }
        await application.deleteOne();
        res.status(200).json({
            success: true,
            message: "Application Deleted!",
        });
    }
);