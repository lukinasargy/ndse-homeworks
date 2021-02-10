#!/usr/bin/env node
const readline = require("readline");
const fs = require("fs");
const path = require("path");

const maxNumber = 1;
const number = 1 + Math.round(Math.random() * maxNumber);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
console.log("Введите название файла");
let fileName = "defaultLog.txt";
rl.on("line", (data) => {
    fileName = data.toString();
    if (!!fileName) {
        const file = path.join(__dirname, fileName);
        rl.question("угадайте число 1 или 2:", (answer) => {
            if (Number(answer) === number) {
                console.log(`Вы угадали!`);
                logResult("win", file);
                rl.close();
            } else {
                console.log(`Вы не угадали :(`);
                logResult("lose", file);
                rl.close();
            }
        });
    }
});
const logResult = (result, file) => {
    fs.appendFile(file, `${result}\n`, (err) => {
        if (err) throw new Error(err);
    });
};
