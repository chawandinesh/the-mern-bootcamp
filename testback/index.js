const express = require("express");
const app = express();

const port = 8000;

app.get("/about", (req, res) => {
  return res.send("hello there!");
});
app.listen(port, () => {
    console.log("Server is up and running...")
})
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
