function replaceChar(input, character, str) {
  let result = input.replace('_', character);
  
  console.log(result === str ? 'Matched' : 'Not Matched');
}

/*
replaceChar('Str_ng', 'I', 'Strong');
replaceChar('Str_ng', 'i', 'String');
*/
