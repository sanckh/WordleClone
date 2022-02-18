const tileDisplay = document.querySelector('.tile-container') //looking for an element with the class tile container
const keyboard = document.querySelector('.key-container') //looking for an element with the class key container
const messageDisplay = document.querySelector('.message-container')

let wordle

const getWordle = () => {
    fetch('http://localhost:8000/word')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            wordle = json.toUpperCase()
        })
        .catch(err => console.log(err))
}

getWordle()

//in keys we are going to paste in an array of every key we want included in the keyboard
const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<<' //backspace
]
const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

let currentRow = 0
let currentTile = 0
let isGameOver = false

const handleClick = (key) => {
    if(!isGameOver){
        console.log('clicked', key) //placeholder
        if(key === '<<'){
            deleteLetter()
            console.log('guessRows', guessRows)
            return
        }
        if(key === 'ENTER')
        {
            checkRow()
            console.log('check row')
            console.log('guessRows', guessRows)
            return
        }
        addLetter(key)
        console.log('guessRows', guessRows) //can add this to test
    }
}

keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div') //creating a div
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex) //give each row element an id and value
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile') //add this after making styles in css
        rowElement.append(tileElement) //what this is going to do is add five tiles inside each of the six original divs.
        //thus giving us the code for the wordle tiles.
    })
    tileDisplay.append(rowElement) //add to the tiledisplay function
})

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) { //add if statement later after explanation
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter //assigning letter to tile text content
        guessRows[currentRow][currentTile] = letter//grabbing the first tile and replacing with letter
        tile.setAttribute('data', letter) //will let us color the letters later
        currentTile++ //goes to the next tile
        //you can test this here by writing console.log('guessRows', guessRows)
    }
}

const deleteLetter = () => {
    if(currentTile > 0) { //add if statement after
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = '' //assigning an empty space to tile when we hit delete key
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    console.log('guess', guess)
    if (currentTile > 4) {
        fetch(`http://localhost:8000/check/?word=${guess}`)
            .then(response => response.json())
            .then(json => {
                if (json == 'Entry word not found') {
                    showMessage('This isn\'t a word, dumb bitch')
                    return
                } else {
                    flipTile()
                    if (wordle == guess) {
                        showMessage('Good Shit!')
                        isGameOver = true
                        return
                    } else {
                        if (currentRow >= 5) {
                            isGameOver = true
                            showMessage('Game Over Fuck Face')
                            return
                        }
                        if (currentRow < 5) {
                            currentRow++
                            currentTile = 0
                        }
                    }
                }
            }).catch(err => console.log(err))
    }
}
const showMessage = (message) => {
    const messageElement = document.createElement('p') //creating a p tag
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement),3000) //will remove the message after 2000ms
}
const addColorToKey=(keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}

//use this for video
// const flipTile = () => {
//     const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes //will grab all of the children of the row
//     let checkWordle = wordle
//     const guess = []
//     rowTiles.forEach((tile, index) => {
//         const dataLetter = tile.getAttribute('data')
//
//        setTimeout(() => {
//            tile.classList.add('flip')
//            if(dataLetter == wordle[index]) {
//                tile.classList.add('green-overlay')
//                addColorToKey(dataLetter, 'green-overlay')
//            } else if(wordle.includes(dataLetter)) {
//                tile.classList.add('yellow-overlay')
//                addColorToKey(dataLetter, 'yellow-overlay')
//            } else {
//                tile.classList.add('grey-overlay')
//                addColorToKey(dataLetter, 'grey-overlay')
//            }
//        }, 500 * index)
//     })
// }



