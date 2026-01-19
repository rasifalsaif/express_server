import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";
import logger from "../../middleware/logger";

const router = express.Router();

router.post("/", userControllers.createUser)

router.get("/", logger, auth("admin"), userControllers.getUsers)

router.get("/:id", auth("admin", "user"), userControllers.getSingleUser)

router.put("/:id", userControllers.updateUser)

router.delete("/:id", userControllers.deleteUser)


export const userRoutes = router;












