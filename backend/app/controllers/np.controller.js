const db = require("../models");
const { np: NP, siswa: Siswa, kelas: Kelas, guru: Guru, user: User } = db;
const Op = require("sequelize");

exports.getNP = async (req, res) => {
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
        const response = await NP.findAll({
            where: {
                guruId: guruIds
            },
            attributes: ['id', 'siswaId', 'guruId', 'uh1', 'uh2', 'uh3', 'uh4', 'uh5', 'uh6', 'uh7', 'uh8', 'th1', 'th2', 'th3', 'th4', 'th5', 'th6', 'th7', 'th8', 'uts', 'uas'],
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

exports.getNPById = async (req, res) => {

    try {
        const pengetahuan = await NP.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!pengetahuan) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        response = await NP.findOne({
            attributes: ['id', 'siswaId', 'uh1', 'uh2', 'uh3', 'uh4', 'uh5', 'uh6', 'uh7', 'uh8', 'th1', 'th2', 'th3', 'th4', 'th5', 'th6', 'th7', 'th8', 'uts', 'uas'],
            where: {
                id: pengetahuan.id
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

exports.createNP = async (req, res) => {
    const { uh1, uh2, uh3, uh4, uh5, uh6, uh7, uh8, th1, th2, th3, th4, th5, th6, th7, th8, uts, uas } = req.body;
    const siswaId = req.params.siswaId;
    try {
        const guru = await Guru.findOne({
            where: { userId: req.userId }
        });

        if (!guru) {
            return res.status(403).json({ error: 'Anda tidak memiliki izin untuk menilai siswa ini.' });
        }

        await NP.create({
            siswaId: siswaId,
            guruId: guru.id,
            uh1: uh1,
            uh2: uh2,
            uh3: uh3,
            uh4: uh4,
            uh5: uh5,
            uh6: uh6,
            uh7: uh7,
            uh8: uh8,
            th1: th1,
            th2: th2,
            th3: th3,
            th4: th4,
            th5: th5,
            th6: th6,
            th7: th7,
            th8: th8,
            uts: uts,
            uas: uas,
        });
        res.status(201).json({ msg: "Nilai Created" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.updateNP = async (req, res) => {
    try {
        await NP.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({ msg: "Nilai pengetahuan Updated" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.deleteNP = async (req, res) => {
    try {
        await NP.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({ msg: "Nilai Deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}