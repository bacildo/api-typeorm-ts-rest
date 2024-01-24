import express from "express";
import status from "./routes/status";
import user from "./routes/user";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(user)
app.use(status)

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
