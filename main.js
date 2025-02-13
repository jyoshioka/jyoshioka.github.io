function executeDrawAnimation() {
    const elements = document.querySelectorAll('#outline path:not(.filling)');
    elements.forEach(element => {
        element.classList += ' draw-animation';
    });

    document.getElementById('filled').classList += ' fade-in-animation';
}

function handleClickMe() {
    document.getElementById('click-me').disabled = true;
    document.getElementById('click-me').classList += ' fade-out-animation';

    const clickMeFadeOutDuration = 250; // Corresponds to CSS fade out animation duration.
    setTimeout(() => {
        document.getElementById('click-me').style.display = 'none'; 
        executeDrawAnimation();
    }, clickMeFadeOutDuration + 250);

    const drawAnimationDuration = 4000;
    setTimeout(() => {
        document.querySelector('.continue-btn').style.display = 'block';
        document.querySelector('.continue-btn').style.animation = 'fadeIn 0.5s linear forwards 2s';
        document.getElementById('names-with-heart').style.animation = 'fadeIn 1s linear forwards, bounce 1.5s ease alternate infinite';
    }, (clickMeFadeOutDuration + 250) + drawAnimationDuration - 500);
}

// Fades in transitions screen.
function transitionIn() {
    document.getElementsByClassName('transition-screen')[0].style.opacity = '0.0';
    document.getElementsByClassName('transition-screen')[0].style.display = 'block';
    document.getElementsByClassName('transition-screen')[0].style.animation = 'fadeIn 0.75s linear forwards';
}

// Fades out transition screen.
function transitionOut() {
    document.getElementsByClassName('transition-screen')[0].style.animation = 'fadeOut 0.75s linear forwards';
    setTimeout(() => {
        document.getElementsByClassName('transition-screen')[0].style.display = 'none';
    }, 750);
}

function transitionToPage(page) {
    transitionIn();

    // Delay of 1000ms corresponds to transitionIn animation duration.
    const transitionInDuration = 750;
    setTimeout(() => {
        window.location.href = page;
    }, transitionInDuration + 250);
}

function introWordle() {
    transitionOut();

    document.getElementById('yes').style.animation = 'fadeIn 0.5s linear forwards 3s';
    document.getElementById('no').style.animation = 'fadeIn 0.5s linear forwards 3s';
}

function randomizeLocation() {
    document.getElementById('no').style.bottom = (Math.random() * (87.5 - 0.5) + 0.5) + "%";
    document.getElementById('no').style.left = (Math.random() * (87 - 0.5) + 0.5) + "%";
}

function acceptChallenge() {
    document.getElementById('yes').disabled = true;
    document.getElementById('no').disabled = true;
    document.getElementById('yes').style.animation = 'fadeOut 0.5s linear forwards';
    document.getElementById('no').style.animation = 'fadeOut 0.5s linear forwards';
    setTimeout(() => {
        document.getElementById('yes').style.display = 'none';
        document.getElementById('no').style.display = 'none';

        document.getElementById('letsgo').style.display = 'block';
        document.getElementById('letsgo').style.animation = 'fadeIn 0.5s linear forwards 3s';
    }, 500);

    document.getElementById('intro').style.animation = 'fadeOut 0.5s linear forwards';
    document.getElementById('start').style.animation = 'fadeIn 0.5s linear forwards 0.5s';
}

const words = ['adore', 'laugh', 'blush', 'sweet', 'cheri'];
let attempt = 1;
const maxAttempts = 6;
const maxCharacters = 5;

let activeWord = words[0];
words.shift();
let currentGuess = "";

function updateCurrentGuessVisual() {
    if (isFinalWordle) {
        if (document.getElementById('grace').classList.contains('active')) {
            updateCurrentGuessVisualGrace();
            return;
        } else {
            updateCurrentGuessVisualJovan();
            return;
        }
    }

    const row = document.querySelector('.grid .row:nth-of-type(' + attempt + ')');
    const units = row.getElementsByClassName('unit');
    for (let i = 0; i < units.length; i++) {
        units[i].innerHTML = currentGuess[i] ? currentGuess[i].toUpperCase() : '';
    }
}

function addCharacter(char) {
    if (isFinalWordle) {
        if (document.getElementById('grace').classList.contains('active')) {
            addCharacterGrace(char);
            return;
        } else {
            addCharacterJovan(char);
            return;
        }
    }

    if (currentGuess.length < maxCharacters) {
        currentGuess += char;
    }
    updateCurrentGuessVisual();
}

function deleteCharacter() {
    if (isFinalWordle) {
        if (document.getElementById('grace').classList.contains('active')) {
            deleteCharacterGrace();
            return;
        } else {
            deleteCharacterJovan();
            return;
        }
    }

    if (currentGuess.length >= 0) {
        currentGuess = currentGuess.slice(0, -1);
    }
    updateCurrentGuessVisual();
}

function animateGuessResults(guess) {
    if (isFinalWordle) {
        if (document.getElementById('grace').classList.contains('active')) {
            animateGuessResultsGrace(guess);
            return;
        } else {
            animateGuessResultsJovan(guess);
            return;
        }
    }
        
    const row = document.querySelector('.grid .row:nth-of-type(' + attempt + ')');
    const units = row.getElementsByClassName('unit');
    for (let i = 0; i < units.length; i++) {
        setTimeout((guess, activeWord) => {
            if (guess[i] == activeWord[i]) {
                units[i].classList += ' correct';
            } else if (activeWord.includes(guess[i])) {
                units[i].classList += ' close';
            } else {
                units[i].classList += ' incorrect';
            }
        }, i * 500, guess, activeWord);
    }

    setTimeout(() => {
        updateLettersGuessed(guess);
    }, 2500);
}

function reset() {
    // Reset game stats
    attempt = 1;
    currentGuess = "";
    activeWord = words[0];
    words.shift();
    
    // Reset game board
    const units = document.querySelectorAll('.unit');
    units.forEach((unit, idx) => {
        unit.innerHTML = '';
        unit.classList = 'unit';
    });

    // Reset keyboard
    const keys = document.querySelectorAll('.key');
    keys.forEach((key, idx) => {
        key.classList = 'key';
    });

    // Re-enable submit button.
    document.getElementById('guess-btn').disabled = false;
    document.getElementById('back-btn').disabled = false;
    document.querySelector('.keyboard').style.pointerEvents = "auto";
}

function feed(isFinal) {
    document.getElementById('treat').style.animation = 'fadeIn 1s linear forwards';
    setTimeout(() => {
        document.getElementById('treat').style.animation = 'feed 1s ease-in backwards';
    }, 1500);

    // Dog saying delicious!
    if (!isFinal) {
        setTimeout(() => {
            document.getElementsByClassName('bubble-container')[0].style.opacity = 1.0;
            document.getElementById('fed').style.opacity = 1.0;
        }, 2500);
    
        setTimeout(() => {
            document.getElementsByClassName('bubble-container')[0].style.opacity = 0.0;
            setTimeout(() => {
                document.getElementById('fed').style.opacity = 0.0;
            }, 1000);
        }, 6500);
    } else {
        setTimeout(() => {
            document.getElementsByClassName('bubble-container')[0].style.opacity = 1.0;
            document.getElementById('final').style.opacity = 1.0;
        }, 2500);
    
        setTimeout(() => {
            document.getElementsByClassName('bubble-container')[0].style.opacity = 0.0;
            setTimeout(() => {
                document.getElementById('final').style.opacity = 0.0;
            }, 1000);
        }, 6500);
    }
}

function final() {
    // Reset game board
    const units = document.querySelectorAll('.unit');
    units.forEach((unit, idx) => {
        unit.innerHTML = '';
        unit.classList = 'unit';
    });

    // Reset keyboard
    const keys = document.querySelectorAll('.key');
    keys.forEach((key, idx) => {
        key.classList = 'key';
    });
}

function win() {
    if (words.length > 0) {
        // move to next round.
        feed();
        
        const feedDuration = 5000;
        setTimeout(() => {
            reset();
        }, feedDuration + 500);
    } else {
        // move to final round, 2 words special.
        feed(true);
        
        const feedDuration = 6500;
        setTimeout(() => {
            transitionToPage('./wordle-final.html');
        }, feedDuration + 500);
    }
}

function clearLastGuess() {
    if (isFinalWordle) {
        if (document.getElementById('grace').classList.contains('active')) {
            clearLastGuessGrace();
            return;
        } else {
            clearLastGuessJovan();
            return;
        }
    }

    // Reset last guess.
    currentGuess = '';

    // Reset last guess row.
    const row = document.querySelector('.grid .row:nth-of-type(' + attempt + ')');
    const units = row.getElementsByClassName('unit');
    for (let i = 0; i < units.length; i++) {
        units[i].innerHTML = '';
        units[i].classList = 'unit';
    }

    // Re-enable submit button.
    document.getElementById('guess-btn').disabled = false;
    document.getElementById('back-btn').disabled = false;
    document.querySelector('.keyboard').style.pointerEvents = "auto";
}

// Is the letter guessed correctly in any spot?
function isGuessedCorrectly(letter, guess) {
    if (isFinalWordle) {
        if (document.getElementById('grace').classList.contains('active')) {
            isGuessedCorrectlyGrace(letter, guess);
            return;
        } else {
            isGuessedCorrectlyJovan(letter, guess);
            return;
        }
    }

    for (let i = 0; i < guess.length; i++) {
        if (guess[i] == activeWord[i] && letter == guess[i]) {
            return true;
        }
    }
    return false;
}

function updateLettersGuessed(guess) {
    if (isFinalWordle) {
        if (document.getElementById('grace').classList.contains('active')) {
            updateLettersGuessedGrace(guess);
            return;
        } else {
            updateLettersGuessedJovan(guess);
            return;
        }
    }

    for (let i = 0; i < guess.length; i++) {
        if (guess[i] == activeWord[i]) {
            document.getElementById(guess[i]).classList = 'key correct';
        } else if (activeWord.includes(guess[i]) && !isGuessedCorrectly(guess[i], guess)) {
            document.getElementById(guess[i]).classList = 'key close';
        } else if (!isGuessedCorrectly(guess[i], guess)) {
            document.getElementById(guess[i]).classList = 'key incorrect';
        }
    }
}

function guess() {
    if (isFinalWordle) {
        if (document.getElementById('grace').classList.contains('active')) {
            guessGrace();
            return;
        } else {
            guessJovan();
            return;
        }
    }

    if (currentGuess.length != 5) {
        return;
    }

    // show results for guess
    animateGuessResults(currentGuess);

    document.getElementById('guess-btn').disabled = true;
    document.getElementById('back-btn').disabled = true;
    document.querySelector('.keyboard').style.pointerEvents = "none";

    const animateGuessDuration = 3000;
    if (currentGuess == activeWord) {
        // Delay win process to give time for guess results to animate.
        setTimeout(() => {
            win();
        }, animateGuessDuration);
    } else if (attempt < maxAttempts) {
        // move onto next guess.
        currentGuess = '';
        attempt++;

        // let the animation play out before accepting another guess.
        setTimeout(() => {
            document.getElementById('guess-btn').disabled = false;
            document.getElementById('back-btn').disabled = false;
            document.querySelector('.keyboard').style.pointerEvents = "auto";
        }, animateGuessDuration);
    } else {
        // let the animation play out before proceeding.
        setTimeout(() => {
            document.getElementsByClassName('bubble-container')[0].style.opacity = 1.0;
            document.getElementById('oops').style.opacity = 1.0;
        
            setTimeout(() => {
                document.getElementsByClassName('bubble-container')[0].style.opacity = 0.0;
                setTimeout(() => {
                    document.getElementById('oops').style.opacity = 0.0;
                }, 1000);

                clearLastGuess();
            }, 4000);
        }, animateGuessDuration);
    }
}


let jovan_attempt = 1;
let jovan_activeWord = 'jovan';
let jovan_currentGuess = '';
let jovan_correct = false;

let grace_attempt = 1;
let grace_activeWord = 'grace';
let grace_currentGuess = '';
let grace_correct = false;

let isFinalWordle = false;

function activateGrid(gridId) {
    const grid = document.getElementById(gridId);
    
    // check if grid already active, if so, ignore.
    if (grid.classList.contains('active')) {
        return;
    }

    // provide active CSS border
    grid.classList = 'grid active';
    // de-activate other grid
    document.getElementById(gridId == 'grace' ? 'jovan' : 'grace').classList = 'grid';
}

/**
 * Copied, there's a better way to do this, but this works...
 */

function updateCurrentGuessVisualGrace() {
    const row = document.querySelector('#grace .row:nth-of-type(' + grace_attempt + ')');
    const units = row.getElementsByClassName('unit');
    for (let i = 0; i < units.length; i++) {
        units[i].innerHTML = grace_currentGuess[i] ? grace_currentGuess[i].toUpperCase() : '';
    }
}
function updateCurrentGuessVisualJovan() {
    const row = document.querySelector('#jovan .row:nth-of-type(' + jovan_attempt + ')');
    const units = row.getElementsByClassName('unit');
    for (let i = 0; i < units.length; i++) {
        units[i].innerHTML = jovan_currentGuess[i] ? jovan_currentGuess[i].toUpperCase() : '';
    }
}

function addCharacterGrace(char) {
    if (grace_currentGuess.length < maxCharacters) {
        grace_currentGuess += char;
    }
    updateCurrentGuessVisualGrace();
}
function addCharacterJovan(char) {
    if (jovan_currentGuess.length < maxCharacters) {
        jovan_currentGuess += char;
    }
    updateCurrentGuessVisualJovan();
}

function deleteCharacterGrace() {
    if (grace_correct) {
        return;
    }

    if (grace_currentGuess.length >= 0) {
        grace_currentGuess = grace_currentGuess.slice(0, -1);
    }
    updateCurrentGuessVisualGrace();
}
function deleteCharacterJovan() {
    if (jovan_correct) {
        return;
    }

    if (jovan_currentGuess.length >= 0) {
        jovan_currentGuess = jovan_currentGuess.slice(0, -1);
    }
    updateCurrentGuessVisualJovan();
}

function animateGuessResultsGrace(guess) {
    const row = document.querySelector('#grace .row:nth-of-type(' + grace_attempt + ')');
    const units = row.getElementsByClassName('unit');
    for (let i = 0; i < units.length; i++) {
        setTimeout((guess, grace_activeWord) => {
            if (guess[i] == grace_activeWord[i]) {
                units[i].classList += ' correct';
            } else if (grace_activeWord.includes(guess[i])) {
                units[i].classList += ' close';
            } else {
                units[i].classList += ' incorrect';
            }
        }, i * 500, guess, grace_activeWord);
    }
}
function animateGuessResultsJovan(guess) {
    const row = document.querySelector('#jovan .row:nth-of-type(' + jovan_attempt + ')');
    const units = row.getElementsByClassName('unit');
    for (let i = 0; i < units.length; i++) {
        setTimeout((guess, jovan_activeWord) => {
            if (guess[i] == jovan_activeWord[i]) {
                units[i].classList += ' correct';
            } else if (jovan_activeWord.includes(guess[i])) {
                units[i].classList += ' close';
            } else {
                units[i].classList += ' incorrect';
            }
        }, i * 500, guess, jovan_activeWord);
    }
}

function clearLastGuessGrace() {
    // Reset last guess.
    grace_currentGuess = '';

    // Reset last guess row.
    const row = document.querySelector('#grace .row:nth-of-type(' + grace_attempt + ')');
    const units = row.getElementsByClassName('unit');
    for (let i = 0; i < units.length; i++) {
        units[i].innerHTML = '';
        units[i].classList = 'unit';
    }

    // Re-enable submit button.
    document.getElementById('guess-btn').disabled = false;
    document.getElementById('back-btn').disabled = false;
    document.getElementById('grace').style.pointerEvents = "auto";
    document.getElementById('jovan').style.pointerEvents = "auto";
    document.querySelector('.keyboard').style.pointerEvents = "auto";
}
function clearLastGuessJovan() {
    // Reset last guess.
    jovan_currentGuess = '';

    // Reset last guess row.
    const row = document.querySelector('#jovan .row:nth-of-type(' + jovan_attempt + ')');
    const units = row.getElementsByClassName('unit');
    for (let i = 0; i < units.length; i++) {
        units[i].innerHTML = '';
        units[i].classList = 'unit';
    }

    // Re-enable submit button.
    document.getElementById('guess-btn').disabled = false;
    document.getElementById('back-btn').disabled = false;
    document.getElementById('grace').style.pointerEvents = "auto";
    document.getElementById('jovan').style.pointerEvents = "auto";
    document.querySelector('.keyboard').style.pointerEvents = "auto";
}

function guessGrace() {
    if (grace_currentGuess.length != 5 || grace_correct) {
        return;
    }

    // show results for guess
    animateGuessResultsGrace(grace_currentGuess);

    document.getElementById('guess-btn').disabled = true;
    document.getElementById('back-btn').disabled = true;
    document.getElementById('grace').style.pointerEvents = "none";
    document.getElementById('jovan').style.pointerEvents = "none";
    document.querySelector('.keyboard').style.pointerEvents = "none";

    const animateGuessDuration = 3000;
    if (grace_currentGuess == grace_activeWord) {
        // Delay win process to give time for guess results to animate.
        setTimeout(() => {
            if (jovan_correct) {
                jovan_correct = true;
                endGame();
            } else {
                // still need to solve jovan.
                grace_correct = true;
                document.getElementById('guess-btn').disabled = false;
                document.getElementById('back-btn').disabled = false;
                document.getElementById('grace').style.pointerEvents = "auto";
                document.getElementById('jovan').style.pointerEvents = "auto";
                document.querySelector('.keyboard').style.pointerEvents = "auto";
            }
        }, animateGuessDuration);
    } else if (grace_attempt < maxAttempts) {
        // move onto next guess.
        grace_currentGuess = '';
        grace_attempt++;

        // let the animation play out before accepting another guess.
        setTimeout(() => {
            document.getElementById('guess-btn').disabled = false;
            document.getElementById('back-btn').disabled = false;
            document.getElementById('grace').style.pointerEvents = "auto";
            document.getElementById('jovan').style.pointerEvents = "auto";
            document.querySelector('.keyboard').style.pointerEvents = "auto";
        }, animateGuessDuration);
    } else {
        // let the animation play out before proceeding.
        setTimeout(() => {
            document.getElementsByClassName('bubble-container')[0].style.opacity = 1.0;
            document.getElementById('oops').style.opacity = 1.0;
        
            setTimeout(() => {
                document.getElementsByClassName('bubble-container')[0].style.opacity = 0.0;
                setTimeout(() => {
                    document.getElementById('oops').style.opacity = 0.0;
                }, 1000);

                clearLastGuessGrace();
            }, 4000);
        }, animateGuessDuration);
    }
}
function guessJovan() {
    if (jovan_currentGuess.length != 5 || jovan_correct) {
        return;
    }

    // show results for guess
    animateGuessResults(jovan_currentGuess);

    document.getElementById('guess-btn').disabled = true;
    document.getElementById('back-btn').disabled = true;
    document.getElementById('grace').style.pointerEvents = "none";
    document.getElementById('jovan').style.pointerEvents = "none";
    document.querySelector('.keyboard').style.pointerEvents = "none";

    const animateGuessDuration = 3000;
    if (jovan_currentGuess == jovan_activeWord) {
        // Delay win process to give time for guess results to animate.
        setTimeout(() => {
            if (grace_correct) {
                grace_correct = true;
                endGame();
            } else {
                // still need to solve grace.
                jovan_correct = true;
                document.getElementById('guess-btn').disabled = false;
                document.getElementById('back-btn').disabled = false;
                document.getElementById('grace').style.pointerEvents = "auto";
                document.getElementById('jovan').style.pointerEvents = "auto";
                document.querySelector('.keyboard').style.pointerEvents = "auto";
            }
        }, animateGuessDuration);
    } else if (jovan_attempt < maxAttempts) {
        // move onto next guess.
        jovan_currentGuess = '';
        jovan_attempt++;

        // let the animation play out before accepting another guess.
        setTimeout(() => {
            document.getElementById('guess-btn').disabled = false;
            document.getElementById('back-btn').disabled = false;
            document.getElementById('grace').style.pointerEvents = "auto";
            document.getElementById('jovan').style.pointerEvents = "auto";
            document.querySelector('.keyboard').style.pointerEvents = "auto";
        }, animateGuessDuration);
    } else {
        // let the animation play out before proceeding.
        setTimeout(() => {
            document.getElementsByClassName('bubble-container')[0].style.opacity = 1.0;
            document.getElementById('oops').style.opacity = 1.0;
        
            setTimeout(() => {
                document.getElementsByClassName('bubble-container')[0].style.opacity = 0.0;
                setTimeout(() => {
                    document.getElementById('oops').style.opacity = 0.0;
                }, 1000);

                clearLastGuessJovan();
            }, 4000);
        }, animateGuessDuration);
    }
}

function endGame() {
    // disable / fade out keyboard.
    document.querySelector('.keyboard').style.pointerEvents = "none";
    document.querySelector('.keyboard').style.animation = 'fadeOut 1s linear forwards';
    
    // Remove border and disable grid activate abilities.
    document.querySelector('.active').style.border = 'none';
    document.getElementById('grace').style.pointerEvents = "none";
    document.getElementById('jovan').style.pointerEvents = "none";

    // fade out all rows except the solved ones.
    const jovan_rows = document.getElementById('jovan').children;
    let jovan_row;
    for (var i = 0; i < jovan_rows.length; i++) {
        if (i+1 == jovan_attempt) {
            jovan_row = jovan_rows[i];
        } else {
            jovan_rows[i].style.animation = 'fadeOut 1s linear forwards';
        }
    }

    const grace_rows = document.getElementById('grace').children;
    let grace_row;
    for (var i = 0; i < grace_rows.length; i++) {
        if (i+1 == grace_attempt) {
            grace_row = grace_rows[i];
        } else {
            grace_rows[i].style.animation = 'fadeOut 1s linear forwards';
        }
    }
    
    setTimeout(() => {
        // move jovan row to bottom
        jovan_Y_translations = ['50vh', '40vh', '30vh', '20vh', '10vh', '0'];
        jovan_row.style.transform = "translate(-55.25vh, " + jovan_Y_translations[jovan_attempt-1] + ")";

        // move grace row to top
        grace_Y_translations = ['20vh', '10vh', '0', '-10vh', '-20vh', '-30vh'];
        grace_row.style.transform = "translateY(" + grace_Y_translations[grace_attempt-1] + ")";

        const moveDuration = 3000; // body#final-wordle div.grid div.row, transition duration
        setTimeout(() => {
            // make heart appear
            document.getElementById('heart').style.animation = 'fadeIn 1s linear forwards, bounce 1.5s ease alternate infinite';
        }, moveDuration - 500);

        // move dog
        document.getElementById("doggy").style.animation = 'moveDoggy 3s linear forwards';

        // endlessly feed doggy treats
        setInterval(() => {
            document.getElementById('treat').style.animation = 'fadeIn 1s linear forwards';
            setTimeout(() => {
                document.getElementById('treat').style.animation = 'feed 1s ease-in backwards';
            }, 1500);
        }, 3000);

        // show continue arrow (this is where the gift will be "sent")
        setTimeout(() => {
            document.querySelector('.continue-btn').style.display = 'block';
            document.querySelector('.continue-btn').style.animation = 'fadeIn 0.5s linear forwards 2s';
        }, moveDuration);
    }, 1000);
}

let giftStatus = 0;

function introGift() {
    // Show arrow to continue dialog.
    setTimeout(() => {
        document.querySelector('.continue-btn').style.display = 'block';
        document.querySelector('.continue-btn').style.animation = 'fadeIn 0.5s linear forwards';
    }, 2000);
}

function sendGift() {
    // Hide arrow button.
    document.querySelector('.continue-btn').disabled = true;
    document.querySelector('.continue-btn').style.opacity = 1.0;
    document.querySelector('.continue-btn').style.animation = 'fadeOut 0.5s linear forwards';
    setTimeout(() => {
        document.querySelector('.continue-btn').style.display = 'none';
    }, 500);

    // Hide dialogue
    document.getElementsByClassName('bubble-container')[0].style.opacity = 0.0;
    setTimeout(() => {
        document.getElementById('thankyou').style.opacity = 0.0;
        document.getElementById('checkbox').style.opacity = 1.0; // prepping next dialogue so just have to show bubble-container.

        // Show gift
        document.querySelector('img#gift').style.animation = 'showGift 1s ease-in forwards';
        setTimeout(() => {
            document.querySelector('img#gift').style.animation = 'hideGift 1s ease-in forwards';

            setTimeout(() => {
                // Turn doggy towards glove box
                document.getElementById('doggy').style.transform = 'scaleX(-1)';

                setTimeout(() => {
                    // Launch to right side
                    document.querySelector('img#gift').style.animation = 'launchGift 1s linear forwards';

                    setTimeout(() => {
                        // Turn doggy back around to normal state.
                        document.getElementById('doggy').style.transform = '';
                        
                        
                        // Show check box dialogue.
                        document.getElementsByClassName('bubble-container')[0].style.opacity = 1.0;
                    }, 2000);
                }, 1000);
                
            }, 1500);
        }, 2000);
    }, 1000);
}