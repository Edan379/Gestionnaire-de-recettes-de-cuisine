import * as express from "express";

const app:express.Express=express();

const port:number=3000;

app.listen(port,()=>{
    console.log(`Le serveur a démarré et écoute les requêtes htpp sur le port ${port}`)
})