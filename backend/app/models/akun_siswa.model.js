module.exports = (sequelize, Sequelize) => {
  const Akun_Siswa = sequelize.define("akun_siswas", {
    siswaId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tempat_pklId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
    },
  });

  return Akun_Siswa;
};
