const db = require("../models");
const { user: User, guru: Guru, walas: Walas, siswa: Siswa, np: NP, nk: NK, kelas: Kelas } = db;

exports.getTotal = async (req, res) => {
    try {
        const totalSiswa = await Siswa.count();
        const totalUser = await User.count();
        const totalWaliKelas = await Walas.count();
        const totalGuru = await Guru.count();

        res.json({
            totalSiswa,
            totalUser,
            totalWaliKelas,
            totalGuru,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil data total.' });
    }
};

exports.getTotalNilai = async (req, res) => {
    try {
        const userId = req.userId;
        const guru = await Guru.findOne({ where: { userId } });

        if (!guru) {
            return res.status(404).json({ message: 'Data guru tidak ditemukan.' });
        }
        const totalnp = await NP.count({ where: { guruId: guru.id } });
        const totalnk = await NK.count({ where: { guruId: guru.id } });

        res.json({
            totalnp,
            totalnk
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil data total nilai.' });
    }
};

exports.getTotalSiswaByWalas = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findOne({
            where: { id: userId },
            include: [
                {
                    model: Walas,
                    include: [
                        {
                            model: Kelas,
                            as: 'kelas',
                        },
                    ],
                },
            ],
        });

        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

        const kelaswalas = user.wala.kelas.id;

        const siswaKelas = await Siswa.findAll({
            attributes: ['id'],
            where: {
                kelasId: kelaswalas
            }
        });

        const totalSiswaKelas = siswaKelas.length;

        res.json({
            totalSiswaKelas
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};