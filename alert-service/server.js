//alice staunton - server.js - 21.04.26

const grpc = require("@grpc/grpc-js");
const protoLoader = require ("@grpc/proto-loader");


//load proto
const packageDef = protoLoader.loadSync("alert.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const alertPackage= grpcObject;

//bi-directional streaming
function alertStream(call) {
call.on("data", (request) => {
console.log("Client says: " + request.message);

//respond
call.write({
message: "Server recieved: " + request.message
});
});

call.on("end", () => {
call.end();
});
}

//creat server
const server = new grpc.Server();

server.addService(alertPackage.AlertService.service, {
AlertStream:alertStream
});

//start server
server.bindAsync(
"0.0.0.0:50053",
grpc.ServerCredentials.createInsecure(),
() => {
console.log("Alert Service running on port 50053");
server.start();
}
);


