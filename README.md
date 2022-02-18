Tutorial Video:

1. Create basic html page layout called index.html
2. add divs with classes, add style sheet, and app.js
   1. ``` <div class="game-container">
            <div class="title-container">
                <h1>Tyler Smells</h1>
            </div>
            <div class="tile-container"></div>
            <div class="key-container"></div>
            <div class="message-container"></div>
        </div>
3. create css classes 
   1. title, game, key, message, tile containers in style.css
4. start on app.js. tiles and keys first
   1. create tiledisplay and keyboard function
   2. create keys array
   3. create keys.foreach
   4. create handleclick
5. in styles, add .key-container button{}
   1. create key container nth child to make enter larger
   2. create key container nth child to make a key scoot over
6. create tiles
   1. create guessrows function
   2. create foreach for guessrows
   3. inside the foreach we need to loop again to add five tiles to each row
      1. use guessrow for this. above .append
      2. now we are aware of each individual tile and where they are 
   4. back to style. time to make these tiles show up on screen
      1. add .tile-container .tile{}
      2. add .tile-container div{}
   5. now we make it appear on the screen
      1. add tileElement.append(tileElement) to second foreach loop
   6. add message container to css with a height of 30px
   7. handle click
      1. create const super
      2. add key to console.log
      3. add callback to buttonElement add event listener
   8. add letters to correct tile
      1. create letcurrentrow = 0
      2. create const addLetter = () => {}
      3. pass in letter and add letter to handleclick
      4. inside getelementbyid we need the id of the first tile.
      5. we can get that from the html
      6. change that to adding the currentRow and tile
   9. add console log statements to handleclick for testing
   10. add if statement into addletter
   11. function to delete letter
   12. add function to handclick instead of console.log
   13. add function checkRow to check it against wordle
   14. add functionality to check if theyre equal inside checkrow
   15. add function showMessage. 
       1. define message display at the top after adding it inside the function
       2. give p tag a little styling
   16. go back into checkRow to add the next logic
       1. create let isGameOver = false
       2. add this into wordle == guess
       3. add else statement
          1. inside else statement if current row is greater than five, show message game over
          2. inside else statement if currentrow is less than 5, increment currentrow and set current tile to 0
       4. add colors function
          1. add style to green overlay, grey, and yellow
          2. !important will overwrite the order is important
       5. add else if and else for other colors
       6. add flipTile to checkrow
       7. add timout to fliptile and add classlist flip
       8. create flip styling
       9. add a setTimeout function to flipTile
       10. create let checkWordle and guess 
       11. 