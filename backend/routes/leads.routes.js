import express from 'express'
import { getLeadById, getLeads, getLeadStat } from '../controllers/leadController.js';
const router = express.Router();

//GET /api/leads
router.get('/', getLeads);

//GET /api/leads/:id
router.get('/stats', getLeadStat)
router.get('/:id', getLeadById);

export default router;