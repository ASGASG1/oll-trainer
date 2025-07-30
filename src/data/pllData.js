export const pllData = [
    // Реберные PLL
    { id: "Ua", numId: 1, group: "U-пермутация (рёбра)", name: "Ua Perm", alg: "R U' R U R U R U' R' U' R2'", image: "./files/pll/Ua.gif" },
    { id: "Ub", numId: 2, group: "U-пермутация (рёбра)", name: "Ub Perm", alg: "R2 U R U R' U' R' U' R' U R'", image: "./files/pll/Ub.gif" },
    { id: "H", numId: 3, group: "H, Z-пермутации (рёбра)", name: "H Perm", alg: "M2' U M2' U2 M2' U M2'", image: "./files/pll/H.gif" },
    { id: "Z", numId: 4, group: "H, Z-пермутации (рёбра)", name: "Z Perm", alg: "M2' U M2' U M' U2 M2' U2 M' U2", image: "./files/pll/Z.gif" },

    // Угловые PLL
    { id: "Aa", numId: 5, group: "A-пермутация (углы)", name: "Aa Perm", alg: "x R' U R' D2 R U' R' D2 R2 x'", image: "./files/pll/Aa.gif" },
    { id: "Ab", numId: 6, group: "A-пермутация (углы)", name: "Ab Perm", alg: "x R2 D2 R U R' D2 R U' R x'", image: "./files/pll/Ab.gif" },
    { id: "E", numId: 7, group: "E-пермутация (углы)", name: "E Perm", alg: "R' U' R' D' R U' R' D R U R' D' R U R' D R2", image: "./files/pll/E.gif" },

    // Смешанные PLL (углы и ребра)
    { id: "T", numId: 8, group: "Смешанные пермутации", name: "T Perm (Буква Т)", alg: "R U R' U' R' F R2 U' R' U' R U R' F'", image: "./files/pll/T.gif" },
    { id: "F", numId: 9, group: "Смешанные пермутации", name: "F Perm (Параллель)", alg: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R", image: "./files/pll/F.gif" },
    { id: "Ja", numId: 10, group: "Смешанные пермутации", name: "Ja Perm (Лямбда)", alg: "L' U2 L U L' U2 R U' L U R'", image: "./files/pll/Ja.gif" },
    { id: "Jb", numId: 11, group: "Смешанные пермутации", name: "Jb Perm (Лямбда)", alg: "R U2 R' U' R U2 L' U R' U' L", image: "./files/pll/Jb.gif" },
    { id: "Ra", numId: 12, group: "Смешанные пермутации", name: "Ra Perm (Семерки)", alg: "F' R' U' R F' R' U F' U' F' U F R F2", image: "./files/pll/Ra.gif" },
    { id: "Rb", numId: 13, group: "Смешанные пермутации", name: "Rb Perm (Семерки)", alg: "F L U L' F L U' F U F U' F' L' F2", image: "./files/pll/Rb.gif" },
    { id: "V", numId: 14, group: "Смешанные пермутации", name: "V Perm (Тарелка)", alg: "L' U R U' L U L' U R' U' L U2 R U2 R'", image: "./files/pll/V.gif" },
    { id: "Y", numId: 15, group: "Смешанные пермутации", name: "Y Perm (Копьё)", alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'", image: "./files/pll/Y.gif" },
    { id: "Na", numId: 16, group: "Смешанные пермутации", name: "Na Perm (Буква X)", alg: "L U' R U2 L' U R' L U' R U2 L' U R' U'", image: "./files/pll/Na.gif" },
    { id: "Nb", numId: 17, group: "Смешанные пермутации", name: "Nb Perm (Буква X)", alg: "R' U L' U2 R U' L R' U L' U2 R U' L U", image: "./files/pll/Nb.gif" },

    // G-пермутации
    { id: "Ga", numId: 18, group: "G-пермутация (Восьмёрки)", name: "Ga Perm", alg: "R2 u R' U R' U' R u' R2 F' U F", image: "./files/pll/Ga.gif" },
    { id: "Gb", numId: 19, group: "G-пермутация (Восьмёрки)", name: "Gb Perm", alg: "D R' U' R U D' R2 U R' U R U' R U' R2", image: "./files/pll/Gb.gif" },
    { id: "Gc", numId: 20, group: "G-пермутация (Восьмёрки)", name: "Gc Perm", alg: "R2 U' R U' R U R' U R2 D' U R U' R' D", image: "./files/pll/Gc.gif" },
    { id: "Gd", numId: 21, group: "G-пермутация (Восьмёрки)", name: "Gd Perm", alg: "R U R' U' D R2 U' R U' R' U R' U R2 D'", image: "./files/pll/Gd.gif" },
];