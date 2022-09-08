//to do: make notes button better, fix grid, arrange everything nicely, 
const winScreen = document.querySelector('.win-screen');
const mistakeCounter = document.querySelector('.counter');

//sets current cell to the first one just because
let currCell = document.querySelector('.cell');
currCell.classList.add("selected");

//grabs all the cells
const cells = document.querySelectorAll('.cell');
//adds event listener to each cell
cells.forEach(function(cell) {
    cell.addEventListener('click', selectCell)
});

//tracks if note mode is on or not
let notesOn = false;

//grabs note button and adds event listener
const noteButt = document.querySelector('.notes-button');
noteButt.addEventListener('click', toggleNotes);

//listens for spacebar and toggles notes
window.addEventListener('keydown', function (e) {
    if (e.key === ' ') {
        e.preventDefault();
        toggleNotes();
    }
});

//turns notes mode on and off
function toggleNotes() {
    if (notesOn) {
        notesOn = false;
        noteButt.classList.remove("on");
        noteButt.innerText = 'Notes: Off'
    } else {
        notesOn = true;
        noteButt.classList.add("on");
        noteButt.innerText = 'Notes: On';
    }
}

//highlights clicked cell and unhighlights previously clicked cell
function selectCell() {
    currCell.classList.remove("selected");
    this.classList.add("selected");
    currCell = this;
}

//listens for backspace and then deletes selected cell if possible
window.addEventListener('keydown', function (e) {
    if (e.key == 'Backspace') {
        if (isEmpty(currCell)) {
            currCell.innerText = '';
            currCell.classList.remove("wrong");
        }
    }
});

//listens for key clicks of numbers
window.addEventListener('keydown', function (e) {
    if (isNumber(e.key)) {
        if (isEmpty(currCell)) {
            if (notesOn) {
                handleNote(e.key);
            } else {
                handleNormal(e.key);
            }
        }        
    }
});

//checks if answer is right or wrong and places number
function handleNormal(input) {
    currCell.classList.remove("notes");
    if (currCell.dataset.value == input) {
        currCell.classList.remove("wrong");
        currCell.innerText = input;
        checkWin();     //checks to see if they won
    } else {
        currCell.classList.add("wrong");
        currCell.innerText = input;
        mistakeCounter.innerText += 'X';
    }
}

//adds or deletes note
function handleNote(input) {
    currCell.classList.add("notes");
    if (isWrong(currCell)) {
        currCell.classList.remove("wrong");
        currCell.innerText = input;
    } else {
        if (currCell.innerText.includes(input)) {
            currCell.innerText = currCell.innerText.replace(input, '');
        } else {
            currCell.innerText += input;
        }
    }   
}

//checks if selected cell is filled with wrong number
function isWrong(cell) {
    if (cell.classList.contains("wrong")) {
        return true;
    }
    return false;
}

//checks if key clicked is a valid number
function isNumber(num) {
    if (num==1 || num==2 || num==3 || num==4 || num==5 || num==6 || num==7 || num==8 || num==9) {
        return true;
    }
    return false;
}

//checks if selected cell is empty
function isEmpty(cell) {
    if (cell.innerText == '' || cell.classList.contains("notes") || isWrong(cell)) {
        return true;
    } else {
        return false;
    }
}

//checks if the puzzle is complete
function checkWin() {
    let check = 0;
    cells.forEach(function (cell) {
        if (isEmpty(cell)) {
            check++;
            //console.log('this one\'s empty. i am fatter than hell')
        }
    })
    if (check === 0) {
        console.log('YOU WON $100 WORTH OF FRESH CASSEROLE!!!');
        finalTime.innerText = currentTime;
        winScreen.classList.add('open');
        clearInterval(x);
    }
}

//adds listener to play again button and refreshes page if clicked
const playAgainButt = document.querySelector('.play-again');
playAgainButt.addEventListener('click', function() {
    location.reload();
});


//times how long it takes to complete sudoku
const finalTime = document.querySelector('.final-time');
const timer = document.querySelector('.timer');
var time = 0;
var currentTime;

var x = setInterval(function() {
    time++;

    var minutes = Math.floor(time/60);
    var seconds = time%60;

    currentTime = `${minutes}:${seconds<10 ? '0' : ''}${seconds}`;
    
    timer.innerText = currentTime;
}, 1000);