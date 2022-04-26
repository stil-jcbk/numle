function req() {
  fetch("http://192.168.50.133:8000/api/word", {
    "method": "GET",
    "headers": {}
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("date", data["date"])
      localStorage.setItem("word", data["word"])
    });
}