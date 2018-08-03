var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var config = {
    username: process.env.FTP_USER,
    password: process.env.FTP_PWD,
    host: process.env.FTP_HOST,
    port: 21,
    localRoot: __dirname + "/../dist/",
    remoteRoot: "/sipaof/sipacmp",
    include: [
        'index.html',
        'js/sipa-cmp.min.js',
        'js/sipa-cmp.stub.min.js',
    ]
}
console.log(config)
ftpDeploy.deploy(config, function(err) {
    if (err) console.log(err)
    else console.log('finished');
});
