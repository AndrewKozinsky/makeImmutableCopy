# Функция создающая неизменяемую копию объекта или массива
> Функция первым аргументом принимает объект данных (объект или массив). Вторым ссылку на объект данных, который содержится в первом аргументе.

Если содержится, то функция создаёт копии всех объектов данных от корневого до объекта указанного в ссылке. Таким образом создаётся неизменяемый объект данных. При этом те объекты данных, которые не планируется изменять, не будут скопированы для экономии памяти.

> *Функция не создаёт полную копию всего объекта данных, а только те элементы, которые нужно скопировать чтобы в дальнейшем изменить какой-то один объект данных и эти изменния не затронули бы исходный объект данных.*

Например есть массив arr_1. Требуется сделать его копию чтобы изменить подмассив по адресу arr_1[2][2][1]. 

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

Поэтому в функцию makeImmutableCopy передаю ссылки на оригинальный массив и подмассив, который планируется изменять. Функция возвращает копию.

    let copy = makeImmutableCopy(arr_1, link);
    console.log(copy);`

Проверки равенства элементов массива

    console.log(arr_1 === copy);                   // false (корневой массив скопирован)

    console.log(arr_1[2] === copy[2]);             // false (элемент скопирован потому что он находится на пути от корня к копируемому массиву)

    console.log(arr_1[2][2][0] === copy[2][2][0]); // true  (этот элемент массива копировать не нужно)

    console.log(arr_1[2][2][1] === copy[2][2][1]); // false  (целевой массив, который и будет изменён в коде ниже)

    copy[1][1] = 99;                               // Так как массив copy[1] не скопирован, то он является ссылкой на arr_1[1]. Поэтому число 99 появится в обоих массивах.

    copy[2][2][1][0] = 555;                        // Этот массив скопирован. Поэтому эти изменения не затронут массив arr_1.

    console.log(arr_1);

    console.log(copy);