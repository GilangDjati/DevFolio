<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  exit('Method Not Allowed');
}

$receiving_email_address = 'gilangdjatie74@gmail.com';

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$company = trim($_POST['company'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
  http_response_code(400);
  exit('Please fill in all required fields.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  exit('Invalid email address.');
}

$subject = 'Portfolio contact from ' . $name;
$body  = "Name: $name\nEmail: $email\n";
if ($company !== '') {
  $body .= "Company: $company\n";
}
$body .= "\n$message\n";
$headers = "From: $name <$email>\r\nReply-To: $email\r\n";

if (mail($receiving_email_address, $subject, $body, $headers)) {
  echo 'OK';
} else {
  http_response_code(500);
  echo 'Sorry, the message could not be sent.';
}
