
import { boardModel } from "./boardModel.js";




export class gamesModel{

    constructor() {
        this.games = [];
    }

    add(game){
        this.games.push(game);
    }

    remove(id){
        this.games.filter((game)=> game.id !== id )
    }

    find(id){
        return this.games.find((game)=> game.id === id )
    }


}