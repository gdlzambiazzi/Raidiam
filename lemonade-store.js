/** To run this file:
 * 'node lemonade-store.js' on your command line to see test results*/

const manageOrders = orders => {
  const drinkCost = 5;
  let cashRegister = 0;
  let billsInRegister = [];
  let count5 = 0;
  let count10 = 0;
  let count20 = 0;
  
  // Sorts the orders array to make sure that the customers are handled in the correct position in line
  orders = sortByPositionInLine(orders);

  for (let i = 0; i < orders.length; i++) {
    let isCounterfeit = false;
    let order = orders[i]; //makes the code more readable by not having to append '[i]' every time we use a value
    
    /*it checks if the bill is countereit (negative) and changes the bill_value to positive to make sure
    that fake bills are also considered. It'll be considered in the order and the change will be given to the customer*/
    if (order.bill_value < 0) {
      isCounterfeit = true;
      order.bill_value *= -1;
    }

    // Checks if the bills are different from 5, 10, 20
    if (order.bill_value !== 5 && order.bill_value !== 10 && order.bill_value !== 20) {
      return 'Invalid bill';
    }

    const totalCost = drinkCost * order.requested_lemonades;

    if (order.bill_value < totalCost) {
      //console.log('Not enough money to pay for the lemonade');
      return null;
    }

    const change = order.bill_value - totalCost;

    if (change > cashRegister) { // colocar lógica pra contar as notas (change > count5 * 5) || (change > count10 * 10) || (change > count20 * 20)
      //console.log('Not enough money in cash register to provide change');
      return null;
    }
    
    // only sums to the cashRegister if the bill is real
    if (isCounterfeit === false) {
      cashRegister += order.bill_value - change;
    }
    
    /**The big IF below is to handle the bills and the changes.
     * It'd be better to have it inside another function (e.g. handleChange or handleBills)
     * It is an EXTREME brute-force solution! For sure, it is far from an ideal real world solution.
     * It considers changes of $5, $10, $20 and even $15.
     * Also, there's a little bit of redundance on some of the IF's. It'd have been better to use switch-cases.
     * But, after all, the 3 test examples are working as expected, as are the extra tests I've implemented.
     */

    // only adds real bills to the cash register
    if (isCounterfeit === false) {
      if (change > 0) { //only executes if a Change must be provided
        let index = 0;
        if (change === 5 && count5 > 0) { // finds a $5 bill and removes it from the cash register
          index = billsInRegister.indexOf(5);
          billsInRegister.splice(index, 1);
          count5--;
        } else if (change === 5 && count5 === 0) {
          //console.log('Not enough money in cash register to provide change');
          return null;
        }
        if (change === 10 && (count10 > 0 || count5 >= 2)) { // if there's 1 $10 bill or two $5 bills
          index = billsInRegister.indexOf(10);
          if (index > -1) { // if there's a $10 bill
            billsInRegister.splice(index, 1);
            count10--;
          } else { // removes two $5 bills from the cash register
            index = billsInRegister.indexOf(5);
            billsInRegister.splice(index, 1);
            index = billsInRegister.indexOf(5);
            billsInRegister.splice(index, 1);
            count5 -= 2;
          }
        } else if (change === 10 && count10 === 0) {
          //console.log('Not enough money in cash register to provide change');
          return null;
        }
        if (change === 15 && (count5 >= 3 || (count10 > 0 && count5 > 0))) { //a switch-case would be better
          if (count5 >= 3) {
            index = billsInRegister.indexOf(5);
            billsInRegister.splice(index, 1);
            index = billsInRegister.indexOf(5);
            billsInRegister.splice(index, 1);
            index = billsInRegister.indexOf(5);
            billsInRegister.splice(index, 1);
            count5 -= 3;
          } else if (count10 > 0 && count5 > 0) {
            index = billsInRegister.indexOf(10);
            billsInRegister.splice(index, 1);
            count10--;
            index = billsInRegister.indexOf(5);
            billsInRegister.splice(index, 1);
            count5--;
          }
        }
        if (change === 20 && (count20 > 0 || count10 >= 2 || (count10 > 0 && count5 >= 2) || count5 >= 4)) { //a switch-case would be much better
          index = billsInRegister.indexOf(20);
          if (index > -1) { // if there's a $20 bill
            billsInRegister.splice(index, 1);
            count20--;
          } else if (count10 >= 2) {
            index = billsInRegister.indexOf(10);
            billsInRegister.splice(index, 1);
            index = billsInRegister.indexOf(10);
            billsInRegister.splice(index, 1);
            count10 -= 2;
          } else if ((count10 > 0 && count5 >= 2)) {
            index = billsInRegister.indexOf(10);
            billsInRegister.splice(index, 1);
            count10--;
            index = billsInRegister.indexOf(5);
            billsInRegister.splice(index, 1);
            index = billsInRegister.indexOf(5);
            billsInRegister.splice(index, 1);
            count5 -= 2;
          } else if (count5 >= 4) {
            index = billsInRegister.indexOf(5);
            billsInRegister.splice(index, 1);
            index = billsInRegister.indexOf(5);
            billsInRegister.splice(index, 1);
            index = billsInRegister.indexOf(5);
            billsInRegister.splice(index, 1);
            index = billsInRegister.indexOf(5);
            billsInRegister.splice(index, 1);
            count5 -= 4;
          }
        } else if (change === 20 && count20 === 0) {
          //console.log('Not enough money in cash register to provide change');
          return null;
        }
      }
      billsInRegister.push(order.bill_value); // puts the bill in the cash register
      
      // updates the bills counters
      if (order.bill_value === 5) {
        count5++;
      } else if (order.bill_value === 10) {
        count10++;
      } else if (order.bill_value === 20) {
        count20++;
      }
    }
  }
  return billsInRegister;
};

const sortByPositionInLine = arr => {
  return arr.sort((a, b) => a.position_in_line - b.position_in_line);
};

// Test #1 - It is possible to provide change for all customers - real notes
let ordersInput = [
  { "bill_value": 20, "position_in_line": 3, "requested_lemonades": 2 },
  { "bill_value": 5, "position_in_line": 1, "requested_lemonades": 1 },
  { "bill_value": 5, "position_in_line": 2, "requested_lemonades": 1 }
];
console.log('Test #1: ['+manageOrders(ordersInput)+']'); // outputs [20]

// Test #2 - It is possible to provide change for all customers - includes a counterfeit bill
ordersInput = [
  { "bill_value": -10, "position_in_line": 3, "requested_lemonades": 2 },
  { "bill_value": 5, "position_in_line": 1, "requested_lemonades": 1 },
  { "bill_value": 5, "position_in_line": 2, "requested_lemonades": 1}
];
console.log('Test #2: ['+manageOrders(ordersInput)+']'); // outputs [5, 5]

// Test #3 - It is not possible to provide change for all customers
ordersInput = [
  { "bill_value": 10, "position_in_line": 2, "requested_lemonades": 1 },
  { "bill_value": 10, "position_in_line": 3, "requested_lemonades": 1 },
  { "bill_value": 5, "position_in_line": 1, "requested_lemonades": 1 }
];
console.log('Test #3: ['+manageOrders(ordersInput)+']'); // outputs 'null' (Not enough money in cash register to provide change)

// Extra Test #4 - It is not possible to use a bill different from 5, 10 or 20
ordersInput = [{ "bill_value": 6, "position_in_line": 2, "requested_lemonades": 1 }];
console.log('Test #4: '+manageOrders(ordersInput)); // outputs 'Invalid bill'

// Extra Test #5 - The code handles more than 3 orders well, with different quantities
ordersInput = [
  { "bill_value": 10, "position_in_line": 6, "requested_lemonades": 1 },
  { "bill_value": 10, "position_in_line": 5, "requested_lemonades": 1 },
  { "bill_value": 5, "position_in_line": 4, "requested_lemonades": 1 },
  { "bill_value": 5, "position_in_line": 2, "requested_lemonades": 1 },
  { "bill_value": 20, "position_in_line": 3, "requested_lemonades": 2 },
  { "bill_value": 10, "position_in_line": 1, "requested_lemonades": 2 }
];
console.log('Test #5: ['+manageOrders(ordersInput)+']'); // [20, 10, 10]

// Extra Test #6 - Tries to pay with bill smaller than the total cost
ordersInput = [{ "bill_value": 5, "position_in_line": 1, "requested_lemonades": 3 }];
console.log('Test #6: '+manageOrders(ordersInput)); // outputs null (Not enough money to pay for the lemonade)

// Extra Test #7 - Tests a change of $15
ordersInput = [
  { "bill_value": 5, "position_in_line": 1, "requested_lemonades": 1 },
  { "bill_value": 10, "position_in_line": 2, "requested_lemonades": 2 },
  { "bill_value": 20, "position_in_line": 3, "requested_lemonades": 1 }
];
console.log('Test #7: ['+manageOrders(ordersInput)+']'); // outputs [20], because we gave as a change the $5 and $10 bills
