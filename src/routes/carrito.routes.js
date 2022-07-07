const { Router } = require("express");
const carritoControladores = require("../controladores/carrito.controladores")
const router = Router();

router.post("/", carritoControladores.crearCarrito);
router.delete("/:id",carritoControladores.deleteCarrito);
router.get("/:id/productos",carritoControladores.getCarrito);
router.post("/:id/productos/:id_prod",carritoControladores.agregarAlCarrito);
router.delete("/:id/productos/:id_prod",carritoControladores.borrarDelCarrito);

module.exports = router;