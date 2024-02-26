import UserService from "../services/UserServices";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const users = await UserService.findUsers();
    res.json(users);
  } catch (error){
    next(error);
  }
})

router.get('/:email', async(req: Request, res: Response, next: NextFunction) => {
  try{
    const user = await UserService.findByEmail(req.params.email);
    res.json(user);
  } catch(error){
    next(error);
  }
});

router.get('/getAllMusics/:id', async(req: Request, res: Response, next: NextFunction) => {
  try{
    const user = await UserService.findMusics(Number(req.params.id));
    res.json(user);
  } catch(error){
    next(error);
  }
});

router.post('/create', async(req: Request, res: Response, next: NextFunction) => {
  try{
    await UserService.create(req.body);
    res.json("Usuário criado com sucesso.");
  } catch (error){
    next(error);
  }
});

router.put('/addMusic/:userId/:musicId', async(req: Request, res: Response, next: NextFunction) => {
  try{
    await UserService.addMusic(Number(req.params.userId), Number(req.params.musicId));
    res.json("Música adicionada ao usuário com sucesso.");
  } catch(error){
    next(error);
  }
});

router.put('/removeMusic/:userId/:musicId', async(req: Request, res: Response, next: NextFunction)=>{
  try{
    await UserService.removeMusic(Number(req.params.userId), Number(req.params.musicId));
    res.json("Música removida do usuário com sucesso.");
  }catch(error){
    next(error);
  }
});

router.put('/updateUser/:id', async(req: Request, res: Response, next: NextFunction) => {
  try{
    await UserService.update(Number(req.params.id), req.body);
    res.json("Usuário atualizado com sucesso");
  } catch (error){
    next(error);
  }
});

router.delete('/delete/:idUser', async(req: Request, res: Response, next: NextFunction) => {
  try{
    await UserService.delete(Number(req.params.idUser));
    res.json("Usuário deletado com sucesso.");
  } catch(error){
    next(error);
  }
});

export default router;