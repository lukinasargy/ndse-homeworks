#!/usr/bin/env node
const readline = require("readline");
const maxNumber = 100;
const number = Math.round(Math.random() * maxNumber);

const input = readline.createInterface(process.stdin);
console.log(`Загадано число в диапазоне от 0 до ${maxNumber}`);

input.on("line", (data) => {
    if (data > maxNumber) {
        console.log(`Введите число в диапазоне от 0 до ${maxNumber}`);
    } else if (data > number) {
        console.log("Меньше");
    } else if (data < number) {
        console.log("Больше");
    } else if (Number(data) === number) {
        console.log(`Отгадано число ${number}`);
        input.close();
    } else {
        console.log("Пожалуйста, введите число");
    }
});
