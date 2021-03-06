<html lang="ja">
  <head>
    <title>ぱろタイ</title>
    <meta name="robots" content="noindex, nofollow"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link rel="shortcut icon" href="/parro_typing/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="main.css" media="all"/>
    <script type="text/javascript" src="/parro_typing/js/chars.js"></script>
    <script type="text/javascript" src="/parro_typing/js/keys.js"></script>
    <script type="text/javascript" src="/parro_typing/js/parro_typing.js"></script>
  </head>
  <body onload="paintKeyboard()">
    <div style="padding: 10px; margin-bottom: 10px; border: 5px double #333333;">
      <input id="timerInput" type="text" value="" maxlength="0" size="3" style="text-align: center; "/><input id="typedRightKeySumInput" type="text" size="20" value="" maxlength="0" style="text-align: center; "/><br/>
      <button type="startButton" onclick="javascript:toggleStartStop();">開始/終了</button><button type="dispKeyButton" onclick="javascript:toggleDispKey();">キー表示</button><button type="paintKeyButton" onclick="javascript:togglePaintKey();">キー表示2</button><br/>
      <input id="dispCharInput" type="text" value="" maxlength="0" size="50"/><br/>
      <input id="dispKeyInput" type="text" value="" maxlength="0" size="50"/><br/>
      <canvas id="keyboradCanvas" height="350" width="1000">キーボードを表示するには、canvasタグをサポートしたブラウザが必要です</canvas><br/>
      <input type="text" value="スピード:" maxlength="0" size="5" style="text-align: right; border: none;" /><meter id="charPerMinGoalMeter" min="-10" max="10" high="0" low="-5" optimum="10">0</meter><br/>
      <input type="text" value="正確性:" maxlength="0" size="5" style="text-align: right; border: none;"/><meter id="errorRateGoalMeter" min="-45" max="5" high="0" low="-20" optimum="5">-45</meter><br/>
      <input id="charPerMinInput" type="text" size="20" value="" maxlength="0"/><input id="keyPerMinInput" type="text" size="20" value="" maxlength="0"/><br/>
      <!-- <input id="errorRateGoalInput" type="text" size="20" value="" maxlength="0"/> -->
      <input id="typedWrongKeyRateInput" type="text" size="20" value="" maxlength="0"/><input id="meanStrokeInput" type="text" size="20" value="" maxlength="0"/><br/>
    </div>

    <!-- このscriptタグはinputなどの要素より後ろに置く必要がある -->
    <script type="text/javascript" src="/parro_typing/js/body.js"></script>
  </body>
</html>
