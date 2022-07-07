const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

module.exports = {
    PORT: +process.env.PORT || 8080,
    FILENAME_DATABASE: path.join(__dirname,"productos.json"),
    FILENAME_DATABASEC : path.join(__dirname, "carrito.json")
};