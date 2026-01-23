
import { Request, Response } from "express";
import Admin from "../models/admin";
export const LoginValidationController = async (req: Request, res: Response) => {
    try{
      
      const { email, password} = req.body;
      if(!email || !password){
        console.log("Missing email or password");
        throw new Error("Missing email or password");
      }

      const user = await Admin.findOne({email});
      if(!user){
        res.status(404).json({message: "Admin not found"});
      }

      res.status(200).json(user);
    }catch(e){
      console.log(e);
    }
};