<?php

$dsn = 'mysql:dbname=transcribing_parro_typing;host=mysql507.db.sakura.ne.jp';
$user = 'transcribing';
$password = 'temppass01';

$name = $_POST['name'];
$pass = $_POST['pass'];

try{
    $dbh = new PDO($dsn, $user, $password);
    $dbh->query('SET NAMES utf8');

    $stmt = $dbh->prepare('SELECT * FROM player WHERE player_name = ?');
    $stmt->bindValue(1, $name, PDO::PARAM_STR);
    $stmt->execute();


    $flag = False;
    while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
        if($result['player_pass'] === crypt($pass, $result['player_pass'])){
            $flag = True;
            break;
        }
    }
}
catch (PDOException $e){
    print('Error:'.$e->getMessage());
    die();
}
?>
<?php
if($flag){
    session_start();
    $_SESSION['player_name'] = $name;
}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">
  <head>
    <meta name="robots" content="noindex, nofollow"/>
    <title>ログイン</title>
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
          <h2>ログイン</h2>
          <p>
<?php
    if($flag){
        echo "こんにちは、".htmlspecialchars($name, ENT_QUOTES)."さん。ログインに成功しました。";
    }
    else{
        echo "ログインに失敗しました。ユーザ名またはパスワードが間違っています。";
        echo '<li><a href="login.php">ログイン</a></li>';
    }
?>
          </p>
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
