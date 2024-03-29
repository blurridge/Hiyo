<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
date_default_timezone_set('Asia/Singapore');

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
        $currentTime = date("Y-m-d H:i:s");

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

            $sql = "INSERT INTO attendance(idNumber, timeEntered, timeLeft) VALUES(:idNumber, :timeEntered, :timeLeft)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':idNumber', $user->idNumber);
            $stmt->bindParam(':timeEntered', $currentTime);
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

    case "PUT":
        $user = json_decode(file_get_contents('php://input'));
        $todayDate = date("Y-m-d");
        $currentTime = date("Y-m-d H:i:s");

        // Check if there's an existing attendance record for today
        $sql = "SELECT * FROM attendance WHERE idNumber = :idNumber AND DATE(timeEntered) = :today";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idNumber', $user->idNumber);
        $stmt->bindParam(':today', $todayDate);
        $stmt->execute();
        $existingRecord = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($existingRecord) {
            if ($existingRecord['timeLeft'] === null) {
                // Update timeLeft
                $sql = "UPDATE attendance SET timeLeft = :currentTime WHERE idNumber = :idNumber AND DATE(timeEntered) = :today AND timeLeft IS NULL";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':currentTime', $currentTime);
                $stmt->bindParam(':idNumber', $user->idNumber);
                $stmt->bindParam(':today', $todayDate);
                if ($stmt->execute() && $stmt->rowCount() > 0) {
                    $response = ['status' => 1, 'message' => 'Time left updated successfully.', 'action' => 'timeLeftUpdated'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to update time left.'];
                }
            } else {
                $response = ['status' => 0, 'message' => 'Attendance already completed for today.'];
            }
        } else {
            // Insert new attendance record with timeEntered
            $sql = "INSERT INTO attendance(idNumber, timeEntered, timeLeft) VALUES(:idNumber, :timeEntered, :timeLeft)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':idNumber', $user->idNumber);
            $stmt->bindParam(':timeEntered', $currentTime);
            $stmt->bindParam(':timeLeft', $timeLeft, $timeLeft === null ? PDO::PARAM_NULL : PDO::PARAM_STR);
            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Attendance record created successfully.', 'action' => 'timeEnteredRecorded'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create attendance record.'];
            }
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