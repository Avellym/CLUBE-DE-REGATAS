const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Product = sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        unitValue: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
    return Product;
};
