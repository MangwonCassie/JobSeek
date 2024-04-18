import express from "express";
import { getAllJobs, getMyJobs, postJob } from "../controllers/jobController.js";
import { isAuthorized } from "../middlewares/auth.js";


const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post", isAuthorized, postJob);
router.post("/getmyjobs", isAuthorized, getMyJobs);

export default router;