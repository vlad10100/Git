const tileDisplay = document.querySelector(".tile-container")
const keyboard = document.querySelector(".key-container")
const messageDisplay = document.querySelector(".message-container")


// let wordle

// const getWordle = () => {
//     fetch('http://localhost:8000/word')
//     .then(response => response.json())
//     .then(json => {
//         console.log(json)
//         wordle = json.toUpperCase()
//     })
//     .catch(err => console.log(err))
// }
// getWordle()

const wordle = 'VLADY'

const keys = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'ENTER',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M',
    '<<',
]

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
]




let currentRow = 0
let currentTile = 0             // let --->>> can be reassigned
let isGameOver = false









// create a row
// create tiles inside the row
// move on and repeat until max rows is reached.
guessRows.forEach((guessRow, guessRowIndex) => {

    // create a div that contains all the tiles in a row.
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    // <div id="guessRow-(guessRowIndex)"><div> 
    // example: guessRowIndex = 1
    // <div id="guessRow-1"><div> 


    // Inside the guessRow
    guessRow.forEach((guess, guessIndex) => {
        // create a div that contains a single tile.
        const tileElement = document.createElement('div')

        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')

        // After creating a TILE  it needs to append and create a new unitl the guessIndex is reached.
        rowElement.append(tileElement)
    })

    // After creating a full row, its time to append and move on to the next row.
    tileDisplay.append(rowElement)

})





// key = qwetyuiop...
// loop thru all the keys
keys.forEach(key => {
    // create a button (element) for each keys
    const buttonElement = document.createElement('button')

    // Assign each key to be the value of the button
    // example...  <button>KEY</button>
    buttonElement.textContent = key
    // Create an id for each key, id=key
    buttonElement.setAttribute('id', key)

    // when clicked, the click will be handled in the handleClick function
    buttonElement.addEventListener('click', () => handleClick(key))
    // append and move to the next key
    keyboard.append(buttonElement)
})






// Arrow function
// xyzFunction(parameter) 

// const xyzFunction = (parameter) => {
//     do something with the passed parameter
// }


const handleClick = (letter) => {
    // !isGameOver **equal** (isGameOver == false)
    if (isGameOver == false) {
        console.log('clicked', letter)
        if (letter === '<<') {
            deleteLetter()
            console.log('guessRows', guessRows)
            return 
        }

        if (letter === 'ENTER') {
            checkRow()
            console.log('check the row')
            return
        }

        addLetter(letter)
    }
}



const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6){

        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++ // move to the next tile
        console.log('guessRows', guessRows)
    }
    
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile-- // move back first and then replace with blank string
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = '' // to print the matrix
        tile.setAttribute('data', '')           // set the attribute to blank string
    }

}

const checkRow = () => {
    const guess = guessRows[currentRow].join('') // combine the list to form a string
    console.log('guess: ', guess)
    
    if (currentTile > 4) {
        flipTile()
        console.log(guess)
        
        if (wordle == guess) {
            showMessage('Yehey!!! You Got It!!!')
            isGameOver = true
            return
        }else{
            if (currentRow >= 5) {
                isGameOver = false
                showMessage('Game Over')
                return
            }
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
            }
        }

    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 4000)
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}   




const flipTile = (tile) => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []
    


    // guess has a letter and color


    // set to color grey 
    rowTiles.forEach(tile => {
        guess.push({letter:tile.getAttribute('data'), color: 'grey-overLay'})

    })


    // set to color green
    guess.forEach((guess, index) => {
        console.log(guess)
        if (guess.letter == wordle[index]){
            guess.color = 'green-overLay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })


    // set to color yellow
    guess.forEach(guess => {
        if(checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overLay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })



    rowTiles.forEach((tile, index) => {
        const dataLetter = tile.getAttribute('data')

        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        },500*index)
    })
}