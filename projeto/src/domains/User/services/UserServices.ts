import prisma from "../../../../config/client";
import { Music, User } from "@prisma/client";

class UserService{
    async create(body: User){
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

    async read(id: Number){
      const user = await prisma.user.findUnique({
        where:{
          id: Number(id),
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

    async findByEmail(email : string){
      const user = await prisma.user.findUnique({
        where:{
          email: email,
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

    async removeMusic(userId: number, musicId: number){
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