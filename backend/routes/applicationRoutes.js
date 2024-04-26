import express from "express"
import {
    employerGetAllApplications,
    jobseekerDeleteApplication,
    postApplication,
    jobseekerGetAllApplications
} from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/employer/getall", isAuthorized, employerGetAllApplications);
router.delete("/delete/:id", isAuthorized, jobseekerDeleteApplication);
router.post("/post", isAuthorized, postApplication);
router.get("/jobseeker/getall", isAuthorized, employerGetAllApplications);

export default router;