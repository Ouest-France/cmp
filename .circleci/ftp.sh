#!/bin/sh
HOST=${FTP_HOST}
USER=${FTP_USER}
PASSWD=${FTP_PWD}

cd ./dist
ftp -n $HOST <<END_SCRIPT
quote USER $USER
quote PASS $PASSWD
cd sipaof/sipacmp
put index.html
put js/sipa-cmp.min.js
put js/sipa-cmp.stub.min.js
quit
END_SCRIPT
exit 0
