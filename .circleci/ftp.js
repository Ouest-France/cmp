var ftp = require('ftp-deploy');
var ftp = new ftp();

ftp.deploy({
    user: process.env.FTP_USER,
    password: process.env.FTP_PWD,
    host: process.env.FTP_HOST,
    port: 21,
    localRoot: __dirname + "/../dist/",
    remoteRoot: "/sipaof/" + process.env.FTP_ENV,
    include: [
        '*'
    ],
    exclude: []
}, function(err) {
    if (err) console.log(err)
    else console.log('finished :)');
});
