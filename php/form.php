<?php
//post data
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$name = $request->name;
$password = $request->password;
$changed = 0;

//database connection
$host = "localhost";
$user = "root";
$pass = "root";
$databasename = "stageTesting";
$table = "users";


$con = new mysqli($host,$user,$pass,$databasename);
//check if user exists
if(!empty($name) && !empty($password)){

	$sql = "SELECT name, password FROM $table WHERE name = ? LIMIT 1";
	if($stmt = $con->prepare($sql)){
		$stmt->bind_param('s', $name);
		$stmt->execute();
		$stmt->bind_result($username, $dbPassword);
		$stmt->fetch();
		$checkPassword = crypt($password, "Pepper>Salt");
		if($stmt->num_rows == 1){
			if($checkPassword == $dbPassword){

				$username = $username . "";
			}
		}
	}
}


//first login
if(empty($username)){
	//register
	if(!empty($name) && !empty($password)){
		setcookie("user", $name, time() + 86400 * 30);
		setcookie("password", $password, time() + 86400 * 30);
		setcookie("changed", $changed, time() + 86400 * 30);

		$stmt = $con->prepare("INSERT INTO $table(name, password, changed) VALUES (?,?,?)");
		$password = crypt($password, "Pepper>Salt");
		$stmt->bind_param('ssi',$name,$password, $changed);
		$stmt->execute();
	}
}else if(!empty($username)){
	//login
	if(!empty($name) && !empty($password)){
		setcookie("user", $username	, time() + 86400 * 30);
		setcookie("password", $password, time() + 86400 * 30);
		setcookie("changed", 1, time() + 86400 * 30);
	}
}




/*
 * $username = htmlentities($_POST["username"]);
	$score = $_POST["score"];
	$host = "mysqlstudent";
	$user = "marijnhostohth9e";
	$pass = "ooc6Aewoo9yi";
	$databasename = "marijnhostohth9e";
	$table = "game";

	$con = new mysqli($host,$user,$pass,$databasename);

if(!empty($username) && !empty($score)){
	$stmt = $con->prepare("INSERT INTO $table(username, score) VALUES (?,?)");
	$stmt->bind_param('ss',$username,$score);
	$stmt->execute();
}
 * */
