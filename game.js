// $('h1').css('text-align','center')
// $('h2').css('text-align','center')

 var player1 = prompt("Player One: Enter Your Name , you will be Blue");
var player1Color = 'rgb(30,144,255)';

var player2 = prompt("Player Two: Enter Your Name, you will be Red");
var player2Color = 'rgb(244, 66, 66)';

// Change the color of a button
function changeColor(row,col,color) {
  return $('table tr').eq(row).find('td').eq(col).find('button').css('background-color',color);
}

// return the color of the chip at the bottom
function reportColor(row,col) {
  return $('table tr').eq(row).find('td').eq(col).find('button').css('background-color');
}

// Take in column index, returns the bottom row that is still gray
function checkBottom(colIndex) {
  var colorReport = reportColor(5,colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = reportColor(row,colIndex);
    if (colorReport === 'rgb(216, 216, 216)') {
      return row
    }
  }
}

// Check to see if 4 inputs are the same color
function checkColorMatch(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(216, 216, 216)' && one !== undefined);
}

function win(player){
  $('h1').fadeOut('fast');
  $('h2').text(player + " WINS!")
  $('h2').css('color','blue')
  $('h3').fadeOut('fast');

}

// Check for Horizontal Wins
function checkHorizontal() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (checkColorMatch(reportColor(row,col), reportColor(row,col+1) ,reportColor(row,col+2), reportColor(row,col+3))) {
        console.log('horizontal');
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function checkVertical() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (checkColorMatch(reportColor(row,col), reportColor(row+1,col) ,reportColor(row+2,col), reportColor(row+3,col))) {
        console.log('vertical');
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function checkDiagonal() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (checkColorMatch(reportColor(row,col), reportColor(row+1,col+1) ,reportColor(row+2,col+2), reportColor(row+3,col+3))) {
        console.log('Diagonal');
        return true;
      }else if (checkColorMatch(reportColor(row,col), reportColor(row-1,col+1) ,reportColor(row-2,col+2), reportColor(row-3,col+3))) {
        console.log('Diagonal');
        return true;
      }else {
        continue;
      }
    }
  }
}

// Start with Player One
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

// Start with Player One
$('h3').text(player1 + ": it is your turn, please pick a column to drop your blue chip.");

$('.board button').on('click',function() {

  // Recognize what column was chosen
  var col = $(this).closest("td").index();

  // Get back bottom available row to change
  var available = checkBottom(col);

  // Drop the chip in that column at the bottomAvail Row
  changeColor(available,col,currentColor);

  // Check for a win or a tie.
  if (checkHorizontal() || checkVertical() || checkDiagonal()) {
    win(currentName);
  }

  // If no win or tie, continue to next player
  currentPlayer = currentPlayer * -1 ;

  // Re-Check who the current Player is.
  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(currentName + ": it is your turn, please pick a column to drop your blue chip.");
    currentColor = player1Color;
  }else {
    currentName = player2
    $('h3').text(currentName + ": it is your turn, please pick a column to drop your red chip.");
    currentColor = player2Color;
  }

})
