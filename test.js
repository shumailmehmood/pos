// var a=[12,12,13]
// console.log(a);
// console.log([...new Set(a)]);


// function test() {
//     this.arrow = function () {
//         console.log(this)
//     }
//     this.arrow1 = function abc() {
//         console.log(this)
//     }
// }
// let run = new test();
// run.arrow();
// run.arrow1();

var minimum = 1;
var maximum = 100;
var operands=['+','*','-','/'];
var int1 = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
var int2 = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
var randomElement = _.sample(randomArray);
// manually use _.random
var randomElement = randomArray[_.random(randomArray.length-1)];
document.getElementById('question').innerHTML = int1 + " " + "+" + " " + int2;
var qanswer = int1 + int2;
