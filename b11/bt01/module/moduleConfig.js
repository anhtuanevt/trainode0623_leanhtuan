showModule = () => {
    console.log("hello modle");
}

const hostname = '127.0.0.1';
const port = 3000;

module.exports = {
    show: showModule,
    host: hostname,
    port: port
}