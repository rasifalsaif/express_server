import { Request, Response } from "express";
import { todoServices } from "./todo.service";


const createTodoDB = async(req: Request, res: Response)=>{
    const {user_id, title} = req.body;

    try{
        const result = await todoServices.createTodoDB(user_id, title)
         res.status(201).json({
            success: true,
            message: "TODO created successfully",
            data: result.rows[0]
        })
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
} 

const getTodos = async(req: Request, res: Response)=>{
    try{
        const result = await todoServices.getTodos()

        res.status(200).json({
            success: true,
            message: "todos retrieved successfully",
            data: result.rows
        })

    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        })
    }
}

const getSingleTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getSingleTodo(req.params.id as string)

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
}

const updateTodo = async (req: Request, res: Response) => {
  const { title, completed } = req.body;
   const { id } = req.params;

  try {
    const result = await todoServices.updateTodo(title, completed, id as string)

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
}

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.deleteTodo(req.params.id as string)

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ success: true, message: "Todo deleted", data: null });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
}

export const todoControllers = {
    createTodoDB,
    getTodos,
    getSingleTodo,
    updateTodo,
    deleteTodo,
}