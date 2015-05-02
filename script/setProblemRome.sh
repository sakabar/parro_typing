#!/usr/local/bin/zsh

parroHome=$HOME/work/parro_typing

chars=`cat - | nkf -Z1 | sed -e 's/([^)]*)//g' | tr -d " #@/*―・%&'" | tr -d '\n'`
echo $chars > $parroHome/copy_sources/$1.script
echo 'var scriptChars = "'$chars'"' > $parroHome/www/js/chars.js

keys=`echo $chars | $parroHome/script/file2rome.sh | tr -d '\n'`
echo $keys > $parroHome/copy_sources/$1.rome
echo 'var scriptKeys = "'$keys'"' | tee $parroHome/www/js/keys.js


