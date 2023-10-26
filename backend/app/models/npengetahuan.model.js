module.exports = (sequelize, Sequelize) => {
    const Npengetahuan = sequelize.define("npengetahuans", {
        uh1: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        uh2: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        uh3: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        uh4: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        uh5: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        uh6: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        uh7: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        uh8: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        th1: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        th2: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        th3: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        th4: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        th5: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        th6: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        th7: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        th8: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        uts: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        uas: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });

    return Npengetahuan;
};