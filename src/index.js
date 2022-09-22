import express from "express";
import routes from "./routes.js";
import "express-async-errors";

const app = express();

app.use(express.json());

app.use(routes);

//! Sempre que tiver um midleware que recebe 4 argumentos
//? O express entende que este é um midleware para manipulação de erros
// * Express não sabe lidar com erros assincronos, para resolver isso é necessário instalar uma nova lib express-async-errors.
app.use((error, _request, response, _next) => {
  console.log(error);
  response.sendStatus(500);
});

app.listen(3000, () => {
  console.log("Server on");
});
