import express from "express";
const router = express.Router();
import {
  getLeads,
  getLeadById,
  getLeadAnalytics,
} from "../controllers/leadController.js";

router.route("/analytics").get(getLeadAnalytics);
router.route("/").get(getLeads);
router.route("/:id").get(getLeadById);

export default router;
