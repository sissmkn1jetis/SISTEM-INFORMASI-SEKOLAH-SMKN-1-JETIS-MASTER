const db = require("../models");
const { guru: Guru, user: User, thn_ajar: TahunAjar, mapel: Mapel, kelas: Kelas, siswa: Siswa, nk: NK } = db;

exports.getGuru = async (req, res) => {
    try {
        const response = await Guru.findAll({
            attributes: ['id', 'nip', 'nama', 'mapelId', 'thnAjarId', 'userId'],
            // where: {
            //     userId: req.userId
            // },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'role', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'agama',
                        'alamat', 'no_telp'],
                    as: "user"
                },

                {
                    model: TahunAjar,
                    attributes: ['id', 'semester_aktif', 'thn_ajaran'],
                    as: "thn_ajar"
                },
                {
                    model: Mapel,
                    attributes: ['id', 'name_mapel'],
                    as: "mapel"
                },
                {
                    model: Kelas,
                    as: "kelas",
                    attributes: ['id', 'name_kelas', 'jurusanId'],
                    through: {
                        attributes: [],
                    },
                    include: [
                        {
                            model: Siswa,
                            as: 'siswa',
                            attributes: ['id', 'nis', 'name'],
                            // include: [
                            //     {
                            //         model: NK,
                            //         as: 'nk',
                            //         attributes: ['id', 'proses1', 'proses2', 'proses3', 'proses4', 'proses5', 'proses6', 'proses7', 'proses8', 'proyek1',
                            //             'proyek2', 'proyek3', 'proyek4', 'proyek5', 'proyek6', 'proyek7', 'proyek8', 'produk1', 'produk2', 'produk3', 'produk4', 'produk5', 'produk6', 'produk7', 'produk8'],
                            //         // where: { guruId: req.userId },
                            //     },
                            // ],
                        },
                    ],
                },

            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getGuruById = async (req, res) => {
    try {
        const guru = await Guru.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!guru) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        response = await Guru.findOne({
            attributes: ['id', 'nip', 'nama', 'mapelId', 'thnAjarId', 'userId'],
            where: {
                id: guru.id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'role', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'agama',
                        'alamat', 'no_telp'],
                    as: "user"
                },

                {
                    model: TahunAjar,
                    attributes: ['id', 'semester_aktif', 'thn_ajaran'],
                    as: "thn_ajar"
                },
                {
                    model: Mapel,
                    attributes: ['id', 'name_mapel'],
                    as: "mapel"
                },
                {
                    model: Kelas,
                    as: "kelas",
                    attributes: ['id', 'name_kelas', 'jurusanId'],
                    through: {
                        attributes: [],
                    }
                },
            ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createGuru = async (req, res) => {
    const { nip, nama, mapelId, thnAjarId, userId, kelasId } = req.body;
    const nipGuru = await Guru.findOne({
        where: {
            nip: req.body.nip
        }
    });
    if (nipGuru) return res.status(404).json({ msg: 'NIP Yang Anda Masukkan Sudah Tersedia...' });
    const user = await Guru.findOne({
        where: {
            userId: req.body.userId
        }
    });
    if (user) return res.status(404).send({ msg: 'User Sudah Terdaftar...' });
    try {
        const guru = await Guru.create({
            nip: nip,
            nama: nama,
            mapelId: mapelId,
            thnAjarId: thnAjarId,
            userId: userId,
        });

        if (kelasId && kelasId.length > 0) {
            const foundKelas = await Kelas.findAll({ where: { name_kelas: kelasId } });
            await guru.setKelas(foundKelas);
        }
        res.status(201).json({ msg: "Guru Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.updateGuru = async (req, res) => {
    const { nip, nama, mapelId, thnAjarId, userId, kelasId } = req.body;
    const gurus = await Guru.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!gurus) return res.status(404).json({ msg: "Data tidak ditemukan" });
    // const nipGuru = await Guru.findOne({
    //     where: {
    //         nip: req.body.nip
    //     }
    // });
    // if (nipGuru) return res.status(404).json({ msg: 'NIP Yang Anda Masukkan Sudah Tersedia...' });
    // const user = await Guru.findOne({
    //     where: {
    //         userId: req.body.userId
    //     }
    // });
    // if (user) return res.status(404).send({ msg: 'User yang anda ubah Sudah Terdaftar...' });
    try {
        await Guru.update({
            nip: nip,
            nama: nama,
            mapelId: mapelId,
            thnAjarId: thnAjarId,
            userId: userId,
        }, {
            where: {
                id: gurus.id
            }
        });

        if (kelasId && kelasId.length > 0) {
            const foundKelas = await Kelas.findAll({ where: { name_kelas: kelasId } });
            await gurus.setKelas(foundKelas);
        } else {
            await gurus.setKelas([]);
        }

        res.status(201).json({ msg: "Guru Updated" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.deleteGuru = async (req, res) => {
    const guru = await Guru.findOne({
        where: {
            id: req.params.id
        }
    });
    try {
        await Guru.destroy({
            where: {
                id: guru.id
            }
        });
        res.status(201).json({ msg: "Guru Deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// exports.addKelas = async (req, res) => {
//     const { kelasId } = req.body;
//     const { guruId } = req.params;
//     return Guru.findByPk(guruId)
//         .then((guru) => {
//             if (!guru) {
//                 res.status(400).send({
//                     message: "Guru tidak boleh kosong!"
//                 });
//                 return;
//             }
//             console.log("guru : ", guru)
//             return Kelas.findByPk(kelasId).then((kelas) => {
//                 if (!kelas) {
//                     res.status(400).send({
//                         message: "Kelas tidak boleh kosong!"
//                     });
//                     return;
//                 }

//                 guru.addKelas(kelas);
//                 console.log(`>> added Kelas id=${kelas.id} to Guru id=${guru.id}`);
//                 res.send(guru);
//             });
//         })
//         .catch((err) => {
//             console.log(">> Error while adding Kelas to Guru: ", err);
//         });
// }