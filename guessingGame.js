

function generateWinningNumber(){
     return Math.floor(Math.random()*100+1);
}


function shuffle(arr){
    var m = arr.length, t, arrIndex;

    while(m){
        arrIndex = Math.floor(Math.random()*m--);
        t = arr[m];
        arr[m] = arr[arrIndex];
        arr[arrIndex] = t; 
    }
    return arr;
}



    function Game(){
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }



    Game.prototype.difference = function(){
        return Math.abs(this.playersGuess - this.winningNumber);
    }

    
    Game.prototype.isLower = function(){
        return this.playersGuess < this.winningNumber;
    }
  
//Game.prototype.checkGuess call
    Game.prototype.playersGuessSubmission = function(num){
         if (typeof num !== 'number' || num < 1 || num > 100) {
                throw "That is an invalid guess.";
    }
        else if (1 <= num <= 100){
            this.playersGuess = num;
            //this.pastGuesses.push(this.playersGuess);
            return this.checkGuess();
        }
        
        
    }
 //it('if playersGuess isn\'t the winningNumber or a duplicate, add it to pastGuesses', functio
//   Game.prototype.playersGuessSubmission = function(guess) {
//     if(typeof guess !== 'number' || guess < 1 || guess > 100) {
//         throw "That is an invalid guess.";
//     }
//     this.playersGuess = guess;
//     return this.checkGuess();
// }
            
    // Game.prototype.checkGuess = function(){
    //     var executed = 0;
    //     return function(){
    //         executed++;
    //         if(!(executed >= 5)){
                
    //             if(!this.pastGuesses.includes(this.playersGuess)){
    //                 //this.pastGuesses.push(this.playersGuess);
    //                 if(this.playersGuess === this.winningNumber){
    //                     return "You Win!";
    //                 }
                    
    //                 else{
    //                     this.pastGuesses.push(this.playersGuess);

    //                     if(this.difference() < 10){
    //                         return "You\'re burning up!"
    //                     }
    //                     else if (this.difference() < 25){
    //                         return "You\'re lukewarm."
    //                     }
    //                     else if (this.difference() < 50){
    //                         return "You\'re a bit chilly."
    //                     }
    //                     else if(this.difference() < 100){
    //                         return "You\'re ice cold!"
    //                     }
    //                 }

    //             }
    //             else {
    //                 return "You have already guessed that number.";
    //             }
    //         }
    //         else{
    //             return "You Lose";
    //         }

    //     }
    // }

    
// Game.prototype.checkGuess = function(){

    

//         if(this.playersGuess === this.winningNumber){
//             $('#hint, #submit').prop("disabled",true);
//             $('#subtitle').text("Press the Reset button to play again!");
//             return "You Win!";
//         }
//         else{ 
//             if(this.pastGuesses.indexOf(this.playersGuess) > -1){
//                 return "You have already guessed that number.";
//             }

//             else{
//                 this.pastGuesses.push(this.playersGuess);
//                 $('#guess-list li:nth-child('+this.pastGuesses.length + ')').text(this.playersGuess);
//                 if(this.pastGuesses.length === 5){
//                     $('#hint, #submit').prop("disabled",true);
//                     $('#subtitle').text("Press the Reset button to play again!");
//                     return "You Lose."
//                 }
//                 else{
//                     if(this.isLower()){
//                         $('#subtitle').text("Guess Higher!");
//                     }
//                     else{
//                         $('#subtitle').text("Guess Lower!");
//                     }
//                     if(this.difference() < 10){
//                         return "You\'re burning up!"
//                     }
//                     else if (this.difference() < 25){
//                         return "You\'re lukewarm."
//                     }
//                     else if (this.difference() < 50){
//                         return "You\'re a bit chilly."
//                     }
//                     else if(this.difference() < 100){
//                          return "You\'re ice cold!"
//                      }

//                 }
//             }

                
                
                
                    
                   
                    
               


            
//         }

    
    

// }


Game.prototype.checkGuess = function() {
    if(this.playersGuess===this.winningNumber) {
        $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!")
        return 'You Win!'
    }
    else {
        if(this.pastGuesses.indexOf(this.playersGuess) > -1) {
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
            if(this.pastGuesses.length === 5) {
                $('#hint, #submit').prop("disabled",true);
                $('#subtitle').text("Press the Reset button to play again!")
                return 'You Lose.';
            }
            else {
                var diff = this.difference();
                if(this.isLower()) {
                    $('#subtitle').text("Guess Higher!")
                } else {
                    $('#subtitle').text("Guess Lower!")
                }
                if(diff < 10) return'You\'re burning up!';
                else if(diff < 25) return'You\'re lukewarm.';
                else if(diff < 50) return'You\'re a bit chilly.';
                else return'You\'re ice cold!';
            }
        }
    }
}



    function newGame(){
        return new Game();;
    }

     Game.prototype.provideHint = function(){
         var myArr = [];
         myArr.push(this.winningNumber);
         myArr.push(generateWinningNumber());
         myArr.push(generateWinningNumber());
         return shuffle(myArr);
     }

     var makeAGuess = function(instanceOfGame){
         //console.log(this)
        var submitVal = +$(this).closest('#input-parent').find('#players-input').val();
        $(this).closest('#input-parent').find('#players-input').val("");
        console.log(instanceOfGame.playersGuessSubmission(submitVal));
        $('#title').text(instanceOfGame.playersGuessSubmission(submitVal));
    }

$(document).ready(function(){

    var game = new Game();
    

    $('#submit').on('click', function(){
        makeAGuess.call(this,game);
    });

    $('#players-input').on('keypress',function(event){
        if(event.which == 13){
            makeAGuess.call(this,game);
        }
    });

    $('#hint').click(function() {
        var hints = game.provideHint();
        $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
    });
    
    $('#reset').click(function() {
        game = newGame();
        $('#title').text('Play the Guessing Game!');
        $('#subtitle').text('Guess a number between 1-100!')
        $('.guess').text('-');
        $('#hint, #submit').prop("disabled",false);
    })

});