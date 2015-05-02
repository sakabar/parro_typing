<?php
session_start();

if(isset($_SESSION['player_name'])){
    $dsn = 'mysql:dbname=transcribing_parro_typing;host=mysql507.db.sakura.ne.jp';
    $user = 'transcribing';
    $password = 'temppass01';

    $title = $_POST['title'];
    $private = (bool)$_POST['private'];
    $document = $_POST['document'];
    $document_id = -1;

    $document_owner_id = $_SESSION['player_id'];

    try{
        $dbh = new PDO($dsn, $user, $password);
        $dbh->query('SET NAMES utf8');

        //次に割り当てられるIDを獲得する
        $stmt = $dbh->prepare("SHOW TABLE STATUS WHERE Name = 'documents' ");
        $stmt->execute();

        while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
            $document_id = $result['Auto_increment'];
        }

        //テーブルに書き込み
        $sql = 'INSERT INTO documents (document_title, document_private, document_owner_id) VALUES (?, ?, ?)';
        $stmt = $dbh->prepare($sql);
        $stmt->execute(array($title, $private, $document_owner_id));

        $filename = '/home/transcribing/work/parro_typing/copy_sources/'.$document_id.'.txt';
        file_put_contents($filename, $document, LOCK_EX);
    }
    catch (PDOException $e){
        print('Error:'.$e->getMessage());
        die();
    }
}
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
<?php
if(!isset($_SESSION['player_name'])){
    echo "<h2>エラー</h2>\n";
    echo "<p>ログインしてから再登録してください</p>\n";
}
else{
    echo "<h2>結果</h2>\n";
    echo "<p>新しい課題文を作成しました</p>\n";
}
?>


        </div>
        <!--/mainbox-->


      </div>
      <!--/main-->


      <div id="side">

        <a href="/parro_typing/index.php"><img src="/parro_typing/images/logo.gif" alt="SAMPLE WEBSITE" name="logo" width="200" height="140" id="logo" /></a><br />

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
