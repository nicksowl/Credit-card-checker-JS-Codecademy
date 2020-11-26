// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
// reversed [ 0, 8, 6, 1, 0, 8, 0, 9, 7, 7, 6, 9, 3, 5, 4 ]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];
const valid_test = [4, 5,	5, 6,	7, 3,	7, 5,	8, 6,	8, 9, 9, 8, 5, 5];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// Unknow issuers
const unknown1 = [9, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const unknown2 = [7, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];
const invalids = [invalid1, invalid2, invalid3, invalid4, invalid5, mystery4,mystery5];
const unknowns = [unknown1, unknown2];


// Lunh algorithm to validate credit card.
const validateCred = card => {
  //Copying array. Possible to use this way - let workingCard = Array.from(card);
  let workingCard = [...card];
  let lastDigit = workingCard.pop();
  let reverse = workingCard.reverse();
  // Place for all processed digits.
  let storage = [];

     // Iterates over array of numbers; pushes and doubles numbers at ODD positions to a new array, where it checked if number is higher than 9, if so, 9 is extracted from number; after all processes numbers are pushed into storage array.
  for (let i = 0; i < reverse.length; i++) {
    if (i % 2 === 0) {
      let double = []; 
      double.push(reverse[i]*2);
      for (let i = 0; i < double.length; i++) {
        if (double[i] > 9) {
          storage.push(double[i]-9);
        } else {
          storage.push(double[i]);
        }
      }
    }
    else {
      storage.push(reverse[i]);
      }
  };

  // Calculates sum of the array excluding check digit / last digit.
  let sum = storage.reduce (function(a,b) {
    return (a+b);
  }, 0);
 // Calculates sum of array + last digit. 
  let sumWithLastDigit = sum + lastDigit;

  // checks module 10 of overall digit sum. If it's equel to 0 card is valid and return true; otherwise returns false.
  if (sumWithLastDigit%10 == 0){
    return true; 
    } else { 
    return false;
    };
};

  // Accepts nested array on credit cards numbers and returns nested array of invalid numbers using validateCred function.
const findInvalid = (cards) => {
  let invalidCards = [];

  for (let i = 0; i < cards.length; i++) {
      if (validateCred(cards[i]) === false) {
        invalidCards.push(cards[i]);
      } 
      else {
        return;
     }
    };
  
  return invalidCards;
};

 // Identifies issuers of invalid cards, by first digit.
const idInvalidCardCompanies = (invalidCards) => {
  // let Amex = 3;
  // let Visa = 4;
  // let Mastercard = 5;
  // let Discover = 6;

  let invalidCardsCompanies = [];

  for (let i = 0; i < invalidCards.length; i++) {
    if (invalidCards[i][0] === 3 && invalidCardsCompanies.indexOf('Amex') == -1) {
      invalidCardsCompanies.push('Amex');
    } 
    else if (invalidCards[i][0] == 4 && invalidCardsCompanies.indexOf('Visa') == -1) {
      invalidCardsCompanies.push('Visa');
    } 
    else if (invalidCards[i][0] == 5 && invalidCardsCompanies.indexOf('Mastercard') == -1) {
      invalidCardsCompanies.push('Mastercard');
    } else if (invalidCards[i][0] == 6 && invalidCardsCompanies.indexOf('Discover') == -1) {
      invalidCardsCompanies.push('Discover');
    } else if (invalidCardsCompanies.indexOf('Discover') == -1 && invalidCardsCompanies.indexOf('Mastercard') == -1 && invalidCardsCompanies.indexOf('Visa') == -1 && invalidCardsCompanies.indexOf('Amex') == -1 && invalidCardsCompanies.indexOf('Company not found')) {
      invalidCardsCompanies.push('Company not found');
    }
  };

  return invalidCardsCompanies;

};

console.log(idInvalidCardCompanies(invalids));









