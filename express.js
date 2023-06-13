const express = require("express");
const digimones = require("./digimon.json");
//instancia de express
const app = express();

//levantamos el servidor permitiendo que escucha peticiones
//en puerto 3000
app.listen(3000, () =>
    console.log("servidor escuchando en http://localhost:3000")
);

//rutas

//ruta principal
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//ruta API

//RUTA DEVUELVE TODOS LOS DIGIMONES
app.get("/api/digimones", (req, res) => {
    res.send(digimones);
});

//RUTA FILTRO DIGIMON POR NOMBRE
app.get(["/api/digimones/name/:name", "/api/digimones/name"], (req, res) => {
    let { name } = req.params;
    if (!name) {
        name = req.query.name;
    }
    console.log(name);
    if (name) {
        let digimon = digimones.find((digimon) =>
            digimon.name.toLowerCase().includes(name.toLowerCase())
        );

        if (digimon) {
            res.send(digimon);
        } else {
            res.status(404).send(`Digimon ${name} no encontrado.`);
        }
    } else {
        res.status(400).send("No ha proporcionado un nombre de digimon.");
    }
});

//RUTA ALTERNATIVA PARA LAS CONSULTAS QUE NO COINCIDAN
app.all("*", (req, res) => {
    res.status(404).send("Ruta desconocida.");
});
