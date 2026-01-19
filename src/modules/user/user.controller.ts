import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser = async(req: Request, res: Response)=>{
    // const {name, email, password} = req.body
    try{
        const result = await userServices.createUserDB(req.body)
        // console.log(result.rows[0]);
        res.status(201).json({
            success: true,
            message: "Data inserted successfully",
            data: result.rows[0]
        })
        
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }   
}

const getUsers = async(req: Request, res: Response)=>{
    try{
        const result = await userServices.getUsers()

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
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

const getSingleUser = async(req: Request, res: Response)=>{
    // console.log(req.params.id);

    try{
        const result = await userServices.getSingleUser(req.params.id as string)

        // console.log(result.rows);

        if(result.rows.length === 0){
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }else{
            res.status(200).json({
                success: true,
                message: "User fetched successfully",
                data: result.rows[0]
            })
        }
    }catch(err:any){
       res.status(500).json({
            success: false,
            message: err.message,
            details: err
        }) 
    }
}

const updateUser = async(req: Request, res: Response)=>{
    // console.log(req.params.id);
    const {name, email} = req.body;
    try{
        const result = await userServices.updateUser(name, email, req.params.id as string)

        console.log(result.rows);

        if(result.rows.length === 0){
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }else{
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result.rows[0]
            })
        }
    }catch(err:any){
       res.status(500).json({
            success: false,
            message: err.message,
            details: err
        }) 
    }
}

const deleteUser = async(req: Request, res: Response)=>{
    // console.log(req.params.id);

    try{
        const result = await userServices.deleteUser(req.params.id as string)

        // console.log(result);

        if(result.rowCount === 0){
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }else{
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: result.rows[0]
            })
        }
    }catch(err:any){
       res.status(500).json({
            success: false,
            message: err.message,
            details: err
        }) 
    }
}


export const userControllers = {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
}
