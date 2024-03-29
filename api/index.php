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
        // Adjust the SQL to join the users table with the attendance table
        $sql = "SELECT users.*, attendance.attendanceId, attendance.timeEntered, attendance.timeLeft 
    FROM users
    LEFT JOIN attendance ON users.idNumber = attendance.idNumber";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Group attendance records by user
        $users = [];
        foreach ($results as $row) {
            $idNumber = $row['idNumber'];
            if (!isset($users[$idNumber])) {
                $users[$idNumber] = [
                    'idNumber' => $row['idNumber'],
                    'userName' => $row['userName'],
                    'address' => $row['address'],
                    'contactNumber' => $row['contactNumber'],
                    'email' => $row['email'],
                    'attendance' => [],
                ];
            }
            if ($row['attendanceId']) { // Check if there is an attendance record
                $users[$idNumber]['attendance'][] = [
                    'attendanceId' => $row['attendanceId'],
                    'timeEntered' => $row['timeEntered'],
                    'timeLeft' => $row['timeLeft'],
                ];
            }
        }

        // Convert the users array to a numerically indexed array before encoding
        echo json_encode(array_values($users));
        break;

    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $conn->beginTransaction();

        try {
            // Insert into users table
            $sql = "INSERT INTO users(idNumber, userName, address, contactNumber, email) VALUES(:idNumber, :userName, :address, :contactNumber, :email)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':idNumber', $user->idNumber);
            $stmt->bindParam(':userName', $user->userName);
            $stmt->bindParam(':address', $user->address);
            $stmt->bindParam(':contactNumber', $user->contactNumber);
            $stmt->bindParam(':email', $user->email);
            $stmt->execute();

            // Insert into attendance table
            $timeLeft = isset($user->timeLeft) && $user->timeLeft !== "" ? $user->timeLeft : null;
            $timeEntered = date("Y-m-d H:i:s", strtotime($user->timeEntered));

            $sql = "INSERT INTO attendance(idNumber, timeEntered, timeLeft) VALUES(:idNumber, :timeEntered, :timeLeft)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':idNumber', $user->idNumber);
            $stmt->bindParam(':timeEntered', $timeEntered);
            $stmt->bindParam(':timeLeft', $timeLeft, $timeLeft === null ? PDO::PARAM_NULL : PDO::PARAM_STR);
            $stmt->execute();

            // Commit transaction
            $conn->commit();

            $response = ['status' => 1, 'message' => 'User and attendance records created successfully.'];
        } catch (Exception $e) {
            // Rollback transaction on error
            $conn->rollback();
            $response = ['status' => 0, 'message' => 'Failed to create records. Error: ' . $e->getMessage()];
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