angular.module('starter', [])
  .controller('mainCtrl', ['$scope', function ($scope) {
    $scope.message = "hello";
    $scope.display = 0;
      // Used to evaluate whether to start a new number
    // in the display and when to concatenate
    $scope.newNumber = true;
    // Holds the pending operation so calculate knows
    // what to do
    $scope.pendingOperation = null;
    // Bound to the view to display a token indicating
    // the current operation
    $scope.operationToken = "";
    // Holds the running total as numbers are added/subtracted
    $scope.runningTotal = null;
    // Holds the number value of the string in the display output
    $scope.pendingValue = null;
    // Tells calculate what to do when the equals buttons is clicked repeatedly
    $scope.lastOperation = null;
    // Constants
     var ADD = "adding";
    var SUBTRACT = "subtracting";
    var ADD_TOKEN = "+";
    var SUBTRACT_TOKEN = "-";
    var MULTIPLY = "multiplying";
    var MULTIPLY_TOKEN = "*";
       var DIVIDE = "dividing";
    var DIVIDE_TOKEN = "/";
    /*
     * Runs every time a number button is clicked.
     * Updates the output display and sets
     * newNumber flag
     */
    $scope.number = function (btn) {
        if ($scope.display == "0" || $scope.newNumber) {
            $scope.display = btn;
            $scope.newNumber = false;
        } else {
            $scope.display += String(btn);
        }
        $scope.pendingValue = toNumber($scope.display);
    };
    /*
     * Runs every time the add button is clicked.
     * If a number has been entered before the add
     * button was clicked we set the number as a pendingValue,
     * set ADD as a pendingOperation, and set the token.
     * If no number was entered but an existing calculated
     * number is in the output display we add the last added
     * value on to the total again.
     */
    $scope.add = function () {
        if ($scope.pendingValue) {
            if ($scope.runningTotal && $scope.pendingOperation == ADD) {
                $scope.runningTotal += $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == SUBTRACT) {
                $scope.runningTotal -= $scope.pendingValue;
            } else {
                $scope.runningTotal = $scope.pendingValue;
            }
        }
        setOperationToken(ADD);
        setOutput(String($scope.runningTotal));
        $scope.pendingOperation = ADD;
        $scope.newNumber = true;
        $scope.pendingValue = null;
    };
    /*
     * Runs every time the subtract button is clicked.
     * If a number has been entered before the subtract
     * button was clicked we set the number as a pendingValue,
     * set subtract as a pendingOperation, and set the token.
     * If no number was entered but an existing calculated
     * number is in the output display we subtract the last added
     * value from the total.
     */
    $scope.subtract = function () {
        if ($scope.pendingValue) {
            if ($scope.runningTotal && ($scope.pendingOperation == SUBTRACT)) {
                $scope.runningTotal -= $scope.pendingValue;
            } else if ($scope.runningTotal && $scope.pendingOperation == ADD) {
                $scope.runningTotal += $scope.pendingValue;
              console.log('line 83, subtraction', runningTotal, $scope.pendingValue);
            } else {
                $scope.runningTotal = $scope.pendingValue;
            }
        }
        setOperationToken(SUBTRACT);
        setOutput(String($scope.runningTotal));
        $scope.pendingOperation = SUBTRACT;
        $scope.newNumber = true;
        $scope.pendingValue = null;
    };
/*multiplication function*/
        $scope.multiply = function () {
        if ($scope.pendingValue) {
            if ($scope.runningTotal && ($scope.pendingOperation == MULTIPLY)) {
                $scope.runningTotal *= $scope.pendingValue;
            } else {
                $scope.runningTotal = $scope.pendingValue;
            }
        }
        setOperationToken(MULTIPLY);
        setOutput(String($scope.runningTotal));
        $scope.pendingOperation = MULTIPLY;
        $scope.newNumber = true;
        $scope.pendingValue = null;
    };
    /*division function*/
            $scope.divide = function () {
        if ($scope.pendingValue) {
            if ($scope.runningTotal && ($scope.pendingOperation == DIVIDE)) {
                $scope.runningTotal /= $scope.pendingValue;
              console.log('line 113, division', $scope.runningTotal, $scope.pendingValue);
            } else {
                $scope.runningTotal = $scope.pendingValue;
            }
        }
        setOperationToken(DIVIDE);
        setOutput(String($scope.runningTotal));
        $scope.pendingOperation = DIVIDE;
        $scope.newNumber = true;
        $scope.pendingValue = null;
    };
    /*
     * Runs when the equals (=) button is clicked.
     * If a number has been entered before the equals
     * button was clicked we perform the calculation
     * based on the pendingOperation.
     * If no number was entered but an existing calculated
     * number is in the output display we repeat the last
     * operation. For example, if 8+2 was entered we will
     * continue to add 2 every time the equals button is clicked.
     */
    $scope.calculate = function () {
        if (!$scope.newNumber) {
            $scope.pendingValue = toNumber($scope.display);
            $scope.lastValue = $scope.pendingValue;
        }
        if ($scope.pendingOperation == ADD) {
            $scope.runningTotal += $scope.pendingValue;
            $scope.lastOperation = ADD;
        } else if ($scope.pendingOperation == SUBTRACT) {
            $scope.runningTotal -= $scope.pendingValue;
            $scope.lastOperation = SUBTRACT;
        } else if ($scope.pendingOperation == MULTIPLY) {
            $scope.runningTotal *= $scope.pendingValue;
            $scope.lastOperation = MULTIPLY;
        } else if ($scope.pendingOperation == DIVIDE) {
            $scope.runningTotal /= $scope.pendingValue;
            $scope.lastOperation = DIVIDE;

        } else {
            if ($scope.lastOperation) {
                if ($scope.lastOperation == ADD) {
                    if ($scope.runningTotal) {
                        $scope.runningTotal += $scope.lastValue;
                    } else {
                        $scope.runningTotal = 0;
                    }
                } else if ($scope.lastOperation == SUBTRACT) {
                    if ($scope.runningTotal) {
                        $scope.runningTotal -= $scope.lastValue;
                    } else {
                        $scope.runningTotal = 0;
                    }
                }
            } else {
                $scope.runningTotal = 0;
            }
        }
        setOutput($scope.runningTotal);
        setOperationToken();
        $scope.pendingOperation = null;
        $scope.pendingValue = null;
    };
    /*
     * Initializes the appropriate values
     * when the clear button is clicked.
     */
    $scope.clear = function () {
        $scope.runningTotal = null;
        $scope.pendingValue = null;
        $scope.pendingOperation = null;
        setOutput("0");
    };
    /*
     * Updates the display output and resets the
     * newNumber flag.
     */
    setOutput = function (outputString) {
        $scope.display = outputString;
        $scope.newNumber = true;
    };
    /*
     * Sets the operation token to let the user know
     * what the pendingOperation is
     */
    setOperationToken = function (operation) {
        if (operation == ADD) {
            $scope.operationToken = ADD_TOKEN;
        } else if (operation == SUBTRACT) {
            $scope.operationToken = MULTIPLY_TOKEN;
              } else if (operation == MULTIPLY) {
            $scope.operationToken = DIVIDE_TOKEN;
                    } else if (operation == SUBTRACT) {
            $scope.operationToken = DIVIDE_TOKEN;
        } else {
            $scope.operationToken = "";
        }
    };
    /* Converts a string to a number so we can
     * perform calculations. Simply multiplies
     * by one to do so
     */
    toNumber = function (numberString) {
        var result = 0;
        if (numberString) {
            result = numberString * 1;
        }
        return result;
    };
    // var values = [];
    //var result = 0; /* cumulative result of calculations to date */
/*
    $scope.Math = window.Math;
    $scope.number = function (num) {
      values.push(num);
      $scope.display = values.join('') * 1;
    };
    $scope.clear = function () {
      $scope.display = 0;
      values = [];
    };
$scope.immediate = function (op) {
 perform immedite operation and disply result
var b = parseFloat($scope.display);
switch (op) {
case 'sin':
b = '' + Math.sin(b);
break;
case 'cos':
b = '' + Math.cos(b);
break;
case 'tan':
b = '' + Math.tan(b);
break;
}
$scope.display = '' + b;
}
*/
}]);
