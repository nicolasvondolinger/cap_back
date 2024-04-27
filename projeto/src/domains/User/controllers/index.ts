import { Router, Request, Response, NextFunction } from "express";
import UserService from "../services/userServices";
import { statusCodes } from "../../../../utils/constants/statusCodes";
import { checkRole } from "../../../middlewares/checkRole";
import { loginMiddleware, logoutMiddleware, notLoggedIn, verifyJWT } from "../../../middlewares/authentication";

const router = Router();

router.post('/login', notLoggedIn, loginMiddleware);

router.post('/logout', verifyJWT, logoutMiddleware);


router.get("/", async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const users = await UserService.findUsers();
    res.json(users);
  } catch (error){
    next(error);
  }
});

router.get('/myAccount', verifyJWT, async(req: Request, res: Response, next: NextFunction) => {
  try{
    const user = await UserService.getMyAccount(req.body);
    res.json(user);
  } catch(error){
    next(error);
  }
});

router.get('/getMyMusics/:id', verifyJWT, async(req: Request, res: Response, next: NextFunction) => {
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
    res.status(statusCodes.CREATED).json("Usuário criado com sucesso.");
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

router.put('/removeMusic/:musicId', async(req: Request, res: Response, next: NextFunction)=>{
  try{
    await UserService.removeMusic(req.user, Number(req.params.musicId));
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