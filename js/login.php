<?php
$user = $_POST['user'];
$password = $_POST['password'];

if($user=='admin' && $password=='admin123'){
  echo 1;
}else{
  echo 2;
}

?>