window.addEventListener('DOMContentLoaded', function() {
  document.getElementById('btSuccess').addEventListener('click', function() {
    mozPaymentProvider.paymentSuccess();
  });
  document.getElementById('btError').addEventListener('click', function() {
    mozPaymentProvider.paymentError();
  });
});
