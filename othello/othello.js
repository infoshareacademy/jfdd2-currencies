// create two players
var players = {
    dollar: {
        name: 'dollar'
    },
    pound: {
        name: 'pound'
    }
};
// indication of the next players
players.dollar.next = players.pound;
players.pound.next = players.dollar;

//declaration: counter of exchange rates
var sumOfDollars = 0;
var sumOfPounds = 0;
var $resultPounds = $('#score-title-computer');
var $resultDollar = $('#score-title-player');
var $finalResult = $('#winner-alert');
var $hints = $("<p>").addClass('hint').text('Hints!');
//
$('#signature').append( $hints, $finalResult);



$(function () {
    var player = players.dollar,
        board = gameBoard(8, player);

    var intervalId = setInterval(function () {

        if (player.name !== 'pound') {
            return;
        }
        var $cells = $('td:not(.checker)');
        var howMany = $cells.length;
        if (howMany === 0) {
            clearInterval(intervalId);
            return;
        }
        var randomFloat = Math.random() * howMany;
        var randomInt = Math.round(randomFloat) % howMany;
        $cells.eq(randomInt).click();
    }, 50);


    $('#app').append($(board).on('click', 'td', function () {
        var node = this,
            oponentNodes;

        if (nodeHasChecker(node)) {
            console.log('This cell is occupied.');
            $hints.text('hint: This cell is occupied.').fadeIn(500).fadeOut(4000);
            return;
        }

        oponentNodes = endangeredOponentNodes(this, player);
        if (oponentNodes.length === 0) {
            if (player.name === 'dollar'){
                console.log('You cannot put ' + player.name + ' checker here!');
                $hints.text('You can\'t put ' + player.name + ' checker here!').fadeIn(500).fadeOut(4000);
            }
            return;
        }


        if (player.name === 'dollar') {
            //
            sumOfDollars += oponentNodes.length;
            console.log('Player 1 has ' + Math.roundTo(sumOfDollars, 3) + ' dollars');
            $resultDollar.text( Math.roundTo(sumOfDollars, 3));
        } else {
            sumOfPounds += oponentNodes.length;
            console.log('Player 2 has ' + Math.roundTo(sumOfPounds, 3) + ' pounds');
            $resultPounds.text( Math.roundTo(sumOfPounds, 3));

        }

        putCheckerOnNode(this, player);
        replaceOponentNodes(oponentNodes, player);

        if (boardIsFull(board)) {
            return endGame(board, player);
        }

        if (playerHasValidMoves(player.next, board)) {
            return player = player.next;
        }

        return $hints.text('hint: Oponent does not have valid moves. ' + player.name + ' has one extra move.').fadeIn(1500).fadeOut(6000);


    }));
});




function getEmptyCells(board) {
    return $(board).find('td:not(.checker)').get();
}

function playerHasValidMoves(player, board) {
    return getEmptyCells(board).filter(function (cell) {
            return endangeredOponentNodes(cell, player).length > 0;
        }).length > 0;
}

function boardIsFull(board) {
    return getEmptyCells(board).length === 0;
}
Math.roundTo = function (number, precision) {
  var potega = 1;
  for (var i = precision; i > 0; i--) {
    potega *= 10;
  }
  var toPrecision = Math.round(number* potega);
  return  toPrecision/potega;

};


function endGame(board, player) {
    var $board = $(board);
    //var sumOfCheckers =  Math.roundTo($board.find('.' + player.name).length, 3);

    if (player.name === 'dollar' &&  sumOfDollars > sumOfPounds ) {
        return $('#winner-alert').addClass("winner-text").text('Congratulations! You win with : ' + Math.roundTo(sumOfDollars, 3) + ' dollars!').css({'opacity': '1'});
    } else if(player.name === 'pound' &&  sumOfDollars < sumOfPounds) {
        return $('#winner-alert').addClass("winner-text").text('Computer wins with : ' + Math.roundTo(sumOfPounds, 3) + ' pounds!').css({'opacity': '1'});
    } else if (sumOfDollars === sumOfPounds) {
        return  $('#winner-alert').addClass("winner-text").text('Score draw!  Cash: ' + sumOfDollars).css({'opacity': '1'});
    }
     $board.off('click');
}
//this function get values of surrounding fields in eight directions
// prev() indicate one row to top
// next() indicate one row to bottom

function endangeredOponentNodes(domNode, player) {
    return [
        function (node) {
            return $(node).parent().prev().find(':nth-child(' + ($(node).index() + 1) + ')');
        }, // top
        function (node) {
            return $(node).parent().prev().find(':nth-child(' + ($(node).index() + 2) + ')');
        }, // top-right
        function (node) {
            return $(node).next();
        }, // right
        function (node) {
            return $(node).parent().next().find(':nth-child(' + ($(node).index() + 2) + ')');
        }, // bottom-right
        function (node) {
            return $(node).parent().next().find(':nth-child(' + ($(node).index() + 1) + ')');
        }, // bottom
        function (node) {
            return $(node).parent().next().find(':nth-child(' + ($(node).index() - 0) + ')');
        }, // bottom-left
        function (node) {
            return $(node).prev();
        }, // left
        function (node) {
            return $(node).parent().prev().find(':nth-child(' + ($(node).index() - 0) + ')');
        } // top-left
    ].map(function (dir) {
        return nodesWithCheckers(domNode, dir);
    }).filter(function (checkerNodesInDirection) {
        return checkerIsOponent(checkerNodesInDirection.head(), player) &&
            checkersContainPlayer(checkerNodesInDirection.tail(), player);

    }).reduce(function (prev, checkerNodes) {
        return prev.concat(takeOponentsUntilPlayer(checkerNodes, player));
    }, []);
}

function takeOponentsUntilPlayer(checkers, player) {
    return checkers.takeUntil(function (item) {
        return $(item).hasClass(player.name);
    });
}

function checkerIsOponent(checker, player) {
    return $(checker).hasClass(player.next.name);
}

function checkersContainPlayer(checkers, player) {
    return checkers.some(function (checker) {
        return $(checker).hasClass(player.name);
    });
}

function putCheckerOnNode(node, player) {
    var $node = $(node);
    if ($node.hasClass('checker')) {
        return 'This field is occupied';
    } else {
        $node.addClass('checker').addClass(player.name);
    }
}

function replaceOponentNodes(nodes, player) {
    nodes.forEach(function (node) {
        $(node).removeClass(player.next.name).addClass(player.name);
    });
}

function nodeHasChecker(node) {
    return $(node).hasClass('checker');
}

function nodesWithCheckers(node, dir) {
    var nodes = [];
    var nextNode = dir(node);
    if (nodeHasChecker(nextNode)) {
        nodes.push(nextNode);
        return nodes.concat(nodesWithCheckers(nextNode, dir));
    }
    return nodes;
}
// draw board with start fields
function gameBoard(size, player) {
    function checker(player) {
        return player.name + ' checker';
    }

    return $('<table>').append(Array.range(size).map(function (y) {
        return $('<tr>').append(Array.range(size).map(function (x) {
            return $('<td>').addClass('cell').addClass(
                (x === 3 && y === 3 || x === 4 && y === 4) ?
                    checker(player) : (x === 3 && y === 4 || x === 4 && y === 3) ?
                    checker(player.next) : ''
            );
        }));
    }));


}

