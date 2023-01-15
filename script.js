function checkOut() {
  let response = window
    .prompt("Do you accept the total calculation?")
    .toUpperCase();
  if (response == "YES") {
    alert("Thank you for shopping with us!!!");
    localStorage.clear();
    location.reload();
  } else {
    alert("Application withdrawn!!!");
  }
}
function cancelCheckout() {
  alert("Checkout Canceled!!!");
  localStorage.clear();
  location.reload();
}

function contactFeedBack() {
  alert("Thank you for your feedback, we will respond as soon as possible");
}
