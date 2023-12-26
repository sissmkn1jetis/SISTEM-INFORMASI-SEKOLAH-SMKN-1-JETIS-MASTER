module.exports = (sequelize, Sequelize) => {
    const Absensi = sequelize.define("absensis", { // <- "absensi" nama database
        siswaId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lokasi_masuk: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        lokasi_pulang: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        tgl_absen: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        jm_masuk: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        jm_pulang: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        foto_masuk: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        foto_pulang: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });

    return Absensi;
};