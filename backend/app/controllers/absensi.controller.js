const db = require("../models");
const { siswa: Siswa, absensi: Absensi, kelas: Kelas } = db;

exports.getAbsensi = async (req, res) => {
    try {
        let response;
        response = await Absensi.findAll({
            attributes: ['id', 'siswaId', 'lokasi_masuk', 'lokasi_pulang', 'tgl_absen', 'jm_masuk', 'jm_pulang', 'foto_masuk', 'foto_pulang'],
            include: [{
                model: Siswa,
                attributes: ['id', 'nis', 'name', 'tgl_lahir', 'jks', 'alamat', 'kelasId'],
                as: "siswa",
                include: [{
                    model: Kelas,
                    attributes: ['id', 'name_kelas'],
                    as: "kelas"
                  },]
            },
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getAbsensiById = async (req, res) => {
    try {
        const absen = await Absensi.findAll({
            where: {
                siswaId: req.params.siswaId
            }
        });
        if (!absen) return res.status(404).json({ msg: "Data tidak ditemukan" });
        //let response;
        let response = await Absensi.findAll({
            attributes: ['id', 'siswaId', 'lokasi_masuk', 'lokasi_pulang', 'tgl_absen', 'jm_masuk', 'jm_pulang', 'foto_masuk', 'foto_pulang'],
            include: [
                {
                    model: Siswa,
                    attributes: ['id', 'nis', 'name'],
                    as: "siswa",
                },
            ],
            where: {
                siswaId: req.params.siswaId
            }
        });
        res.status(200).json({success:response});
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
// exports.getAbsensiById = async (req, res) => {
//     try {
//         const absen = await Absensi.findOne({
//             where: {
//                 siswaId: req.params.siswaId
//             }
//         });
//         if (!absen) return res.status(404).json({ msg: "Data tidak ditemukan" });
//         let response;
//         response = await Absensi.findOne({
//             attributes: ['id', 'siswaId', 'lokasi_masuk', 'lokasi_pulang', 'tgl_absen', 'jm_masuk', 'jm_pulang', 'foto_masuk', 'foto_pulang'],
//             where: {
//                 siswaId: absen.siswaId
//             }
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// }

exports.getAbsensiId = async (req, res) => {
    try {
        const absen = await Absensi.findOne({
            where: {
                siswaId: req.params.siswaId,
                tgl_absen: req.params.tgl_absen,
            }
        });
        if (!absen) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        response = await Absensi.findOne({
            attributes: ['id', 'siswaId', 'lokasi_masuk', 'lokasi_pulang', 'tgl_absen', 'jm_masuk', 'jm_pulang', 'foto_masuk', 'foto_pulang'],
            where: {
                id: absen.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createAbsensi = async (req, res) => {
    const { siswaId, lokasi_masuk, tgl_absen, jm_masuk } = req.body;
    try {
        await Absensi.create({
            siswaId: siswaId,
            lokasi_masuk: lokasi_masuk,
            tgl_absen: tgl_absen,
            jm_masuk: jm_masuk,
            foto_masuk: req.file.filename,
        });
        res.status(201).json({ msg: "Absensi Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// exports.createAbsensi = async (req, res) => {
//     const { siswaId, lokasi_masuk, lokasi_pulang, tgl_absen, jm_masuk, jm_pulang, foto_masuk, foto_pulang } = req.body;
//     try {
//         await Absensi.create({
//             siswaId: siswaId,
//             lokasi_masuk: lokasi_masuk,
//             lokasi_pulang: lokasi_pulang,
//             tgl_absen: tgl_absen,
//             jm_masuk: jm_masuk,
//             jm_pulang: jm_pulang,
//             foto_masuk: req.file.filename,
//             foto_pulang: req.file.filename,
//         });
//         res.status(201).json({ msg: "Absensi Created Successfuly" });
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// }

exports.updateAbsensi = async (req, res) => {
    const data = {
        lokasi_pulang: req.body.lokasi_pulang,
        jm_pulang: req.body.jm_pulang,
        foto_pulang: req.file.filename,
    }
    try {
        const siswa = await Absensi.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!siswa) return res.status(404).json({ msg: "Data tidak ditemukan" });
        await Absensi.update( data, {
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({ msg: "Absensi Updated" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// exports.updateAbsensi = async (req, res) => {
//     try {
//         const siswa = await Absensi.findOne({
//             where: {
//                 id: req.params.id
//             }
//         });
//         if (!siswa) return res.status(404).json({ msg: "Data tidak ditemukan" });
//         await Absensi.update( req.body, {
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.status(201).json({ msg: "Absensi Updated" });
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// }

exports.deleteAbsensi = async (req, res) => {
    try {
        await Absensi.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({ msg: "Absensi Deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}