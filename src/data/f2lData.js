// Данные для F2L (First Two Layers)
// Источник: DeepSeek / Пользовательская редакция

export const f2lData = [
    // --- Элементарные случаи ---
    { id: "basic-1", numId: 1, group: "Элементарные случаи", name: "Простейший случай", alg: "U (R U' R')", image: "./files/f2l/F2L01.gif" },
    { id: "basic-2", numId: 2, group: "Элементарные случаи", name: "Угол смотрит направо", alg: "U' (F' U F)", image: "./files/f2l/F2L02.gif" },
    { id: "basic-3", numId: 3, group: "Элементарные случаи", name: "Угол смотрит на нас", alg: "(F' U' F)", image: "./files/f2l/F2L03.gif" },
    { id: "basic-4", numId: 4, group: "Элементарные случаи", name: "Угол смотрит влево", alg: "(R U R')", image: "./files/f2l/F2L04.gif" },

    // --- Кубики "вразброс" одним цветом вверх ---
    { id: "scattered-1", numId: 5, group: "Кубики вразброс", name: "Белый сбоку (правый)", alg: "(U' R U R') U2 (R U' R')", image: "./files/f2l/F2L05.gif" },
    { id: "scattered-2", numId: 6, group: "Кубики вразброс", name: "Белый сбоку (передний)", alg: "(U F' U' F) U2 (F' U F)", image: "./files/f2l/F2L06.gif" },
    { id: "scattered-3", numId: 7, group: "Кубики вразброс", name: "Белый сбоку (правый)", alg: "U' (R U2' R') U2 (R U' R')", image: "./files/f2l/F2L07.gif" },
    { id: "scattered-4", numId: 8, group: "Кубики вразброс", name: "Белый сбоку (передний)", alg: "U (F' U2 F) U2 (F' U F)", image: "./files/f2l/F2L08.gif" },

    // --- Кубики "вразброс" разными цветами вверх ---
    { id: "mixed-colors-1", numId: 9, group: "Разные цвета", name: "Белый сбоку (правый)", alg: "U' R U' R' U (F' U' F)", image: "./files/f2l/F2L09.gif" },
    { id: "mixed-colors-2", numId: 10, group: "Разные цвета", name: "Белый сбоку (передний)", alg: "U F' U F U' (R U R')", image: "./files/f2l/F2L10.gif" },
    { id: "mixed-colors-3", numId: 11, group: "Разные цвета", name: "Белый сбоку (правый)", alg: "U' (R U2' R') U (F' U' F)", image: "./files/f2l/F2L11.gif" },
    { id: "mixed-colors-4", numId: 12, group: "Разные цвета", name: "Белый сбоку (передний)", alg: "U (F' U2 F) U' (R U R')", image: "./files/f2l/F2L12.gif" },
    { id: "mixed-colors-5", numId: 13, group: "Разные цвета", name: "Белый сверху (передний)", alg: "U (F' U F U') (F' U' F)", image: "./files/f2l/F2L13.gif" },
    { id: "mixed-colors-6", numId: 14, group: "Разные цвета", name: "Белый сверху (правый)", alg: "U' (R U' R' U) (R U R')", image: "./files/f2l/F2L14.gif" },

    // --- Сборка через раскол пары ---
    { id: "split-1", numId: 15, group: "Раскол пары", name: "Пара на фронтали", alg: "(F' U F) U2 (R U R')", image: "./files/f2l/F2L15.gif" },
    { id: "split-2", numId: 16, group: "Раскол пары", name: "Пара на правой грани", alg: "(R U' R') U2 (F' U' F)", image: "./files/f2l/F2L16.gif" },
    { id: "split-3", numId: 17, group: "Раскол пары", name: "Пара на правой грани", alg: "(R U2 R') U' (R U R')", image: "./files/f2l/F2L17.gif" },
    { id: "split-4", numId: 18, group: "Раскол пары", name: "Пара на фронтали", alg: "(F' U2 F) U (F' U' F)", image: "./files/f2l/F2L18.gif" },

    // --- Кубики "вразброс" белый вверх ---
    { id: "white-up-1", numId: 19, group: "Белый сверху. Кубики 'вразброс'", name: "Пара собирается сбоку", alg: "U (R U2 R') U (R U' R')", image: "./files/f2l/F2L19.gif" },
    { id: "white-up-2", numId: 20, group: "Белый сверху. Кубики 'вразброс'", name: "Пара собирается сбоку", alg: "U' (F' U2 F) U' (F' U F)", image: "./files/f2l/F2L20.gif" },
    { id: "white-up-3", numId: 21, group: "Белый сверху. Кубики 'вразброс'", name: "Цвета в одну сторону", alg: "U2 (R U R' U) (R U' R')", image: "./files/f2l/F2L21.gif" },
    { id: "white-up-4", numId: 22, group: "Белый сверху. Кубики 'вразброс'", name: "Цвета в одну сторону", alg: "U2 (F' U' F U') (F' U F)", image: "./files/f2l/F2L22.gif" },
    { id: "white-up-5", numId: 23, group: "Белый сверху. Кубики рядом", name: "Одинаковые цвета", alg: "(R U R' U') U' (R U R' U') (R U R')", image: "./files/f2l/F2L23.gif" },
    { id: "white-up-6", numId: 24, group: "Белый сверху. Кубики рядом", name: "Одинаковые цвета", alg: "(F' U' F U) U (F' U' F U) (F' U' F)", image: "./files/f2l/F2L24.gif" },

    // --- Угол на месте, боковушка вверху ---
    { id: "corner-solved-1", numId: 25, group: "Угол на месте", name: "Боковушка сверху", alg: "U' (F' U F) U (R U' R')", image: "./files/f2l/F2L25.gif" },
    { id: "corner-solved-2", numId: 26, group: "Угол на месте", name: "Боковушка сверху", alg: "U (R U' R') U' (F' U F)", image: "./files/f2l/F2L26.gif" },
    { id: "corner-solved-3", numId: 27, group: "Угол на месте", name: "Боковушка сверху", alg: "(R U' R' U) (R U' R')", image: "./files/f2l/F2L27.gif" },
    { id: "corner-solved-4", numId: 28, group: "Угол на месте", name: "Боковушка сверху", alg: "(F' U F U') (F' U F)", image: "./files/f2l/F2L28.gif" },
    { id: "corner-solved-5", numId: 29, group: "Угол на месте", name: "Боковушка сверху", alg: "(F' U' F U) (F' U' F)", image: "./files/f2l/F2L29.gif" },
    { id: "corner-solved-6", numId: 30, group: "Угол на месте", name: "Боковушка сверху", alg: "(R U R' U')(R U R')", image: "./files/f2l/F2L30.gif" },

    // --- Боковушка на месте, угол над слотом ---
    { id: "edge-solved-1", numId: 31, group: "Боковушка на месте", name: "Угол сверху", alg: "(R U' R') d (R' U R)", image: "./files/f2l/F2L31.gif" },
    { id: "edge-solved-2", numId: 32, group: "Боковушка на месте", name: "Угол сверху", alg: "(R U R' U')(R U R' U')(R U R')", image: "./files/f2l/F2L32.gif" },
    { id: "edge-solved-3", numId: 33, group: "Боковушка на месте", name: "Угол сверху", alg: "(U' R U' R') U2 (R U' R')", image: "./files/f2l/F2L33.gif" },
    { id: "edge-solved-4", numId: 34, group: "Боковушка на месте", name: "Угол сверху", alg: "(U F' U F) U2 (F' U F)", image: "./files/f2l/F2L34.gif" },
    { id: "edge-solved-5", numId: 35, group: "Боковушка на месте", name: "Угол сверху", alg: "U' R U R' U (F' U' F)", image: "./files/f2l/F2L35.gif" },
    { id: "edge-solved-6", numId: 36, group: "Боковушка на месте", name: "Угол сверху", alg: "U F' U' F U' (R U R')", image: "./files/f2l/F2L36.gif" },

    // --- Угол и боковушка в слоте ---
    { id: "in-slot-1", numId: 37, group: "В слоте", name: "Неправильная ориентация", alg: "(R U R') U2 (R U2 R') d (R' U' R)", image: "./files/f2l/F2L38.gif" },
    { id: "in-slot-2", numId: 38, group: "В слоте", name: "Неправильная ориентация", alg: "(R U R' U') (R U2 R') U' (R U R')", image: "./files/f2l/F2L39.gif" },
    { id: "in-slot-3", numId: 39, group: "В слоте", name: "Неправильная ориентация", alg: "(F' U' F U) (F' U2 F) U (F' U' F)", image: "./files/f2l/F2L40.gif" },
    { id: "in-slot-4", numId: 40, group: "В слоте", name: "Особый случай", alg: "y(L' U L)(F R U2 R' F')", image: "./files/f2l/F2L41.gif" },
    { id: "in-slot-5", numId: 41, group: "В слоте", name: "Особый случай", alg: "(R U' R')(F' L' U2 L F)", image: "./files/f2l/F2L42.gif" }
];
