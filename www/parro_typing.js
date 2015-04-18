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
        while(scriptKeys[keyInd] == " "){


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
    return scriptKeys.substring(keyInd, scriptKeys.Length).replace(regex, "");
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
    dispKeyFrag = ! dispKeyFrag
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


