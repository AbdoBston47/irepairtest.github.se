<?php
// Set headers to allow JSON POST and specify response type
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Get the raw POST data
$json = file_get_contents("php://input");
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "No data provided"]);
    exit;
}

$type = isset($data['type']) ? $data['type'] : 'contact';
$to = "info@irepairofsweden.se";
$subject = "Kontakta oss - " . (isset($data['store']) ? $data['store'] : 'iRepair');
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: no-reply@irepairofsweden.se" . "\r\n";

$body = "";

if ($type === 'contact') {
    $name = htmlspecialchars($data['name'] ?? 'N/A');
    $email = htmlspecialchars($data['email'] ?? 'N/A');
    $phone = htmlspecialchars($data['phone'] ?? 'N/A');
    $store = htmlspecialchars($data['store'] ?? 'N/A');
    $subj = htmlspecialchars($data['subject'] ?? 'Inget ämne');
    $message = nl2br(htmlspecialchars($data['message'] ?? ''));

    $subject = "Kontaktformulär: $subj ($store)";
    $body = "
        <h2>Ett nytt meddelande har kommit in via webbplatsen</h2>
        <p><strong>Butik:</strong> $store</p>
        <p><strong>Namn:</strong> $name</p>
        <p><strong>E-post:</strong> $email</p>
        <p><strong>Telefon:</strong> $phone</p>
        <p><strong>Ämne:</strong> $subj</p>
        <p><strong>Meddelande:</strong><br>$message</p>
    ";
} elseif ($type === 'sell') {
    $brand = htmlspecialchars($data['brand'] ?? 'N/A');
    $series = htmlspecialchars($data['series'] ?? 'N/A');
    $model = htmlspecialchars($data['model'] ?? 'N/A');
    $storage = htmlspecialchars($data['storage'] ?? 'N/A');
    $name = htmlspecialchars($data['customer']['name'] ?? 'N/A');
    $phone = htmlspecialchars($data['customer']['phone'] ?? 'N/A');
    $email = htmlspecialchars($data['customer']['email'] ?? 'N/A');
    
    $checks = $data['checks'] ?? [];
    $issues = [];
    if (!($checks['power'] ?? true)) $issues[] = "Startar ej";
    if (!($checks['screen'] ?? true)) $issues[] = "Sprucken skärm";
    if (!($checks['body'] ?? true)) $issues[] = "Skadad baksida/ram";
    if (!($checks['camera'] ?? true)) $issues[] = "Kamerafel";
    if (!($checks['speakers'] ?? true)) $issues[] = "Högtalarfel";
    if (!($checks['imei'] ?? true)) $issues[] = "IMEI syns ej";

    $condition = count($issues) > 0 ? "Problem: " . implode(", ", $issues) : "Toppskick";

    $subject = "Prisförslag: $brand $model ($storage GB)";
    $body = "
        <h2>Ny prisförfrågan för enhet</h2>
        <p><strong>Apparat:</strong> $brand $series $model ($storage GB)</p>
        <p><strong>Skick:</strong> $condition</p>
        <hr>
        <h3>Kunduppgifter</h3>
        <p><strong>Namn:</strong> $name</p>
        <p><strong>Telefon:</strong> $phone</p>
        <p><strong>E-post:</strong> $email</p>
    ";
}

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to send email"]);
}
?>
