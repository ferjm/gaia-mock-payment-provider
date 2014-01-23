window.addEventListener('DOMContentLoaded', function() {
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
    return;
  }
  var iccId = [];
  var mcc = [];
  var mnc = [];
  iccInfo.forEach(serviceId => {
    iccId.push(iccInfo[serviceId].iccId);
    mcc.push(iccInfo[serviceId].mcc);
    mnc.push(iccInfo[serviceId].mnc);
  });
  document.getElementById('iccId').value = iccId.join(", ");
  document.getElementById('mcc').value = mcc.join(", ");
  document.getElementById('mnc').value = mnc.join(", ");
});
