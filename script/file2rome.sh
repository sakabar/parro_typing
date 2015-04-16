#!/usr/local/bin/zsh

mecab -d ~/local/lib/mecab/dic/ipadic-utf8 | tr '\t' ',' | awk -F, '
{
  #未定義語のとき
  if ($9 == "" && $0 != "EOS"){
    print $1"\t"$1
  }
  else if ($0 == "EOS"){

  }
  else{
    print $1"\t"$9
  }
}
'| while read line; do
    surf=`echo $line | awk '{print $1}' | nkf -e | kakasi -KH -i euc -o utf-8 | nkf -w`
    read=`echo $line | awk '{print $2}' | nkf -e | kakasi -KH -i euc -o utf-8 | nkf -w`

    if [ $surf = $read ]; then
      echo $read | grep -o . | tr '\n' '@'
      echo ""
    else
      len=`echo $surf | grep -o . | wc -l | grep -o "[0-9]\+"`
      echo -n $read
      for i in `seq $len`; do
        echo -n "@"
      done
    fi
  done | sed -e 's/\(@\+\)\([ゃゅょぁぃぅぇぉ]\)/\2\1/g' |  sed -e 's/っ\(@\+\)/\1っ/g'| tr '「' '[' | tr '」' ']' | tr -d '\n' | nkf -e | kakasi -Ka -Ha -Ea -i euc -o utf-8 | nkf -w | sed -e 's/(kigou)/#/g' | sed -e 's/tsu/tu/g' | sed -e 's/shi/si/g' | sed -e 's/chi/ti/g' | tr '^' '-' | tr -d "'" | sed -e 's/n\([^aiueo]\)/nn\1/g' | sed -e 's/@@$/@/'
#行未に@が余分に出現するので、消す。

#tan'iのような場合はどうなっている?
#たんい→たん+い だから回避できているが…?
