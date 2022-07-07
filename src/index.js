const express = require("express");
const { PORT } =require("./const");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', require("./routes/productos.routes"));
app.use('/api/carrito', require("./routes/carrito.routes"));

app.get("/", (req,res) =>{
    res.send("Todo en orden!")
})

app.listen(PORT, () => console.log(`Server on Port ${PORT}`));