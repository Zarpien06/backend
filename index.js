const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API conectada exitosamente 🎉" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor funcionando en puerto " + port);
});
