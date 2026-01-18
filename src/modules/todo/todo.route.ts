import express from "express"
import { todoServices } from "./todo.service"
import { todoControllers } from "./todo.controller"

const router = express.Router()


router.post("/", todoControllers.createTodoDB)

router.get("/", todoControllers.getTodos)

router.get("/:id", todoControllers.getSingleTodo)

router.put("/:id", todoControllers.updateTodo)

router.delete("/:id", todoControllers.deleteTodo)




export const todoRoutes = router