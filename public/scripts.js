
    function addButtonListener(button){
        button.addEventListener('click',function(){
            location.reload();    
        });
    }

    // This function must to add the right and left click events on the cells
    function addEventListeners() {
                    const cells = document.querySelectorAll('.cell , .cell-flag');
                    cells.forEach(cell => {
                        if(cell.classList.contains('cell')){
                                // left click events.
                                cell.addEventListener('click', function() {
                                    const boardId = this.dataset.id;
                                    const x = this.dataset.x;
                                    const y = this.dataset.y;
                                    const click = 'left';
                                    const queryParams = new URLSearchParams({ id: boardId, x: x, y: y , click: click  }).toString();
                                    
                                    fetch(`/?${queryParams}`,{
                                        method: 'GET',
                                        headers : {
                                            'Content-Type' : 'aplication/json'
                                        }
                                    }).then((response)=>{
                                        return response.text();
                                    })
                                    .then( 
                                        
                                        (html) => {             //  once i have the html i need to show it.
                                            const parser = new DOMParser();
                                            const doc = parser.parseFromString(html, 'text/html');

                                            const body = doc.querySelector('body'); 

                                            if (body) {
                                                document.body.innerHTML = body.innerHTML;
                                                addEventListeners();    // The event listeners are added again for the new board.
                                                const button = document.querySelector("#play-button");     
                                                if(button){                     // when the game is ended.
                                                    addButtonListener(button);
                                                }
                                            }
                                        } 
                                        
                                    );
                                
                                });
                        }
                        // Right click events:
                        cell.addEventListener('contextmenu', function(event) {
                            event.preventDefault();
                            const boardId = this.dataset.id;
                            const x = this.dataset.x;
                            const y = this.dataset.y;
                            const click = 'right';
                            const queryParams = new URLSearchParams({ id: boardId, x: x, y: y , click: click  }).toString();
                            
                            fetch(`/?${queryParams}`,{
                                method: 'GET',
                                headers : {
                                    'Content-Type' : 'aplication/json'
                                }
                            }).then((response)=>{
                                return response.text();
                            })
                            .then( 
                                
                                (html) => { 
                                    const parser = new DOMParser();
                                    const doc = parser.parseFromString(html, 'text/html');

                                    const body = doc.querySelector('body'); 

                                    if (body) {
                                        document.body.innerHTML = body.innerHTML;
                                        addEventListeners();                // The event listeners are added again for the new board.
                                        const button = document.querySelector("#play-button");      // This button show up at the end
                                        if(button){                     // when the game is ended.
                                            addButtonListener(button);
                                        }
                                    }
                                } 
                                
                            );
                        
                        });


                    }); // end for each.
    }

    document.addEventListener('DOMContentLoaded', function() { addEventListeners() });

