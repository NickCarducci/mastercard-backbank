const app = () => (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	// Script-Name: mastercard-backbank for vaumoney
	//namespace locations\MasterCard\Api\Locations;//import namespace
	//require_once('./vendor/autoload.php');
	//declare(strict_types=1);
	//bin stuff (callable from any folder, "global" if functions are files)
	//use MasterCard\Core\Model\RequestMap;
	//use MasterCard\Core\ApiConfig;
	//use MasterCard\Core\Exception\ApiException;
	//use MasterCard\Core\Security\OAuth\OAuthAuthentication;
	//use oauth1signer\src\Developer\OAuth\Utils\AuthenticationUtils;
	//
	//Utility class.
	//@package Mastercard\Developer\OAuth\Utils
	//
	//
	//Utility class.
	//@deprecated Use AuthenticationUtils instead.
	//@see Mastercard\Developer\OAuth\Utils\AuthenticationUtils
	//@package Mastercard\Developer\OAuth\Utils
	//class SecurityUtils {
	//    private function __construct() {This class can't be instantiated}
	//    /**
	// @deprecated
	//
	//    public static function loadPrivateKey($pkcs12KeyFilePath, $keyAlias, $keyPassword) {
	//        return AuthenticationUtils::loadSigningKey($pkcs12KeyFilePath, $keyAlias, $keyPassword);
	//    }
	//}
	//use oauth1signer\src\Developer\OAuth\OAuth;
	//use oauth1signer\src\Developer\Signers\CurlRequestSigner;
	//
	//Utility class for adding the authorization header to cURL requests (see: http://php.net/manual/en/book.curl.php)
	//

	//
	//Load a RSA signing key out of a PKCS#12 container.
	//
	class AuthenticationUtils {
	  constructor() //This class can't be instantiated
	  {}

	  static loadSigningKey(pkcs12KeyFilePath, signingKeyAlias, signingKeyPassword) //NOSONAR
	  {
	    try {
	      var keystore = file_get_contents(pkcs12KeyFilePath);
	    } catch (e) {
	      throw new commonjsGlobal.InvalidArgumentException("Failed to read the given file: " + pkcs12KeyFilePath, 0, e);
	    }

	    openssl_pkcs12_read(keystore, certs, signingKeyPassword);

	    if (is_null(certs)) {
	      throw new commonjsGlobal.InvalidArgumentException("Failed to open keystore with the provided password!");
	    }

	    return openssl_get_privatekey(certs.pkey);
	  }

	}
	function initializeMCard(locations) //$password = '...';
	//    $results = array();
	//    $worked = openssl_pkcs12_read(secrets.MASTERCARD_P12_BINARY, $results, $password));
	//    //openssl_pkcs12_read(file_get_contents($filename), $results, $password));
	//    if($worked) {
	//        echo '<pre>', print_r($results, true), '</pre>';
	//    } else {
	//        echo openssl_error_string();
	//    }
	//You should copy this from "My Keys" on your project page
	//e.g. UTfbhDCSeNYvJpLL5l028sWL9it739PYh6LU5lZja15xcRpY!fd209e6c579dc9d7be52da93d35ae6b6c167c174690b72fa
	//For production: change this to the key alias you chose when you created
	//your production key
	//For production: change this to the key alias you chose when you created
	//your production key
	//e.g. /Users/yourname/project/sandbox.p12 | C:\Users\yourname\project\sandbox.p12
	{
	  secrets + MASTERCARD_CONSUMER_KEY;
	  var keyAlias = "keyalias";
	  var keyPassword = "keystorepassword";
	  var privateKeyFileContent = file_get_contents(getcwd()[secrets + MASTERCARD_P12_BINARY]);

	  if (privateKeyFileContent === false) //TODO: file not found
	    {
	      return undefined;
	    }

	  if (locations) //ApiConfig::setAuthentication(new OAuthAuthentication($consumerKey, $privateKeyFileContent, $keyAlias, $keyPassword));
	    //ApiConfig::setDebug(true); // Enable http wire logging
	    //ApiConfig::setSandbox(true);   // For production: use ApiConfig::setSandbox(false)
	    ; else //CurlRequestSigner
	    {
	      return AuthenticationUtils.loadSigningKey(privateKeyFileContent, keyAlias, keyPassword);
	    }
	}
	function mastercardRoute(req, func) //$consumerKey = '<insert consumer key>';
	//    $uri = 'https://sandbox.api.mastercard.com/service';
	//    $method = 'POST';
	//    $payload = 'Hello world!';
	//    $authHeader = OAuth::getAuthorizationHeader($uri, $method, $payload, $consumerKey, $signingKey);
	{

	  var response = undefined;
	  initializeMCard();
	  var base_uri = "https://sandbox.api.mastercard.com/";
	  var payload = JSON.stringify({
	    foo: "b\xE5r"
	  });
	  ["Content-Type: application/json", "Content-Length: " + payload.length];

	  if (func === "getAtms") //$map = new RequestMap();
	    //        $map->setmap($req.body,"PageOffset");
	    //        $map->setmap($req.body,"PageLength");
	    //        $map->setmap($req.body,"PostalCode");
	    //        $input = ATMLocations::query($map);
	    //class Atmlocator {
	    //            public $PageOffset;//querywideoffset;
	    //            public $TotalCount;//totalsofar
	    //            public $atms;
	    //        }
	    //Location.Name
	    //        Location.Distance
	    //        Location.DistanceUnit
	    //        Location.Address.Line1
	    //        Location.Address.Line2
	    //        Location.Address.City
	    //        Location.Address.PostalCode
	    //        Location.Address.CountrySubdivision.Name
	    //        Location.Address.CountrySubdivision.Code
	    //        Location.Address.Country.Name
	    //        Location.Address.Country.Code
	    //        Location.Point.Latitude
	    //        Location.Point.Longitude
	    //        Location.LocationType.Type
	    //        HandicapAccessible
	    //        Camera,Availability,AccessFees
	    //        Owner,SharedDeposit,SurchargeFreeAlliance
	    //        SurchargeFreeAllianceNetwork
	    //        Sponsor,SupportEMV
	    //        InternationalMaestroAccepted
	    //class TheAtms {
	    //            public 
	    //        }
	    //        $response = new TheAtms();
	    //        $response->$PageOffset = $input.PageOffset;
	    //        $response->$TotalCount = $input.TotalCount;
	    //        $response->$atms = $input.Atms;
	    {
	      initializeMCard(true);
	      var q = {
	        pageOffset: req + body + PageOffset,
	        pageLength: req + body + PageLength,
	        postalCode: req + body + PostalCode
	      };
	      response = unserialize(stream_get_contents(fopen(sprintf("%s/rest/?%s", base_uri + "atms/v1/atm", http_build_query(q)), "r")));
	    } else if (func === "getMerchants") //query
	    //$handle = curl_init($base_uri + 'location-intelligence/places-locator');
	    //        curl_setopt_array($handle, array(CURLOPT_RETURNTRANSFER => 1, CURLOPT_CUSTOMREQUEST => $method, CURLOPT_POSTFIELDS => $payload));
	    //        $signer = new CurlRequestSigner($consumerKey, $signingKey);
	    //        $signer->sign($handle, $method, $headers, $payload);
	    //        $result = curl_exec($handle);
	    //        curl_close($handle);
	    //$response = await places.MerchantPointOfInterest.create($q, $cb);
	    {
	      var distance = req + body;

	      class Place {}
	      var place = new Place();
	      place.countryCode = req + body + countryCode;
	      place.latitude = req + body + latitude;
	      place.longitude = req + body + longitude;
	      q = {
	        pageOffset: 0,
	        pageLength: 10,
	        radiusSearch: "true",
	        unit: "km",
	        distance: distance,
	        place: place
	      };
	      response = unserialize(stream_get_contents(fopen(sprintf("%s/rest/?%s", base_uri + "location-intelligence/places-locator/" + "places/searches", http_build_query(q + {
	        limit: 25
	      })), "r")));
	    } else if (func === "getCategories") //$response = await places.MerchantCategoryCodes.query({}, $cb);
	    {
	      response = unserialize(stream_get_contents(fopen(sprintf("%s/rest/?%s", base_uri + "location-intelligence/places-locator/" + "merchant-category-codes", http_build_query({
	        limit: 25
	      })), "r")));
	    } else if (func === "getIndustries") //$response = await places.MerchantIndustries.query({}, $cb);
	    {
	      response = unserialize(stream_get_contents(fopen(sprintf("%s/rest/?%s", base_uri + "location-intelligence/places-locator/" + "merchant-industry-codes", http_build_query({
	        limit: 25
	      })), "r")));
	    }

	  return response;
	}
	addEventListener("fetch", event => {
	  event.respondWith(handleRequest(event.request));
	});

	function handleRequest(request) {
	  var PHPWorkerHelloWorld = undefined;

	  if (request + url === "/deposit") {
	    PHPWorkerHelloWorld = mastercardRoute(request, "getAtms");
	  } else if (request + url === "/choose_category") {
	    PHPWorkerHelloWorld = mastercardRoute(request, "getCategories");
	  } else if (request + url === "/choose_industry") {
	    PHPWorkerHelloWorld = mastercardRoute(request, "getIndustries");
	  } else if (request + url === "/merchants") {
	    PHPWorkerHelloWorld = mastercardRoute(request, "getMerchants");
	  }

	  return new Response(PHPWorkerHelloWorld, {
	    headers: {
	      "content-type": "text/plain"
	    }
	  });
	}
	var babelphp = {

	};

	return babelphp;

}());
export default app
