PHP MySQL INSERT
====================

## Descripción

<p align="justify">
    Siguiendo con nuestra <a href="https://github.com/ginppian/AJAX-JSON-Formulario">aplicación</a> es momento de crear el <i>BackEnd</i>.
</p>

<p align="justify">
    Debemos tomar diferentes parametros en cuenta como:
</p>

* Inyección SQL.
* Mantener una contraseña segura.

## Desarrollo

Copiamos el siguiente código:

```
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
```
## Explicación
* El *header* como buena práctica hace referencia a que recivirá un array por el método <i>POST</i>.
* *PDO PHP Data Objects* es una capa de abstracción de acceso a datos que previene la inserción de código *SQL*.
* *password_hash* nos brinda una contraseña segura para el usuario. Nos otros como administraores no tendremos acceso a su contraseña, así mismo si nuestro sistema recive un ataque la contraseña estará cifrada.

## Fuente

* <a href="https://www.youtube.com/watch?v=cgwWpd4SqIM&t=76s">Video: PHP Security: SQL Injection</a>
* <a href="https://www.youtube.com/watch?v=ZHg-h7bZhbo">Video: PHP Security: Password hashing</a>
* <a href="https://stackoverflow.com/questions/4475548/pdo-mysql-and-broken-utf-8-encoding">PDO + MySQL and broken UTF-8 encoding</a>
