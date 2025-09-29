<?php
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method Not Allowed');
  }

  $receiving_email_address = 'contact@example.com';

  if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
    include($php_email_form);
  } else {
    http_response_code(500);
    exit('Unable to load the "PHP Email Form" Library!');
  }

  $truncate = static function (string $value, int $maxLength): string {
    return function_exists('mb_substr')
      ? mb_substr($value, 0, $maxLength)
      : substr($value, 0, $maxLength);
  };

  $sanitizeHeaderField = static function (?string $value, int $maxLength = 255) use ($truncate): string {
    $value = trim((string) $value);
    $value = strip_tags($value);
    $value = preg_replace("/[\r\n]+/", ' ', $value);
    return $truncate($value, $maxLength);
  };

  if (!empty($_POST['_honey'] ?? '')) {
    http_response_code(204); // silently drop bot submissions
    exit;
  }

  $name    = $sanitizeHeaderField($_POST['name'] ?? '');
  $email   = trim((string) ($_POST['email'] ?? ''));
  $subject = $sanitizeHeaderField($_POST['subject'] ?? 'Portfolio contact');
  $company = $sanitizeHeaderField($_POST['company'] ?? '', 255);
  $message = trim((string) ($_POST['message'] ?? ''));

  if ($name === '' || $message === '') {
    http_response_code(400);
    exit('Name and message are required.');
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit('Invalid email address.');
  }

  if (strlen($message) > 5000) {
    http_response_code(400);
    exit('Message too long.');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;

  $contact->to = $receiving_email_address;
  $contact->from_name = $name;
  $contact->from_email = $email;
  $contact->subject = $subject;

  $contact->add_message($name, 'From');
  $contact->add_message($email, 'Email');
  if ($company !== '') {
    $contact->add_message($company, 'Company');
  }
  $contact->add_message($message, 'Message', 10);

  echo $contact->send();
?>
