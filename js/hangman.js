let word_bank = {
    'COMMITTEE': 'A group that is in charge of a specific task.',
    'LOKI': 'Lowkey',
    'BLACKWIDOW': 'See you in a minute',
    'THOR': 'Noobmaster69',
    'DATABASE': 'We don\'t know what\'s happening',
    'DRAX': 'When is Gamora?',
    'SPIDERMAN': 'Mr. Stark, I don\'t feel so good',
    'EDITH': 'Even in Death I am The Hero',
    'HULK': 'SMASH',
    'CAPTAINAMERICA': 'He was worthy',
    'AVENGERS': 'Assemble',
    'GROOT': 'I am...',
    'TESSERACT': 'Space Stone',
    'AETHER': 'Reality Stone',
    'VORMIR': 'Soul Stone',
    'BOBA': 'SAT Drink',
    'REDSKULL': 'I guide others to a treasure I cannot possess',
    'VISION': 'Mind Stone',
    'ORB': 'Power Stone',
    'TATTOO': 'A form of body modification where a design is made by inserting ink',
    'ELECTRICITY': 'The set of physical phenomena associated with the presence and motion of electric charge'
}



let hangman_pics = ['img/7.gif', 'img/6.gif', 'img/5.gif', 'img/4.gif', 'img/3.gif', 'img/2.gif', 'img/1.gif', 'img/0.gif']
let score = 0
let lives = 7
let CorrectClicks = 0



function createButtons() {
    // generate the alphabet buttons dynamically
    for (i = 65; i < 91; i++) {
        let btn = document.createElement('button')
        btn.innerHTML = String.fromCharCode(i);
        btn.id = 'button_id'
        document.body.appendChild(btn)
        btn.onclick = function buttonOnClick() {
            // when button is clicked
            console.log(btn.innerHTML + ' clicked')
            btn.id = 'buttonClicked'
            for (i = 0; i < wordList.length; i++) {
                if (wordList[i] == btn.innerHTML) {
                    blankList[i] = btn.innerHTML
                    wordListJoin = blankList.join('  ')
                    document.getElementById('word').innerHTML = wordListJoin
                    CorrectClicks += 1
                    addpoint()
                }
            }
            if (!wordList.includes(btn.innerHTML)) {
                lostlife()
                losepoint()
            }
            Solved()
        }
    }
}



function addpoint() {
    // adds score when user clicks on the correct alphabet
    score += 1;
    document.getElementById("score").innerHTML = 'Score: ' + score
}



function lostlife() {
    // decreases life by 1 if user clicks on the wrong alphabet
    lives -= 1;
    livestext.innerHTML = 'You have ' + lives + ' lives left';
    changeImage()
    if (lives == 0) {
        for (i = 65; i < 91; i++) {
            try {
                document.getElementById('button_id').id = 'buttonClicked'
            }
            catch{
                console.log(i + ' is already gone')
            }
        }
        setTimeout(LosingMessage, 500)
    }
}



function losepoint() {
    // subtracts score when user clicks on the wrong alphabet
    score -= 1;
    document.getElementById("score").innerHTML = 'Score: ' + score
}




function displayWord() {
    // picks a random word from the word_bank dictionary
    let i = Math.floor(Math.random() * 19)
    let randomWord = Object.keys(word_bank)
    let randomHint = Object.values(word_bank)
    return [randomWord[i], randomHint[i]]
}



function LosingMessage() {
    // displays a message when user loses and plays a sound effect
    let name = prompt('What\'s your name?')
    if ((name == null) || (name == '')) {
        word.innerHTML = 'GAME OVER LOSER!'
    }
    word.innerHTML = 'GAME OVER ' + name.toUpperCase()
    document.getElementById("audio2").play()

}



function SolvedMessage() {
    // congratulates the user after winning the game and plays a song
    let name = prompt('What\'s your name?')
    if ((name == null) || (name == '')) {
        word.innerHTML = 'CONGRATULATIONS WINNER!'
    }
    word.innerHTML = 'CONGRATULATIONS ' + name.toUpperCase() + '!'
    document.getElementById("audio").play()
}



function Solved() {
    // checks if the word has been solved
    if (CorrectClicks == randomWord.length) {
        for (i = 65; i < 91; i++) {
            try {
                document.getElementById('button_id').id = 'buttonClicked'
            }
            catch{
                console.log(i + ' is already gone')
            }
        }
        setTimeout(SolvedMessage, 500)
    }
}



function hideWords(randomWord) {
    // turns the alphabets in the word to dashes
    let wordList = randomWord.split('')
    let wordReplace = '__ '.repeat(parseInt(wordList.length))
    blankList = wordReplace.split(' ')
    blankList.pop()
    wordListJoin = blankList.join('  ')
    document.getElementById('word').innerHTML = wordListJoin
    return [wordList, blankList]
}



function refresh() {
    // to refresh the page (for the restart button)
    window.location.reload(true)
}
document.getElementById('restart').onclick = refresh



function changeImage() {
    // change image everytime the user clicks on the wrong alphabet
    document.getElementById('hangmanImg').src = hangman_pics[lives]
}



function play() {
    // executes the game
    createButtons()
    displayWordFunction = displayWord()
    randomWord = displayWordFunction[0]
    randomHint = displayWordFunction[1]
    console.log(randomWord)
    hint.innerHTML = 'Hint: ' + randomHint
    hideWordsFunction = hideWords(randomWord)
    wordList = hideWordsFunction[0]
    blankList = hideWordsFunction[1]
    livestext.innerHTML = 'You have ' + lives + ' lives left'
    changeImage()
}


play()