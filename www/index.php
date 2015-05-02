<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">
  <head>
    <title>ぱろタイ</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="Content-Style-Type" content="text/css" />
    <meta http-equiv="Content-Script-Type" content="text/javascript" />
    <meta name="copyright" content="Nikukyu-Punch" />
    <link rel="shortcut icon" href="favicon.ico" />
    <meta name="description" content="ぱろタイは、写経を通してタイピングスキルを向上させることを目的とするゲームです" />
    <meta name="keywords" content="ぱろタイ,ぱろタイピング,parro_typing,parro,typing" />
    <link href="/parro_typing/style.css" rel="stylesheet" type="text/css" />
  </head>


  <body>


    <div id="container">


      <div id="main">


        <div id="header">
          <h1>ぱろタイは、写経を通してタイピングスキルを向上させることを目的とするゲームです</h1>
        </div>
        <!--/header-->


        <div class="mainbox">

          <h2>はじめに</h2>
          <p>ぱろタイ (parro typing) にようこそ。ぱろタイはタイピングの練習をするためのソフトウェアです。現在、サンプルとして夏目漱石の「坊っちゃん」を課題文としていますが、後々はユーザが好きな文を課題文として設定できるようにする予定です。FireFox以外、動作を検証していません。</p>

          <h2>遊び方</h2>
          <ol>
            <li>開始/終了ボタンを押します</li>
            <li>課題文とそのキーストローク(アルファベット)が表示されます</li>
            <li>表示された通りにキーを押しましょう</li>
            <li>タイピングのスピードなどの情報が下部に表示されます。</li>
          </ol>

          <h2>What's New</h2>
          <dl class="new">
            <dt>2015/05/01</dt>
            <dd>ディレクトリマップを作成</dd>
            <dt>2015/04/28</dt>
            <dd>CSSテンプレートを導入</dd>
            <dt>2015/04/17</dt>
            <dd>最初の限定公開</dd>
          </dl>

          <h2>TODO</h2>
          <ul>
	    <li>サイトのデザインに関して</li>
	    <ul>
	      <li>ロゴの作成(SAMPLE WEBSITEのままじゃダメ)</li>
	    </ul>
            <li>入力に関する挙動</li>
            <ul>
              <li>バックスペースによる取り消し</li>
              <li>スペースキーによる模擬変換</li>
              <li>エンターキーによる模擬確定</li>
            </ul>
            <li>ログイン関係</li>
            <ul>
              <li>ログイン機能の実装</li>
              <li>ユーザごとの情報をDBに保存</li>
            </ul>
            <li>キーボード</li>
            <ul>
              <li>ローマ字のカスタマイズ(chi/tiの打ち分けなど)</li>
              <li>Dvorak</li>
              <li>JISかな</li>
              <li>T-Code</li>
              <li>TUT-Code</li>
            </ul>
            <li>ブラウザ</li>
            <ul>
              <li>Google Chromeでの検証</li>
            </ul>
            <li>分析</li>
            <ul>
              <li>苦手なキーの分析機能</li>
            </ul>
            <li>課題文</li>
            <ul>
              <li>ユーザによる課題文の設定に対応</li>
            </ul>
            <li>SNS連携</li>
            <ul>
              <li>ツイート機能</li>
            </ul>
          </ul>

        </div>
        <!--/mainbox-->

      </div>
      <!--/main-->


      <div id="side">

        <a href="index.php"><img src="images/logo.gif" alt="SAMPLE WEBSITE" name="logo" width="200" height="140" id="logo" /></a><br />

        <ul class="menu">
          <li><a href="index.php">サイトTOP</a></li>
          <li><a href="app/index.php">ゲームTOP</a></li>
          <li><a href="about.php">about</a></li>
          <li><a href="signup.html">新規登録</a></li>
          <li><a href="login.html">ログイン</a></li>
          <li><a href="link.html">link</a></li>
        </ul>

      </div>
      <!--/side-->


      <div id="footer">
        Copyright&copy; 2015- ぱろタイ All Rights Reserved.<br />
        <a href="http://nikukyu-punch.com/" target="_blank">Template design by Nikukyu-Punch</a>
      </div>
      <!--/footer-->


    </div>
    <!--/container-->


  </body>
</html>
