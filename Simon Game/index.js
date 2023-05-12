var gamePattern = [];
var userPattern = [];
var level = 0;
var spriteChoices = ["mario", "coin", "boo", "flower"];
var gameInPlay = false;


function animate(sprite) {
    if(sprite == "mario") {
        $("#mario").css("transition", "transform 0.2s");
        $("#mario").css("transform", "translateY(-100px)");
        setTimeout(() => {
            $("#mario").css("transform", "translateY(0)");
        }, 200);
    } else if(sprite == "coin") {
        $("#coin").css("transition", "transform 0.2s");
        $("#coin").css("transform", "rotateY(360deg)");
        setTimeout(() => {
            $("#coin").css("transform", "rotateY(0)");
        }, 200);
    } else if(sprite == "boo") {
        $("#boo").css("transition", "transform 0.2s");
        $("#boo").css("transform", "scale(1.3)");
        setTimeout(() => {
            $("#boo").css("transform", "scale(1)");
        }, 200);
    } else if (sprite == "flower") {
        $("#flower").css("transition", "transform 0.2s");
        $("#flower").css("transform", "scale(0.8, 1.4)");
        setTimeout(() => {
            $("#flower").css("transform", "scale(1)");
            
        }, 200);
    }

}


function makeSound(sprite) {
    var audio = new Audio("sounds/" + sprite + ".mp3");
    audio.play();
}

function addNextSprite() {
    // Generate a random color and push to gamePattern
    randomNumber = Math.floor(Math.random() * 4);
    randomSprite = spriteChoices[randomNumber];
    gamePattern.push(randomSprite);
    // Animate that sprite
    animate(randomSprite);
    makeSound(randomSprite);
    // Change level display text
    updateLevel();
    // Clear userPattern and i
    userPattern = [];
    i = 0;
    return randomSprite
}

function updateLevel() {
    level++;
    $("h1").text("Level " + level);
}

function checkUserChoice(sprite) {
    // If user picks correct color
    if(sprite == gamePattern[i]) {
        // Do animations
        animate(sprite);
        makeSound(sprite);
        // Push correct choice to userPattern
        userPattern.push(sprite);
        // Increase current index
        i++;
        // If user reaches end of current game sequence
        if(userPattern.length == gamePattern.length) {
            setTimeout(function() {
                return addNextSprite()
            }, 1000);
        }
    } else {
        makeSound("fail");
        // Game reset sequence
        gameInPlay = false;
        $("h1").text("Game over");
        setTimeout(function() {
            $("h1").text("Press Enter to start");
        }, 3000)     
        gamePattern = [];
        userPattern = [];
        level = 0;       
    }
}

// Listen for user clicks, add to user pattern

$("#mario").on("click", function() {
    checkUserChoice("mario");
});

$("#coin").on("click", function() {
    checkUserChoice("coin");
});

$("#boo").on("click", function() {
    checkUserChoice("boo");
});

$("#flower").on("click", function() {
    checkUserChoice("flower");
});

// Keypress to start game

// $(document).on("keydown", function() {
//     if(gameInPlay == false) {
//         gameInPlay = true;
//         addNextColor();
//     }
// });

addEventListener("keydown", function(event) {
    switch (event.key) {
        case "u":
            checkUserChoice("mario");
            break;
    
        case "i":
            checkUserChoice("coin");
            break;     

        case "j":
            checkUserChoice("boo");
            break;
    
        case "k":
            checkUserChoice("flower");
            break;
            
        case "Enter":
            if(gameInPlay == false){
                gameInPlay = true;
                addNextSprite();
            };
            break;     

        default:
            console.log(event.key);
    }
});

