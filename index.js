const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userChosenPattern = []
let buttons = $(".button")

let red_Audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3") 
let blue_Audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-click-error-1110.mp3")
let green_Audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-select-click-1115.mp3")
let yellow_Audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-select-click-1129.mp3")
const wrong_Audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-bass-buzzer-948.mp3")
const correct_Audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-reward-952.mp3")
const button_audios = [ red_Audio, blue_Audio, green_Audio, yellow_Audio ]
let level = 0
let gameStart = false


$(document).keypress(function(event){
    nextSequence()
    gameStart = true
    $("h1").text("Level " + level)
})


function nextSequence(){
    let randomNumber = Math.floor(Math.random() * 4)  //random 0 - 3
    let randomColor = buttonColors[randomNumber] //random color from buttonColors[]

    gamePattern.push(randomColor) // add random color to gamePattern[]

    $("#" + randomColor).fadeOut().fadeIn() // flash the new color button

    playSound(randomColor) // play sound

    animatePress(randomColor) //button pressed class

    level ++ //increase level
    $("h1").text("Level " + level)//update level

    console.log("game: " + gamePattern)
}


// get the pressed button id
$(".button").click(function(event){

    //遊戲開始才能按按鈕
    if (gameStart === true){
        let userChosenColor = event.target.id

        userChosenPattern.push(userChosenColor) //add to user pattern
    
        playSound(userChosenColor) // play sound based on the button id
    
        animatePress(userChosenColor) // animate button pressed
    
        checkAnswer(level) //chank answer
    }
     
})

 



function playSound(name){

    switch(name) {

        case "red": 
            button_audios[0].currentTime = 0;
            button_audios[0].play();
            break;

        case "blue":
            button_audios[1].currentTime = 0;
            button_audios[1].play();
            break;

        case "green":
            button_audios[2].currentTime = 0;
            button_audios[2].play();
            break;

        case "yellow":
            button_audios[3].currentTime = 0;
            button_audios[3].play();
            break;
    }
}


function animatePress(colorName){
    
    let button = $("#" + colorName)
    button.toggleClass("pressed")

    setTimeout(function(){ button.toggleClass("pressed")  }, 100)
}



function checkAnswer(currentLevel){

    console.log(gamePattern)
    console.log(userChosenPattern)

    //確定輸入全部的答案以後
    if (userChosenPattern.length === currentLevel){
        
        //檢查玩家的答案
       for (let i = 0; i < userChosenPattern.length; i++){

            //正確
            if (userChosenPattern[i] === gamePattern[i]){
                
                console.log("passed")
                continue

            //錯誤
            } else {
                gameOver()
                return
            }
       }
       //全部正確，下一題！
       $("h1").text("Correct!")
       userChosenPattern = []
       correct_Audio.play()
       setTimeout(nextSequence, 2000)
    }
}


function gameOver(){
    $("h1").text("Wrong!")
    wrong_Audio.play()
    $("body").toggleClass("gameover")
    gameStart = false

    setTimeout(function(){ 
        gamePattern = []
        userChosenPattern = []
        level = 0
        $("h1").text("Press any Key to start")
        $("body").toggleClass("gameover")
    }, 2000)
}
