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
        $req = explode('/', $_SERVER['REQUEST_URI']);
        if (strcmp($req[2], "users") == 0) {
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
        } else if ((strcmp($req[3], "requests") == 0) && (strcmp($req[2], "admin") == 0)) {
            $sql = "SELECT idNumber, email FROM admin_requests";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch all results as an associative array

            if ($results) {
                echo json_encode(['status' => 1, 'message' => 'Admin requests fetched successfully.', 'data' => $results]);
            } else {
                // No results found, but the query was successful
                echo json_encode(['status' => 0, 'message' => 'No admin requests found.']);
            }
        }

        break;

    case "POST":
        $req = explode('/', $_SERVER['REQUEST_URI']);
        if (strcmp($req[3], "login") == 0 && strcmp($req[2], "admin") == 0) {
            $data = json_decode(file_get_contents('php://input'));
            $email = $data->email;
            $password = $data->pasword;
            $sql = "SELECT * FROM admins WHERE email = :email";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $adminUser = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$adminUser) {
                echo json_encode(['status' => 0, 'message' => 'Authentication failed. User not found.']);
                break; // Stop execution if the user is not found
            }
            // Verify the password
            if (!password_verify($password, $adminUser['password'])) {
                echo json_encode(['status' => 0, 'message' => 'Authentication failed. Incorrect password.']);
                break; // Stop execution if the password does not match
            } else {
                echo json_encode(['status' => 1, 'message' => 'Authentication successful.']);
                break;
            }
        } else if (strcmp($req[3], "register") == 0 && strcmp($req[2], "admin") == 0) {
            $data = json_decode(file_get_contents('php://input'));
            $idNumber = $data->idNumber;
            $email = $data->email;
            $password = $data->password;
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);

            $sql = "INSERT INTO admin_requests(idNumber, email, passwordHash) VALUES (:idNumber, :email, :passwordHash)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':idNumber', $idNumber);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':passwordHash', $passwordHash);

            if ($stmt->execute()) {
                echo json_encode(['status' => 1, 'message' => 'Admin request submitted successfully.']);
                break;
            } else {
                echo json_encode(['status' => 0, 'message' => 'Failed to submit admin request.']);
                break;
            }
        } else if (strcmp($req[3], "register") == 0 && strcmp($req[2], "user") == 0) { // POST for normal registration
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
        } else if (strcmp($req[4], "approve") == 0 && strcmp($req[2], "admin") == 0) {
            // Assuming $path[3] contains the idNumber of the admin request you want to approve
            $idNumber = $req[3];

            // Start transaction
            $conn->beginTransaction();

            try {
                // Fetch the admin request details
                $sql = "SELECT idNumber, email, passwordHash FROM admin_requests WHERE idNumber = :idNumber";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':idNumber', $idNumber);
                $stmt->execute();
                $request = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!$request) {
                    throw new Exception("Admin request not found.");
                }

                // Insert into admins table
                $sql = "INSERT INTO admins (idNumber, email, password) VALUES (:idNumber, :email, :passwordHash)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':idNumber', $request['idNumber']);
                $stmt->bindParam(':email', $request['email']);
                $stmt->bindParam(':passwordHash', $request['passwordHash']);
                $stmt->execute();

                // Delete the request from admin_requests
                $sql = "DELETE FROM admin_requests WHERE idNumber = :idNumber";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':idNumber', $idNumber);
                $stmt->execute();

                // Commit transaction
                $conn->commit();

                echo json_encode(['status' => 1, 'message' => 'Admin request approved successfully.']);
            } catch (Exception $e) {
                // Rollback transaction on error
                $conn->rollback();
                echo json_encode(['status' => 0, 'message' => 'Failed to approve admin request. Error: ' . $e->getMessage()]);
            }
        }
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
        $req = explode('/', $_SERVER['REQUEST_URI']);
        if (strcmp($req[4], "delete") == 0 && strcmp($req[2], "user") == 0) {
            $sql = "DELETE FROM users WHERE idNumber = :idNumber";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':idNumber', $req[3]);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
        } else if (strcmp($req[4], "reject") == 0 && strcmp($req[2], "admin") == 0) {
            $sql = "DELETE FROM admin_requests WHERE idNumber = :idNumber";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':idNumber', $req[3]);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
        }

        break;
}