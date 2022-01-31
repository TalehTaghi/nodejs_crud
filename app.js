const express = require('express');
const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//   res.json({
//       "data" : "App İşlədi2",
//       status : true
//   })
//     // console.log(req);
// })

const generalRoutes = require("./src/routes/general");


app.use("/api", generalRoutes);

app.listen(port, () => {
  console.log(`RUN http://localhost:${port}`)
})