import { Router } from "express";
import { boardController } from "../controllers/boardController.js";

export const boardRouter = Router()


boardRouter.get('/',boardController.getBoard);
