<?php
  session_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">
  <head>
    <meta name="robots" content="noindex, nofollow"/>
    <title>課題文作成</title>
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
	  <h2>課題文作成</h2>
<?php
if(empty($_SESSION['player_name'])){
  echo "まずログインしてください\n";
}
else{
  echo <<<EOS
<p>タイピングの問題を作成します</p>\n
<form action="make-result.php" method="post">
タイトル: <input type="text" maxlength="16" name="title" required/><br/>
限定公開 : <input type="checkbox" name="private" value="True" /><br/>
【注意】:著作権が切れてないない文書を登録するときには【必ず】限定公開にしてください。<br/>
さもなくば、法律的な問題が発生する可能性があります。<br/>
問題文: <br/>
<textarea cols="100" rows="10" name="document" required></textarea><br/>
<input type="submit" value="決定"/>
</form>
EOS;
}
?>	  
        </div>
        <!--/mainbox-->


      </div>
      <!--/main-->


      <div id="side">

        <a href="/parro_typing/index.php"><img src="/parro_typing/images/logo.gif" alt="SAMPLE WEBSITE" name="logo" width="200" height="140" id="logo" /></a><br />
<h3>ユーザ情報</h3>
<p>
<?php
if(isset($_SESSION['player_name'])){
  echo "user name: ".htmlspecialchars($_SESSION['player_name'], ENT_QUOTES)."<br/>\n";
  echo "user id  : ".htmlspecialchars($_SESSION['player_id'], ENT_QUOTES)."<br/>\n";
}
else{
  echo "ログインしていません";
}
?>
</p>

        <ul class="menu">
          <li><a href="../index.php">サイトTOP</a></li>
          <li><a href="index.php">ゲームTOP</a></li>
          <li><a href="play-game.php">Play Game</a></li>
          <li><a href="make.php">課題文作成</a></li>
          <li><a href="bookmark.php">ブックマーク</a></li>
          <li><a href="config.php">設定</a></li>
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
