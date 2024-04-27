import prisma from "../../../../config/client";
import { Artist } from "@prisma/client";
import { userRoles } from "../../../../utils/constants/userRoles";
import { User } from "@prisma/client";
import { NotAuthorizedError } from "../../../../errors/NotAuthorizedError";


class ArtistService{
  async create(body: Artist, user: User){

    if(user.role != userRoles.ADMIN) throw new NotAuthorizedError("Não é possível editar sem ser um administrador do sistema.");

    const artist = await prisma.artist.create({
      data:{
        name: body.name,
        photo: body.photo,
      }
    });

    return artist;
  }

  async read(id: number){
    const artist = await prisma.artist.findUnique({
      where:{
        id: id,
      }
    });

    return artist;
  }

  async update(body: User, id: number, updateFields: Partial<Artist>){
    
    if(body.role != userRoles.ADMIN) throw new NotAuthorizedError("Não é possível editar sem ser um administrador do sistema.");
    const artist = await prisma.artist.update({
      where:{
        id: id,
      },
      data: updateFields,
    });

    return artist;
  }

  async delete(body: User, id: number){

    if(body.role != userRoles.ADMIN) throw new NotAuthorizedError("Não é possível deletar sem ser um administrador do sistema.");
    
    const artist = await prisma.artist.delete({
      where:{
        id: id,
      }
    });

    return artist;
  }

  async findArtists(){
    const artist = await prisma.artist.findMany({
      include:{
        songs: true,
      }
    });
    return artist;
  }

  async addMusic(body: User, artistId: number, musicId: number){

    if(body.role != userRoles.ADMIN) throw new NotAuthorizedError("Não é possível editar sem ser um administrador do sistema.");
    
    const artist = await prisma.artist.findUnique({
      where: {
        id: artistId,
      },
      include:{
        songs: true,
      }
    });

    const updateSongs = await prisma.artist.update({
      where:{
        id: artistId,
      },
      data:{
        songs:{
          connect: {id: musicId},
        },
      },
    });

    return updateSongs;
  }

  async removeMusic(body: User, artistId: number, musicId: number){

    if(body.role != userRoles.ADMIN) throw new NotAuthorizedError("Não é possível editar sem ser um administrador do sistema.");
    
    const artist = await prisma.artist.findUnique({
    where: {
        id: artistId,
      },
      include:{
        songs: true,
      }
    });

    const updateSongs = await prisma.artist.update({
      where:{
        id: artistId,
      },
      data:{
        songs:{
          delete: {id: musicId},
        },
      },
    });
  }
}

export default new ArtistService();