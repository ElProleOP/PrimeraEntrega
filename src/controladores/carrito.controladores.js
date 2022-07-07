const {FILENAME_DATABASE ,FILENAME_DATABASEC} = require("../const");
const fs = require("fs");
// const productosControladores = require("./productos.controladores")

module.exports = {
    crearCarrito : async (req,res) => {
        try{
        const carr = await fs.promises.readFile(FILENAME_DATABASEC, "utf-8");
        const carrParse  = JSON.parse(carr);
        const ultimoCarr = carrParse.at(-1)
        const carritoNuevo = {
            id : ultimoCarr.id +1,
        };
        const allCarr = [...carrParse, carritoNuevo];
        await fs.promises.writeFile(
            FILENAME_DATABASEC,
            JSON.stringify(allCarr),
            "utf-8"
        );
        res.json({msg: `Carrito creado con exito, id:${carritoNuevo.id}`})
        }catch (error) {
            res.json({ msg: `Error: ${error.message}` });
        }  
    },
    deleteCarrito: async (req,res) => {
        const {id} = req.params;
        try{
            if (!+id) throw new Error("Error. Proporcione un ID");
            else {
                const carr = await fs.promises.readFile(FILENAME_DATABASEC, "utf-8");
                const carrParse  = JSON.parse(carr);
                const carrFinded = carrParse.find((item) => item.id === +id);

                const allCarr = [...carrParse];
                if (carrFinded){
                    allCarr.splice(carrFinded.id, 1);
                    await fs.promises.writeFile(
                        FILENAME_DATABASEC,
                        JSON.stringify(allCarr),
                        "utf-8"
                    )
                    res.json({msg: `Carrito removido con exito, id:${carrFinded.id}`})
                }else {
                    res.json({msg: `Carrito no encontrado`})
                }
            }
        }catch (error) {
            res.json({ msg: `Error: ${error.message}` });
        }  
    },
    getCarrito: async (req,res) => {
        const {id} = req.params;
        try {
            if (!+id) throw new Error("Error. Proporcione un ID");
            else {
                const carr = await fs.promises.readFile(FILENAME_DATABASEC, "utf-8");
                const carrParse  = JSON.parse(carr);
                const carrFinded = carrParse.find((item) => item.id === +id);

                if (carrFinded) res.json({data:carrFinded});
                else res.json({msg:"Carrito no encontrado"})
            }
        }catch (error) {
            res.json({ msg: `Error: ${error.message}` });
        } 
    },
    agregarAlCarrito: async (req,res) =>{
        const id = req.params.id;
        const idprod = req.params.id_prod;
        try {
            
                const carr = await fs.promises.readFile(FILENAME_DATABASEC, "utf-8");
                const carrParse  = JSON.parse(carr);
                const carrFinded = carrParse.find((item) => item.id === +id);
                const prod = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
                const prodParse = JSON.parse(prod);
                const prodFinded = prodParse.find((item) => item.id === +idprod);

                if (carrFinded && prodFinded){
                    const carrAgregado = carrFinded;
                    carrAgregado.productos.push(prodFinded);
                    const allCarr= [...carrParse];
                    allCarr[carrFinded.id] = carrAgregado;

                    await fs.promises.writeFile(
                        FILENAME_DATABASEC,
                        JSON.stringify(allCarr),
                        "utf-8"
                    )
                    res.json({msg:`Producto id:${idprod} agregado con exito al carrito id:${id}`})
                }else res.json({msg:"Carrito o producto no encontrado"})

            
        }catch (error) {
            res.json({ msg: `Error: ${error.message}` });
        }
    },
    borrarDelCarrito : async (req,res) => {
        const id = req.params.id;
        const idprod = req.params.id_prod;

        try{
            const carr = await fs.promises.readFile(FILENAME_DATABASEC, "utf-8");
            const carrParse  = JSON.parse(carr);
            const carrFinded = carrParse.find((item) => item.id === +id);
            const prod = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
            const prodParse = JSON.parse(prod);
            const prodFinded = prodParse.find((item) => item.id === +idprod);
            const allCarr = [...carrParse]
            if (carrFinded && prodFinded) {
                const carrBorrado = carrFinded;
                carrBorrado.productos.splice(idprod - 1 , 1);
                allCarr[carrFinded.id] = carrBorrado

                await fs.promises.writeFile(
                    FILENAME_DATABASEC,
                    JSON.stringify(allCarr),
                    "utf-8"
                )
                res.json({msg:`Producto id:${idprod} removido con exito del carrito id:${id}`})
            }else res.json({msg:"Carrito o producto no encontrado"})  
        }catch (error) {
            res.json({ msg: `Error: ${error.message}` });
        }
    }
}