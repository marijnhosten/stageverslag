<?php

//send the logged in user
$name = $_COOKIE["user"];
$password = $_COOKIE["password"];
$changed = $_COOKIE["changed"];

$json[] = array("name" => $name, "password" => $password, "changed" => $changed);

$jsonString = json_encode($json);

header('Content-Type: application/json');
echo $jsonString;