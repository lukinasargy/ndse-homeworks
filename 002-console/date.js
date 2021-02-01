#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv))
    .alias("y", "year")
    .option("year", {
        alias: "y",
        description: "Show current year",
    })
    .option("month", {
        alias: "m",
        description: "Show current month",
    })
    .option("date", {
        alias: "d",
        description: "Show current date",
    }).argv;

const currentDate = new Date();
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const showCurrentDate = () => {
    if (argv.year) {
        console.log(currentDate.getFullYear());
    }
    if (argv.month) {
        console.log(months[currentDate.getMonth()]);
    }
    if (argv.date) {
        console.log(currentDate.getDate());
    }
    if (!argv.year && !argv.month & !argv.date) {
        console.log(currentDate.toISOString());
    }
};
const changeDate = () => {
    const newDate = new Date();
    newDate.setDate(
        (cmd === "sub" ? -1 : 1) * (argv.date ? argv.date : 0) +
            newDate.getDate()
    );
    newDate.setMonth(
        (cmd === "sub" ? -1 : 1) * (argv.month ? argv.month : 0) +
            newDate.getMonth()
    );
    newDate.setFullYear(
        (cmd === "sub" ? -1 : 1) * (argv.year ? argv.year : 0) +
            newDate.getFullYear()
    );
    console.log(newDate.toISOString());
};
const cmd = argv._[0];
switch (cmd) {
    case "current":
        showCurrentDate();
        break;
    case "add":
    case "sub":
        changeDate();
        break;
    default:
        console.log(currentDate.toISOString());
}
