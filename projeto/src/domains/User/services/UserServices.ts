import prisma from "../../../../config/client";
import { Music } from "@prisma/client";
import { User } from "../types/user.interface";
import {hash} from 'bcrypt';
import { QueryError } from "../../../../errors/QueryError";
import { NotAuthorizedError } from "../../../../errors/NotAuthorizedError";
import { userRoles } from "../../../../utils/constants/userRoles";

class UserService{

    async encryptPassword(password: string){
      const saltRounds = 10;
      return await hash(password, saltRounds);
    }

    async findById(id: Number){
      const user = await prisma.user.findUnique({
        where:{
          id: Number(id),
        }
      });

      if(user == null) throw new QueryError("Usuário não encontrado.");
      return user;
    }

    async findByEmail(email: string){
      const user = await prisma.user.findUnique({
        where: { 
          email: email,
        }
      });

      if(user == null) throw new QueryError("Usuário não encontrado.");
      return user;
    }

    async getMyAccount(user: User){
      return await prisma.user.findUnique({
        where:{
          id: user.id,
        },
        select:{
          email: true,
          id: true,
          name: true,
          listenedMusics: true,
          photo: true,
          role: true,
        },
      });
    }

    async create(body: User){
      if(await prisma.user.findUnique({where: {email: body.email}})) throw new QueryError("Email já cadastrado.");

      body.password = await this.encryptPassword(body.password);

      if(body.role == userRoles.ADMIN) throw new NotAuthorizedError("Não é possível criar usuários com cargos admin.");

      const user = await prisma.user.create({
        data:{
          email: body.email,
          name: body.name,
          password: body.password,
          photo: body.photo,
          role: body.role,
        }
      });

      return user;
    }

    async update(id: Number, updateFields: Partial<User>){
      const user = await prisma.user.update({
        where:{
          id: Number(id),
        },
        data: updateFields,
      })

      return user;
    }

    async delete(id: Number){
      const user = await prisma.user.delete({
        where:{
          id: Number(id),
        }
      });

      return user;
    }

    async findUsers(){
      const users = await prisma.user.findMany();

      return users;
    }

    async addMusic(userId: number,  musicId: number){
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: Number(userId),
          },
          include:{
            listenedMusics:true,
          }
        })

        if(!user) throw new Error("Usuário não encontrado.");

        const listened = user.listenedMusics.some(music => music.id == musicId);

        if(listened)throw new Error("Música já foi ouvida pelo usuário.");

        const updateUser = await prisma.user.update({
          where:{
            id: Number(userId),
          },
          data:{
            listenedMusics:{
              connect: { id: musicId },
            },
          },
        });

        return user;
        
      } catch (error){
        console.error("Erro ao encontrar a música: ", error);
        throw error;
      }
    }

    async removeMusic(userId: User, musicId: number){
      try{
        const user = await prisma.user.findUnique({
          where: {
            id: Number(userId),
          },
          include:{
            listenedMusics:true,
          }
        })
        if(!user) throw new Error("Usuário não encontrado.");

        const listened = user.listenedMusics.some(music => music.id == musicId);

        if(!listened)throw new Error("Música não foi ouvida pelo usuário.");

        const updateUser = await prisma.user.update({
          where:{
            id: Number(userId),
          },
          data:{
            listenedMusics:{
              delete: { id: musicId },
            },
          },
        });

        return user;
      }catch(error){
        console.error("Erro ao encontrar música: ", error);
        throw error;
      }
    }

    async findMusics(id: number){
      const musics = await prisma.user.findUnique({
        where:{
          id: id,
        },
        select:{
          id: true,
          listenedMusics: true,
        },
      });

      return musics;
    }
}

export default new UserService();