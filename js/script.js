/*
File: script.js
GUI Assignment: Creating a Scrabble Board
Mohammad Elhadidy, UMass Lowell Computer Science, Mohammad_Elhadidy@student.uml.edu
Description: Created a scrabble board using HTML, Javascript, and CSS. User can move
draggable letter pieces from rack and place them on board to submit. They can see their
score and the word created. They can also reset the game.
Sources: File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
Copyright (c) 2023 by Mohammad. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by ME on June 30, 2023 at 8:00AM
*/
function isAdjacent(box) { /* Function used to tell if letter is adjacent to another letter to ensure that all subsequent tiles are adjacent (except first 1)*/
    var boxes = $('.box');
    var currentIndex = boxes.index(box);
    var aboveIndex = currentIndex - 15;
    var belowIndex = currentIndex + 15;
    var leftIndex = currentIndex - 1;
    var rightIndex = currentIndex + 1;

    if (aboveIndex >= 0 && $(boxes[aboveIndex]).data('tileLetter')) { /* Technically did not need since did not implement full table*/
        return true;
    }

    if (belowIndex < boxes.length && $(boxes[belowIndex]).data('tileLetter')) { /* Technically did not need since did not implement full table*/
        return true;
    }

    if (currentIndex % 15 !== 0 && $(boxes[leftIndex]).data('tileLetter')) {
        return true;
    }

    if ((currentIndex + 1) % 15 !== 0 && $(boxes[rightIndex]).data('tileLetter')) {
        return true;
    }
    return false;
}

$(function() {

    /*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
    *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
    *  Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely 
    *    copied or excerpted for educational purposes with credit to the author.
    *  updated by JMH on November 21, 2015 at 10:27 AM
    *  updated by JMH on November 25, 2015 at 10:58 AM to add the blank tile
    *  updated by JMH on November 27, 2015 at 10:22 AM to add original-distribution
    */
    var ScrabbleTiles = [] ;
    ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
    ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
    ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
    ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
    ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
    ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
    ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
    ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
    ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
    ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
    ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
    ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
    ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
    ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
    ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
    ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
    ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
    ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
    ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;

    var tileWidthIncludingMargins = 75;

    function positionTiles() { /* Used to randomly select 7 letters and create the corresponding tiles on board */
        var randomLetters = [];
        for (var i = 0; i < 7; i++) { /* Start getting 7 letters */
            var validLetterFound = false;
            var letter = '';

            while (!validLetterFound) { /* Ensure that we found a valid letter (that is a letter with number-remaining avaliable) */
                var rand = Math.floor(Math.random() * 26);
                letter = String.fromCharCode(65 + rand);

                if (ScrabbleTiles[letter]["number-remaining"] > 0) {
                    validLetterFound = true;
                }
            }

            ScrabbleTiles[letter]["number-remaining"]--;
            randomLetters.push(letter);
        }

        var totalTileWidth = tileWidthIncludingMargins * 7;
        var rackOffset = $('#rack').offset();
        var startingPoint = rackOffset.left + (($('#rack').width() - totalTileWidth) / 2);

        for (var i = 0; i < randomLetters.length; i++) { /* add img elements for each tile and other necessary data */
            var letter = randomLetters[i];
            var value = ScrabbleTiles[letter]["value"];

            var img = $("<img />").attr({
                'src': 'images/Scrabble_Tile_' + letter + '.jpg',
                'alt': 'Scrabble Tile ' + letter,
                'class': 'tile',
                'id': 'tile' + i,
                'data-letter': letter,
                'data-value': value,
            })
            .css({
                'left': (startingPoint + (i * tileWidthIncludingMargins)) + 'px'
            });

            img.appendTo($('.rack'));
        }

        $('.tile').draggable({ /* Associated wih draggable for 7 tiles */
            revert: "invalid",
            containment: 'window',
            snap: ".box",
            snapMode: "inner"
        });
    }

    positionTiles(); /* Call function to generate and position tiles */

    for (var i = 0; i < 15; i++) { /* Used for droppable area (outlined red in program). Each box is where user can drop letter */
        var box = $('<div>').addClass('box');
        box.appendTo($('#boxes'));
    }

    var totalScore = 0; /* Total score of game (sums words multipliers etc) */

    $("#reset").click(function() { /* Allows user to click Reset button and reset score, current word, words remaining and other pertinent user data */
        totalScore = 0;
        $("#score").text(totalScore);

        $("#word").text("---");

        $('.tile').remove();
        $('.box').removeData('tileLetter').removeData('tileValue');

        $('.box').droppable('enable'); /* Re enable disabled board spots */

        for (var letter in ScrabbleTiles) {
            ScrabbleTiles[letter]["number-remaining"] = ScrabbleTiles[letter]["original-distribution"];
        }

        positionTiles();
    });

    $("#submit").click(function() { /* Click function allows user to use submit button to submit word and get updated score and rack */
        var score = 0;
        var word = "";
        var doubleWord = false;
        $('.box').each(function(index) {
            if ($(this).data('tileValue')) {
                var tileValue = $(this).data('tileValue');

                if (index === 6 || index === 8) { /* Multiply letter by 2 if special square */
                    tileValue *= 2;
                }

                score += tileValue;
                word += $(this).data('tileLetter');

                if (index === 2 || index === 12) { /* Multiply word by 2 if special square */
                    doubleWord = true;
                }
            }
        });

        if (doubleWord) {
            score *= 2;
        }

        totalScore += score;

        $("#score").text(totalScore);

        if (word !== "") {
            $("#word").text(word);
        } else {
            $("#word").text("---");
        }

        $('.tile').remove();
        $('.box').removeData('tileLetter').removeData('tileValue');

        $('.box').droppable('enable'); /* Re enable disabled board spots */

        positionTiles();
    });

    $(".box").droppable({ /* Allows user to drop tiles from rack to droppable 1x15 box which corresponds to board row */
        accept: function() {
            if ($('.box').filter(function() {
                return $(this).data('tileLetter');
            }).length === 0 || isAdjacent(this)) {
                return ".tile";
            }
        },
        drop: function(event, ui) {
            ui.draggable.position({
                my: "center",
                at: "center",
                of: $(this),
                using: function(pos) {
                    $(this).animate(pos, 200, "linear");
                }
            });

            var tileLetter = ui.draggable.data('letter');
            var tileValue = ui.draggable.data('value');

            $(this).data('tileLetter', tileLetter);
            $(this).data('tileValue', tileValue);

            ui.draggable.draggable('disable');

            $(this).droppable('disable'); /* Make sure you cant place tile ontop of another tile */
        }
    });

    $(window).resize(function() { /* Attempted to do window resizing however there may be issues with reszing especially while using the game */
        $('.tile').remove();
        positionTiles();
        $(".box").droppable({
            accept: function() {
                if ($('.box').filter(function() {
                    return $(this).data('tileLetter');
                }).length === 0 || isAdjacent(this)) {
                    return ".tile";
                }
            },
            drop: function(event, ui) {
                ui.draggable.position({
                    my: "center",
                    at: "center",
                    of: $(this),
                    using: function(pos) {
                        $(this).animate(pos, 200, "linear");
                    }
                });

                var tileLetter = ui.draggable.data('letter');
                var tileValue = ui.draggable.data('value');
                
                $(this).data('tileLetter', tileLetter);
                $(this).data('tileValue', tileValue);

                ui.draggable.draggable('disable');

                $(this).droppable('disable'); /* Make sure you cant place tile ontop of another tile */
            }
        });
    });
});
