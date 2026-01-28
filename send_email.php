<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['status' => 'error', 'message' => 'No input data received']);
    exit;
}

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'hiredups@gmail.com';
    $mail->Password   = 'gpsv ypkh znrl hgee';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    //Recipients
    $mail->setFrom('hiredups@gmail.com', 'Portfolio Bot');
    $mail->addAddress('hiredups@gmail.com'); // Send to self

    //Content
    $mail->isHTML(true);

    if (isset($input['type']) && $input['type'] === 'chat') {
        $mail->Subject = 'New Chat Message from Portfolio';
        $message = isset($input['message']) ? $input['message'] : '';
        $mail->Body    = '<strong>User says:</strong><br>' . nl2br(htmlspecialchars($message));
    } else {
        $mail->Subject = 'New Contact Form Submission';
        $name = isset($input['name']) ? $input['name'] : 'Unknown';
        $email = isset($input['email']) ? $input['email'] : 'No email provided';
        $message = isset($input['message']) ? $input['message'] : '';
        
        $mail->Body    = "<strong>Name:</strong> " . htmlspecialchars($name) . "<br>" .
                         "<strong>Email:</strong> " . htmlspecialchars($email) . "<br>" .
                         "<strong>Message:</strong><br>" . nl2br(htmlspecialchars($message));
                         
        if(isset($input['email']) && filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
             $mail->addReplyTo($input['email'], $name);
        }
    }

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Message has been sent']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}
