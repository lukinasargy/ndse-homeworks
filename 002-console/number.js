#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv))
    .alias("y", "year")
    .option("year", {
        alias: "y",
        description: "year",
    })
    .option("month", {
        alias: "m",
        description: "month",
    })
    .option("date", {
        alias: "d",
        description: "date",
    }).argv;
