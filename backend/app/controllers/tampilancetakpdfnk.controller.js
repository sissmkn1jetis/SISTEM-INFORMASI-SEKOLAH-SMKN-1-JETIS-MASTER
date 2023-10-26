const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const getNilaiNK = (siswaId, guruId, jenis, i, nkData) => {
    const nilai = nkData.find(
        item => item.siswaId === siswaId && item.guruId === guruId
    );
    if (nilai) {
        return nilai[jenis + i] || '-';
    }
    return '-';
};

const generatePDFNK = (userData, selectedMapel, nkData) => {
    const doc = new PDFDocument();
    const pdfFilePath = path.join(__dirname, 'Nilai-Ketrampilan.pdf');

    doc.pipe(fs.createWriteStream(pdfFilePath));

    doc.fontSize(14).text('Data Nilai Ketrampilan', { align: 'center' });

    doc.fontSize(12).text(`NIP: ${userData.wala.guru.nip}`, { align: 'left' });
    doc.fontSize(12).text(`Nama: ${userData.wala.guru.nama}`, { align: 'left' });
    doc.fontSize(12).text(`Kelas: ${userData.wala.kelas.name_kelas}`, { align: 'left' });
    doc.fontSize(12).text(`Mapel: ${selectedMapel.mapel.name_mapel} - ${selectedMapel.nama}`, { align: 'left' });

    const tableHeaders = [
        'No', 'NIS', 'Siswa', 'Proses 1', 'Proses 2', 'Proses 3', 'Proses 4', 'Proses 5', 'Proses 6', 'Proses 7', 'Proses 8',
        'Proyek 1', 'Proyek 2', 'Proyek 3', 'Proyek 4', 'Proyek 5', 'Proyek 6', 'Proyek 7', 'Proyek 8',
        'Produk 1', 'Produk 2', 'Produk 3', 'Produk 4', 'Produk 5', 'Produk 6', 'Produk 7', 'Produk 8'
    ];

    const tableRows = [];

    selectedMapel.kelas.forEach(kelas => {
        kelas.siswa.forEach(siswa => {
            const nilaiProses = Array.from({ length: 8 }, (_, i) => getNilaiNK(siswa.id, selectedMapel.id, 'proses', i + 1, nkData));
            const nilaiProyek = Array.from({ length: 8 }, (_, i) => getNilaiNK(siswa.id, selectedMapel.id, 'proyek', i + 1, nkData));
            const nilaiProduk = Array.from({ length: 8 }, (_, i) => getNilaiNK(siswa.id, selectedMapel.id, 'produk', i + 1, nkData));

            tableRows.push([
                tableRows.length + 1,
                siswa.nis,
                siswa.name,
                ...nilaiProses,
                ...nilaiProyek,
                ...nilaiProduk,
            ]);
        });
    });

    const table = {
        headers: tableHeaders.map(header => {
            return { label: header, align: 'center' };
        }),
        rows: tableRows,
    };

    // doc.table(table, {
    //     prepareHeader: () => doc.font('Helvetica-Bold'),
    //     prepareRow: (row, i) => doc.font('Helvetica').fontSize(10),
    //     bottomMargin: 30,
    // });

    doc.end();

    console.log(`PDF file generated at: ${pdfFilePath}`);
};

module.exports = generatePDFNK;