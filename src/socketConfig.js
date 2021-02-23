import openSocket from 'socket.io-client';
const ENDPOINT = "http://localhost:5000";
console.log('this is starting of the point')
const socket = openSocket(ENDPOINT, { transports: ["websocket", "polling"] });

export default socket;
