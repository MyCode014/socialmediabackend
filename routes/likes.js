import express from "express";

import { getUser} from "../controllers/like.js";

const router = express.Router()

router.get("", getUser );

export default router