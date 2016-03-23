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



$(function () {
  var player = players.dollar,
      board = gameBoard(8, player);




  $('#app').append($(board).on('click', 'td', function () {
    var node = this,
        oponentNodes;

    if (nodeHasChecker(node)) {
      return console.log('This cell is occupied.');
    }

    oponentNodes = endangeredOponentNodes(this, player);
    if (oponentNodes.length === 0) {
      return console.log('You cannot put ' + player.name + ' checker here!');
    }



    if(player.name === 'dollar'){
      sumOfDollars += oponentNodes.length;
      console.log( 'Player 1 has '+ sumOfDollars +' dollars');
    }else {
      sumOfPounds += oponentNodes.length;
      console.log( 'Player 2 has '+ sumOfPounds  +' pounds');

    }

    putCheckerOnNode(this, player);
    replaceOponentNodes(oponentNodes, player);

    if (boardIsFull(board)) {
      return endGame(board, player);
    }

    if (playerHasValidMoves(player.next, board)) {
      return player = player.next;
    }

    return console.log('Oponent does not have valid moves. ' + player.name + ' has one extra move.');
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

function endGame(board, player) {
  var $board = $(board);
  console.log('Game over');

  if (player.name === 'dollar') {
    console.log('Player ' + player.name + ' winns with: ' + $board.find('.' + player.name).length + ' checkers fields and  sum of cash: ' + sumOfPounds + ' pounds');
    console.log('Player ' + player.next.name + ' has '+ sumOfDollars+ ' dollars');
  } else {
    console.log('Player '+ player.name + ' wins with: ' + $board.find('.' + player.name).length + ' checkers fields, sum of cash: ' + sumOfDollars + ' dollars');
    console.log('Player ' + player.next.name + 'has '+ sumOfPounds+ ' pounds');
    $board.off('click');
  }
}
//this function get values of surrounding fields in eight directions
// prev() indicate one row to top
// next() indicate one row to bottom

function endangeredOponentNodes(domNode, player) {
  return [
    function (node) {return $(node).parent().prev().find(':nth-child('+ ($(node).index() + 1) +')');}, // top
    function (node) {return $(node).parent().prev().find(':nth-child('+ ($(node).index() + 2) +')');}, // top-right
    function (node) {return $(node).next();}, // right
    function (node) {return $(node).parent().next().find(':nth-child('+ ($(node).index() + 2) +')');}, // bottom-right
    function (node) {return $(node).parent().next().find(':nth-child('+ ($(node).index() + 1) +')');}, // bottom
    function (node) {return $(node).parent().next().find(':nth-child('+ ($(node).index() - 0) +')');}, // bottom-left
    function (node) {return $(node).prev();}, // left
    function (node) {return $(node).parent().prev().find(':nth-child('+ ($(node).index() - 0) +')');} // top-left
  ].map(function (dir) {
    return nodesWithCheckers(domNode, dir);      //zwraca tablice uzupelniona o wartosci w roznych kierunkach
  }).filter(function (checkerNodesInDirection) {
    return checkerIsOponent(checkerNodesInDirection.head(), player) && // sprawdzenie warunku czy pierwszy element jest przeciwnikiem
      checkersContainPlayer(checkerNodesInDirection.tail(), player);   // oraz czy na koncu danego kierunku znajduje sie pionek aktualnego gracza
                                                                       // warunek postawienia checkera
  }).reduce(function (prev, checkerNodes) {
    return prev.concat(takeOponentsUntilPlayer(checkerNodes, player));  // zwraca liczbe pol, ktore mozna obrocic
  }, []);
}

function takeOponentsUntilPlayer(checkers, player) {                   //pobiera pola przeciwnika, dopoki sie powtarzaja
  return checkers.takeUntil(function (item) {                          // pozwala na wskazanie pol do obrocenia
    return $(item).hasClass(player.name);
  });
}

function checkerIsOponent(checker, player) {                           //zwraca informacje czy wskazane pole to nasz przeciwnik
  return $(checker).hasClass(player.next.name);
}

function checkersContainPlayer(checkers, player){                       //sprawdza czy w danej tablicy jest gdzies nasz chceker
  return checkers.some(function (checker) {                             // funkcje wyorzystywana w warunku postawienie checkera
    return $(checker).hasClass(player.name);
  });
}

function putCheckerOnNode(node, player) {                               //przypisanie do pola chcekera danego gracza
  var $node = $(node);                                                  // jesli dane pole jeszcze go nie ma
  if ($node.hasClass('checker')) {
    return 'This field is occupied';
  } else {
    $node.addClass('checker').addClass(player.name);
  }
}

function replaceOponentNodes(nodes, player) {                           // exchange zamiana waluty przejetych pol
  nodes.forEach(function (node) {
    $(node).removeClass(player.next.name).addClass(player.name);
  });
};

function nodeHasChecker(node) {                                         // sprawdzenie czy wskazane pole ma klase checker
  return $(node).hasClass('checker');
}

function nodesWithCheckers(node, dir) {                                 //
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
  function checker(player) { return player.name + ' checker'; }
  return $('<table>').append(Array.range(size).map(function (y) {
    return $('<tr>').append(Array.range(size).map(function (x) {
      return $('<td>').addClass('cell').addClass(
        (x === 3 && y === 3 || x === 4 && y === 4) ?
          checker(player) : (x === 3 && y === 4 || x === 4 && y === 3) ?
          checker(player.next) : ''
      );
    }));
  }));

  // próba generowania klikniecia komputera
  //$('td').click(function () {
  //  var intervalId = setInterval(function () {
  //    var $cells = $('td:not(.checker)');
  //    var howMany = $cells.length;
  //    if (howMany === 0) {
  //      clearInterval(intervalId);
  //      return;
  //    }
  //    var randomFloat = Math.random() * howMany;
  //    var randomInt = Math.round(randomFloat) % howMany;
  //    $cells.eq(randomInt).addClass('pound');
  //  }, 10);
  //});


}