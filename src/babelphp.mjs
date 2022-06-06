const app = () => 
(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	var babelphp = createCommonjsModule(function (module) {
		//traits? namespace defaultok; just comments in babel-preset-php
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
		//define('DEFAULT',new Mgillicuddy);
		//console var_dump(constant('DEFAULT'));

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
		//
		//Creates a Mastercard API compliant OAuth Authorization header.
		//@return string
		//@throws \InvalidArgumentException
		//
		//
		//Parse query parameters out of the URL. https://tools.ietf.org/html/rfc5849#section-3.4.1.3
		//@return array
		//@throws \InvalidArgumentException
		//
		//
		//Generates a hash based on request payload as per https://tools.ietf.org/id/draft-eaton-oauth-bodyhash-00.html.
		//"If the request does not have an entity body, the hash should be taken over the empty string".
		//@return string
		//
		//
		//Lexicographically sort all parameters and concatenate them into a string as per https://tools.ietf.org/html/rfc5849#section-3.4.1.3.2.
		//@return string
		//
		//
		//Normalizes the URL as per https://tools.ietf.org/html/rfc5849#section-3.4.1.2.
		//@return string
		//@throws \InvalidArgumentException
		//
		//
		//Generate a valid signature base string as per https://tools.ietf.org/html/rfc5849#section-3.4.1.
		//@return string
		//
		//
		//Signs the signature base string using an RSA private key. The methodology is described at
		//https://tools.ietf.org/html/rfc5849#section-3.4.3 but Mastercard uses the stronger SHA-256 algorithm
		//as a replacement for the described SHA1 which is no longer considered secure.
		//@return string
		//
		//
		//Generates a random string for replay protection as per https://tools.ietf.org/html/rfc5849#section-3.3.
		//@return string
		//
		//
		//Returns UNIX Timestamp as required per https://tools.ietf.org/html/rfc5849#section-3.3.
		//@return int
		//
		class OAuth {
		static AUTHORIZATION_HEADER_NAME = "Authorization";

		static getAuthorizationHeader(uri, method, payload, consumerKey, signingKey) //Compute the OAuth signature
		//Constructs and returns a valid Authorization header as per https://tools.ietf.org/html/rfc5849#section-3.5.1
		{
			if (!uri) {
			throw new commonjsGlobal.InvalidArgumentException("URI must be set!");
			}

			if (!method) {
			throw new commonjsGlobal.InvalidArgumentException("HTTP method must be set!");
			}

			if (!consumerKey) {
			throw new commonjsGlobal.InvalidArgumentException("Consumer key must be set!");
			}

			if (!signingKey) {
			throw new commonjsGlobal.InvalidArgumentException("Signing key must be set!");
			}

			var queryParameters = OAuth.extractQueryParams(uri);
			var oauthParameters = Array();
			oauthParameters.oauth_consumer_key = consumerKey;
			oauthParameters.oauth_nonce = OAuth.getNonce();
			oauthParameters.oauth_timestamp = OAuth.getTimestamp();
			oauthParameters.oauth_signature_method = "RSA-SHA256";
			oauthParameters.oauth_version = "1.0";
			oauthParameters.oauth_body_hash = OAuth.getBodyHash(payload);
			var oauthParamString = OAuth.getOAuthParamString(queryParameters, oauthParameters);
			var baseUri = OAuth.getBaseUriString(uri);
			var signatureBaseString = OAuth.getSignatureBaseString(baseUri, method, oauthParamString);
			oauthParameters.oauth_signature = OAuth.signSignatureBaseString(signatureBaseString, signingKey);
			var result = "";

			for (var key in oauthParameters) {
			var value = oauthParameters[key];
			result += result.length == 0 ? "OAuth " : ",";
			result += key + "=\"" + encodeURIComponent(value) + "\"";
			}

			return result;
		}

		static extractQueryParams(uri) {
			var uriParts = parse_url(uri);

			if (!uriParts) {
			throw new commonjsGlobal.InvalidArgumentException("URI is not valid!");
			}

			if (!("host" in uriParts)) {
			throw new commonjsGlobal.InvalidArgumentException("No URI host!");
			}

			if (!("query" in uriParts)) {
			return Array();
			}

			var rawQueryString = uriParts.query;
			var decodedQueryString = rawurldecode(rawQueryString);
			var mustEncode = decodedQueryString != rawQueryString;
			var queryParameters = Array();
			var rawParams = rawQueryString.split("&");

			for (var index in rawParams) {
			var pair = rawParams[index];

			if (!pair) {
				continue;
			}

			var index = strpos(pair, "=");
			var key = rawurldecode(index > 0 ? pair.substr(0, index) : pair);
			var value = index > 0 && pair.length > index + 1 ? rawurldecode(pair.substr(index + 1)) : "";
			var encodedKey = mustEncode ? encodeURIComponent(key) : key;
			var encodedValue = mustEncode ? encodeURIComponent(value) : value;

			if (!(encodedKey in queryParameters)) {
				queryParameters[encodedKey] = Array();
			}

			queryParameters[encodedKey].push(encodedValue);
			}

			return queryParameters;
		}

		static getBodyHash(payload) {
			return base64_encode(hash("sha256", payload, true));
		}

		static getOAuthParamString(queryParameters, oauthParameters) //Build the OAuth parameter string
		{
			for (var key in oauthParameters) {
			var value = oauthParameters[key];
			oauthParameters[key] = [value];
			}

			var allParameters = array_merge(queryParameters, oauthParameters);
			ksort(allParameters, SORT_NATURAL);
			var parameterString = "";

			for (var key in allParameters) //Keys with same name are sorted by their values
			{
			var values = allParameters[key];
			asort(values, SORT_NATURAL);

			for (var value of Object.values(values)) {
				parameterString += parameterString.length == 0 ? "" : "&";
				parameterString += key + "=" + value;
			}
			}

			return parameterString;
		}

		static getBaseUriString(uriString) {
			var uriParts = parse_url(uriString);

			if (!uriParts) {
			throw new commonjsGlobal.InvalidArgumentException("URI is not valid!");
			}

			var normalizedUrl = uriParts.scheme.toLowerCase() + "://" + uriParts.host.toLowerCase();

			if ("port" in uriParts) //Remove port if it matches the default for scheme
			{
				var port = uriParts.port;

				if (!!port && port != 80 && port != 443) {
				normalizedUrl += ":" + port;
				}
			}

			var path = "";

			if ("path" in uriParts) {
			path = uriParts.path;
			}

			if (!path) {
			path = "/";
			}

			return normalizedUrl + path;
		}

		static getSignatureBaseString(baseUri, httpMethod, oauthParamString) //OAuth parameter string
		{
			return httpMethod.toUpperCase() + "&" + encodeURIComponent(baseUri) + "&" + encodeURIComponent(oauthParamString);
		}

		static signSignatureBaseString(baseString, privateKey) {
			openssl_sign(baseString, signature, privateKey, "SHA256");
			return base64_encode(signature);
		}

		static getNonce(length = 16) {
			var characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
			var charactersLength = characters.length;
			var randomString = "";

			for (var i = 0; i < length; i++) {
			randomString += characters[rand(0, charactersLength - 1)];
			}

			return randomString;
		}

		static getTimestamp() {
			return Date.now() / 1000;
		}

		}
		//return  static function () {}
		class Mgillicuddy {
		constructor() {
			this.AuthenticationUtils = AuthenticationUtils;
			this.OAuth = OAuth;
		}

		}
		return new Mgillicuddy();
	});

	return babelphp;

}());
export default app
