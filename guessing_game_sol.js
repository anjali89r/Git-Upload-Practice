

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

    
Game.prototype.checkGuess = function(){

    

        if(this.playersGuess === this.winningNumber){
        return "You Win!";
        }
        else{ 
            if(this.pastGuesses.indexOf(this.playersGuess) === -1){
                this.pastGuesses.push(this.playersGuess);
                if(this.pastGuesses.length === 5){
                    return "You Lose."
                }
            }
            else{
                return "You have already guessed that number.";
            }
            if(this.difference() < 10){
                return "You\'re burning up!"
            }
            else if (this.difference() < 25){
                return "You\'re lukewarm."
            }
            else if (this.difference() < 50){
                return "You\'re a bit chilly."
            }
            else if(this.difference() < 100){
                 return "You\'re ice cold!"
             }
        }

    
    

}
// describe('newGame function', function() {
//             it('returns an empty, new game instance', function() {
//                 spyOn(window, 'Game').and.callThrough();
//                 game = newGame();
//                 expect(game.playersGuess).toEqual(null);
//                 expect(game.pastGuesses.length).toEqual(0);
//                 expect(Game).toHaveBeenCalled();
//             });
//         });

//         describe("provideHint function", function() {
//             it('generates an array with a length of 3', function() {
//                 var hintArray = game.provideHint();
//                 expect(hintArray.length).toEqual(3);
//             });
//             it('includes the winningNumber', function() {
//                 var hintArray = game.provideHint();
//                 expect(hintArray.indexOf(game.winningNumber)).toBeGreaterThan(-1);
//             });
//             it('calls generateWinningNumber to fill the rest of the hint array with random numbers', function() {
//                 spyOn(window, 'generateWinningNumber');
//                 game.provideHint();
//                 expect(generateWinningNumber.calls.count()).toEqual(2);
//             })
//             it('calls the shuffle function', function() {
//                 spyOn(window, 'shuffle');
//                 game.provideHint();
//                 expect(shuffle).toHaveBeenCalled();
//             });
//         })


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