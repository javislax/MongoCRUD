const express = require("express");
const app = express();
const createError = require("http-errors");
const path = require("path");
const router = require("./src/routes/routes");
const helmet = require("helmet");
const connection = require("./src/connection");

//app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(router);

app.use(express.static(path.join(__dirname, "./public")));
app.use(helmet());
//app.use(helmet({ contentSecurityPolicy: false, }))

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  if (err.status == 404) {
    res.sendFile(path.join(__dirname, "./public/404.html"));
  } else {
    res.join({
      status: err.status,
      error: err.message,
    });
  }
});

connection
  .then(() => {
    console.log("Conectado a la base de datos...");

    app.listen(3000, () => {
      console.log("Servidor iniciado");
    });
  })
  .catch(function (err) {
    console.log(`Error al conectar a la base de datos: ${err}`);
  });
