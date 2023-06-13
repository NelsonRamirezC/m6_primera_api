const chalk = require("chalk");
const http = require("http");
const digimones = require("./digimon.json");
const querystring = require("node:querystring");

const servidor = http.createServer((req, res) => {
    if (req.url == "/" && req.method == "GET") {
        res.end("Página principal API Digimones");
    } else if (req.url == "/api/digimones" && req.method == "GET") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(digimones));
    } else if (req.url.startsWith("/api/digimon/name") && req.method == "GET") {
        let arugmentos = querystring.parse(req.url);
        let values = Object.values(arugmentos);

        if (values.length > 0) {
            if (values[0] == "") {
                res.statusCode = 400;
                return res.end("Debe proporcionar un nombre de digimon.");
            }
            let digimon = digimones.find((digimon) =>
                digimon.name.toLowerCase().includes(values[0].toLowerCase())
            );

            if (!digimon) {
                res.statusCode = 400;
                return res.end(
                    `Su búsqueda con nombre ${values[0]} no tuvo coincidencias.`
                );
            }
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(digimon));
        } else {
            res.statusCode = 400;
            res.end(
                "No se ha proporcionado información válida para encontrar un digimon.."
            );
        }
    } else {
        res.statusCode = 404;
        res.end("Ruta desconocida.");
    }
});

servidor.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
});
