// // const mail = require('./mail');
//
// const request = require('request');
// const cheerio = require('cheerio');
//
// let searchResults = [];
// let newJobs = [];
// const searchQueries = ['intern', 'developer', 'software', 'data'];
// const url = 'https://careers.pge.com/search/';
// let count = 0;
// let lastPage;
//
// module.exports = (page) => {
//
//     let checkCurrent = (jobid) => {
//         for (let i = 0; i < searchResults.length; i++) {
//             if(searchResults[i].id == jobid) {
//                 return false;
//             }
//         }
//         return true;
//     };
//
//     let visitPage = async (page) => {
//         return new Promise((resolve, reject) => {
//
//
//             try {
//                 request(url + page, (error, response, html) => {
//                     if (!error && response.statusCode == 200) {
//                         const $ = cheerio.load(html);
//
//                         $('.data-row .hidden-phone a').each((i, elem) => {
//                             const job = $(elem).text().toLowerCase();
//
//                             if (job.includes(searchQueries[0]) && (job.includes(searchQueries[1]) || job.includes(searchQueries[2]) || job.includes(searchQueries[3]))) {
//                                 const id = $(elem).attr('href').split('/')[3];
//
//                                 if (checkCurrent(id) === true) {
//                                     const pageUrl = $(elem).attr('href');
//                                     const date = $(elem).closest('.data-row').find('.colDate').find('.jobDate').text().replace(/\s\s+/g, '');
//                                     let jobData = {
//                                         id: id,
//                                         job: job,
//                                         date: date,
//                                         url: pageUrl
//                                     };
//                                     searchResults.push(jobData);
//                                 }
//                             }
//                         });
//
//                         let nextPage = $('.pagination-top').find('.active').next().find('a').attr('href');
//                         count++;
//                         if ((lastPage != nextPage) && (count < 10)) {
//                             lastPage = nextPage;
//                             console.log('Visiting page ' + count);
//                             visitPage(nextPage);
//                             // remove below, just testing for now
//                             // resolve({searchResults, newJobs});
//                         } else {
//                             // getjob.checkDate(searchResults, newJobs);
//                             count = 0;
//                             console.log('done visitPage');
//                             resolve({searchResults, newJobs});
//                         }
//                     }
//                 });
//             } catch (err) {
//                 console.log(err);
//                 reject(new Error(JSON.stringify(err)));
//             }
//         });
//     }
// };
