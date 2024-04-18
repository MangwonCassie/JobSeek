import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../model/jobSchema.js";

export const getAllJobs = catchAsyncError(async (req, res, next) => {
    const jobs = await Job.findOneAndReplace({ expired: false });
    res.status(200).json({
        success: true,
        jobs,
    })
})