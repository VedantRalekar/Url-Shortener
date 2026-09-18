const TOTAL_REQUESTS = 100000;
const CONCURRENCY = 1000;

const URL = "http://localhost/user/login";
//following routes to test
//http://localhost/
//http://localhost/url/shorten
//http://localhost/user/login
//http://localhost/user/register
//http://localhost/server-info

let nextRequest = 0;
let successful = 0;
let rateLimited = 0;
let clientErrors = 0;
let serverErrors = 0;
let failed = 0;

const start = Date.now();

async function worker() {
    while (true) {
        const requestId = nextRequest++;

        if (requestId >= TOTAL_REQUESTS) {
            return;
        }

        try {
            // const response = await fetch(URL);
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    email: "test@example.com",
                    password: "password123"
                })
            });

            // console.log("Status:", response.status);
            // console.log("Headers:", Object.fromEntries(response.headers));

            if (response.status >= 200 && response.status < 300) {
                successful++;
            } 
            else if (response.status === 429) {
                rateLimited++;
            } 
            else if (response.status >= 400 && response.status < 500) {
                clientErrors++;
            } 
            else if (response.status >= 500) {
                serverErrors++;
            }

            await response.arrayBuffer();

        } catch (error) {
            failed++;

            if (failed <= 10) {
                console.log("Request failed:", error.message);
            }

        }
    }
}

async function main() {
    console.log(`Starting load test`);
    console.log(`URL: ${URL}`);
    console.log(`Requests: ${TOTAL_REQUESTS}`);
    console.log(`Concurrency: ${CONCURRENCY}`);

    const workers = [];

    for (let i = 0; i < CONCURRENCY; i++) {
        workers.push(worker());
    }

    await Promise.all(workers);

    const duration = (Date.now() - start) / 1000;
    const rps = TOTAL_REQUESTS / duration;

    console.log("\n========== RESULT ==========");
    console.log(`Total requests : ${TOTAL_REQUESTS}`);
    console.log(`Successful (2xx) : ${successful}`);
    console.log(`Rate limited 429 : ${rateLimited}`);
    console.log(`Client errors    : ${clientErrors}`);
    console.log(`Server errors    : ${serverErrors}`);
    console.log(`Network failures : ${failed}`);
    console.log(`Time           : ${duration.toFixed(2)} seconds`);
    console.log(`Requests/sec   : ${rps.toFixed(2)}`);
    console.log("============================");
}

main();


