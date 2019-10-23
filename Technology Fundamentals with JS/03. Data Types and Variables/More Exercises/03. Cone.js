function calculateConeProps(radius, height) {
  let volume = ( Math.PI * (radius * radius) * height ) / 3;
  let area = Math.PI * radius * (radius + Math.sqrt(radius * radius + height * height));

  console.log(`volume = ${volume.toFixed(4)}`);
  console.log(`area = ${area.toFixed(4)}`);
}

/*
calculateConeProps(3, 5);
console.log('\n');
calculateConeProps(3.3, 7.8);
*/
