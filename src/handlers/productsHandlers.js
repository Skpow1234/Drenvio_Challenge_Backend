const { getProducts, getPrice } = require("../controllers/productsControllers");

const getProductsHandler = async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getPricesHandler = async (req, res) => {
    const { user_id, product_name } = req.params;
    try {
        const productPrice = await getPrice(user_id, product_name);
        res.status(200).json(productPrice);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getProductsHandler, getPricesHandler };
