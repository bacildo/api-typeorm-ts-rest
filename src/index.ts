import express from "express";
import { Container } from "typedi";
import {Connections} from "./initialization"
import status from "./routes/status";
import user from "./routes/user";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(user);
app.use(status);

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});


 (async () => {
  const connections = Container.get(Connections);
  await connections.connection();
})();

