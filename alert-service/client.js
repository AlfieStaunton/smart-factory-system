//alice staunton - server.js - 21.04.26

const grpc = require("@grpc/grpc-js");
const protoLoader = require ("@grpc/proto-loader");
const readline = require("readline");


//load proto
const packageDef = protoLoader.loadSync("alert.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const alertPackage= grpcObject;

//create client
const client = new alertPackage.AlertService(
"localhost:50053",
grpc.credentials.createInsecure()
);

//ctreate stream
const call = client.AlertStream();

//listen for responses from server
call.on("data", (response) => {
console.log("Server: ", response.message);
});


call.on("end", () => {
console.log("Connection closed");

});

//user input from terminal
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

console.log("Type a Message or type 'exit' to quit");

rl.on("line", (input) => {
if(input === "exit") {
call.end();
rl.close();
return;
}

//send meassage to server
call.write({message: input});
});




