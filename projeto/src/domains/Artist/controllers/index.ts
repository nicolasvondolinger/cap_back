import ArtistServices from "../services/ArtistServices";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get('/', async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const artist = await ArtistServices.findArtists();
    res.json(artist);
  }catch(error){
    next(error);
  }
});

router.get('/:id', async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const artist = await ArtistServices.read(Number(req.params.id));
    res.json(artist);
  } catch(error){
    next(error);
  }
});

router.post('/create', async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const artist = await ArtistServices.create(req.body);
    res.json("Usuário criado com sucesso.");
  }catch(error){
    next(error);
  }
});

router.post('/addMusic/:artistId/:musicId', async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const artist = await ArtistServices.addMusic(Number(req.params.artistId), Number(req.params.musicId));
    res.json("Lista de músicas do artista foi atualizada com sucesso.");
  } catch(error){
    next(error);
  }
});

router.put('/removeMusic/:artistId/:musicId', async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const artist = await ArtistServices.removeMusic(Number(req.params.artistId), Number(req.params.musicId));
    res.json("Lista de músicas do artista foi atualizada com sucesso.");
  } catch(error){
    next(error);
  }
});

router.put('/updateArtist/:id', async(req: Request, res: Response, next: NextFunction) =>{
  try{
    const artist = await ArtistServices.update(Number(req.params.id), req.body);
    res.json("Usuário atualizado com sucesso.");
  }catch (error){
    next(error);
  }
});

router.delete('/deleteArtist/:id', async(req: Request, res: Response, next: NextFunction) => {
  try{
    const artist = await ArtistServices.delete(Number(req.params.id));
    res.json("Artista deletado com sucesso.");
  }catch(error){
    next(error);
  }
});

export default router;