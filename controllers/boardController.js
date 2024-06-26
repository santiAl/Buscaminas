import { json } from "express";
import { boardModel } from "../models/boardModel.js";


export class boardController{
    static getBoard (request,response){
        const games = request.GAMES;
        const { id, x, y , click } = request.query;
        
                if(id === undefined ){     // When it's the first time you enter the page.
                    let emptyBoard = new boardModel();
                    games.add(emptyBoard);
                    response.render('board',{'board': emptyBoard.board , 'id': emptyBoard.id });
                }
                else{
                            if(click === 'left'){
                                        try{
                                                let board = games.find(id);
                                                board.leftClick(x,y);
                                                if(board.status !== 'playing'){
                                                        response.render('endTemplate',{'status': board.status});
                                                }
                                                else{
                                                        response.render('board',{'board': board.board, 'id': board.id });
                                                }
                                        }
                                        catch(error){
                                                response.render('error',{'error':error});
                                        }
                            }
                            if(click === 'right'){
                                        try{
                                                let board = games.find(id);
                                                board.rightClick(x,y);
                                                if(board.status !== 'playing'){
                                                        response.render('endTemplate',{'status': board.status});
                                                }
                                                else{
                                                        response.render('board',{'board': board.board, 'id': board.id });
                                                }
                                        }
                                        catch(error){
                                                response.render('error',{'error':error});
                                        }
                            }
                }
        
    }
}