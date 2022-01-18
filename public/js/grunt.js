const app = {
    player:{
        x: 0,
        y: 0,
        direction: "right"
    },
    targetCell: {
        x: 5,
        y: 3
    },
    board: undefined,
    directions: [
        "down",
        "left",
        "up",
        "right"
    ],
    gameOver: false,
    // Initialisation
    init() {
        app.board = document.getElementById("board");
        app.drawBoard();
        app.listenKeyboardEvents();
    },
    // Vide et redessine le board
    redrawBoard(){
        app.clearBoard();
        app.drawBoard();
    },
    // Vide le board
    clearBoard(){
        app.board.textContent = "";
    },
    // Fonction qui dessine le board
    drawBoard(sizeX = 6, sizeY = 4){
        // On test si le jeu est terminé
        app.isGameOver();

        for(let y = 0; y < sizeY; y++){
            // Créer une div classe row
            let line = document.createElement("div");
            line.classList.add("row");
            // Rajouter la ligne au board
            app.board.appendChild(line);

            for(let x = 0; x < sizeX; x++){
                // Créer une div classe cell
                let cellule = document.createElement("div");
                cellule.classList.add("cell");
                // On test avec le ET : &&
                // La positon x et y de notre cellule correspond à celle de la targetCell
                if ( y === app.targetCell.y && x === app.targetCell.x ){
                    cellule.classList.add("targetCell");
                }
                // Rajouter le joueur à sa position
                if ( y === app.player.y && x === app.player.x ){
                    let playerDiv = document.createElement("div");
                    playerDiv.id = "player";
                    // reviens au même que "player--" + app.player.direction
                    playerDiv.classList.add(`player--${app.player.direction}`);
                    // Rajout du joueur dans la cellule
                    cellule.appendChild(playerDiv);
                }
                // Rajouter la ligne au board
                line.appendChild(cellule);
            }
        }
    },
    // Tourner le joueur à droite
    turnRight(){
        if(app.gameOver){
            return;
        }

        // On teste la direction et on mets à jour en fonction
        switch(app.player.direction){
        case "right":
            app.player.direction = "down";
            break;
        case "down":
            app.player.direction = "left";
            break;
        case "left":
            app.player.direction = "up";
            break;
        case "up":
            app.player.direction = "right";
            break;
        }
        app.redrawBoard();
    },
    // tourner le joueur à gauche
    turnLeft(){
        if(app.gameOver){
            return;
        }

        // On récupere l'index de la direction dans notre tableau
        let index = app.directions.indexOf(app.player.direction);
        // Si la direction est celle du premier index (0) il faut repartir au dernier index (length - 1)
        if( index === 0 ){
            // On mets à jour la direction en prenant la direction du dernier element du tableau
            app.player.direction = app.directions[app.directions.length - 1];
        }
        else {
            // On mets à jour la direction avec la direction précédente dans le tableau (index - 1)
            app.player.direction = app.directions[index - 1];
        }
        app.redrawBoard();
    },
    // Mets la cellule du joueur en couleur fof pendant 500ms
    highlightCellWarning(){
        let playerCell = document.getElementById("player").parentElement;
        playerCell.classList.add("cell--highlight");
        setTimeout(()=>{
            playerCell.classList.remove("cell--highlight");
        },500);
    },
    // Avance le joueur et mets à jour le board sauf en cas d'erreur
    moveForward(){
        if(app.gameOver){
            return;
        }
        
        switch(app.player.direction){
        case "right":
            if(app.player.x < 5){
                app.player.x += 1;
                app.redrawBoard();
            }
            else{
                app.highlightCellWarning();
            }
            break;
        case "left":
            if(app.player.x > 0){
                app.player.x -= 1;
                app.redrawBoard();
            }
            else{
                app.highlightCellWarning();
            }
            break;
        case "down":
            if(app.player.y < 3){
                app.player.y += 1;
                app.redrawBoard();
            }
            else{
                app.highlightCellWarning();
            }
            break;
        case "up":
            if(app.player.y > 0){
                app.player.y -= 1;
                app.redrawBoard();
            }
            else{
                app.highlightCellWarning();
            }
            break;
        }
        
    },
    // Fonction qui gère le jeu pour les touches enfoncées
    listenKeyboardEvents(){
        document.addEventListener("keyup", (event) => {
            if (event.key === "ArrowRight") {
                app.turnRight();
            } else if (event.key === "ArrowLeft") {
                app.turnLeft();
            } else if (event.key === "ArrowUp") {
                app.moveForward();
            }
        });
    },
    // Teste si la partie est gagnée et affiche un message
    isGameOver(){
        if( app.player.x === app.targetCell.x && app.player.y === app.targetCell.y ){
            app.gameOver = true;
            console.log("gagné");
        }
    }
};

document.addEventListener("DOMContentLoaded", app.init);