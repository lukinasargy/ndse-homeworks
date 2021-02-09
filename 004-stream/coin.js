#!/usr/bin/env node
const readline = require("readline");
const fs = require('fs');
const maxNumber = 1;
const number = 1 + Math.round(Math.random() * maxNumber);

const input = readline.createInterface(process.stdin);
console.log(`Монета подкинута, орел - 1, решка - 2, угадайте число`);

input.on("line", (data) => {
    if (Number(data) === number) {
        console.log(`Вы угадали`);
        input.close();
    } else {
        console.log(`Вы не угадали`);
        input.close();
    }
});