var startTime = new Date(); //計測を開始した時間
var counting = false; //時間を計測しているかどうか?

var charInd = 0; //今打とうとしている文字のインデックス
var keyInd = 0; //今打とうとしているキーのインデックス

//打つべき全ての文字列
// var scriptChars = "漢直";
//chars.jsに保存

//打つべき全ての文字列 (@は文字区切り、#は外字)
//最後の文字の@を省略しないこと。
// var scriptKeys = "ymr@af@";
//keys.jsに保存

var dispCharHideSize = 0; //何文字先から見せるか
var dispCharWindowSize = 11; //何文字先まで見せるか

var dispChars = ""; //画面に表示する文字列
var dispKeys = ""; //画面に表示するキー
var typedCharNum = 0; //打った文字数
var typedRightKeyNum = 0; //正しく打ったキーの数
var typedWrongKeyNum = 0; //誤って打ったキーの数
//var charHist = "";
var keyHist = ""; //打ったキーの履歴
var errorRateGoal = 0.05; //(誤 / (正+誤))の目標
var dispKeyFlag = true; //ストロークを表示するかどうか
var lastClock = "" //直前に表示した時間
var typedRightKeySum = 0; // 今までに正しく打ったキーの合計
var charPerMinGoal = 120; // 文字/分の目標
var delimiter = " " //ストローク表示の区切り
var dispDelimiterFlag = true //ストローク表示に区切り文字を含めるか?
var stepwiseKeyboardFlag = true //キーボードの表示を階段状にする
var dispCharCount = 3 //何文字先のキーまで色をつけるか
var paintKeyFlag = false //キーをグラフィカルに表示するか?

function init(){
    keyInd = 0;
    charInd = 0;
    dispChars = ""
    dispKeys = ""
    typedCharNum = 0;
    typedRightKeyNum = 0;
    typedWrongKeyNum = 0;
    keyHist = "";
    typedRightKeySum = Number(getCookie("typedRightKeySum"));
}
function toggleStartStop(){
    if(counting){
        counting = false;
        init();
    }
    else{
        init();
        startTime = new Date();
        counting = true;
        dispChars = scriptChars.substring(0, dispCharHideSize+dispCharWindowSize-1);
        dispKeys = getDispKeys(scriptKeys);
    }
    if(paintKeyFlag){
        paintKeys();
    }
    paint();
}


function typeKey(evt){
    var kc;  //入力されたキーコードを格納する変数

    //入力されたキーのキーコードを取得
    if (document.all){
        kc = event.keyCode; //IE
    }
    else{
        //Chrome, FireFox
        //押したキーがA-Zかつシフトを押していないならば
        if(48 <= evt.which && evt.which <= 57){
            kc = evt.which;
        }
        else if (! evt.shiftKey && 65 <= evt.which && evt.which <= 90){
            kc = evt.which + 32;
        }
        //押したキーがA-Zかつシフトを押しているならば
        else if(evt.shiftKey && 65 <= evt.which && evt.which <= 90){
            kc = evt.which;
        }
        //","
        else if(! evt.shiftKey && evt.which == 188){
            kc = 44;
        }
        //"."
        else if(! evt.shiftKey && evt.which == 190){
            kc = 46;
        }
        //"/"
        else if(evt.which == 191){
            kc = 47;
        }
        //";"
        else if(evt.which == 186){
            kc = 59;
        }
        // " "
        else if(evt.which == 32){
            kc = 32;
        }
        //[
        else if(evt.which == 219){
            kc = 91;
        }
        //]
        else if(evt.which == 221){
            kc = 93;
        }
        //<
        else if(evt.shiftKey && evt.which == 188){
            kc = 60;
        }
        //>
        else if(evt.shiftKey && evt.which == 190){
            kc = 62;
        }
        //-
        //FireFoxではなくChromeだとevt.whichの値が変わるらしい
        else if(! evt.shiftKey && evt.which == 173){
            kc = 45;
        }
        else{
            kc = evt.which;
            //alert(evt.which)
        }
    }

    //Esc
    if(kc == 27){
        toggleStartStop();
        return
    }

    if(counting){
        if (evt.shiftKey && evt.which == 16){
            //シフトキーのみを押した場合は、状態の更新を行わない
            //状態の更新を行うと、誤打と見なされる
        }
        else{
            update(kc);
        }
        if(dispKeys == ""){
            finish();
        }
        else{
            if(paintKeyFlag){
                paintKeys()
            }
            paint();
        }
    }
}



//入力されたキーコードを引数にとって、状態を更新する
function update(kc){
    if(kc == scriptKeys.charCodeAt(keyInd)){
        typedRightKeyNum += 1;
        keyInd += 1;


        //次のkeyが'@'のとき、文字をずらす
        //whileを使っているのは、ローマ字入力などのときに@が連続することがあるため。
        while(scriptKeys[keyInd] == delimiter){


            typedCharNum += 1;
            charInd += 1;
            keyInd += 1;

            //次のkeyが'#'(外字)のとき、さらに文字をずらす
            //whileにしているのは、外字が連続したときのため
            while(scriptKeys[keyInd] == '#'){
                typedCharNum += 0;
                charInd += 1
                keyInd += 2; //#の後の@のぶんも増やす
            }
        }

        dispChars = "";
        var i = 0;
        for(i=0;i<dispCharHideSize*3;i++){
            dispChars += " ";
        }
        dispChars += scriptChars.substring(charInd+dispCharHideSize, charInd+dispCharHideSize+dispCharWindowSize);
        dispKeys = getDispKeys(scriptKeys)
    }
    else{
        typedWrongKeyNum += 1;
    }
}

function getDispKeys(scriptKeys){
    var regex = new RegExp(delimiter, "g")

    if(dispDelimiterFlag){
        return scriptKeys.substring(keyInd, scriptKeys.Length)
    }
    else{
        return scriptKeys.substring(keyInd, scriptKeys.Length).replace(regex, "");
    }
}

function finish(){
    paint();
    counting = false;
    saveData();
}



function saveData(){
    var expp = new Date();
    expp.setTime(expp.getTime() + 1000*60*60*24*1000);

    document.cookie = "typedRightKeySum=" + escape(typedRightKeySum + typedRightKeyNum)+ ";expires=" + expp.toGMTString();

    // alert("保存しました。");
}


//コピペ
function getCookie(name){
    var result = null;

    var cookieName = name + '=';
    var allcookies = document.cookie;

    var position = allcookies.indexOf( cookieName );
    if( position != -1 )
    {
        var startIndex = position + cookieName.length;

        var endIndex = allcookies.indexOf( ';', startIndex );
        if( endIndex == -1 )
        {
            endIndex = allcookies.length;
        }

        result = decodeURIComponent(
            allcookies.substring( startIndex, endIndex ) );
    }

    return result;
}



function toggleDispKey(){
    dispKeyFlag = ! dispKeyFlag
    if(counting){
        paint()
    }
}

function togglePaintKey(){
    paintKeyFlag = ! paintKeyFlag
    if(counting){
        paint()
    }
}




function clock(){
    if (counting){
        lastClock = ((new Date() - startTime) / 1000).toFixed(1);
        document.getElementById('timerInput').value=lastClock;

        //目標の描画
        document.getElementById('charPerMinGoalMeter').value = typedCharNum - (charPerMinGoal * lastClock / 60.0);
        paint();
    }
    else{
        document.getElementById('timerInput').value=lastClock;
    }

    setTimeout("clock();",100);
}

function paintKeyboard(){
    var canvas = document.getElementById('keyboradCanvas')
    if(canvas.getContext){
        var context = canvas.getContext('2d')
        //context.globalAlpha = 1.0 //透過度
        context.fillStyle = "rgb(0, 0, 0)"
        context.font = "30pt Arial"
        context.textBaseline = "middle"
        context.textAlign = "center"


        origX = 100 //左キーボードの左上のX座標
        origY = 10 //左キーボードの左上のY座標
        sqLen = 60 //キーの大きさ
        margin = sqLen/4 //左キーボードと右キーボードの間隔

        //左キーボード描画
        for(xind=0;xind<5;xind++){
            for(yind=0;yind<4;yind++){
                if(stepwiseKeyboardFlag){
                    X = origX + sqLen*xind + (sqLen/2)*yind
                    Y = origY + sqLen*yind
                    context.strokeRect(X ,Y ,sqLen,sqLen)
                }
                else{
                    context.strokeRect(origX + sqLen*xind,origY + sqLen*yind,sqLen,sqLen)
                }
            }
        }

        //ホームポジションの描画(fjキーを強調)
        if(stepwiseKeyboardFlag){
            eps = 2
            context.strokeRect(origX + sqLen * 5 + margin + 1*sqLen + sqLen+ eps ,origY + 2*sqLen + eps ,sqLen-eps*2,sqLen-eps*2)
            context.strokeRect(origX + sqLen*3+ sqLen +eps  ,origY + sqLen*2+ eps,sqLen-eps*2,sqLen-eps*2)}
        else{
            eps = 2
            context.strokeRect(origX + sqLen * 5 + margin + 1*sqLen + eps ,origY + 2*sqLen + eps ,sqLen-eps*2,sqLen-eps*2)
            context.strokeRect(origX + sqLen*3+eps,origY + sqLen*2+eps,sqLen-eps*2,sqLen-eps*2)
        }

        //右キーボード描画
        for(xind=0;xind<5;xind++){
            for(yind=0;yind<4;yind++){
                X = origX + sqLen * 5 + margin + xind*sqLen
                Y = origY + yind*sqLen

                if(stepwiseKeyboardFlag){
                    context.strokeRect(X+(sqLen/2)*yind ,Y ,sqLen,sqLen)
                }
                else{
                    context.strokeRect(X ,Y ,sqLen,sqLen)
                }
            }
        }

        //スペースキー描画
        if(stepwiseKeyboardFlag){
            context.strokeRect(origX + sqLen*3 + sqLen*3/2,origY + sqLen*4 ,sqLen*4+margin,sqLen)
        }
        else{
            context.strokeRect(origX + sqLen*3,origY + sqLen*4 ,sqLen*4+margin,sqLen)
        }

        //シフトキー描画
        if(stepwiseKeyboardFlag){
            context.strokeRect(origX - sqLen*2 + sqLen*3/2,origY + sqLen*3 ,sqLen*2, sqLen)
        }
        else{
            context.strokeRect(origX - sqLen*2,origY + sqLen*3 ,sqLen*2, sqLen)
        }


        leftKeyboardChars = ["12345", "qwert", "asdfg", "zxcvb"]
        rightKeyboardChars = ["67890", "yuiop", "hjkl;", "nm,./"]

        xdf = 22 //文字のX軸補正
        ydf = 28 //文字のY軸補正

        //左キーボードの文字描画
        for(xind=0;xind<5;xind++){
            for(yind=0;yind<4;yind++){
                if(stepwiseKeyboardFlag){
                    context.fillText(leftKeyboardChars[yind][xind], origX+sqLen*xind+xdf+sqLen/2*yind, origY+sqLen*yind+ydf)
                }
                else{
                    context.fillText(leftKeyboardChars[yind][xind], origX+sqLen*xind+xdf, origY+sqLen*yind+ydf)
                }
            }
        }

        //右キーボードの文字描画
        for(xind=0;xind<5;xind++){
            for(yind=0;yind<4;yind++){
                if(stepwiseKeyboardFlag){
                    context.fillText(rightKeyboardChars[yind][xind], origX+sqLen*(5+xind)+xdf+margin+sqLen/2*yind, origY+sqLen*yind+ydf)
                }
                else{
                    context.fillText(rightKeyboardChars[yind][xind], origX+sqLen*(5+xind)+xdf+margin, origY+sqLen*yind+ydf)
                }
            }
        }

        //シフトキーの文字描画
        if(stepwiseKeyboardFlag){
            context.fillText("shift", origX-sqLen*2+xdf+30+sqLen/2*3, origY+sqLen*3+ydf)
        }
        else{
            context.fillText("shift", origX-sqLen*2+xdf+30, origY+sqLen*3+ydf)
        }

    }
}

function paintKeys(){
    var canvas = document.getElementById('keyboradCanvas')
    if(canvas.getContext){
        var context = canvas.getContext('2d')

        context.clearRect(0,0,canvas.width, canvas.height)
        paintKeyboard()

        //context.globalAlpha = 1.0 //透過度
        context.font = "30pt Arial"
        context.textBaseline = "middle"
        context.textAlign = "center"

        //特定のキーに色を塗る
        var regex = new RegExp(delimiter, "g")
        tmp = scriptKeys.substring(keyInd, scriptKeys.Length).replace(regex, delimiter).split(delimiter)

        if(dispCharCount > tmp.length){
            dispCharCount = tmp.length
        }
        for(i=dispCharCount-1;i>=0;i--){
            paintStroke(tmp[i], i)
        }
    }
}

//cnt打後に打つstrに色を付ける
function paintStroke(str, cnt){
    var i = 0
    for(i=0; i<str.length; i++){
        paintKey(str[i], cnt, i)
    }
}

function paintKey(ch, cnt0, charCnt){
    var canvas = document.getElementById('keyboradCanvas')
    if(canvas.getContext){
        var context = canvas.getContext('2d')

        keys = "1234567890qwertyuiopasdfghjkl;zxcvbnm,./"
        //context.globalAlpha = 1.0

        if((ch != ch.toLowerCase()) && charCnt == 0){
            //シフトキー
            context.fillStyle = "rgb(255, 0, 0)"
            if(stepwiseKeyboardFlag){
                context.rect(origX-sqLen*2+sqLen/2*3, origY+sqLen*3, sqLen*2, sqLen)
            }
            else{
                context.rect(origX-sqLen*2, origY+sqLen*3, sqLen*2, sqLen)
            }
        }

        ind = keys.indexOf(ch.toLowerCase())

        if(ind == -1){
            if(ch == ' '){
                //スペースキー
                if(stepwiseKeyboardFlag){
                    context.rect(origX+sqLen*3+sqLen/2*3, origY+sqLen*4, sqLen*4+margin, sqLen)
                }
                else{
                    context.rect(origX+sqLen*3, origY+sqLen*4, sqLen*4+margin, sqLen)
                }
            }
        }
        else{
            yinnnnd = Math.floor(ind / 10)
            xinnnd = ind % 10
            X = 0
            if(xinnnd >= 5){
                X = origX+sqLen*xinnnd+margin
            }
            else{
                X = origX+sqLen*xinnnd
            }
            Y = origY+sqLen*yinnnnd
            if(stepwiseKeyboardFlag){
                context.rect(X+sqLen/2*yinnnnd, Y, sqLen, sqLen)
            }
            else{
                context.rect(X, Y, sqLen, sqLen)
            }
        }

        if(cnt0 == 0){
            if(charCnt == 0){
                context.fillStyle = "rgb(255, 0, 0)"
            }
            else{
                context.fillStyle = "rgb(178, 34, 34)"
            }
        }
        else if(cnt0 == 1){
            if(charCnt == 0){
                context.fillStyle = "rgb(0, 0, 255)"
            }
            else{
                context.fillStyle = "rgb(30, 144, 255)"
            }
        }
        else{
            if(charCnt == 0){
                context.fillStyle = "rgb(0, 255, 0)"
            }
            else{
                context.fillStyle = "rgb(50, 205, 50)"
            }
        }

        context.fill()
        context.beginPath()
        context.closePath()
    }
}


function paint(){
    document.getElementById('dispCharInput').value = dispChars

    if(dispKeyFlag){
        document.getElementById('dispKeyInput').value = dispKeys
    }
    else{
        document.getElementById('dispKeyInput').value = ""
    }

    document.getElementById('charPerMinInput').value = (typedCharNum *  60.0 * 1000 / (new Date() - startTime)).toFixed(0) + " 文字/分"
    document.getElementById('keyPerMinInput').value = (typedRightKeyNum *  60.0 * 1000 / (new Date() - startTime)).toFixed(0) + " 打鍵/分"
    document.getElementById('meanStrokeInput').value = "平均 " + ((typedRightKeyNum *  60.0 * 1000 / (new Date() - startTime)) / (typedCharNum *  60.0 * 1000 / (new Date() - startTime))).toFixed(2) + "打鍵/文字"
    document.getElementById('typedWrongKeyRateInput').value = "誤り率 " + (typedWrongKeyNum / (typedRightKeyNum + typedWrongKeyNum) * 100).toFixed(1) + " % (" + typedWrongKeyNum + " / " + (typedRightKeyNum + typedWrongKeyNum) + ")";
    var renzokuRight = (((typedWrongKeyNum * (1.0 - errorRateGoal) + 1) / errorRateGoal) - typedRightKeyNum).toFixed(0);
    var renzokuWrong = (typedRightKeyNum * errorRateGoal / (1.0 - errorRateGoal) - typedWrongKeyNum).toFixed(2);
    var next = (typedWrongKeyNum + 1) / (typedRightKeyNum + typedWrongKeyNum + 1)
    if(next <= errorRateGoal){
        document.getElementById('errorRateGoalMeter').value = renzokuWrong;
    }
    else{
        document.getElementById('errorRateGoalMeter').value = -renzokuRight;
    }
    document.getElementById('typedRightKeySumInput').value ="総打鍵数 " + (typedRightKeySum + typedRightKeyNum);

    // leftTBL.rows[0].cells[0].innerText = "○";
}
