// alfie staunton - gui.js - 24.04.25


const readline = require("readline");
const {exec} = require("child_process");

const rl = readline.createInterface({
input:process.stdin,
output: process.stdout
});

function menu() {
console.log("\n=== SMART FACTORY SYSTEM ===");
console.log("1. Machine Service");
console.log("2. Production Service");
console.log("3. Alert Service");
console.log("4. Exit");

rl.question("Choose an option: ", (answer) => {

if (answer === "1") {
console.log("Running Machine Client...");
exec("node ../machine-service/client.js")
}

else if (answer === "2") {
console.log("Running Production Client...");
exec("node ../production-service/client.js")
}

else if (answer === "3") {
console.log("Running Alert Client...");
exec("node ../alert-service/client.js")
}

else if (answer === "4") {
console.log("Exiting...");
rl.close();
return;
}
else{
console.log("Invalid option");
}

setTimeout(menu, 1000);
});
}

menu();