const { PORT } = require("./utils/config");
require("./db/mongo");

const express = require("express");
const cors = require("cors");
const app = express();

const { logger, handlerNotFound, handlerError } = require("./utils/mw");
const { mailRouter } = require("./routes/mailRouter");

app.use(cors({ origin: "https://alan-passucci.vercel.app" }));
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => res.send("<h1>Portfolio-API</h1>"));

app.use("/api/mail", mailRouter);

app.use(handlerNotFound);
app.use(handlerError);

app.listen(PORT, () => console.log(`Server listening on https://a-p-portfolio-api:${PORT}/`));