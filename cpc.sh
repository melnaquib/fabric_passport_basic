cp -rp ~/.composer .

chmod -R a+rw .composer
find .composer -type d -exec chmod a+x {} +

