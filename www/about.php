<?php
session_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">
  <head>
    <meta name="robots" content="noindex, nofollow"/>
    <title>ぱろタイとは</title>
    <link rel="shortcut icon" href="/parro_typing/favicon.ico" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="Content-Style-Type" content="text/css" />
    <meta http-equiv="Content-Script-Type" content="text/javascript" />
    <meta name="copyright" content="Nikukyu-Punch" />
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

          <h2>「ぱろタイ」でやること</h2>
          <p>「ぱろタイ」でやることは、ユーザが選んだ課題文をそのまま打ち込む(写経する)ことです。管理人が課題文を追加することもありますが、ユーザが好きな文章を課題文として登録することができます。</p>

          <h2>「ぱろタイ」での入力方法</h2>
          <p>入力にはIMEを用いませんが、変換込みの入力を模してタイピングをします。入力方法としては、広く利用されているローマ字入力だけでなく、JISかな、TUT-Codeなどにも対応する予定です。</p>

          <h2>「ぱろタイ」の特長</h2>
          <p>他サイトに比べ、タイピングの能力を上げるために利用できる多くの情報を提供する予定です。</p>

          <h2>「ぱろタイ」の由来</h2>
          <p>オウムは人間が話した言葉を聞いて覚え、覚えた言葉の通りに話すと言われています。一方で、タイピングにおける写経は、特定の文章を見て、その通りにタイピングします。このことを照らし合わせて、ゲームの名前とキャラクターにparrot(オウム)を採用することにしました。</p>


        </div>
        <!--/mainbox-->


      </div>
      <!--/main-->


      <div id="side">

        <a href="index.php"><img src="images/logo.gif" alt="SAMPLE WEBSITE" name="logo" width="200" height="140" id="logo" /></a><br />

<h3>ユーザ情報</h3>
<p>
<?php
if(isset($_SESSION['player_name'])){
  echo "Player Name: ".htmlspecialchars($_SESSION['player_name'], ENT_QUOTES);
}
else{
  echo "ログインしていません";
}
?>
</p>

        <ul class="menu">
          <li><a href="index.php">サイトTOP</a></li>
          <li><a href="app/index.php">ゲームTOP</a></li>
          <li><a href="about.php">about</a></li>
<?php
if(isset($_SESSION['player_name'])){
    echo "<li><a href=\"logout.php\">ログアウト</a></li>\n";
}
else{
    echo "<li><a href=\"login.php\">ログイン</a></li>\n";
}
?>
          <li><a href="link.php">link</a></li>
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
