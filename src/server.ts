import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as devController from "./controllers/dev.controller";
import * as searchController from "./controllers/search.controller";

const app = express();
const { PORT = 3333 } = process.env;

// ref: https://mongoosejs.com/docs/deprecations.html
mongoose.set("useCreateIndex", true);
mongoose
  .connect(
    "mongodb+srv://master:051710master@cluster0-rkknr.mongodb.net/week10?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .catch((err) => {
    console.log(err);
  });

/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());

/**
 * Application routes
 */
app.get("/devs", devController.index);
app.post("/devs", devController.store);
app.put("/devs/:id", devController.update);
app.delete("/devs/:id", devController.destroy);
app.get("/search", searchController.index);

app.listen(PORT, () => {
  console.log(`Server rodando na porta: ${PORT}`);
});
