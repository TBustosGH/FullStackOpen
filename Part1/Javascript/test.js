//VARIABLES
/*const x = 1;
let y = 5;

console.log(x, y);
y += 10;
console.log(x, y);
y = 'sometext';
console.log(x, y);
*/


//ARRAYS
//Adding a value to an array
/*const t = [1, -1, 3];

t.push(5);

console.log(t.length);
console.log(t[1]);

t.forEach(value =>{
    console.log(value);
})*/

//Using concat method to "add a value to an array"
/*const t = [1, -1, 3];

const t2 = t.concat(5);

console.log(t);
console.log(t2);*/

//Array.map() method
//lets you create a new array using the values of some other
//array
/*const t = [1, 2, 3];

const m1 = t.map(value => value);
console.log(m1);*/

//Asignación de desestructuración
/*const t = [1, 2, 3, 4, 5];

const [first, second, third, fourth, fifth] = t;

console.log(first, second);
console.log(third, fourth, fifth);*/


//OBJECTS
/*const object1 = {
    name : 'Albert Hellas',
    age : 35,
    education : 'Phd',
}
//print values of object1
console.log(`${object1.name} is ${object1.age} years old.`);
const fieldName = 'education';
console.log(object1[fieldName]);


const object2 = {
    name : 'Full Stack web application development',
    level : 'intermediate studies',
    size : 5,
}
//Add values to object2
object2.address = 'Helsinki';
object2['Secret number'] = 12341;
console.log(object2.address);

const object3 = {
    name : {
        first : 'Dan',
        last : 'Abramov',
    },
    grades : [2, 3, 5, 3],
    department : 'Stanford University',
}*/


//METHODS
//First way to declare a function
const sum = (p1, p2) => {
    console.log(p1);
    console.log(p2);
    return p1 + p2;
}

const result = sum(1, 5);
console.log(result);

/*const square = p => {
    console.log(p);
    return p * p;
}*/

const square = p => p * p; //Single line method, returns the expresion
//Example of single line method:
const t = [1, 2, 3];
const tSquared = t.map(p => p * p);
console.log(tSquared);

//Second way to declare a method
function sayHello(){
    console.log('Greetings!');
} 
sayHello();

//Third way to declare a method
const average = function(a, b){
    return (a + b) / 2;
}

const averageResult = average(2, 5);

