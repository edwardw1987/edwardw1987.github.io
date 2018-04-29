#!/bin/sh
curdir=$(cd `dirname $0`; pwd) 
cd $curdir/..;
rootdir=$(pwd);
src=$rootdir/dev/_site/*
dest=$rootdir/master

cp -r $src $dest;
cd $dest;
git add --all;
git commit -m "publish at $(date +%Y%m%d%H%M%S)";
git push origin master;
