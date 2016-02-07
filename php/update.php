<?php
//post data
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$name = $request->name;
$password = $request->password;
$changed = 1;

//database connection
$host = "localhost";
$user = "root";
$pass = "root";
$databasename = "stageTesting";
$table = "users";

setcookie("user", $name, time() + 86400 * 30);
setcookie("password", $password, time() + 86400 * 30);
setcookie("changed", $changed, time() + 86400 * 30);
$password = crypt($password, "Pepper>Salt");

$con = new mysqli($host,$user,$pass,$databasename);
$sql = "UPDATE $table set changed = '$changed', password = '$password' WHERE name = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param('s', $name);
$stmt->execute();