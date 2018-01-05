<?php
/**
 * MailChimp API documentation:
 * http://apidocs.mailchimp.com/api/
 */
$apikey = 'c071f59fb129d20cb71e9e06830c7389-us12'; //your apikey
$listId = '8b97bfbff5';  // your list id
$endpoint = "http://us12.api.mailchimp.com/3.0/lists/"; // find your datacenter in your apikey( xxxxxxxxxxxxxxxxxxxxxxxx-us13 <= this is your datacenter)
$auth = base64_encode('user:' . $apikey);
$data = array(
    'apikey' => $apikey,
    'email_address' => $_POST['email'],
    'status' => 'subscribed');
$json_data = json_encode($data);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $endpoint . $listId . '/members/');
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json',
    'Authorization: Basic ' . $auth));
curl_setopt($ch, CURLOPT_USERAGENT, 'PHP-MCAPI/2.0');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
$result = curl_exec($ch);
$res = json_decode($result, true);
$suc = "success|";
if (!isset($res["detail"])) {
    if (isset($res['email_address'])) {
        print_r($suc . "" . $res['email_address']." is successfully ".$res['status']);
    }
} else if (isset($res["detail"])) {
    print_r($res['detail']);
}
/*echo "<pre>";  // Response form mailchimp
print_r($res);*/
