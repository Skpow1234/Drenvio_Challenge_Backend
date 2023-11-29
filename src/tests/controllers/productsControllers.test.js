
const { getProducts, getPrice } = require('../src/controllers/productsControllers');
const { Product, User } = require('../src/db');

describe('Product Controllers', () => {
    describe('getProducts function', () => {
        test('should return an array of products when products are available', async () => {
            // Crear un mock de Product.find para simular su comportamiento
            Product.find = jest.fn().mockResolvedValue([{ name: 'Product 1', enStock: true }]);

            const products = await getProducts();
            expect(Array.isArray(products)).toBe(true);
            expect(products.length).toBe(1);
        });

        test('should throw an error when there is an error fetching products', async () => {
            // Crear un mock de Product.find para simular un error
            const errorMessage = 'Database connection error';
            Product.find = jest.fn().mockRejectedValue(new Error(errorMessage));

            await expect(getProducts()).rejects.toThrow(`Error al obtener productos: ${errorMessage}`);
        });
    });

    describe('getPrice function', () => {
        test('should return a price object when user and product are found', async () => {
            // Crear mocks de User.findById y Product.findOne para simular su comportamiento
            User.findById = jest.fn().mockResolvedValue({ brandMember: 'BrandA' });
            Product.findOne = jest.fn().mockResolvedValue({ name: 'ProductA', brand: 'BrandA', specialPrice: 20 });

            const user_id = 'userID';
            const product_name = 'ProductA';

            const price = await getPrice(user_id, product_name);
            expect(price).toEqual({ price: 20 });
        });

        test('should return null when user or product are not found', async () => {
            // Crear mocks de User.findById y Product.findOne para simular que no se encontraron datos
            User.findById = jest.fn().mockResolvedValue(null);
            Product.findOne = jest.fn().mockResolvedValue(null);

            const user_id = 'nonExistentUserID';
            const product_name = 'NonExistentProduct';

            const price = await getPrice(user_id, product_name);
            expect(price).toEqual({ price: null });
        });

        test('should throw an error when there is an error fetching user or product', async () => {
            // Crear mocks de User.findById y Product.findOne para simular un error
            const errorMessage = 'Database connection error';
            User.findById = jest.fn().mockRejectedValue(new Error(errorMessage));
            Product.findOne = jest.fn().mockRejectedValue(new Error(errorMessage));

            const user_id = 'userID';
            const product_name = 'ProductA';

            await expect(getPrice(user_id, product_name)).rejects.toThrow(`Error al obtener el precio: ${errorMessage}`);
        });
    });
});
