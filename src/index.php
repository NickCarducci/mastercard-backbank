<?php
/*
 * Script-Name: mastercard-backbank for vaumoney
 */
namespace locations\MasterCard\Api\Locations;//import namespace
require_once './vendor/autoload.php';//declare(strict_types=1);
//bin stuff (callable from any folder, "global" if functions are files)
use MasterCard\Core\Model\RequestMap;
use MasterCard\Core\ApiConfig;
use MasterCard\Core\Exception\ApiException;
use MasterCard\Core\Security\OAuth\OAuthAuthentication;
use oauth1signer\src\Developer\OAuth\Utils\AuthenticationUtils;
//use oauth1signer\src\Developer\OAuth\OAuth;
use oauth1signer\src\Developer\Signers\CurlRequestSigner;

function initializeMCard($locations) {
    /*$password = '...';
    $results = array();
    $worked = openssl_pkcs12_read(secrets.MASTERCARD_P12_BINARY, $results, $password));
    //openssl_pkcs12_read(file_get_contents($filename), $results, $password));
    if($worked) {
        echo '<pre>', print_r($results, true), '</pre>';
    } else {
        echo openssl_error_string();
    }*/
    $consumerKey = secrets.MASTERCARD_CONSUMER_KEY;   // You should copy this from "My Keys" on your project page 
    //e.g. UTfbhDCSeNYvJpLL5l028sWL9it739PYh6LU5lZja15xcRpY!fd209e6c579dc9d7be52da93d35ae6b6c167c174690b72fa
    $keyAlias = "keyalias";   // For production: change this to the key alias you chose when you created 
    //your production key
    $keyPassword = "keystorepassword";   // For production: change this to the key alias you chose when you created 
    //your production key
    $privateKeyFileContent = file_get_contents(getcwd()[secrets.MASTERCARD_P12_BINARY]); 
    // e.g. /Users/yourname/project/sandbox.p12 | C:\Users\yourname\project\sandbox.p12
    if ($privateKeyFileContent === false) {
        // TODO: file not found
        return null;
    }
    if($locations){
        ApiConfig::setAuthentication(new OAuthAuthentication($consumerKey, $privateKeyFileContent, $keyAlias, $keyPassword));
        ApiConfig::setDebug(true); // Enable http wire logging
        ApiConfig::setSandbox(true);   // For production: use ApiConfig::setSandbox(false)
    } else {//CurlRequestSigner
       return AuthenticationUtils::loadSigningKey($privateKeyFileContent,$keyAlias,$keyPassword);
    }
}

function mastercardRoute ($req, $func) {
    function cb ($error, $data) {return $error ? $error : $data; };
    $response = null;
    if ($func === "getAtms") {
        initializeMCard(true);
        $map = new RequestMap();
        $map->setmap($req.body,"PageOffset");
        $map->setmap($req.body,"PageLength");
        $map->setmap($req.body,"PostalCode");
        $input = ATMLocations::query($map);
        class Atmlocator {
            public $PageOffset;//querywideoffset;
            public $TotalCount;//totalsofar
            public $atms;
        }
        $output = new Atmlocator();
        $output->$PageOffset = $input.PageOffset;
        $output->$TotalCount = $input.TotalCount;
        $output->$atms = $input.Atms;
            /*Location.Name
            Location.Distance
            Location.DistanceUnit
            Location.Address.Line1
            Location.Address.Line2
            Location.Address.City
            Location.Address.PostalCode
            Location.Address.CountrySubdivision.Name
            Location.Address.CountrySubdivision.Code
            Location.Address.Country.Name
            Location.Address.Country.Code
            Location.Point.Latitude
            Location.Point.Longitude
            Location.LocationType.Type
            HandicapAccessible
            Camera,Availability,AccessFees
            Owner,SharedDeposit,SurchargeFreeAlliance
            SurchargeFreeAllianceNetwork
            Sponsor,SupportEMV
            InternationalMaestroAccepted*/
        
    } else {
        $signingKey = initializeMCard();
            
        /*$consumerKey = '<insert consumer key>';
        $uri = 'https://sandbox.api.mastercard.com/service';
        $method = 'POST';
        $payload = 'Hello world!';
        $authHeader = OAuth::getAuthorizationHeader($uri, $method, $payload, $consumerKey, $signingKey);*/
        $method = 'POST';
        $base_uri = 'https://sandbox.api.mastercard.com/';
        $payload = json_encode(['foo' => 'bår']);
        $headers = array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($payload)
        );

        if ($func === "getMerchants") {
            $distance = $req.body; //query
            class Place {
                public $countryCode;
                public $latitude;
                public $longitude;
            }
            $place = new Place();
            $place->countryCode = $req.body.countryCode;
            $place->latitude = $req.body.latitude;
            $place->longitude = $req.body.longitude;
            $q = [
                'pageOffset' => 0,
                'pageLength' => 10,
                'radiusSearch' => "true",
                'unit' => "km",
                'distance' => $distance,
                'place' => $place
            ];
            /*$handle = curl_init($base_uri + 'location-intelligence/places-locator');
            curl_setopt_array($handle, array(CURLOPT_RETURNTRANSFER => 1, CURLOPT_CUSTOMREQUEST => $method, CURLOPT_POSTFIELDS => $payload));
            $signer = new CurlRequestSigner($consumerKey, $signingKey);
            $signer->sign($handle, $method, $headers, $payload);
            $result = curl_exec($handle);
            curl_close($handle);*/


            $response = unserialize(
                            stream_get_contents(
                                fopen(
                                    sprintf(
                                        '%s/rest/?%s',
                                        $base_uri+'location-intelligence/places-locator/'+'places/searches',//?limit=25',
                                        http_build_query($q + ['limit' => 25])
                                    ), 'r'
                                )
                            )
                        );
            //$response = await places.MerchantPointOfInterest.create($q, $cb);
        } else if ($func === "getCategories") {
            $response = unserialize(
                            stream_get_contents(
                                fopen(
                                    sprintf(
                                        '%s/rest/?%s',
                                        $base_uri+'location-intelligence/places-locator/'+'merchant-category-codes',//?limit=25',
                                        http_build_query(['limit' => 25,])
                                    ), 'r'
                                )
                            )
                        );
            //$response = await places.MerchantCategoryCodes.query({}, $cb);
        } else if ($func === "getIndustries") {
            $response = unserialize(
                            stream_get_contents(
                                fopen(
                                    sprintf(
                                        '%s/rest/?%s',
                                        $base_uri+'location-intelligence/places-locator/'+'merchant-industry-codes',//?limit=25',
                                        http_build_query(['limit' => 25,])
                                    ), 'r'
                                )
                            )
                        );
            //$response = await places.MerchantIndustries.query({}, $cb);
        }
    }
    return $response;
}


addEventListener("fetch", function ($event) {
    $event->respondWith(handleRequest($event->request));
});

function handleRequest($request) {
    $PHPWorkerHelloWorld = null;
    if ($request.url === "/deposit") {
        $PHPWorkerHelloWorld = mastercardRoute($request, "getAtms");
    } else if ($request.url === "/choose_category") {
        $PHPWorkerHelloWorld = mastercardRoute($request, "getCategories");
    } else if ($request.url === "/choose_industry") {
        $PHPWorkerHelloWorld = mastercardRoute($request, "getIndustries");
    } else if ($request.url === "/merchants") {
        $PHPWorkerHelloWorld = mastercardRoute($request, "getMerchants");
    }
    /*return new Response(`{ok: true,data: ${r} }`);*/
    return new Response($PHPWorkerHelloWorld, [
        "headers" => [ "content-type" => "text/plain" ]
    ]);
}
