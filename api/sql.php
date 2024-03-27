<!DOCTYPE html>
<html>
	<title>Test PHP</title>
	<body>
    <?php
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

        $t1 = "SELECT * FROM users";
        $t2 = "SELECT * FROM attendance";
        $users = mysqli_query($connect, $t1);
        $attendance = mysqli_query($connect, $t2);

        /* Printing the Tables */
        if($users->num_rows > 0) {
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
            echo "0 results";
        }

        echo "<br/><br/><br/><br/>";

        if($attendance->num_rows > 0) {
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
            echo "0 results";
        }

        mysqli_close($connect);
    ?>
	</body>
</html>
