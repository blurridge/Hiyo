<!DOCTYPE html>
<html>
    <title>Test PHP</title>
    <body>
    <?php
        // Function to handle errors
        function handle_error($connect) {
            echo "Error: " . mysqli_error($connect);
            mysqli_close($connect);
            exit();
        }

        $host = "localhost";
        $username = "root";
        $password = ""; // Insert your password for MySQL
        $dbase = "user_database";

        // Create connection
        $connect = mysqli_connect($host, $username, $password, $dbase);

        // Check connection
        if(!$connect) {
            die("Connection failed: " . mysqli_connect_error());
        }
        echo "Connected successfully <br/><br/>";

        if($result = mysqli_query($connect, "SELECT DATABASE()")) {
            $row = mysqli_fetch_row($result);
            echo "Default database is " . $row[0] . "<br/><br/>";
            mysqli_free_result($result);
        }

        mysqli_select_db($connect, $dbase);

        if($result = mysqli_query($connect, "SELECT DATABASE()")) {
            $row = mysqli_fetch_row($result);
            echo "Default database is " . $row[0] . "<br/><br/>";
            mysqli_free_result($result);
        }

        // Check if the user has entered the office
        if (isset($_POST['id_number']) && isset($_POST['action'])) {
            $idNumber = $_POST['id_number'];
            $action = $_POST['action'];

            if ($action == 'sign_in') {
                // Check if the user is in the database
                $query = "SELECT * FROM users WHERE id_number = ?";
                $stmt = mysqli_prepare($connect, $query);
                mysqli_stmt_bind_param($stmt, "s", $idNumber);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if (mysqli_num_rows($result) > 0) {
                    $row = mysqli_fetch_assoc($result);
                    echo "Welcome back, " . $row["user_name"] . "!<br/><br/>";

                    // Update the sign-in time
                    $currentTime = date('Y-m-d H:i:s');
                    $updateQuery = "INSERT INTO attendance (id_number, time_entered) VALUES (?, ?)";
                    $stmt = mysqli_prepare($connect, $updateQuery);
                    mysqli_stmt_bind_param($stmt, "ss", $idNumber, $currentTime);

                    if (mysqli_stmt_execute($stmt)) {
                        echo "You have successfully signed in at " . $currentTime . "<br/><br/>";
                    } 
                    else {
                        handle_error($connect);
                    }
                } 
                else {
                    echo "User not found. Please register first.<br/><br/>";
                }
            } 
            elseif ($action == 'sign_out') {
                // Check if the user exists before signing out
                $checkQuery = "SELECT * FROM users WHERE id_number = ?";
                $stmt = mysqli_prepare($connect, $checkQuery);
                mysqli_stmt_bind_param($stmt, "s", $idNumber);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if (mysqli_num_rows($result) > 0) {
                    // Retrieve the latest sign-in time for the user
                    $query = "SELECT MAX(time_entered) AS latest_time FROM attendance WHERE id_number = ?";
                    $stmt = mysqli_prepare($connect, $query);
                    mysqli_stmt_bind_param($stmt, "s", $idNumber);
                    mysqli_stmt_execute($stmt);
                    $result = mysqli_stmt_get_result($stmt);

                    if (mysqli_num_rows($result) > 0) {
                        $row = mysqli_fetch_assoc($result);
                        $latestTime = $row['latest_time'];

                        // Update the sign-out time for the latest sign-in
                        $currentTime = date('Y-m-d H:i:s');
                        $updateQuery = "UPDATE attendance SET time_left = ? WHERE id_number = ? AND time_entered = ?";
                        $stmt = mysqli_prepare($connect, $updateQuery);
                        mysqli_stmt_bind_param($stmt, "sss", $currentTime, $idNumber, $latestTime);

                        if (mysqli_stmt_execute($stmt)) {
                            echo "You have successfully signed out at " . $currentTime . "<br/><br/>";
                        } 
                        else {
                            handle_error($connect);
                        }
                    } 
                    else {
                        echo "User hasn't signed in yet.<br/><br/>";
                    }
                } 
                else {
                    echo "User not found. Please input a valid ID number.<br/><br/>";
                }
            }
        }

        // Sign-up form
        if(isset($_POST['signup'])) {
            $idNumber = $_POST['id_number'];
            $userName = $_POST['user_name'];
            $address = $_POST['address'];
            $contactNumber = $_POST['contact_number'];
            $email = $_POST['email'];

            // Check if the id number already exists in the database
            $checkQuery = "SELECT * FROM users WHERE id_number = ?";
            $stmt = mysqli_prepare($connect, $checkQuery);
            mysqli_stmt_bind_param($stmt, "s", $idNumber);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            if (mysqli_num_rows($result) > 0) {
                echo "ID Number already exists. Please choose a different one.<br/><br/>";
            } 
            else {
                $signupQuery = "INSERT INTO users (id_number, user_name, address, contact_number, email) VALUES (?, ?, ?, ?, ?)";
                $stmt = mysqli_prepare($connect, $signupQuery);
                mysqli_stmt_bind_param($stmt, "sssss", $idNumber, $userName, $address, $contactNumber, $email);

                if(mysqli_stmt_execute($stmt)) {
                    echo "User signed up successfully.<br/><br/>";
                } 
                else {
                    handle_error($connect);
                }
            }
        }

        if(isset($_POST['clear_database']) && $_POST['clear_database'] == 'true') {
            // Clear the database
            $clearQuery1 = "TRUNCATE TABLE users";
            $clearQuery2 = "TRUNCATE TABLE attendance";
            if (!mysqli_query($connect, $clearQuery1) || !mysqli_query($connect, $clearQuery2)) {
                handle_error($connect);
            }
    
            echo "Database cleared successfully.";
        }

        // Printing the Tables
        $t1 = "SELECT * FROM users";
        $t2 = "SELECT * FROM attendance";
        $users = mysqli_query($connect, $t1);
        $attendance = mysqli_query($connect, $t2);

        if(!$users || !$attendance) {
            handle_error($connect);
        }

        if(mysqli_num_rows($users) > 0) {
            // output data of each row
            echo "<table style='border-collapse: collapse; border: 1px solid black;'>";
            echo "<tr><th>ID Number</th><th>Name</th><th>Address</th><th>Contact Number</th><th>E-mail</th></tr>";
            while ($row = mysqli_fetch_assoc($users)) {
                echo "<tr>";
                echo "<td style='border: 1px solid black;'>" . $row["id_number"] . "</td>";
                echo "<td style='border: 1px solid black;'>" . $row["user_name"] . "</td>";
                echo "<td style='border: 1px solid black;'>" . $row["address"] . "</td>";
                echo "<td style='border: 1px solid black;'>" . $row["contact_number"] . "</td>";
                echo "<td style='border: 1px solid black;'>" . $row["email"] . "</td>";
                echo "</tr>";
            }
            echo "</table>";
        } 
        else {
            echo "<br/><br/>0 results";
        }

        echo "<br/><br/><br/><br/>";

        if(mysqli_num_rows($attendance) > 0) {
            // output data of each row
            echo "<table style='border-collapse: collapse; border: 1px solid black;'>";
            echo "<tr><th>ID Number</th><th>Time Entered</th><th>Time Left</th></tr>";
            while ($row = mysqli_fetch_assoc($attendance)) {
                echo "<tr>";
                echo "<td style='border: 1px solid black;'>" . $row["id_number"] . "</td>";
                echo "<td style='border: 1px solid black;'>" . $row["time_entered"] . "</td>";
                echo "<td style='border: 1px solid black;'>" . $row["time_left"] . "</td>";
                echo "</tr>";
            }
            echo "</table>";
        } 
        else {
            echo "<br/><br/>0 results";
        }

        mysqli_close($connect);
    ?>
    <br/><br/>
    <form method="POST" action="">
    <label for="id_number">ID Number:</label>
    <input type="text" id="id_number" name="id_number" required><br/><br/>
    <label for="action">Action:</label>
    <select id="action" name="action" required>
        <option value="sign_in">Sign In</option>
        <option value="sign_out">Sign Out</option>
    </select><br/><br/>
    <input type="submit" value="Submit">
    </form>
    <form method="POST" action="">
        <label for="id_number">ID Number:</label>
        <input type="text" id="id_number" name="id_number" required><br/><br/>
        <label for="user_name">Name:</label>
        <input type="text" id="user_name" name="user_name" required><br/><br/>
        <label for="address">Address:</label>
        <input type="text" id="address" name="address" required><br/><br/>
        <label for="contact_number">Contact Number:</label>
        <input type="text" id="contact_number" name="contact_number" required><br/><br/>
        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email" required><br/><br/>
        <input type="submit" name="signup" value="Sign Up">
    </form>
    <br/><br/>
    <form method="POST" action="">
        <input type="hidden" name="clear_database" value="true">
        <input type="submit" value="Clear Database">
    </form>
    </body>
</html>