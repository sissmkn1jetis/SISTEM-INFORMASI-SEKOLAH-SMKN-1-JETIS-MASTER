// const db = require("../models");
// const config = require("../config/auth.config");
// const { user: User, role: Role, refreshToken: RefreshToken } = db;

// const Op = db.Sequelize.Op;

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// exports.signup = async (req, res) => {
//   // Save User to Database
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
//               res.send({ message: "User registered successfully!" });
//             });
//           });
//         }
//         // else {
//         //   // user role = 1
//         //   user.setRoles([1]).then(() => {
//         //     res.send({ message: "User registered successfully!" });
//         //   });
//         // }
//       })
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     await User.destroy({
//       where: {
//         id: req.params.id
//       }
//     });
//     res.status(201).json({ msg: "User Deleted" });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// }

// exports.signin = async (req, res) => {
//   try {
//     await User.findOne({
//       where: {
//         username: req.body.username
//       }
//     })
//       .then(async (user) => {
//         if (!user) {
//           return res.status(404).send({ message: "User Not found." });
//         }

//         const passwordIsValid = bcrypt.compareSync(
//           req.body.password,
//           user.password
//         );

//         if (!passwordIsValid) {
//           return res.status(401).send({
//             accessToken: null,
//             message: "Invalid Password!"
//           });
//         }

//         const token = jwt.sign({ id: user.id }, config.secret, {
//           expiresIn: config.jwtExpiration
//         });

//         let refreshToken = await RefreshToken.createToken(user);

//         let authorities = [];
//         user.getRoles().then(roles => {
//           for (let i = 0; i < roles.length; i++) {
//             authorities.push("ROLE_" + roles[i].name.toUpperCase());
//           }

//           res.status(200).send({
//             id: user.id,
//             username: user.username,
//             // password:user.password,
//             email: user.email,
//             roles: authorities,
//             accessToken: token,
//             refreshToken: refreshToken,
//           });
//         });
//       })
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

// exports.refreshToken = async (req, res) => {
//   const { refreshToken: requestToken } = req.body;

//   if (requestToken == null) {
//     return res.status(403).json({ message: "Refresh Token is required!" });
//   }

//   try {
//     let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

//     console.log(refreshToken)

//     if (!refreshToken) {
//       res.status(403).json({ message: "Refresh token is not in database!" });
//       return;
//     }

//     if (RefreshToken.verifyExpiration(refreshToken)) {
//       RefreshToken.destroy({ where: { id: refreshToken.id } });

//       res.status(403).json({
//         message: "Refresh token was expired. Please make a new signin request",
//       });
//       return;
//     }

//     const user = await refreshToken.getUser();
//     let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
//       expiresIn: config.jwtExpiration,
//     });

//     return res.status(200).json({
//       accessToken: newAccessToken,
//       refreshToken: refreshToken.token,
//     });
//   } catch (err) {
//     return res.status(500).send({ message: err });
//   }
// };

const db = require("../models");
const config = require("../config/auth.config");
const { user: User, refreshToken: RefreshToken, guru: Guru, walas: Walas, kelas: Kelas, mapel: Mapel, siswa: Siswa, thn_ajar: TahunAjar, nk: NK, np: NP } = db;

// const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  try {
    User.create({
      username: req.body.username,
      // email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: req.body.role
    })
    res.status(201).send({ message: "User was registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    await User.findOne({
      where: {
        username: req.body.username
      },
    })
      .then(async user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: config.jwtExpiration
        });

        let refreshToken = await RefreshToken.createToken(user);

        res.status(200).send({
          id: user.id,
          username: user.username,
          role: user.role,
          tempat_lahir: user.tempat_lahir,
          tanggal_lahir: user.tanggal_lahir,
          jenis_kelamin: user.jenis_kelamin,
          agama: user.agama,
          alamat: user.alamat,
          no_telp: user.no_telp,
          accessToken: token,
          refreshToken: refreshToken,
        });
      })
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getProfileGuru = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findOne({
      attributes: ['id', 'username', 'role', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'agama', 'alamat', 'no_telp'],
      where: { id: userId },
      include: [
        {
          model: Guru,
          attributes: ['id', 'nip', 'nama', 'mapelId', 'thnAjarId', 'userId'],
          where: { userId: userId },
          as: 'guru',
          include: [
            {
              model: Kelas,
              as: 'kelas',
              attributes: ['id', 'name_kelas', 'jurusanId'],
              through: {
                attributes: [],
              },
              include: [
                {
                  model: Siswa,
                  as: 'siswa',
                  attributes: ['id', 'nis', 'name'],
                },
              ],
            },
            {
              model: Mapel,
              attributes: ['id', 'name_mapel'],
              as: 'mapel',
            },
            {
              model: TahunAjar,
              attributes: ['id', 'semester_aktif', 'thn_ajaran'],
              as: 'thn_ajar',
            },
          ],
        },
      ],
    });

    if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' });

    const guruIds = user.guru.id;

    const nk = await NK.findAll({
      attributes: [
        'id', 'guruId', 'siswaId', 'proses1', 'proses2', 'proses3', 'proses4', 'proses5', 'proses6', 'proses7', 'proses8',
        'proyek1', 'proyek2', 'proyek3', 'proyek4', 'proyek5', 'proyek6', 'proyek7', 'proyek8',
        'produk1', 'produk2', 'produk3', 'produk4', 'produk5', 'produk6', 'produk7', 'produk8'
      ],
      where: {
        guruId: guruIds
      }
    });

    const np = await NP.findAll({
      attributes: ['id', 'siswaId', 'guruId', 'uh1', 'uh2', 'uh3', 'uh4', 'uh5', 'uh6', 'uh7', 'uh8', 'th1', 'th2', 'th3', 'th4', 'th5', 'th6', 'th7', 'th8', 'uts', 'uas'],
      where: {
        guruId: guruIds
      }
    });

    const profileData = {
      user: user,
      nk: nk,
      np: np,
    };

    res.status(200).json(profileData);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};

exports.getProfileAdmin = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({
      attributes: ['id', 'username', 'role', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'agama',
        'alamat', 'no_telp'],
      where: { id: userId },
    })
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.getProfileWalas = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({
      attributes: ['id', 'username', 'role', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'agama',
        'alamat', 'no_telp'],
      where: { id: userId },
      include: [
        {
          model: Walas,
          attributes: ['id', 'guruId', 'kelassId', 'thnAjarId', 'userId'],
          include: [
            {
              model: Guru,
              as: 'guru',
              attributes: ['id', 'nip', 'nama'],
            },
            {
              model: TahunAjar,
              attributes: ['id', 'semester_aktif', 'thn_ajaran'],
              as: 'thn_ajar',
            },
            {
              model: Kelas,
              as: 'kelas',
              attributes: ['id', 'name_kelas'],
              include: [
                {
                  model: Siswa,
                  as: 'siswa',
                  attributes: ['id', 'nis', 'name'],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const kelaswalas = user.wala.kelas.id;

    const filterdataguru = await Guru.findAll({
      attributes: ['id', 'nip', 'nama'],
      include: [
        {
          model: Kelas,
          as: 'kelas',
          attributes: ['id', 'name_kelas'],
          through: {
            attributes: [],
          },
          where: {
            id: kelaswalas,
          },
          include: [
            {
              model: Siswa,
              as: 'siswa',
              attributes: ['id', 'nis', 'name'],
            },
          ],
        },
        {
          model: Mapel,
          as: 'mapel',
          attributes: ['id', 'name_mapel'],
        },
        {
          model: TahunAjar,
          attributes: ['id', 'semester_aktif', 'thn_ajaran'],
          as: 'thn_ajar',
        },
      ],
    });

    const siswaKelas = await Siswa.findAll({
      attributes: ['id'],
      where: {
        kelasId: kelaswalas
      }
    });


    const siswaIds = siswaKelas.map(siswa => siswa.id);

    const nk = await NK.findAll({
      attributes: [
        'id', 'guruId', 'siswaId', 'proses1', 'proses2', 'proses3', 'proses4', 'proses5', 'proses6', 'proses7', 'proses8',
        'proyek1', 'proyek2', 'proyek3', 'proyek4', 'proyek5', 'proyek6', 'proyek7', 'proyek8',
        'produk1', 'produk2', 'produk3', 'produk4', 'produk5', 'produk6', 'produk7', 'produk8'
      ],
      where: {
        siswaId: siswaIds
      },
    });

    const np = await NP.findAll({
      attributes: [
        'id', 'siswaId', 'guruId', 'uh1', 'uh2', 'uh3', 'uh4', 'uh5', 'uh6', 'uh7', 'uh8', 'th1', 'th2', 'th3',
        'th4', 'th5', 'th6', 'th7', 'th8', 'uts', 'uas'],
      where: {
        siswaId: siswaIds
      },
    });
    const profileData = {
      user: user,
      filterdataguru: filterdataguru,
      nk: nk,
      np: np,
    };
    res.status(200).json(profileData);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

    console.log(refreshToken)

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};