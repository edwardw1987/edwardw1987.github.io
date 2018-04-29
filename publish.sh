#!/bin/sh
curdir=$(cd `dirname $0`; pwd) 
rootdir=$curdir/../;
src=$root/dev/_site/*
dest=$root/master

cp -r $src $dest;
cd $dest;
git add --all;
git commit -m "publish at $(date +%Y%m%d%H%M%S)";
git push origin master;
