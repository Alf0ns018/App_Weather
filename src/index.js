const express = require("express");
const engine = require("ejs-mate");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
// Inicializaciones
const app = express();
//Conexión a la base de datos
require("./database");
require("../passport/local-auth");

// Configuraciones
//carpeta de vistas
app.set("views", path.join(__dirname, "views"));
app.engine(" ejs", engine);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

// Middleware "Son las funcoines que se ejecutan antes de las rutas"
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
//se eencarga de la validación, de si eta o no validado
app.use(passport.initialize());
app.use(
  passport.session({
    secret: "myscret",
    resave: false,
    saveUninitialized: false,
  })
);

//Rutas
app.use("/", require("./routes/index"));

// Inicialización del Servidor
app.listen(app.get("port"), () => {
  console.log("Server on Port", app.get("port"));
});
