import express from 'express';
import path from 'path';
import { boardRouter } from './routes/board.js';
import { fileURLToPath } from 'url';
import { gamesModel } from './models/gameModel.js';


const app = express();
app.set('view engine','ejs');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT ?? 3000; 


const GAMES = new gamesModel()
// Middleware 
app.use((req, res, next) => {
        req.GAMES = GAMES;
        next();
      });

app.use('/',boardRouter);

app.listen(PORT, ()=>{
        console.log( `server running on Port ${PORT} `);
});