function calculate(num1, operator, num2) {
  let output = 0;

  switch (operator) {
    case '+':
      output = num1 + num2;
      break;
    case '-':
      output = num1 - num2;
      break;
    case '*':
      output = num1 * num2;
      break;
    case '/':
      output = num1 / num2;
  }

  console.log(output.toFixed(2));
}

/*
calculate(5, '+', 10);
calculate(25.5, '-', 3);
*/