import prisma from "../../../../config/client";
import { Music } from "@prisma/client";

class MusicService{
  async create(body: Music) {
    const artist = await prisma.artist.findUnique({
      where: {
        id: Number(body.artistId),
      },
    });

    if (!artist) throw new Error('O artista especificado não existe.');
    
    try {
      const music = await prisma.music.create({
        data: {
          album: body.album,
          gender: body.gender,
          name: body.name,
          artistId: Number(body.artistId),
        },
      });

      return music;
    } catch (error) {
      throw new Error('Erro ao criar a música: ' + error);
    }
  }

  async read(id: Number){
    const music = await prisma.music.findUnique({
      where:{
        id: Number(id),
      },
    });

    return music;
  }

  async update(id: Number, updateFields: Partial<Music>){
    const music = await prisma.music.update({
      where:{
        id: Number(id),
      },
      data: updateFields,
    });

    return music;
  }

  async delete(id: Number){
    const music = await prisma.music.delete({
      where:{
        id: Number(id),
      }
    });

    return music;
  }

  async findMusics(){
    const music = await prisma.music.findMany();
    return music;
  }
}

export default new MusicService();