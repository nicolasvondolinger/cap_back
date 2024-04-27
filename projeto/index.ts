import { app } from "./config/expressConfig";


require('dotenv').config();

app.listen(process.env.PORT, () => {
  console.log("Servidor hosteado na porta " + process.env.PORT);
});