// const generatePDFNK = require('./tampilancetakpdfnk.controller');
// const db = require('../models');
// const { user: User, guru: Guru, walas: Walas, kelas: Kelas, mapel: Mapel, siswa: Siswa, nk: NK, np: NP } = db;

// exports.cetakPDF = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const user = await User.findOne({
//             attributes: ['id', 'username', 'role', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'agama', 'alamat', 'no_telp'],
//             where: { id: userId },
//             include: [
//                 {
//                     model: Walas,
//                     attributes: ['id', 'guruId', 'kelassId', 'thnAjarId', 'userId'],
//                     include: [
//                         {
//                             model: Guru,
//                             as: 'guru',
//                             attributes: ['id', 'nip', 'nama'],
//                         },
//                         {
//                             model: Kelas,
//                             as: 'kelas',
//                             attributes: ['id', 'name_kelas'],
//                             include: [
//                                 {
//                                     model: Siswa,
//                                     as: 'siswa',
//                                     attributes: ['id', 'nis', 'name'],
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             ],
//         });

//         if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

//         const kelaswalas = user.wala.kelas.id;

//         const filterdataguru = await Guru.findAll({
//             attributes: ['id', 'nip', 'nama'],
//             include: [
//                 {
//                     model: Kelas,
//                     as: 'kelas',
//                     attributes: ['id', 'name_kelas'],
//                     through: {
//                         attributes: [],
//                     },
//                     where: {
//                         id: kelaswalas,
//                     },
//                     include: [
//                         {
//                             model: Siswa,
//                             as: 'siswa',
//                             attributes: ['id', 'nis', 'name'],
//                         },
//                     ],
//                 },
//                 {
//                     model: Mapel,
//                     as: 'mapel',
//                     attributes: ['id', 'name_mapel'],
//                 },
//             ],
//         });

//         const siswaKelas = await Siswa.findAll({
//             attributes: ['id'],
//             where: {
//                 kelasId: kelaswalas,
//             },
//         });

//         const siswaIds = siswaKelas.map(siswa => siswa.id);

//         const nk = await NK.findAll({
//             attributes: [
//                 'id', 'guruId', 'siswaId', 'proses1', 'proses2', 'proses3', 'proses4', 'proses5', 'proses6', 'proses7', 'proses8',
//                 'proyek1', 'proyek2', 'proyek3', 'proyek4', 'proyek5', 'proyek6', 'proyek7', 'proyek8',
//                 'produk1', 'produk2', 'produk3', 'produk4', 'produk5', 'produk6', 'produk7', 'produk8'
//             ],
//             where: {
//                 siswaId: siswaIds,
//             },
//         });

//         const np = await NP.findAll({
//             attributes: [
//                 'id', 'siswaId', 'guruId', 'uh1', 'uh2', 'uh3', 'uh4', 'uh5', 'uh6', 'uh7', 'uh8', 'th1', 'th2', 'th3',
//                 'th4', 'th5', 'th6', 'th7', 'th8', 'uts', 'uas'
//             ],
//             where: {
//                 siswaId: siswaIds,
//             },
//         });

//         const nkData = nk.map(item => item.toJSON());
//         // const npData = np.map(item => item.toJSON());

//         const selectedMapel = {
//             guru: {
//                 nama: filterdataguru[0].nama || null,
//             },
//             kelas: filterdataguru.map(guru => {
//                 const kelasInfo = guru.kelas.id || {};
//                 const kelasInfonama = guru.kelas.name_kelas || {};
//                 const siswaInfo = kelasInfo.siswa || [];

//                 return {
//                     id: kelasInfo || null,
//                     nama: kelasInfonama || 'Kelas tidak tersedia',
//                     siswa: siswaInfo.map(siswa => {
//                         return {
//                             id: siswa.id,
//                             nis: siswa.nis,
//                             name: siswa.name,
//                         };
//                     }),
//                 };
//             }),

//             mapel: {
//                 id: filterdataguru[0].mapel.id || null,
//                 name_mapel: filterdataguru[0].mapel.name_mapel || 'Mapel tidak tersedia',
//             },
//         };


//         console.log(user, selectedMapel, nkData);
//         generatePDFNK(user, selectedMapel, nkData);

//         res.status(200).json({ msg: "PDF berhasil dicetak" });
//     } catch (err) {
//         res.status(500).send({ message: err.message });
//     }
// };

// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const db = require('../models');
// const { user: User, guru: Guru, walas: Walas, kelas: Kelas, mapel: Mapel, siswa: Siswa, nk: NK, np: NP } = db;

// exports.cetakPDF = async (req, res) => {
//     try {

//         const userId = req.userId;

//         // Menggunakan Sequelize untuk mengambil data profil
//         const user = await User.findOne({
//             attributes: ['id', 'username', 'role', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'agama',
//                 'alamat', 'no_telp'],
//             where: { id: userId },
//             include: [
//                 {
//                     model: Walas,
//                     attributes: ['id', 'guruId', 'kelassId', 'thnAjarId', 'userId'],
//                     include: [
//                         {
//                             model: Guru,
//                             as: 'guru',
//                             attributes: ['id', 'nip', 'nama'],
//                         },
//                         {
//                             model: Kelas,
//                             as: 'kelas',
//                             attributes: ['id', 'name_kelas'],
//                             include: [
//                                 {
//                                     model: Siswa,
//                                     as: 'siswa',
//                                     attributes: ['id', 'nis', 'name'],
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             ],
//         });

//         if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

//         const kelaswalas = user.wala.kelas.id;

//         const filterdataguru = await Guru.findAll({
//             attributes: ['id', 'nip', 'nama'],
//             include: [
//                 {
//                     model: Kelas,
//                     as: 'kelas',
//                     attributes: ['id', 'name_kelas'],
//                     through: {
//                         attributes: [],
//                     },
//                     where: {
//                         id: kelaswalas,
//                     },
//                     include: [
//                         {
//                             model: Siswa,
//                             as: 'siswa',
//                             attributes: ['id', 'nis', 'name'],
//                         },
//                     ],
//                 },
//                 {
//                     model: Mapel,
//                     as: 'mapel',
//                     attributes: ['id', 'name_mapel'],
//                 },
//             ],
//         });

//         const siswaKelas = await Siswa.findAll({
//             attributes: ['id'],
//             where: {
//                 kelasId: kelaswalas
//             }
//         });

//         const siswaIds = siswaKelas.map(siswa => siswa.id);

//         const nk = await NK.findAll({
//             attributes: [
//                 'id', 'guruId', 'siswaId', 'proses1', 'proses2', 'proses3', 'proses4', 'proses5', 'proses6', 'proses7', 'proses8',
//                 'proyek1', 'proyek2', 'proyek3', 'proyek4', 'proyek5', 'proyek6', 'proyek7', 'proyek8',
//                 'produk1', 'produk2', 'produk3', 'produk4', 'produk5', 'produk6', 'produk7', 'produk8'
//             ],
//             where: {
//                 siswaId: siswaIds
//             },
//         });

//         const np = await NP.findAll({
//             attributes: [
//                 'id', 'siswaId', 'guruId', 'uh1', 'uh2', 'uh3', 'uh4', 'uh5', 'uh6', 'uh7', 'uh8', 'th1', 'th2', 'th3',
//                 'th4', 'th5', 'th6', 'th7', 'th8', 'uts', 'uas'],
//             where: {
//                 siswaId: siswaIds
//             },
//         });
//         const profileData = {
//             user: user,
//             filterdataguru: filterdataguru,
//             nk: nk,
//             np: np,
//         };

//         const getNilaiNK = (siswaId, guruId, jenis, i) => {
//             const nilai = nk.find(
//                 item => item.siswaId === siswaId && item.guruId === guruId
//             );
//             if (nilai) {
//                 return nilai[jenis + i] || '-';
//             }
//             return '-';
//         };

//         if (!profileData) {
//             return res.status(404).json({ msg: 'Data tidak ditemukan' });
//         }

//         const users = profileData.user;
//         const mapelData = profileData.filterdataguru.mapel = 1;
//         // const mapelData = profileData.filterdataguru.mapel;
//         const nkData = profileData.nk;

//         console.log(users, mapelData, nkData);

//         const doc = new PDFDocument();
//         const pdfStream = fs.createWriteStream('nilai_ketrampilan.pdf');

//         doc.pipe(pdfStream);

//         doc.fontSize(16).text('Data Nilai Ketrampilan', { align: 'center' });

//         doc.font('Helvetica-Bold').fontSize(12).text('NIP:', { continued: true }).font('Helvetica').text(users.wala.guru.nip);
//         doc.font('Helvetica-Bold').fontSize(12).text('Nama:', { continued: true }).font('Helvetica').text(users.wala.guru.nama);
//         doc.font('Helvetica-Bold').fontSize(12).text('Kelas:', { continued: true }).font('Helvetica').text(users.wala.kelas.name_kelas);

//         doc.font('Helvetica-Bold').fontSize(12).text('Nilai Ketrampilan', { align: 'center' });

//         doc.font('Helvetica-Bold').fontSize(12).text('No', { align: 'center', width: 20 });
//         doc.font('Helvetica-Bold').fontSize(12).text('NIS', { align: 'center', width: 60 });
//         doc.font('Helvetica-Bold').fontSize(12).text('Siswa', { align: 'center', width: 100 });

//         for (let i = 1; i <= 8; i++) {
//             doc.font('Helvetica-Bold').fontSize(12).text(`Proses ${i}`, { align: 'center', width: 40 });
//         }
//         for (let i = 1; i <= 8; i++) {
//             doc.font('Helvetica-Bold').fontSize(12).text(`Proyek ${i}`, { align: 'center', width: 40 });
//         }
//         for (let i = 1; i <= 8; i++) {
//             doc.font('Helvetica-Bold').fontSize(12).text(`Produk ${i}`, { align: 'center', width: 40 });
//         }

//         let rowIndex = 1;
//         for (const siswa of users.wala.kelas.siswa) {
//             doc.font('Helvetica').fontSize(12).text(rowIndex.toString(), { align: 'center', width: 20 });
//             doc.font('Helvetica').fontSize(12).text(siswa.nis, { align: 'center', width: 60 });
//             doc.font('Helvetica').fontSize(12).text(siswa.name, { align: 'center', width: 100 });

//             // Menambahkan nilai Proses
//             for (let i = 1; i <= 8; i++) {
//                 const nilaiProses = getNilaiNK(siswa.id, mapelData.id, 'proses', i, nkData);
//                 doc.font('Helvetica').fontSize(12).text(nilaiProses || '-', { align: 'center', width: 40 });
//             }

//             // Menambahkan nilai Proyek
//             for (let i = 1; i <= 8; i++) {
//                 const nilaiProyek = getNilaiNK(siswa.id, mapelData.id, 'proyek', i, nkData);
//                 doc.font('Helvetica').fontSize(12).text(nilaiProyek || '-', { align: 'center', width: 40 });
//             }

//             // Menambahkan nilai Produk
//             for (let i = 1; i <= 8; i++) {
//                 const nilaiProduk = getNilaiNK(siswa.id, mapelData.id, 'produk', i, nkData);
//                 doc.font('Helvetica').fontSize(12).text(nilaiProduk || '-', { align: 'center', width: 40 });
//             }

//             rowIndex++;
//         }

//         doc.end();

//         pdfStream.on('finish', () => {
//             res.status(200).json({ msg: 'PDF berhasil dicetak' });
//         });
//     } catch (err) {
//         res.status(500).send({ message: err.message });
//     }
// };



const puppeteer = require('puppeteer');
const fs = require('fs');
const db = require('../models');
const { user: User, guru: Guru, walas: Walas, kelas: Kelas, mapel: Mapel, siswa: Siswa, nk: NK, np: NP } = db;

exports.cetakPDFNK = async (req, res) => {
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


exports.cetakPDFNKsecond = async (req, res) => {
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

        const getNilaiNK = (siswaId, guruId, jenis, i) => {
            const nilai = nk.find(
                item => item.siswaId === siswaId && item.guruId === guruId
            );
            if (nilai) {
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
              <th colSpan="32" class="text-center">
                Nilai Ketrampilan
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
              <th colSpan="8" class="text-center">Proses</th>
              <th colSpan="8" class="text-center">Proyek</th>
              <th colSpan="8" class="text-center">Produk</th>
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
                                    ${Array.from({ length: 8 }, (_, i) => `<td class="align-middle">${getNilaiNK(siswa.id, selectedMapel.id, 'proses', i + 1) || '-'}</td>`).join('')}
                                    ${Array.from({ length: 8 }, (_, i) => `<td class="align-middle">${getNilaiNK(siswa.id, selectedMapel.id, 'proyek', i + 1) || '-'}</td>`).join('')}
                                    ${Array.from({ length: 8 }, (_, i) => `<td class="align-middle">${getNilaiNK(siswa.id, selectedMapel.id, 'produk', i + 1) || '-'}</td>`).join('')}
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

        const namaMapel = selectedMapel ? selectedMapel.mapel.name_mapel : "nilai_ketrampilan";
        const filename = `${namaMapel}.pdf`;

        // await page.pdf({ path: 'nilai_ketrampilan.pdf', format: 'A4' });

        const pdfBuffer = await page.pdf({ format: 'A4' });

        res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'attachment; filename=nilai_ketrampilan.pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Nilai-Ketrampilan-${filename}`);
        res.send(pdfBuffer);

        await browser.close();
        // res.status(200).json({ msg: 'PDF berhasil dicetak' });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.getcetakPDF = async (req, res) => {
    try {
        const userId = req.userId;
        const selectedMapel = req.query.selectedMapel;
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

        const getNilaiNK = (siswaId, guruId, jenis, i) => {
            const nilai = nk.find(
                item => item.siswaId === siswaId && item.guruId === guruId
            );
            if (nilai) {
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
              <th colSpan="32" class="text-center">
                Nilai Ketrampilan
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
              <th colSpan="8" class="text-center">Proses</th>
              <th colSpan="8" class="text-center">Proyek</th>
              <th colSpan="8" class="text-center">Produk</th>
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
                                    ${Array.from({ length: 8 }, (_, i) => `<td class="align-middle">${getNilaiNK(siswa.id, selectedMapel.id, 'proses', i + 1) || '-'}</td>`).join('')}
                                    ${Array.from({ length: 8 }, (_, i) => `<td class="align-middle">${getNilaiNK(siswa.id, selectedMapel.id, 'proyek', i + 1) || '-'}</td>`).join('')}
                                    ${Array.from({ length: 8 }, (_, i) => `<td class="align-middle">${getNilaiNK(siswa.id, selectedMapel.id, 'produk', i + 1) || '-'}</td>`).join('')}
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

        const namaMapel = selectedMapel ? selectedMapel.mapel.name_mapel : "nilai_ketrampilan";
        const filename = `${namaMapel}.pdf`;

        const pdfBuffer = await page.pdf({ format: 'A4' });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Nilai-Ketrampilan-${filename}`);

        res.send(pdfBuffer);

        await browser.close();

        res.status(200).json({ msg: 'PDF berhasil dicetak' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};








