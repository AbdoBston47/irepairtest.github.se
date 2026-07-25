<?php
/**
 * iRepair of Sweden – IMEI Checklist API
 * Place this in api/imei-check.php
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$imei = isset($_GET['imei']) ? trim($_GET['imei']) : '';

// Validation
if (!preg_match('/^\d{15}$/', $imei)) {
    http_response_code(400);
    echo json_encode(['error' => 'invalid_imei', 'message' => 'IMEI must be 15 digits.']);
    exit;
}

// 🔑 PLACE YOUR API KEY HERE
// Get a key from https://imeidb.xyz/ or another provider
$api_token = 'YOUR_IMEIDB_TOKEN_HERE'; 

// First, lets get some basic details from the IMEI itself (TAC)
$tac = substr($imei, 0, 8);

// If the token is still the placeholder, we can't do a real lookup, 
// but we can return the TAC so the frontend can check its local database.
if ($api_token === 'YOUR_IMEIDB_TOKEN_HERE') {
    echo json_encode(['tac' => $tac, 'demo' => true]);
    exit;
}

// 🚀 Call External API (IMEIDB)
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => "https://imeidb.xyz/api/imei/$imei",
    CURLOPT_HTTPHEADER => [
        "X-Api-Key: $api_token",
        "Accept: application/json"
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30
]);

$resp = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err  = curl_error($ch);
curl_close($ch);

if ($resp === false) {
    http_response_code(502);
    echo json_encode(['error' => 'provider_unreachable', 'details' => $err]);
    exit;
}

if ($code !== 200) {
    http_response_code($code);
    echo json_encode(['error' => 'provider_error', 'status' => $code]);
    exit;
}

$j = json_decode($resp, true);

// Normalize results
$out = [
    'tac'       => $tac,
    'brand'     => $j['brand']      ?? ($j['vendor'] ?? null),
    'model'     => $j['model']      ?? ($j['deviceName'] ?? ($j['name'] ?? null)),
    'blacklist' => array_key_exists('blacklist', $j) ? (bool)$j['blacklist'] : null,
    'warranty'  => $j['warranty']   ?? null,
    'online'    => true
];

echo json_encode($out);
