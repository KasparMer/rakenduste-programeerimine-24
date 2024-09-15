//1. ül
const array = [1,2,3,4,5,6,7];

function findIndex(array, num) {
    return array.indexOf(num);
}

console.log(findIndex(array, 5));
//2. ül
function addNumbersFn(num1, num2) {
    return num1 + num2; 
}

console.log(addNumbersFn(1, 2));

//3. ül
const addNumbersArrowFn = (num1, num2) => {
    return num1 + num2;
}

console.log(addNumbersArrowFn(1, 2));

//4. ül
const addNumbersArrowFnShort = (num1, num2) =>  num1 + num2;

console.log(addNumbersArrowFnShort(1, 5));

//5. ül
function addNumbersNested(nu1) {
    return function (num2) {
        return num1 + num2;
    };
}

console.log(addNumbersNested(3)(99));

//6. ül
const addNumbersNestedAF = (num1) => (num2) => num1 + num2;

console.log(addNumbersNestedAF(9)(102));

//7. ül
const greet = (name) => 'Hello ${name}';

console.log(greet());
console.log(greet("Raimo"));

//8. ül
const newArray = [1, 2, 3, 4, 5];

const addedArray = newArray.map((element) => element + 5);

console.log(addedArray);

//9. ül
const threeParameters= newArray.map((element, index, array) => {
    console.log(element, index, array)

    element +5
});

//11. ül
const arrayS = [1, 2, 3, 4, 5, 6];

const filteredArray = arrayS.filter((element) => {
    console.log(element > 4);

    return element > 4;
});

console.log({ filteredArray });

//12. ül
const names = ["Anni", "Mari", "Mati", "Juku"];

const objectifiedNames = names.map((name) => {
    return {
        name: name,
        age: name.length + 20,
        email: '${name}@company.ee',
        address:'${name} Streen 55',

    };
});

console.log(objectifiedNames);

//13. ül