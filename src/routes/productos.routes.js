const { Router } = require("express");
const productosControladores = require("../controladores/productos.controladores")
const router = Router();

router.get("/:id?", productosControladores.getProductos);
router.post("/", productosControladores.createProductos);
router.put("/:id", productosControladores.updateProducto);
router.delete("/:id", productosControladores.deleteProducto);

module.exports = router;