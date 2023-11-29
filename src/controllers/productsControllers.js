const { Product, User } = require("../db");

const getProducts = async () => {
    try {
        const dbProducts = await Product.find({ enStock: true });
        return dbProducts;
    } catch (error) {
        throw new Error(`Error al obtener productos: ${error.message}`);
    }
};

const getPrice = async (user_id, product_name) => {
    try {
        const [user, productFound] = await Promise.all([
            User.findById(user_id),
            Product.findOne({ name: product_name })
        ]);

        if (!user || !productFound) {
            return { price: null };
        }

        const isMemberOfSameBrand = user.brandMember &&
            user.brandMember.toString() === productFound.brand.toString();

        const price = isMemberOfSameBrand ? productFound.specialPrice : productFound.basePrice;

        return { price };
    } catch (error) {
        throw new Error(`Error al obtener el precio: ${error.message}`);
    }
};

module.exports = { getProducts, getPrice };
