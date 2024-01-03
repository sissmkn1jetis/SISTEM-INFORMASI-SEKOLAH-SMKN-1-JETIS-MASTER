module.exports = (sequelize, Sequelize) => {
    const Guru = sequelize.define("gurus", {
        nip: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        nama: {
            type: Sequelize.STRING,
        },
        mapelId: {
            type: Sequelize.INTEGER,
        },
        // kelassId: {
        //     type: Sequelize.INTEGER,
        // },
        thnAjarId: {
            type: Sequelize.INTEGER,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
    });

    return Guru;
};