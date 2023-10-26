const db = require("../models");
const { nk: NK, siswa: Siswa, kelas: Kelas, guru: Guru, user: User } = db;
const Op = require("sequelize");

exports.getNK = async (req, res) => {
    try {
        let userId = req.userId;
        const user = await User.findOne({
            attributes: ['id', 'username', 'role', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'agama', 'alamat', 'no_telp'],
            where: { id: userId },
            include: [
                {
                    model: Guru,
                    attributes: ['id', 'nip', 'nama', 'mapelId', 'thnAjarId', 'userId'],
                    where: { userId: userId },
                    as: 'guru',
                },
            ],
        });
        const guruIds = user.guru.id;
        const response = await NK.findAll({
            where: {
                guruId: guruIds
            },
            attributes: ['id', 'siswaId', 'guruId', 'proses1', 'proses2', 'proses3', 'proses4', 'proses5', 'proses6', 'proses7', 'proses8', 'proyek1',
                'proyek2', 'proyek3', 'proyek4', 'proyek5', 'proyek6', 'proyek7', 'proyek8', 'produk1', 'produk2', 'produk3', 'produk4', 'produk5', 'produk6', 'produk7', 'produk8'],
            include: [
                {
                    model: Siswa,
                    attributes: ['id', 'name'],
                    as: "siswa",
                },
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getNKById = async (req, res) => {

    try {
        const ketrampilan = await NK.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!ketrampilan) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        response = await NK.findOne({
            attributes: ['id', 'siswaId', 'proses1', 'proses2', 'proses3', 'proses4', 'proses5', 'proses6', 'proses7', 'proses8', 'proyek1',
                'proyek2', 'proyek3', 'proyek4', 'proyek5', 'proyek6', 'proyek7', 'proyek8', 'produk1', 'produk2', 'produk3', 'produk4', 'produk5', 'produk6', 'produk7', 'produk8'],
            where: {
                // [Op.and]: [{ id: ketrampilan.id }, { guruId: req.userId }]
                // guruId: req.userId
                id: ketrampilan.id
            },
            include: [
                {
                    model: Siswa,
                    attributes: ['id', 'name'],
                    as: "siswa"
                },
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// exports.createNK = async (req, res) => {
//     const { proses1, proses2, proses3, proses4, proses5, proses6, proses7, proses8, proyek1, proyek2, proyek3, proyek4, proyek5, proyek6, proyek7, proyek8, produk1, produk2, produk3, produk4, produk5, produk6, produk7, produk8, } = req.body;
//     const siswa = await Siswa.findByPk(req.params.siswaId);
//     if (!siswa) {
//         return res.status(404).json({ message: 'Siswa tidak ditemukan' });
//     }
//     try {
//         await NK.create({
//             siswaId: siswa.id,
//             guruId: req.userId,
//             proses1: proses1,
//             proses2: proses2,
//             proses3: proses3,
//             proses4: proses4,
//             proses5: proses5,
//             proses6: proses6,
//             proses7: proses7,
//             proses8: proses8,
//             proyek1: proyek1,
//             proyek2: proyek2,
//             proyek3: proyek3,
//             proyek4: proyek4,
//             proyek5: proyek5,
//             proyek6: proyek6,
//             proyek7: proyek7,
//             proyek8: proyek8,
//             produk1: produk1,
//             produk2: produk2,
//             produk3: produk3,
//             produk4: produk4,
//             produk5: produk5,
//             produk6: produk6,
//             produk7: produk7,
//             produk8: produk8,
//         });
//         res.status(201).json({ msg: "Nilai Created" });
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// }


exports.createNK = async (req, res) => {
    const { proses1, proses2, proses3, proses4, proses5, proses6, proses7, proses8, proyek1, proyek2, proyek3, proyek4, proyek5, proyek6, proyek7, proyek8, produk1, produk2, produk3, produk4, produk5, produk6, produk7, produk8, } = req.body;
    // const siswa = await Siswa.findByPk(req.params.siswaId);
    // if (!siswa) {
    //     return res.status(404).json({ message: 'Siswa tidak ditemukan' });
    // }
    const siswaId = req.params.siswaId;
    try {
        const guru = await Guru.findOne({
            where: { userId: req.userId }
        });

        if (!guru) {
            return res.status(403).json({ error: 'Anda tidak memiliki izin untuk menilai siswa ini.' });
        }

        await NK.create({
            siswaId: siswaId,
            guruId: guru.id,
            proses1: proses1,
            proses2: proses2,
            proses3: proses3,
            proses4: proses4,
            proses5: proses5,
            proses6: proses6,
            proses7: proses7,
            proses8: proses8,
            proyek1: proyek1,
            proyek2: proyek2,
            proyek3: proyek3,
            proyek4: proyek4,
            proyek5: proyek5,
            proyek6: proyek6,
            proyek7: proyek7,
            proyek8: proyek8,
            produk1: produk1,
            produk2: produk2,
            produk3: produk3,
            produk4: produk4,
            produk5: produk5,
            produk6: produk6,
            produk7: produk7,
            produk8: produk8,
        });
        res.status(201).json({ msg: "Nilai Created" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.updateNK = async (req, res) => {
    try {
        await NK.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({ msg: "Nilai Ketrampilan Updated" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.deleteNK = async (req, res) => {
    try {
        await NK.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({ msg: "Nilai Deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}