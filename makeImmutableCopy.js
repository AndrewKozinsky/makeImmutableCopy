

/*let obj_1 = {
    a: 1,
    b: {
        a: 1,
        b: {
            a: 1,
            b: 1
        }
    }
};*/

// let link = obj_1.b.b;


let arr_1 = [
    0,
    [1, 2, 3],
    [ 4,
        [5, 6],
        [
            [7, 8],
            [ 9, 10 ]
        ],
    ]
];

let link = arr_1[2][2][1];



let copy = makeImmutableCopy(arr_1, link);
console.log(copy);


console.log(arr_1 === copy);
console.log(arr_1[1] === copy[1]);
console.log(arr_1[2] === copy[2]);
console.log(arr_1[2][2] === copy[2][2]);
console.log(arr_1[2][2][0] === copy[2][2][0]);


copy[1][1] = 99;
copy[2][2][1][0] = 555;

console.log(arr_1);
console.log(copy);


/**
 * Функция создаёт неизменяемую копию (immutable) переданных данных.
 * @param {Object || Array} mainData — объект или массив где внутри есть объект, который должен быть скопирован.
 * @param {Object || Array} targetObj — объект или массив, который должен быть скопирован.
 * @param {Object || Array} newData — в процессе работы функция создаёт объект или массив с копией. Это служебный аргумент. Сюда передавать ничего не нужно.
 * @returns {Object || Array} — функция возвращает неизменяемую копию.
 */
function makeImmutableCopy(mainData, targetObj, newData) {

    // Если это массив
    if(mainData instanceof Array) {

        // Есть в его структуре есть целевой объект
        if(isDataHasTargetData(mainData, targetObj)) {
            // Тогда скопировать массив и вставить как значение возвращаемого объекта
            newData = mainData.concat();
        }

        // Перебрать все элементы массива
        for(let i = 0; i < newData.length; i++) {
            // Перебираемый элемент
            let elem = newData[i];

            // Если в структуре элемента массива есть целевой объект
            if(isDataHasTargetData(elem, targetObj)) {
                // Тогда заменить его на копию
                newData[i] = makeImmutableCopy(elem, targetObj, newData)
            }
        }
    }


    // Если это объект
    if(mainData + '' === "[object Object]") {

        // Есть в его структуре есть целевой объект
        if(isDataHasTargetData(mainData, targetObj)) {
            // Тогда скопировать объект и вставить как значение возвращаемого объекта
            newData = Object.assign({}, mainData);
        }

        // Перебрать все элементы объекта
        for(let key in mainData) {
            // Перебираемый элемент
            let elem = mainData[key];

            // Если в структуре объекта есть целевой объект
            if(isDataHasTargetData(elem, targetObj)) {
                // Тогда заменить его на копию
                mainData[key] = makeImmutableCopy(elem, targetObj, newData)
            }
        }
    }


    // Возвратить скопированные данные
    return newData
}


/**
 * Функция проверяет есть ли в данных другие даные
 * @param {Object || Array} currentData — объект или массив где нужно найти другой объект.
 * @param {Object || Array} targetObj — объект, который может быть в currentData.
 * @returns {Boolean} — возвращает булево значение есть ли в currentData объект targetObj.
 */
function isDataHasTargetData(currentData, targetObj) {

    // Если текущий объект равен целевому объекту, то вернуть правду
    if(currentData === targetObj) return true;

    // Если это массив
    if(currentData instanceof Array) {

        // Перебрать все элементы массива
        for(let i = 0; i < currentData.length; i++) {
            // Перебираемый элемент
            let elem = currentData[i];

            if(isDataHasTargetData(elem, targetObj)) {
                return true
            }
        }
    }


    // Если это объект
    if(currentData + '' === "[object Object]") {

        // Перебрать все элементы массива
        for(let key in currentData) {
            // Перебираемый элемент
            let elem = currentData[key];

            if(isDataHasTargetData(elem, targetObj)) {
                return true
            }
        }
    }
}