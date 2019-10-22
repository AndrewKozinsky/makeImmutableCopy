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