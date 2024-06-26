import crypto from 'crypto';


const N = 10;
const M = 10;
const DIRECTIONS = [[1,1],[-1,-1],[1,-1],[-1,1],[0,1],[0,-1],[1,0],[-1,0]]




export class boardModel{

                    constructor() {
                        this.id = crypto.randomUUID();
                        this.board = Array(M) 
                        .fill(null) 
                        .map(() =>
                        Array(N).fill(null).map(() => ({
                            value: null,
                            isMine: false,
                            visibility: false,
                            isFlag: false,
                        }))
                        );
                        this.nMines = 10;
                        this.counter = 0;
                        this.status = 'playing';
                    }

                    leftClick(i,j){
                        let newBoard = this.board.slice();

                        if(this.counter===0){
                            newBoard = this.setMines(newBoard.slice(),N,M,i,j);
                            this.revealAdyacentsPositions(newBoard.slice(),i,j);
                        }

                        newBoard[i][j].visibility = true;
                        if(this.numberOfMines(newBoard,i,j) !== 0){
                            newBoard[i][j].value = this.numberOfMines(newBoard,i,j);
                        }
                        this.counter = this.counter+1;

                        if(this.numberOfMines(newBoard.slice(),i,j) === 0 && this.counter !== 0){
                                this.revealCeros(newBoard,i,j);
                        }

                        if(newBoard[i][j].isMine){
                            this.status = 'end';
                        }

                        if(this.nMines === 0){
                                if(this.winCondition()){
                                    this.status = 'win';
                                }
                        }

                    }

                    rightClick(i,j){
                        if(this.board[i][j].isMine){
                          if(this.board[i][j].isFlag){
                            this.nMines = this.nMines + 1;
                          }
                          else{
                            this.nMines = this.nMines - 1;
                          }
                        }
                  
                        if(this.board[i][j].isFlag){
                          this.board[i][j].isFlag = false;
                        }
                        else{
                          this.board[i][j].isFlag = true;
                        }
                        if(this.nMines === 0){
                            if(this.winCondition()){
                              this.status = 'win';
                            }
                        }
                      }




                    revealAdyacentsPositions(board,x,y){
                        const newBoard = board;
                        let  adj  = this.adyacentPositions(x,y);
                        while( adj.length > 0){
                            let pos = adj.shift();
                            let x1= pos[0];
                            let y1= pos[1];
                            if(!newBoard[x1][y1].isMine){
                            if(Number(this.numberOfMines(newBoard,x1,y1)) === 0 && newBoard[x1][y1].visibility === false){
                                adj = adj.concat(this.adyacentPositions(newBoard,x1, y1));
                                newBoard[x1][y1].visibility= true;
                                if(this.numberOfMines(newBoard,x1,y1) !== 0){
                                    newBoard[x1][y1].value = this.numberOfMines(newBoard,x1,y1);
                                }
                            }
                                newBoard[x1][y1].visibility= true;
                                if(Number(this.numberOfMines(newBoard,x1,y1)) !== 0){
                                    newBoard[x1][y1].value = this.numberOfMines(newBoard,x1,y1);
                                }
                            }
                        }
                        return newBoard;
                    }

                    revealCeros(board,x,y){
                      //  const newBoard = JSON.parse(JSON.stringify(board));    // Array copy
                        let newBoard = board;
                        let adj = this.adyacentPositions(x,y);
                        while( adj.length > 0){
                            let pos = adj.shift();
                            let x1= pos[0];
                            let y1= pos[1];
                            if(!newBoard[x1][y1].isMine){
                                    if(Number(this.numberOfMines(newBoard,x1,y1)) === 0 && newBoard[x1][y1].visibility === false){
                                        adj = adj.concat(this.adyacentPositions(x1, y1).slice());
                                        newBoard[x1][y1].visibility= true;
                                    }
                                    else{
                                        if(Number(this.numberOfMines(newBoard,x1,y1)) !== 0 && newBoard[x1][y1].visibility === false){
                                            newBoard[x1][y1].visibility= true;
                                            newBoard[x1][y1].value = this.numberOfMines(newBoard,x1,y1);
                                        }
                                    }
                            }
                        }
                    }


                    numberOfMines(board,x,y){
                        let adyacents = this.adyacentPositions(x,y);
                        let res = 0;
                        for(let i=0; i < adyacents.length;i++){
                        let x1 = adyacents[i][0];
                        let y1 = adyacents[i][1];
                        if(board[x1][y1].isMine){
                            res = res+1
                        } 
                        }
                        return res;
                    }


                    adyacentPositions(x,y){
                        let result = []; 
                        for(let i=0; i < 8; i++){
                            let dir = [...DIRECTIONS][i];
                            if(this.isValidPosition(Number(dir[0])+Number(x),Number(dir[1])+Number(y))){
                                result.push([Number(dir[0])+Number(x),Number(dir[1])+Number(y)]);
                            }
                        }
                        return result;
                    }


                    isValidPosition(x,y){
                        if(x >= 0 && x < N ){
                            if(y >= 0 && y < M ){
                                return true;
                            }
                        }
                        return false;
                    }

                    setMines(board,rows,cols,x,y){
                                let min = 0;
                                const newBoard = board;
                                for(let i=0;i<10;i++){
                                let max = rows-1;
                                let xRandom = Math.floor(Math.random() * (max - min + 1)) + min;
                                max= cols-1;
                                let yRandom = Math.floor(Math.random() * (max - min + 1)) + min;
                                if(xRandom !== Number(x) && yRandom !== Number(y) && newBoard[xRandom][yRandom].isMine !== true){
                                    newBoard[xRandom][yRandom].isMine = true;
                                }
                                else{
                                    i = i-1;
                                }
                                }
                                return newBoard;
                      }

                      winCondition(){
                        let res = (N*M) - 10;
                        const newBoard = this.board.slice();
                        for(let i=0; i < N ; i++){
                            for(let j=0; j < M; j++){
                                    if(newBoard[i][j].visibility){
                                        res = res-1;
                                    }
                            }
                        }
                        return res === 0;
                      }
                  

}

