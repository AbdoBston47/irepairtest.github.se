<?php
// public/api/imei-check.php
header('Content-Type: application/json; charset=utf-8');
// (optional) CORS if you host the page on the same domain you can remove this:
header('Access-Control-Allow-Origin: *');

$imei = isset($_GET['imei']) ? trim($_GET['imei']) : '';
if (!preg_match('/^\d{15}$/', $imei)) {
  http_response_code(400);
  echo json_encode(['error'=>'bad_imei','message'=>'IMEI must be 15 digits']);
  exit;
}

// ↓↓↓ Put your IMEI provider API key here
$token = 'YOUR_IMEIDB_TOKEN_HERE';

// Call provider (example: imeidb.xyz)
$ch = curl_init();
curl_setopt_array($ch, [
  CURLOPT_URL => "https://imeidb.xyz/api/imei/$imei",
  CURLOPT_HTTPHEADER => [
    "X-Api-Key: $token",
    "Accept: application/json"
  ],
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 20
]);
$resp = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err  = curl_error($ch);
curl_close($ch);

if ($resp === false) {
  http_response_code(502);
  echo json_encode(['error'=>'provider_error','message'=>$err ?: 'Curl error']);
  exit;
}
if ($code < 200 || $code >= 300) {
  http_response_code(502);
  echo json_encode(['error'=>'provider_error','status'=>$code,'body'=>$resp]);
  exit;
}

$j = json_decode($resp, true);
$tac = substr($imei, 0, 8);

$out = [
  'tac'       => $tac,
  'brand'     => $j['brand']      ?? ($j['vendor'] ?? null),
  'model'     => $j['model']      ?? ($j['deviceName'] ?? ($j['name'] ?? null)),
  'blacklist' => array_key_exists('blacklist', $j) ? (bool)$j['blacklist'] : null,
  'warranty'  => $j['warranty']   ?? null
];

echo json_encode($out);
