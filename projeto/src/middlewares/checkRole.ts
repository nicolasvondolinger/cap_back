import { Response, Request, NextFunction } from "express";
import statusCodes from "../../utils/constants/statusCodes";


export async function checkRole(role: string){
  return (req: Request, res: Response, next: NextFunction) => {
    /*const userRole = req.user.role;

    if (userRole == role){
      next();
    } else {
      res.status(statusCodes.UNAUTHORIZED).json("Usuário não possui permissão.");
    }*/
  }
}