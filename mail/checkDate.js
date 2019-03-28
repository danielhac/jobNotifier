const moment = require('moment');

module.exports = (searchResults, newJobs, searchQueries) => {
    return new Promise((resolve, reject) => {
        try {
            // Yesterdays date in local time - starting at 12am
            let rawYesterday = new Date().toISOString().replace(/T.+/, '');
            let yesterday = moment(rawYesterday).subtract(1, 'days');

            for (let i = 0; i < searchResults.length; i++) {
                // Jobs date - starting at 12:01
                let newJob = new Date(searchResults[i].date).toISOString();
                let newJobDate = moment(newJob).add(1, 'minute');
                let jobDateWithinYesterday = newJobDate.isAfter(yesterday);

                if(jobDateWithinYesterday) {
                    newJobs.push(searchResults[i]);
                }
            }
            resolve({
                searchResults: searchResults,
                newJobs: newJobs,
                searchQueries: searchQueries
            });
        } catch (err) {
            console.log(err);
            reject(new Error(JSON.stringify(err)));
        }

    });
};

