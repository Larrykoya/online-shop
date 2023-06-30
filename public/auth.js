function logIn(event) {
  fetch("/api/admin/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      window.location.href = data.url;
    })
    .catch((err) => console.log(err));
}
