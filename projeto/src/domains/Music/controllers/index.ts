import MusicService from "../services/MusicServices";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const musics = await MusicService.findMusics();
    res.json(musics);
  } catch(error){
    next(error);
  }
});

router.get("/:id", async(req:Request, res: Response, next: NextFunction)=>{
  try{
    const music = await MusicService.read(Number(req.params.id));
    res.json(music);
  } catch(error){
    next(error);
  }
});

router.post("/create", async(req:Request, res: Response, next: NextFunction)=>{
  try{
    const music = await MusicService.create(req.body);
    res.json("Música criada com sucesso.");
  } catch(error){
    next(error);
  }
})

router.post("/updateMusic/:musicId", async(req: Request, res: Response, next: NextFunction) =>{
  try{
    const music = await MusicService.update(Number(req.params.id), req.body);
    res.json("Música atualizada com sucesso.");
  }catch(error){
    next(error);
  }
});

router.delete("/delete/:id", async(req: Request, res: Response, next: NextFunction) => {
  try{
    const music = await MusicService.delete(Number(req.params.id));
    res.json("Música deletada com sucesso.");
  } catch(error){
    next(error);
  }
});

export default router;