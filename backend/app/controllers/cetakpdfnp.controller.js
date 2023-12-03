const puppeteer = require('puppeteer');
const fs = require('fs');
const db = require('../models');
const { user: User, guru: Guru, walas: Walas, kelas: Kelas, mapel: Mapel, siswa: Siswa, nk: NK, np: NP } = db;


exports.cetakPDFNP = async (req, res) => {
    try {
        const { htmlContent } = req.body;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

        const pdfBuffer = await page.pdf({ format: 'A4' });

        await browser.close();

        res.contentType('application/pdf');
        res.send(pdfBuffer);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.cetakPDFNPseccond = async (req, res) => {
    try {
        const userId = req.userId;
        const selectedMapel = req.body.selectedMapel;
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
            selectedMapel: selectedMapel
        };

        const getNilaiNP = (siswaId, guruId, jenis, i) => {
            const nilai = np.find(
                item => item.siswaId === siswaId && item.guruId === guruId
            );
            if (nilai) {
                if (jenis === 'uts' || jenis === 'uas') {
                    return nilai[jenis] || '-';
                }
                return nilai[jenis + i] || '-';
            }
            return '-';
        };

        if (!profileData) {
            return res.status(404).json({ msg: 'Data tidak ditemukan' });
        }

        const users = profileData.user;
        const mapelData = profileData.filterdataguru;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const content = `
        <!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Data Nilai Ketrampilan</title>
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
            <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                padding: 8px;
                text-align: center;
                font-size: 12px;
            }
            th {
                background-color: #f2f2f2;
            }
            @page {
                size: A4;
                margin: 20px;
            }
            .container {
                margin: 0;
                padding: 0;
            }
        </style>
            </head>
            <body>
            <div class="container">
                <h1 class="display-4">Data Nilai Ketrampilan</h1>
                <p class="lead">NIP: ${users.wala.guru.nip}</p>
                <p class="lead">Nama: ${users.wala.guru.nama}</p>
                <p class="lead">Kelas: ${users.wala.kelas.name_kelas}</p>
                ${selectedMapel ? mapelData.map((guru) => `
                ${selectedMapel.id === guru.id ? `<p class="lead">Mapel: ${guru.mapel.name_mapel} - ${guru.nama}</p>` : ''}
            `).join('') : ''}
                <table class="table table-bordered table-striped">
                <thead>
            <tr>
            <tr>
            <th colSpan="32" class="text-center">
              Nilai Pengetahuan
            </th>
          </tr>
          <tr>
            <th rowSpan="2" class="align-middle">No</th>
            <th rowSpan="2" class="align-middle text-center">
              NIS
            </th>
            <th rowSpan="2" class="align-middle text-center">
              Siswa
            </th>
            <th colSpan="8" class="text-center">
              Ulangan Harian
            </th>
            <th colSpan="8" class="text-center">
              Tugas Harian
            </th>
            <th rowSpan="2" class="align-middle text-center">
              UTS
            </th>
            <th rowSpan="2" class="align-middle text-center">
              UAS
            </th>
          </tr>
          <tr>
            <th class="text-center">1</th>
            <th class="text-center">2</th>
            <th class="text-center">3</th>
            <th class="text-center">4</th>
            <th class="text-center">5</th>
            <th class="text-center">6</th>
            <th class="text-center">7</th>
            <th class="text-center">8</th>
            <th class="text-center">1</th>
            <th class="text-center">2</th>
            <th class="text-center">3</th>
            <th class="text-center">4</th>
            <th class="text-center">5</th>
            <th class="text-center">6</th>
            <th class="text-center">7</th>
            <th class="text-center">8</th>
          </tr>
          </thead>
                <tbody>
                        ${selectedMapel && selectedMapel.kelas && selectedMapel.kelas.length > 0 ? selectedMapel.kelas.map((kelas) => `
                            ${kelas.siswa && kelas.siswa.length > 0 ? kelas.siswa.map((siswa, index) => `
                                <tr>
                                    <td class="align-middle">${index + 1}</td>
                                    <td class="align-middle" style="width: 10%;">${siswa.nis}</td>
                                    <td class="align-middle" style="width: 30%;">${siswa.name}</td>
                                    ${Array.from({ length: 8 }, (_, i) => `<td class="align-middle">${getNilaiNP(siswa.id, selectedMapel.id, 'uh', i + 1) || '-'}</td>`).join('')}
                                    ${Array.from({ length: 8 }, (_, i) => `<td class="align-middle">${getNilaiNP(siswa.id, selectedMapel.id, 'th', i + 1) || '-'}</td>`).join('')}
                                    <td style="text-align: center;">${getNilaiNP(siswa.id, selectedMapel.id, 'uts') || '-'}</td>
                                    <td style="text-align: center;">${getNilaiNP(siswa.id, selectedMapel.id, 'uas') || '-'}</td>
                                </tr>
                            `).join('') : ''}
                    `).join('') : ''}
                </tbody>
            </table>
            </div>
            </body>
            </html>

        `;

        await page.setContent(content);

        const namaMapel = selectedMapel ? selectedMapel.mapel.name_mapel : "nilai_pengetahuan";
        const filename = `${namaMapel}.pdf`;

        // await page.pdf({ path: 'nilai_pengetahuan.pdf', format: 'A4' });

        const pdfBuffer = await page.pdf({ format: 'A4' });

        res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'attachment; filename=nilai_pengetahuan.pdf');

        res.setHeader('Content-Disposition', `attachment; filename=Nilai-pengetahuan-${filename}`);

        res.send(pdfBuffer);

        await browser.close();

        // res.status(200).json({ msg: 'PDF berhasil dicetak' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};