module.exports = (sequelize, Sequelize) => {
    const Nketrampilan = sequelize.define("nketrampilans", {
        proses1: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        proses2: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        proses3: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        proses4: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        proses5: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        proses6: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        proses7: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        proses8: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        proyek1: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        proyek2: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        proyek3: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        proyek4: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        proyek5: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        proyek6: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        proyek7: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        proyek8: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        produk1: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        produk2: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        produk3: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        produk4: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        produk5: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        produk6: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        produk7: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        produk8: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });

    return Nketrampilan;
};