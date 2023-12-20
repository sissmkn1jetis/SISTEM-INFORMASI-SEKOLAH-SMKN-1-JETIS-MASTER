// const db = require("../models");
// const { user: User, role: Role } = db;

// const Op = db.Sequelize.Op;
// const bcrypt = require("bcryptjs");

// exports.allAccess = (req, res) => {
//   res.status(200).send("Public Content.");
// };

// exports.User = (req, res) => {
//     res.status(200).send("User Content.");
//   };

// exports.Walas = (req, res) => {
//   res.status(200).send("Walas Content.");
// };

// exports.Admin = (req, res) => {
//   res.status(200).send("Admin Content.");
// };

// exports.Guru = (req, res) => {
//   res.status(200).send("Guru Content.");
// };

// exports.Kabeng = (req, res) => {
//   res.status(200).send("Kabeng Content.");
// };

// exports.getroles = async (req, res) => {
//   try {
//     const response = await Role.findAll({
//       attributes: ['id', 'name'],
//     });
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// exports.getUser = async (req, res) => {
//   try {
//     const response = await User.findAll({
//       attributes: ['id', 'username', 'email'],
//       include: [
//         {
//           model: Role,
//           attributes: ['id', 'name']
//         }
//       ]
//     });
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// exports.getByIdUser = async (req, res) => {
//   try {
//     const users = await User.findOne({
//       where: {
//         id: req.params.id
//       }
//     });
//     if (!users) return res.status(404).json({ msg: "User tidak ditemukan" });

//     const response = await User.findOne({
//       attributes: ['id', 'username', 'email', 'password'],
//       include: [
//         {
//           model: Role,
//           attributes: ['id', 'name']
//         }
//       ],
//       where: {
//         id: req.params.id
//       }
//     });
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// exports.createUser = async (req, res) => {
//   try {
//     const { password, confPassword, username, email } = req.body;
//     if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
//     const hashPassword = bcrypt.hashSync(password, 8);
//     await User.create({
//       username: username,
//       email: email,
//       password: hashPassword,
//     })
//       .then(user => {
//         if (req.body.roles) {
//           Role.findAll({
//             attributes: ['id', 'name'],
//             where: {
//               name: {
//                 [Op.or]: req.body.roles
//               }
//             }
//           }).then(roles => {
//             user.setRoles(roles).then(() => {
//               res.send({ message: "User create successfully!" });
//             });
//           });
//         }
//       })
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const users = await User.findOne({
//       where: {
//         id: req.params.id
//       }
//     });
//     if (!users) return res.status(404).json({ msg: "User tidak ditemukan" });
//     const { username, email, password, confPassword, roles } = req.body;
//     let hashPassword;
//     if (password === "" || password === null) {
//       hashPassword = users.password
//     } else {
//       hashPassword = bcrypt.hashSync(password, 8);
//     }
//     if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
//     if (roles) {
//       Role.findAll({
//         where: {
//           name: {
//             [Op.or]: roles
//           }
//         }
//       })
//         .then(roles => {
//           users.setRoles(roles).then(() => {
//             res.send({ message: "User updated successfully!" });
//           });
//         });
//     }
//     await User.update({
//       username: username,
//       email: email,
//       password: hashPassword,
//       roles: roles
//     }, {
//       where: {
//         id: users.id
//       },
//     });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const users = await User.findOne({
//       where: {
//         id: req.params.id
//       }
//     });
//     if (!users) return res.status(404).json({ msg: "User tidak ditemukan" });

//     const response = await User.destroy({
//       where: {
//         id: req.params.id
//       }
//     });
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };


const db = require("../models");
const config = require("../config/auth.config");
const { akunsiswa: Akun_Siswa, kelas: Kelas, siswa: Siswa, tempat_prakerin: TempatPKL, refreshToken: RefreshToken } = db;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.loginSiswa = async (req, res) => {
  try {
    await Akun_Siswa.findOne({
      where: {
        username: req.body.username
      },
    })
    .then(async akunsiswa => {
      if (!akunsiswa) {
        return res.status(404).send({ message: "Akun Siswa Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        akunsiswa.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: akunsiswa.id }, config.secret, {
        expiresIn: config.jwtExpiration
      });

      let refreshToken = await RefreshToken.createToken(akunsiswa);

      res.status(200).send({
        id: akunsiswa.id,
        siswaId: akunsiswa.siswaId,
        username: akunsiswa.username,
        tempat_pklId: akunsiswa.tempat_pklId,
        status: akunsiswa.status,
        accessToken: token,
        refreshToken: refreshToken,
      });
    })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAkunSiswa = async (req, res, next) => {
  try {
    const response = await Akun_Siswa.findAll({
      attributes: ['id', 'siswaId', 'username', 'tempat_pklId', 'status'],
      include: [
        {
          model: Siswa,
          attributes: ['id', 'nis', 'name', 'tgl_lahir', 'jks', 'alamat', 'kelasId'],
          as: "siswa",
          include: [{
            model: Kelas,
            attributes: ['id', 'name_kelas'],
            as: "kelas"
          },]
        },
        {
          model: TempatPKL,
          attributes: ['id', 'name_tempat', 'lokasi'],
          as: "tempat_prakerin"
        }
      ]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getByIdAkunSiswa = async (req, res) => {
  try {
    const akuns = await Akun_Siswa.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!akuns) return res.status(404).json({ message: "Akun Siswa tidak ditemukan" });

    const response = await Akun_Siswa.findOne({
      attributes: ['id', 'siswaId', 'username', 'tempat_pklId', 'status'],
      include: [
        {
          model: Siswa,
          attributes: ['id', 'nis', 'name', 'tgl_lahir', 'jks', 'alamat', 'kelasId'],
          include: [{
            model: Kelas,
            attributes: ['id', 'name_kelas'],
            as: "kelas"
          },]
        },
        {
          model: TempatPKL,
          attributes: ['id', 'name_tempat', 'lokasi'],
        }
      ],
      where: {
        id: akuns.id
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAkunSiswa = async (req, res) => {
  try {
    const { siswaId, username, password, tempat_pklId, status } = req.body;
    //if (password !== confPassword) return res.status(400).json({ message: "Password dan Confirm Password tidak cocok" });
    const hashPassword = bcrypt.hashSync(password, 8);
    await Akun_Siswa.create({
      siswaId: siswaId,
      username: username,
      password: hashPassword,
      tempat_pklId: tempat_pklId,
      status: status,
    });
    res.status(201).send({ message: "Akun Siswa was registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateAkunSiswa = async (req, res) => {
  try {
    const akuns = await Akun_Siswa.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!akuns) return res.status(404).json({ message: "Akun Siswa tidak ditemukan" });
    const { siswaId, username, password, tempat_pklId, status } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
      hashPassword = akuns.password
    } else {
      hashPassword = bcrypt.hashSync(password, 8);
    }
    //if (password !== confPassword) return res.status(400).json({ message: "Password dan Confirm Password tidak cocok" });
    await Akun_Siswa.update({
      siswaId: siswaId,
      username: username,
      password: hashPassword,
      tempat_pklId: tempat_pklId,
      status: status,
    }, {
      where: {
        id: akuns.id
      },
    })
    res.status(201).send({ message: "Akun Siswa was Updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteAkunSiswa = async (req, res) => {
  try {
    const akuns = await Akun_Siswa.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!akuns) return res.status(404).send({ message: "Akun Siswa tidak ditemukan" });

    const response = await Akun_Siswa.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).send({ message: "Akun Siswa was Deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// exports.getRole = async (req, res) => {
//   try {
//     const response = await Role.findAll({
//       attributes: ['id', 'name'],
//     });
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };