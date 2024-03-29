<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM users";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
        break;

    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO users(idNumber, userName, address, contactNumber, email, timeEntered, timeLeft) VALUES(:idNumber, :userName, :address, :contactNumber, :email, :timeEntered, :timeLeft)";
        $stmt = $conn->prepare($sql);

        $timeLeft = isset($user->timeLeft) && $user->timeLeft !== "" ? $user->timeLeft : null;
        $timeEntered = date("Y-m-d H:i:s", strtotime($user->timeEntered));

        $stmt->bindParam(':idNumber', $user->idNumber);
        $stmt->bindParam(':userName', $user->userName);
        $stmt->bindParam(':address', $user->address);
        $stmt->bindParam(':contactNumber', $user->contactNumber);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':timeEntered', $timeEntered);
        $stmt->bindParam(':timeLeft', $timeLeft, $timeLeft === null ? PDO::PARAM_NULL : PDO::PARAM_STR);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM users WHERE idNumber = :idNumber";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idNumber', $path[3]);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}