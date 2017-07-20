const soap = require('strong-soap').soap;
const config = require('../config');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.env['https_proxy'] = 'http://127.0.0.1:8888';

const helper = {};
let clientInstance = null;

helper.connect = function(url = config.SOAP_SERVICE, options = {}) {
  return new Promise((resolve, reject) => {
    soap.createClient(url, options, (error, client) => {
      // Reject if there is an error
      if (error) reject(error);

      clientInstance = client;
      resolve(client);
    });
  });
};

helper.call = function(methodName, args = {}) {
  // Returns a promise that resolves with the result
  return new Promise((resolve, reject) => {
    if (!clientInstance) throw new Error('Soap connection not established.');

    const method = clientInstance[methodName];

    clientInstance.addSoapHeader(`<ns1:gw_auth_user_prop soapenv:actor="http://schemas.xmlsoap.org/soap/actor/next" soapenv:mustUnderstand="0" xmlns:ns1="http://www.guidewire.com/soap">eservice_cc_app_user</ns1:gw_auth_user_prop><ns2:gw_auth_password_prop soapenv:actor="http://schemas.xmlsoap.org/soap/actor/next" soapenv:mustUnderstand="0" xmlns:ns2="http://www.guidewire.com/soap">gw</ns2:gw_auth_password_prop>`);

    console.log(clientInstance.getSoapHeaders());

    method(args, (error, result, envelope, soapHeader) => {
      if (error) reject(error);
      resolve({result, envelope, soapHeader});
    });
  });
}

module.exports = helper;
