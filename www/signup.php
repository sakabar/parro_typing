<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">
  <head>
    <meta name="robots" content="noindex, nofollow"/>
    <title>新規登録</title>
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
          <h2>新規登録</h2>
          <!-- <p></p> -->
          <form action="signup-result.php" method="post">
            <p>user name : <input type="text" maxlength="8" name="name"/><br/>(半角英数8文字以内)</p>
            <p>password : <input type="password" maxlength="10" name="pass"/></p>
            <p><input type="submit" value="登録"/></p>
          </form>


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
