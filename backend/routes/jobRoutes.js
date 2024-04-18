import express from "express";
import { getAllJobs, getMyJobs, postJob, updateJob } from "../controllers/jobController.js";
import { isAuthorized } from "../middlewares/auth.js";


const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post", isAuthorized, postJob);
router.post("/getmyjobs", isAuthorized, getMyJobs);
router.post("/updatemyjob/:id", isAuthorized, updateJob);

export default router;