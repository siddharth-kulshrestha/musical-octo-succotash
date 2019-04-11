const request = require('request');
const constraints = require('./Configurations/constraints');
const is_formatted_url = require('./Utlities/utils');
let concurrency = require('./Utlities/concurrent_engine')
const _ = require('lodash/core');
const cheerio = require('cheerio');
const URL = require('url-parse');
const fs = require('fs');

const HYPERLINKS_HARVESTED = {};
const POSSIBLE_HYPERLINKS = [];
// const url = new URL(constraints.PROBLEM_URL);

// console.log(is_formatted_url);
// if ( is_formatted_url === true ) {
//     root_url_value = url => {
//         `{$url.protocol}"//"{$url.hostname}`   // "https://medium.com"
//     };

// } else console.log(`Error ${root_url_value} is not an URL`);

// let count_of_already_visited_links = 0;

// POSSIBLE_HYPERLINKS.unshift(constraints.PROBLEM_URL);

// complete_unique_list();

function hello(name) {
    for (var i=0; i<20; i++){
        console.log(`Hello ${name}`);
    }
}

concurrent_engine = new concurrency.ConcurrentEngine("new_engine_for_url_task")
console.log("adding tasks!")
concurrent_engine.addTask("hello", hello, "sid");
concurrent_engine.addTask("hello", hello, "ayush");
concurrent_engine.addTask("hello", hello, "aman");
concurrent_engine.addTask("hello", hello, "anamika");
concurrent_engine.addTask("hello", hello, "parth");
concurrent_engine.addTask("hello", hello, "cc");
concurrent_engine.start()
return 

function complete_unique_list() {
    // if (count_of_already_visited_links >= constraints.CONCURRENT_REQUESTS) {
    //     console.log("Reached max limit of number of pages to visit.");
    //     return;
    // }

    var nextPage = POSSIBLE_HYPERLINKS.pop();
    if (nextPage in HYPERLINKS_HARVESTED) {
        // We've already visited this page, so repeat the complete_unique_list
        complete_unique_list();
    } else {
        // New page we haven't visited
        visitPage(nextPage, complete_unique_list);
    }
}

function visitPage(url, callback) {
    // Add page to our set
    HYPERLINKS_HARVESTED[url] = true;
    count_of_already_visited_links++;

    // Make the request
    console.log("Visiting page " + url);
    request(url, function (error, response, body) {
        // Check status code (200 is HTTP OK)
        console.log("Status code: " + response.statusCode);
        if (response.statusCode !== 200) {
            callback();
            return;
        }
        var $ = cheerio.load(body);
        fetchingLinks($);
        // In this short program, our callback is just calling complete_unique_list()
        callback();
    });
}

function fetchingLinks($) {
    var relativeLinks = $("a[href^='/']");
    var absoluteLinks = $("a[href^='http']");
    console.log("Found " + relativeLinks.length + " relative links on page");
    console.log("Found " + absoluteLinks.length + "absolute links on page");
    relativeLinks.each(function () {
        POSSIBLE_HYPERLINKS.push(root_url_value + $(this).attr('href'));
        fs.appendFileSync('C:\\Users\\Mohit k\\WebstormProjects\\rentomojoFile.csv', (root_url_value + $(this).attr('href')) + '\n');
    });
    absoluteLinks.each(function () {
        POSSIBLE_HYPERLINKS.push($(this).attr('href'));
        fs.appendFileSync('C:\\Users\\Mohit k\\WebstormProjects\\rentomojoFile.csv', ($(this).attr('href')) + '\n');
    });
}

while (concurrentEngine.status != "completed" || concurrentEngine.status != "waiting") {

}
