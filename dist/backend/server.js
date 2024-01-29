"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`Le serveur a démarré et écoute les requêtes htpp sur le port ${port}`);
});
