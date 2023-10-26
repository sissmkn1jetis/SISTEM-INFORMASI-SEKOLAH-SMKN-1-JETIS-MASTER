const db = require("../models");
const { walas: Walas, guru: Guru, kelas: Kelas, thn_ajar: TahunAjar, user: User } = db;

exports.getWalas = async (req, res) => {
    try {
        const response = await Walas.findAll({
            attributes: ['id', 'guruId', 'kelassId', 'thnAjarId', 'userId'],
            include: [
                // all: true,
                {
                    model: Guru,
                    attributes: ['id', 'nip', 'nama', 'mapelId', 'thnAjarId', 'userId'],
                    as: "guru"
                },
                {
                    model: Kelas,
                    attributes: ['id', 'name_kelas'],
                    as: "kelas"
                },
                {
                    model: TahunAjar,
                    attributes: ['id', 'semester_aktif', 'thn_ajaran'],
                    as: "thn_ajar"
                },
                {
                    model: User,
                    attributes: ['id', 'username', 'role', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'agama',
                        'alamat', 'no_telp'],
                    as: "user"
                }

            ]
        });
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


exports.getWalasById = async (req, res) => {
    try {
        const walas = await Walas.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!walas) return res.status(404).send({ message: "Data tidak ditemukan" });
        let response;
        response = await Walas.findOne({
            attributes: ['id', 'guruId', 'kelassId', 'thnAjarId', 'userId'],
            include: [
                // all: true,
                {
                    model: Guru,
                    attributes: ['id', 'nip', 'nama', 'mapelId', 'thnAjarId', 'userId'],
                    as: "guru"
                },
                {
                    model: Kelas,
                    attributes: ['id', 'name_kelas'],
                    as: "kelas"
                },
                {
                    model: TahunAjar,
                    attributes: ['id', 'semester_aktif', 'thn_ajaran'],
                    as: "thn_ajar"
                },
                {
                    model: User,
                    attributes: ['id', 'username', 'role', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'agama',
                        'alamat', 'no_telp'],
                    as: "user"
                }
            ]
        });
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.createWalas = async (req, res) => {
    const { guruId, kelassId, thnAjarId, userId } = req.body;
    const guru = await Walas.findOne({
        where: {
            guruId: req.body.guruId
        }
    });
    if (guru) return res.status(404).send({ message: 'Guru yang anda masukan telah menjadi Wali Kelas' });
    const kelas = await Walas.findOne({
        where: {
            kelassId: req.body.kelassId
        }
    });
    if (kelas) return res.status(404).send({ message: 'Kelas Yang Anda Masukkan Sudah terdapat Wali Kelas' });
    try {
        await Walas.create({
            guruId: guruId,
            kelassId: kelassId,
            thnAjarId: thnAjarId,
            userId: userId,
        });
        res.status(201).send({ message: "Wali Kelas Created" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.updateWalas = async (req, res) => {
    try {
        await Walas.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(201).send({ message: "Wali Kelas Updated" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.deleteWalas = async (req, res) => {
    try {
        await Walas.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(201).send({ message: "Wali Kelas Deleted" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}