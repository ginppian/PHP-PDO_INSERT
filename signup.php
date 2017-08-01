<?php

// Header
header('Content-type: application/x-www-form-urlencoded; charset=utf-8');

// Conectamos
$pdo = new PDO(
    'mysql:host=127.0.0.1;dbname=paracrecer',
    'root',
    '',
    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
);

// Obtenemos datos
if ($_POST["obj"]) {

    // Cast JSON
    $obj = json_decode($_POST["obj"]);
    //echo $obj->nombre;

    // Hasheamos la password
    $newPass = password_hash($obj->password, PASSWORD_DEFAULT, ['cost' => 13]);
    //echo $newPass;

    // Creamos consulta
    $user = $pdo->prepare("INSERT INTO `asesor` (`ID_ASESOR`, `NOMBRE`, `PATERNO`, `MATERNO`, `CORREO`, `PASSWORD`) VALUES (NULL, :nombre, :paterno, :materno, :correo, :password)");

    // Llenamos campos y ejecutamos
    $response = $user->execute([
                    'nombre' => $obj->nombre,
                    'paterno' => $obj->paterno,
                    'materno' => $obj->materno,
                    'correo' => $obj->correo,
                    'password' => $newPass,
    ]);

    // Verificamos si se agrego correctamente
    if($response){
        echo "¡Usuario agregado EXITOSAMENTE!"."<br>";
    } else {
        echo "ERROR: Ocurrio un error al insertar nuevo usuario"."<br>";
    }

}

