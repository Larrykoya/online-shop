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
      return response.json();
    })
    .then((data) => {
      console.log(data);
      //   window.location.href = data.url;
    })
    .catch((err) => console.log(err));
}

// function logIn(event) {
//     event.preventDefault();
//     let email = event.target[0].value;
//     let password = event.target[1].value;
//     fetch("/api/admin/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//         //   window.location.href = data.url;
//       })
//       .catch((err) => console.log(err));
//   }
