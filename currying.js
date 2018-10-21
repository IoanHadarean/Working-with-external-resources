function m1(a) {
   return function m2(b) {
      return function m3(c) {
         return a * b * c;
      };
   };
}

console.log(m1(1)(2)(3));

function m(a, b, c) {
   return a * b * c;
}

console.log(m(1, 2, 3));