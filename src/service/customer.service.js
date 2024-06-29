const db = require('../model');
const Customer = db.customers;

exports.create = async (fullname, email, phone) => {
    try {
        const customer = await Customer.create({
            fullname,
            email,
            phone,
        });
        return customer;
    } catch (e) {
        console.error(`Error creating customer: ${e.message}`);
        throw new Error('Error ao criar o cliente');
    }
};
