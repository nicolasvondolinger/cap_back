import prisma from "../../../../config/client";
import { Artist } from "@prisma/client";


class ArtistService{
  async create(body: Artist){
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

  async update(id: number, updateFields: Partial<Artist>){
    const artist = await prisma.artist.update({
      where:{
        id: id,
      },
      data: updateFields,
    });

    return artist;
  }

  async delete(id: number){
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

  async addMusic(artistId: number, musicId: number){
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

  async removeMusic(artistId: number, musicId: number){
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