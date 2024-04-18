import express from "express";
import { getAllJobs, getMyJobs, postJob, updateJob, deleteJob } from "../controllers/jobController.js";
import { isAuthorized } from "../middlewares/auth.js";


const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post", isAuthorized, postJob);
router.get("/getmyjobs", isAuthorized, getMyJobs);
router.put("/updatemyjob/:id", isAuthorized, updateJob);
router.delete("/deletemyjob/:id", isAuthorized, deleteJob);

export default router;