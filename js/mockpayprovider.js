window.addEventListener('DOMContentLoaded', function() {
  var mozPaymentProvider = window.navigator.mozPaymentProvider ||
                           window.mozPaymentProvider;

  var mainSection = document.getElementById('main-section');
  var smsSection = document.getElementById('sms-section');

  var silentNumbersContainer = document.getElementById('silent-numbers-container');
  var silentNumberInput = document.getElementById('silent-number');
  var silentNumbersList = document.getElementById('silent-numbers-list');

  var smsAddress = document.getElementById('sms-address');
  var smsBody = document.getElementById('sms-body');

  var silentNumbers = {};

  var warning = document.getElementById('warning');
  var info = document.getElementById('info');

  if (typeof mozPaymentProvider === 'undefined') {
    warning.innerHTML = 'This payment flow is supposed to be opened within a mozPay call';
    warning.classList.remove('hide');
    //mainSection.classList.add('hide');
    //return;
  }

  // Button click handlers.
  document.getElementById('btSuccess').addEventListener('click', function() {
    console.log("Success clicked");
    mozPaymentProvider.paymentSuccess("Result");
  });
  document.getElementById('btError').addEventListener('click', function() {
    console.log("Error clicked");
    mozPaymentProvider.paymentFailed('NO REASON');
  });
  document.getElementById('btSms').addEventListener('click', function() {
    mainSection.classList.add('hide');
    smsSection.classList.remove('hide');
  });
  document.getElementById('btMain').addEventListener('click', function() {
    mainSection.classList.remove('hide');
    smsSection.classList.add('hide');
  });
  document.getElementById('btAddSilentNumber').addEventListener('click', function() {
    var number = silentNumberInput.value;
    if (silentNumbers[number]) {
      return;
    }
    silentNumbers[number] = true;
    var item = document.createElement('li');
    item.textContent = number;
    silentNumbersList.appendChild(item);
    silentNumbersContainer.classList.remove('hide');
    mozPaymentProvider.observeSilentSms(number, function(evt) {
      console.log('Received silent SMS ' + evt.target.body);
      info.classList.remove('hide');
      info.textContent = 'Silent SMS received from ' + number + ': ' +
                          evt.target.body;
    });
  });
  document.getElementById('btSend').addEventListener('click', function() {
    var req = mozPaymentProvider.sendSilentSms(smsAddress.value, smsBody.value);
    req.onsuccess = function() {
      console.log('Silent SMS sent');
      info.classList.remove('hide');
      info.textContent = 'SMS sent';
    };
    req.onerror = function() {
      console.log('Error sending silent SMS');
      error.classList.remove('hide');
      error.textContent = 'Error sending SMS: ' + req.error.name;
    };
  });

  // service ID.
  document.getElementById('serviceId').value = mozPaymentProvider.paymentServiceId;

  // iccInfo.
  var iccInfo = mozPaymentProvider.iccInfo;
  if (!iccInfo) {
    warning.innerHTML = 'ICC related functionality only works in a real device with a SIM';
    warning.classList.remove('hide');
    return;
  }
  var iccId = [];
  var mcc = [];
  var mnc = [];
  Object.keys(iccInfo).forEach(serviceId => {
    iccId.push(iccInfo[serviceId].iccId);
    mcc.push(iccInfo[serviceId].mcc);
    mnc.push(iccInfo[serviceId].mnc);
  });
  document.getElementById('iccId').value = iccId.join(", ");
  document.getElementById('mcc').value = mcc.join(", ");
  document.getElementById('mnc').value = mnc.join(", ");
});
