window.addEventListener('DOMContentLoaded', function() {
  var mozPaymentProvider = window.mozPaymentProvider || navigator.mozPaymentProvider;
  var warning = document.getElementById('warning');
  if (typeof mozPaymentProvider === 'undefined') {
    warning.innerHTML = 'This payment flow is supposed to be opened within a mozPay call';
    warning.classList.remove('hide');
    return;
  }

  // Button click handlers.
  document.getElementById('btSuccess').addEventListener('click', function() {
    mozPaymentProvider.paymentSuccess();
  });
  document.getElementById('btError').addEventListener('click', function() {
    mozPaymentProvider.paymentFailed('NO REASON');
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
