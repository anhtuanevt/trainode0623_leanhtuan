const http = require('http');
const fs = require('fs');

const onRequest = (_,res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  fs.readFile('./hello.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.end('Error reading HTML file');
      return;
    }

    res.end(data);
  });
};

http.createServer(onRequest).listen(3000, () => {
  console.log('Server is running on port 3000');
});

