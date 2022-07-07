const {FILENAME_DATABASE} = require("../const");
const fs = require("fs");

module.exports = {
    getProductos : async (req, res) => {
        const {id} = req.params;
        try {
            if (!+id) {
                const prod = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
                res.json({data: JSON.parse(prod)});
            }else {
                const prod = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
                const prodParse = JSON.parse(prod);
                const prodFinded = prodParse.find((item) => item.id === +id);
                if (prodFinded) res.json({data : prodFinded})
                else res.json({msg: "Producto no encontrado"})
            }
        } catch (error){
            res.json({ msg: `Error: ${error.message}` })
        }
    },
    createProductos : async (req,res) =>{
        const {nombre, descripcion, codigo, thumbnail, price, stock} = req.body;
        try{
            if (nombre && descripcion && codigo && thumbnail && price && stock){
                const prod = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
                const prodParse = JSON.parse(prod);

                const ultimoProd = prodParse.at(-1);
                const fecha = new Date().getTime();
                const nuevoProd = {
                    id: ultimoProd.id + 1,
                    timestamp: fecha,
                    ...req.body
                }

                const allProd = [...prodParse , nuevoProd];

                await fs.promises.writeFile(
                    FILENAME_DATABASE,
                    JSON.stringify(allProd),
                    "utf-8"
                )
                res.json({msg : `Producto agregado con exito, id: ${nuevoProd.id}`})
            } else {
                throw new Error("Todos los campos son requeridos");
            }
        } catch (error) {
            res.json({ msg: `Error: ${error.message}` });
        }
    },
    updateProducto : async (req,res) =>{
        const {id} = req.params
        const {nombre, descripcion, codigo, thumbnail, price, stock} = req.body;

        try{
            if (!+id) throw new Error("Error. Proporcione un ID");
            const prod = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
            const prodParse = JSON.parse(prod);
            const prodFinded = prodParse.find((item) => item.id === +id);
            if (prodFinded && nombre && descripcion && codigo && thumbnail && price && stock ) {
                const fecha = new Date().getTime();
                const prodActualizado = {
                    id: +id,
                    timestamp: fecha,
                    ...req.body
                }
                const allProd = [...prodParse];
                allProd[prodFinded.id -1] = prodActualizado;

                await fs.promises.writeFile(
                    FILENAME_DATABASE,
                    JSON.stringify(allProd),
                    "utf-8"
                )
                
                res.json({msg: `Porducto con id:${prodFinded.id} actualizado con exito`})
            }else {
                throw new Error("Todos los campos son requeridos")
            }
        }catch (error){
            res.json({ msg: `Error: ${error.message}` });
        }
    },
    deleteProducto : async (req,res) =>{
        const {id} = req.params;
        try{
            if (!+id) {
                throw new Error("Error. Proporcione un ID")
            }else {
                const prod = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
                const prodParse = JSON.parse(prod);
                const prodFinded = prodParse.find((item) => item.id === +id);

                const allProd = [...prodParse];
                if (prodFinded) {
                    allProd.splice(prodFinded.id - 1, 1)
                    await fs.promises.writeFile(
                        FILENAME_DATABASE,
                        JSON.stringify(allProd),
                        "utf-8"
                    )
                    res.json({msg: "Producto removido con exito"})
                }else res.json({msg: "Producto no encontrado"})
            }
        }catch (error){
            res.json({ msg: `Error: ${error.message}` });
        }
    }
}