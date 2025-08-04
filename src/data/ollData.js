// Данные для OLL с поддержкой нескольких вариантов алгоритмов

export const ollData = [
    { 
        id: 1, 
        group: "Подняты все боковушки", 
        name: "Глаза", 
        algs: [
            { source: "Основной", alg: "R2 D R' U2 R D' R' U2 R'" },
            { source: "Глаза сзади", alg: "R2 D' R U2 R'D R U2 R" }
        ],
        image: "./files/oll1.gif" 
    },
    { 
        id: 2, 
        group: "Подняты все боковушки", 
        name: "Уши", 
        algs: [
            { source: "Основной", alg: "r U R' U' r' F R F'" },
            { source: "Альтернатива", alg: "x' R U R' D R U' R' D' x" }
        ],
        image: "./files/oll2.gif" 
    },
    { 
        id: 3, 
        group: "Подняты все боковушки", 
        name: "Восьмёрка", 
        algs: [
            { source: "Основной", alg: "F' r U R' U' r' F R" },
            { source: "Альтернатива", alg: "x' R U' R' D R U R' D' x" }
        ],
        image: "./files/oll3.gif" 
    },
    { 
        id: 4, 
        group: "Подняты все боковушки", 
        name: "Рыбка По часовой", 
        algs: [
            { source: "Основной", alg: "R U R' U R U2 R'" }
        ],
        image: "./files/oll4.gif" 
    },
    { id: 5, group: "Подняты все боковушки", name: "Рыбка обратная", algs: [{ alg: "R U2 R' U' R U' R'" }], image: "./files/oll5.gif" },
    { id: 6, group: "Подняты все боковушки", name: "Вертолёт", algs: [{ alg: "R U2 R2' U' R2 U' R2' U2 R" }], image: "./files/oll6.gif" },
    { id: 7, group: "Подняты все боковушки", name: "Двойные глаза", algs: [
{ alg: "(R U2 R' U') (R U R' U') R U' R'" },
{ alg: "F (R U R' U') (R U R' U') (R U R' U') F'" },
{ alg: "R U R' U R U' R' U R U2 R'" }
], image: "./files/oll7.gif" },
    { id: 8, group: "Углы правильно ориентированы", name: "Воздушный змей", algs: [{ alg: "Rw U R' U' M U R U' R'" }], image: "./files/oll8.gif" },
    { id: 9, group: "Углы правильно ориентированы", name: "Буква Н", algs: [{ alg: "(R U R' U') M' U R U' r'" }], image: "./files/oll9.gif" },
    { id: 10, group: "Углы правильно ориентированы", name: "Снежинка", algs: [{ alg: "M U (R U R' U') M2' U R U' r'" }], image: "./files/oll10.gif" },
    { id: 11, group: "Ни одна боковушка не поднята", name: "Точка в коридоре", algs: [{ alg: "R U2' (R2' F R F') U2' (R' F R F')" }], image: "./files/oll11.gif" },
    { id: 12, group: "Ни одна боковушка не поднята", name: "Точка с блоком", algs: [{ alg: "y F (R U R' U') F' f (R U R' U') f'" }], image: "./files/oll12.gif" },
    { id: 13, group: "Ни одна боковушка не поднята", name: "", algs: [{ alg: "(f (R U R' U') f') U' (F (R U R' U') F')" }], image: "./files/oll13.gif" },
    { id: 14, group: "Ни одна боковушка не поднята", name: "", algs: [{ alg: "(f (R U R' U') f') U (F (R U R' U') F')" }], image: "./files/oll14.gif" },
    { id: 15, group: "Ни одна боковушка не поднята", name: "Миккимаус с бакенбардами", algs: [{ alg: "M U (R U R' U') M' (R' F R F')" }], image: "./files/oll15.gif" },
    { id: 16, group: "Ни одна боковушка не поднята", name: "Миккимаус с бородой", algs: [
            { source: "Основной", alg: "y R U2 (R2' F R F') U2 Rw R' U R U' Rw'" },
            { source: "Альтернатива", alg: "Rw U R' U R U2' Rw2' U' RU' R' U2 Rw" }
], image: "./files/oll16.gif" },
    { id: 17, group: "Ни одна боковушка не поднята", name: "Диагональ", algs: [{ alg: "(R U R' U) (R' F R F') U2 (R' F R F')" }], image: "./files/oll17.gif" },
    { id: 18, group: "Буквы \"Т\"", name: "", algs: [{ alg: "(R U R' U') (R' F R F')" }], image: "./files/oll18.gif" },
    { id: 19, group: "Буквы \"Т\"", name: "", algs: [{ alg: "F (R U R' U') F'" }], image: "./files/oll19.gif" },
    { id: 20, group: "\"Пропеллеры\" или \"Zигзаги\"", name: "", algs: [{ alg: "L F' L' U' L U F U' L'" }], image: "./files/oll20.gif" },
    { id: 21, group: "\"Пропеллеры\" или \"Zигзаги\"", name: "", algs: [{ alg: "R' F (R U R' U') F' U R" }], image: "./files/oll21.gif" },
    { id: 22, group: "Скобки", name: "С точкой", algs: [{ alg: "(R U R2' U') (R' F) (R U) (R U') F'" }], image: "./files/oll22.gif" },
    { id: 23, group: "Скобки", name: "С 3-м блоком", algs: [{ alg: "R' U' (R' F R F') U R" }], image: "./files/oll23.gif" },
    { id: 24, group: "\"Палки\"", name: "", algs: [{ alg: "F (U R U' R') (U R U' R') F'" }], image: "./files/oll24.gif" },
    { id: 25, group: "\"Палки\"", name: "", algs: [{ alg: "R' F' U' F U' R U R' U R" }], image: "./files/oll25.gif" },
    { id: 26, group: "\"Палки\"", name: "", algs: [{ alg: "Rw U Rw' (U R U' R') (U R U' R') Rw U' Rw'" }], image: "./files/oll26.gif" },
    { id: 27, group: "\"Палки\"", name: "В коридоре", algs: [{ alg: "R U2 R2' U' R U' R' U2 F R F'" }], image: "./files/oll27.gif" },
    { id: 28, group: "\"Г-шки\"", name: "", algs: [
            { source: "Основной", alg: "F U R U' R2' F' R U R U' R'" },
            { source: "Альтернатива", alg: "Lw U' R' F' R U R' U' F U x" }
], image: "./files/oll28.gif" },
    { id: 29, group: "\"Г-шки\"", name: "", algs: [
            { source: "Основной", alg: "R' F R U R' F' R F U' F'" },
            { source: "Альтернатива", alg: "Rw' U L F L' U' L U F' U' x" }
], image: "./files/oll29.gif" },
    { id: 30, group: "\"Г-шки\"", name: "", algs: [{ alg: "(r U r') (R U R' U') (r U' r')" }], image: "./files/oll30.gif" },
    { id: 31, group: "\"Г-шки\"", name: "", algs: [{ alg: "(l' U' l) (L' U' L U) (l' U l)" }], image: "./files/oll31.gif" },
    { id: 32, group: "\"Мягкие знаки\"", name: "", algs: [{ alg: "F (U R U' R') F'" }], image: "./files/oll32.gif" },
    { id: 33, group: "\"Мягкие знаки\"", name: "", algs: [{ alg: "F' (U' L' U L) F" }], image: "./files/oll33.gif" },
    { id: 34, group: "\"Мягкие знаки\"", name: "", algs: [{ alg: "L U F' U' L' U L F L'" }], image: "./files/oll34.gif" },
    { id: 35, group: "\"Мягкие знаки\"", name: "", algs: [{ alg: "R' U' F U R U' R' F' R" }], image: "./files/oll35.gif" },
    { id: 36, group: "Буквы \"М\"", name: "", algs: [{ alg: "(R U R' U) (R U' R' U') (R' F R F')" }], image: "./files/oll36.gif" },
    { id: 37, group: "Буквы \"М\"", name: "", algs: [{ alg: "(L' U' L U') (L' U L U) (L F' L' F)" }], image: "./files/oll37.gif" },
    { id: 38, group: "\"Уголки\", \"Галки\", \"Стелсы\"", name: "С 3-м бл. слева", algs: [{ alg: "(r U) (R' U) (R U') (R' U) (R U2' r')" }], image: "./files/oll38.gif" },
    { id: 39, group: "\"Уголки\", \"Галки\", \"Стелсы\"", name: "С 3-м бл. справа", algs: [{ alg: "(l' U') (L U') (L' U) (L U') (L' U2 l)" }], image: "./files/oll39.gif" },
    { id: 40, group: "\"Уголки\", \"Галки\", \"Стелсы\"", name: "С 3-м и 2-м бл.", algs: [{ alg: "l' U l2 U' l2' U' l2 U l'" }], image: "./files/oll40.gif" },
    { id: 41, group: "\"Уголки\", \"Галки\", \"Стелсы\"", name: "С 3-м и 2-м бл.", algs: [{ alg: "r U' r2' U r2 U r2' U' r" }], image: "./files/oll41.gif" },
    { id: 42, group: "\"Уголки\", \"Галки\", \"Стелсы\"", name: "С 2-м блоом правым", algs: [{ alg: "F (R U R' U') (R U R' U') F'" }], image: "./files/oll42.gif" },
    { id: 43, group: "\"Уголки\", \"Галки\", \"Стелсы\"", name: "С 2-м блоом левым", algs: [{ alg: "F' (L' U' L U) (L' U' L U) F" }], image: "./files/oll43.gif" },
    { id: 44, group: "\"Квадраты\"", name: "", algs: [{ alg: "r U2 R' U' R U' r'" }], image: "./files/oll44.gif" },
    { id: 45, group: "\"Квадраты\"", name: "", algs: [{ alg: "l' U2' L U L' U l" }], image: "./files/oll45.gif" },
    { id: 46, group: "\"Молнии\"", name: "", algs: [{ alg: "Rw U R' U R U2' Rw'" }], image: "./files/oll46.gif" },
    { id: 47, group: "\"Молнии\"", name: "", algs: [{ alg: "Lw' U' L U' L' U2 Lw" }], image: "./files/oll47.gif" },
    { id: 48, group: "\"Молнии\"", name: "", algs: [
            { source: "Основной", alg: "M L' U' L U' L' U2 L U' M'" },
            { source: "Альтернатива", alg: "F (R U R' U') F' U F (R U R' U') F'" }
], image: "./files/oll48.gif" },
    { id: 49, group: "\"Молнии\"", name: "", algs: [
            { source: "Основной", alg: "M R U R' U R U2' R' U M'" },
            { source: "Альтернатива", alg: "F' (L' U' L U) F U' F' (L' U' L U) F" }
], image: "./files/oll49.gif" },
    { id: 50, group: "\"Галстуки\"", name: "", algs: [{ alg: "F R U' R' U' R U R' F'" }], image: "./files/oll50.gif" },
    { id: 51, group: "\"Галстуки\"", name: "", algs: [{ alg: "(R U2 R') (R' F R F') (R U2' R')" }], image: "./files/oll51.gif" },
    { id: 52, group: "\"Рюмки\"", name: "", algs: [{ alg: "(R U R' U) (R' F R F') (R U2' R')" }], image: "./files/oll52.gif" },
    { id: 53, group: "\"Рюмки\"", name: "", algs: [{ alg: "(L' U' L U') (L F' L' F) (L' U2 L)" }], image: "./files/oll53.gif" },
    { id: 54, group: "\"Петухи\"", name: "", algs: [{ alg: "(R U R' U R U2' R') F (R U R' U') F'" }], image: "./files/oll54.gif" },
    { id: 55, group: "\"Петухи\"", name: "", algs: [
            { source: "Основной", alg: "(L' U' L U' L' U2 L) F' (L' U' L U) F" },
            { source: "Альтернатива", alg: "(R' F R F') (R' F R F') (R U R' U') (R U R' U')" }
], image: "./files/oll55.gif" },
    { id: 56, group: "\"Петухи\"", name: "", algs: [{ alg: "(L' U' L U) L' U L F U F' L' U' L" }], image: "./files/oll56.gif" },
    { id: 57, group: "\"Петухи\"", name: "", algs: [{ alg: "(R U R' U') R U' R' F' U' F R U R'" }], image: "./files/oll57.gif" }
];
