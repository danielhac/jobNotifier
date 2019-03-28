module.exports = (results) => {
    return new Promise((resolve, reject) => {
        try {
            let newJobsHtml = '';

            if(results.newJobs[0]) {
                newJobsHtml =
                    '<b>Query must match:</b> "' + results.searchQueries[0] + '"' +
                    '<br><b>And also must match one of the following:</b> "' + results.searchQueries[1] + '", "' + results.searchQueries[2] + '", "' + results.searchQueries[3] + '"' +
                    '<br><h3>Yo! New jobs found between yesterday and today!</h3>';
                for (let i = 0; i < results.newJobs.length; i++) {
                    newJobsHtml +=
                        '<br><b>Id: </b>' + results.newJobs[i].id +
                        '<br><b>Job: </b>' + results.newJobs[i].job +
                        '<br><b>Date: </b>' + results.newJobs[i].date +
                        '<br><b>URL: </b> https://careers.pge.com' + results.newJobs[i].url + '<br>';
                }
                newJobsHtml += '<br><br> <h3>Other past listings that match search query</h3>';
                for (let j = 0; j < results.searchResults.length; j++) {
                    let exists = false;
                    for (let k = 0; k < results.newJobs.length; k++) {
                        if(results.newJobs[k].id == results.searchResults[j].id) {
                            exists = true;
                        }
                    }
                    if(!exists) {
                        newJobsHtml +=
                            '<br><b>Id: </b>' + results.searchResults[j].id +
                            '<br><b>Job: </b>' + results.searchResults[j].job +
                            '<br><b>Date: </b>' + results.searchResults[j].date +
                            '<br><b>URL: </b> https://careers.pge.com' + results.searchResults[j].url + '<br>';
                    }
                }
            } else {
                newJobsHtml = '<h3>No new jobs but current open listings that match search query</h3><br>';
                for (let i = 0; i < results.searchResults.length; i++) {
                    newJobsHtml +=
                        '<br><b>Id: </b>' + results.searchResults[i].id +
                        '<br><b>Job: </b>' + results.searchResults[i].job +
                        '<br><b>Date: </b>' + results.searchResults[i].date +
                        '<br><b>URL: </b> https://careers.pge.com' + results.searchResults[i].url + '<br>';
                }
            }
            results.newJobs = [];
            resolve(newJobsHtml);
        } catch (err) {
            console.log(err);
            reject(new Error(JSON.stringify(err)));
        }


    });
};