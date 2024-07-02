const customerService = require('../service/customer.service');

exports.create = async (request, response) => {
    try {
        const { fullname, email, phone } = request.body;
        const customer = await customerService.create(fullname, email, phone);
        response
            .status(201)
            .json({
                message: 'Cliente cadastrado com sucesso',
                body: {
                    customer,
                },
            });
    } catch (e) {
        response
            .status(400)
            .json({
                status: 400,
                message: e.message,
            });
    }
};
