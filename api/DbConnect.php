<?php
/**
 * Database Connection
 */
function loadEnvironmentVariables($path) {
    if (!file_exists($path)) {
        throw new Exception("Could not find .env file at path: $path");
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue; // Skip comments
        }

        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);

        if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
            putenv(sprintf('%s=%s', $name, $value));
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
}

class DbConnect
{
    private $server;
    private $dbname;
    private $user;
    private $pass;

    public function __construct() {
        // Assuming your .env file is in the root, adjust the path as necessary
        loadEnvironmentVariables(__DIR__ . '/../.env.local');

        $this->server = getenv('DB_SERVER');
        $this->dbname = getenv('DB_NAME');
        $this->user = getenv('DB_USER');
        $this->pass = getenv('DB_PASS');
    }

    public function connect() {
        try {
            $conn = new PDO("mysql:host={$this->server};dbname={$this->dbname}", $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (Exception $e) {
            echo "Database Error: " . $e->getMessage();
        }
    }
}
?>
