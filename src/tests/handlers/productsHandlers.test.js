// Importa tus manejadores de rutas
const { getProductsHandler, getPricesHandler } = require('../controllers/productsControllers');

// Crea mocks para req y res
const mockRequest = () => {
    const req = {};
    return req;
};

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

// Prueba para el manejador getProductsHandler
describe('getProductsHandler', () => {
    test('should return products with status 200 on success', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await getProductsHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Array)); // Verifica que se envíe un array como respuesta
    });

    test('should return error with status 400 when an error occurs', async () => {
        const req = mockRequest();
        const res = mockResponse();
        const errorMessage = 'Error fetching products';

        jest.spyOn(global, 'getProducts').mockRejectedValue(new Error(errorMessage));

        await getProductsHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});

// Prueba para el manejador getPricesHandler
describe('getPricesHandler', () => {
    test('should return product price with status 200 on success', async () => {
        const req = { params: { user_id: 'userID', product_name: 'ProductA' } };
        const res = mockResponse();

        await getPricesHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object)); // Verifica que se envíe un objeto como respuesta
    });

    test('should return error with status 400 when an error occurs', async () => {
        const req = { params: { user_id: 'userID', product_name: 'ProductA' } };
        const res = mockResponse();
        const errorMessage = 'Error fetching product price';

        jest.spyOn(global, 'getPrice').mockRejectedValue(new Error(errorMessage));

        await getPricesHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});
