let loginError = document.getElementById("login-error-message");
let signupError = document.getElementById("signup-error-message");

function logIn(event) {
  event.preventDefault();
  let email = event.target[0].value;
  let password = event.target[1].value;
  fetch("/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.redirected) {
        return (window.location = response.url);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      loginError.innerHTML = data.message;
    })
    .catch((err) => console.log(err));
}

function signup(event) {
  event.preventDefault();
  let firstName = event.target[0].value;
  let lastName = event.target[1].value;
  let email = event.target[2].value;
  let password = event.target[3].value;
  let confirmPassword = event.target[4].value;
  fetch("/api/admin/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      signupError.innerHTML = data.message || data.message;
    })
    .catch((err) => console.log(err));
}
