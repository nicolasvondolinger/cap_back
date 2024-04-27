import { Response, Request, NextFunction } from "express";
import { User } from "@prisma/client";
import prisma from "../../config/client";
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { InvalidParamError } from "../../errors/InvalidParamError";
import { TokenError } from "../../errors/TokenError";
import { LoginError } from "../../errors/LoginError";

function generateJWT(user: User, res: Response) {
  const body = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }

  const token = sign({ user: body }, process.env.SECRET_KEY || '', { expiresIn: process.env.JWT_EXPIRATION});

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
  });
};

function cookieExtractor(req: Request) {
  let token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token;
};

export async function loginMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: req.body.email,
        }
      });

      if(user == null) throw new InvalidParamError("Email não cadastrado.");

      const matchingPassword = await compare(req.body.password, user.password);

      if(!matchingPassword) throw new InvalidParamError("Email e/ou senha incorretos.");

      generateJWT(user, res);
      res.status(200).json("Login realizado com sucesso.");
    } catch (error) {
      next(error);
    }
};

export async function logoutMiddleware(req: Request, res: Response, next: NextFunction){
  try{
    const token = cookieExtractor(req);
    if(!token) throw new TokenError("Você não está logado no sistema.");
    res.clearCookie('jwt');
    res.status(200).json('Logout realizado com sucesso.');
  } catch (error){  
    next(error);
  }
}

export function notLoggedIn(req: Request, res: Response, next: NextFunction){
  try{
    const token = cookieExtractor(req);

    if(token){
      const decoded = verify(token, process.env.SECRET_KEY || '');
      if(decoded) throw new LoginError("Você já está logado no sistema.");
    }
    next();
  } catch (error){
    next(error);
  }
}

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  try {
    const token = cookieExtractor(req);
    if (token) {
      const decoded = verify(token, process.env.SECRET_KEY || '') as JwtPayload;
      req.user = decoded.user;
    }

    if (req.user == null) {
      throw new TokenError("Você precisa estar logado para realizar essa ação.");
    }
    next();
  } catch (error) {
    next(error);
  }
}

export const checkRole = (roles: string) => { 
  return (req: Request, res: Response, next: NextFunction) => {
    try{
      !roles.includes(req.user.role) ? res.status(401).json("Você não tem permissão para realizar essa ação.") : next();
    }catch(error){
      next(error);
    }
  }
}


