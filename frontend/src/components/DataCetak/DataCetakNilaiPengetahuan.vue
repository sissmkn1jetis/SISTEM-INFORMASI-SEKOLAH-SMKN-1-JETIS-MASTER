<template>
  <div>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Data Nilai Pengetahuan</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">Dashboard</router-link>
              </li>
              <li class="breadcrumb-item active">Data Nilai Pengetahuan</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"></h3>
              </div>
              <form>
                <div class="card-body">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label" for="nip"
                      >NIP:</label
                    >
                    <div class="col-sm-9">
                      <p v-if="users && users.wala">
                        {{ users.wala.guru.nip }}
                      </p>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label" for="nama"
                      >Nama:</label
                    >
                    <div class="col-sm-9">
                      <p v-if="users && users.wala">
                        {{ users.wala.guru.nama }}
                      </p>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label" for="kelas"
                      >Kelas:</label
                    >
                    <div class="col-sm-9">
                      <p v-if="users && users.wala">
                        {{ users.wala.kelas.name_kelas }}
                      </p>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label" for="mapel"
                      >Pilih Mata Pelajaran:</label
                    >
                    <div class="col-sm-9">
                      <select
                        class="form-control select2"
                        v-if="filteredGuru"
                        v-model="selectedMapel"
                      >
                        <option
                          v-for="tes in filteredGuru"
                          :key="tes.id"
                          :value="tes"
                        >
                          {{ tes.mapel.name_mapel }} - {{ tes.nama }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
              <div v-if="selectedMapel && selectedMapel.kelas">
                <div v-for="kelas in selectedMapel.kelas" :key="kelas.id">
                  <div class="card-header">
                    <!-- <h3 class="card-title">Kelas: {{ kelas.name_kelas }}</h3> -->
                    <div class="card-tools">
                      <button
                        type="button"
                        class="btn btn-success mb-2"
                        @click="cetakPDFNP"
                      >
                        <i class="fas fa-print"></i>
                        Cetak PDF
                      </button>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table
                        id="myTable"
                        class="table table-bordered table-hover"
                      >
                        <thead>
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
                          <tr
                            v-for="(child, index) in kelas.siswa"
                            :key="child.id"
                          >
                            <td class="align-middle text-center">
                              {{ index + 1 }}
                            </td>
                            <td class="align-middle text-center">
                              {{ child.nis }}
                            </td>
                            <td class="align-middle text-center">
                              {{ child.name }}
                            </td>
                            <td
                              v-for="i in 8"
                              :key="i"
                              class="align-middle text-center"
                            >
                              <div v-if="npData.length > 0">
                                {{
                                  npData.find(
                                    (item) =>
                                      item.siswaId === child.id &&
                                      item.guruId === selectedMapel.id
                                  )
                                    ? npData.find(
                                        (item) =>
                                          item.siswaId === child.id &&
                                          item.guruId === selectedMapel.id
                                      )["uh" + i]
                                    : "-"
                                }}
                              </div>
                              <div v-else>-</div>
                            </td>
                            <td
                              v-for="i in 8"
                              :key="i"
                              class="align-middle text-center"
                            >
                              <div v-if="npData.length > 0">
                                {{
                                  npData.find(
                                    (item) =>
                                      item.siswaId === child.id &&
                                      item.guruId === selectedMapel.id
                                  )
                                    ? npData.find(
                                        (item) =>
                                          item.siswaId === child.id &&
                                          item.guruId === selectedMapel.id
                                      )["th" + i]
                                    : "-"
                                }}
                              </div>
                              <div v-else>-</div>
                            </td>
                            <td class="align-middle text-center">
                              <div v-if="npData.length > 0">
                                {{
                                  npData.find(
                                    (item) =>
                                      item.siswaId === child.id &&
                                      item.guruId === selectedMapel.id
                                  )
                                    ? npData.find(
                                        (item) =>
                                          item.siswaId === child.id &&
                                          item.guruId === selectedMapel.id
                                      )["uts"]
                                    : "-"
                                }}
                              </div>
                              <div v-else>-</div>
                            </td>
                            <td class="align-middle text-center">
                              <div v-if="npData.length > 0">
                                {{
                                  npData.find(
                                    (item) =>
                                      item.siswaId === child.id &&
                                      item.guruId === selectedMapel.id
                                  )
                                    ? npData.find(
                                        (item) =>
                                          item.siswaId === child.id &&
                                          item.guruId === selectedMapel.id
                                      )["uas"]
                                    : "-"
                                }}
                              </div>
                              <div v-else>-</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import UserService from "../../services/user.service";
export default {
  data() {
    return {
      content: null,
      users: {},
      selectedMapel: null,
      filteredGuru: [],
      filterguru: [],
      npData: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    UserService.getProfileWalas().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    getData() {
      UserService.getProfileWalas()
        .then((response) => {
          this.users = response.data.user;
          this.npData = response.data.np;
          this.filterguru = response.data.filterdataguru;
          const kelasId = this.users.wala.kelas.id;
          this.filteredGuru = this.filterguru.filter((guru) => {
            return guru.kelas[0].id === kelasId;
          });

          console.log("Users Data:", this.users);
          console.log("Filter Guru Data:", this.filterguru);
          console.log("Filtered Guru Data:", this.filteredGuru);
          console.log("NP Data:", this.npData);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async cetakPDFNP() {
      try {
        await UserService.getProfileWalas().then((response) => {
          this.users = response.data.user;
          this.npData = response.data.np;
          this.filterguru = response.data.filterdataguru;
          const kelasId = this.users.wala.kelas.id;
          this.filteredGuru = this.filterguru.filter((guru) => {
            return guru.kelas[0].id === kelasId;
          });
        });

        const mapeldanguru = this.filteredGuru
          ? this.filteredGuru
              .map((guru) => `${guru.mapel.name_mapel} - ${guru.nama}`)
              .join(", ")
          : "";

        const tahunajran = this.filteredGuru
          ? this.filteredGuru
              .map((guru) => `${guru.thn_ajar.thn_ajaran}`)
              .join(", ")
          : "";

        const htmlContent = `
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
                border: 1px solid #dddddd;
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
            .display-4 {
                text-align: center;
            }
            .label {
                display: inline-block;
                width: 150px; 
                text-align: left; 
                font-weight: bold; 
            }
        </style>
            </head>
            <body>
            <div class="container">
                <h1 class="display-4">Data Nilai Pengetahuan</h1>
                  <p class="lead"><span class="label">NIP</span>: ${
                    this.users.wala.guru.nip
                  }</p>
                  <p class="lead"><span class="label">Nama</span>: ${
                    this.users.wala.guru.nama
                  }</p>
                  <p class="lead"><span class="label">Wali Kelas</span>: ${
                    this.users.wala.kelas.name_kelas
                  }</p>
                  <p class="lead"><span class="label">Mata Pelajaran</span>: ${mapeldanguru}</p>
                  <p class="lead"><span class="label">Tahun Pelajaran</span>: ${tahunajran}</p>
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
                                    ${this.filteredGuru
                                      .map((guru) =>
                                        guru.kelas[0].siswa.map(
                                          (siswa, index) => `
                  <tr>
                    <td class="align-middle text-center">${index + 1}</td>
                    <td class="align-middle text-center">${siswa.nis}</td>
                    <td class="align-middle text-center">${siswa.name}</td>
                    ${[...Array(8).keys()]
                      .map(
                        (i) => `
                      <td class="align-middle text-center">
                        ${this.getNilaiNP(siswa.id, guru.mapel.id, "uh", i + 1)}
                      </td>`
                      )
                      .join("")}
                    ${[...Array(8).keys()]
                      .map(
                        (i) => `
                      <td class="align-middle text-center">
                        ${this.getNilaiNP(siswa.id, guru.mapel.id, "th", i + 1)}
                      </td>`
                      )
                      .join("")}
                    <td class="align-middle text-center">
                      ${this.getNilaiNP(siswa.id, guru.mapel.id, "uts")}
                    </td>
                    <td class="align-middle text-center">
                      ${this.getNilaiNP(siswa.id, guru.mapel.id, "uas")}
                    </td>
                  </tr>
                `
                                        )
                                      )
                                      .join("")}
                </tbody>
            </table>
            </div>
            </body>
            </html>
          `;

        const response = await axios.post(
          "http://localhost:8080/api/pdfnilaipengetahuan",
          {
            htmlContent: htmlContent,
          },
          { responseType: "blob" }
        );

        const pdfUrl = URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const namaMapel = this.selectedMapel.mapel.name_mapel;
        const filename = `${namaMapel}_nilai_pengetahuan.pdf`;

        // Membuat elemen <a> untuk menautkan dan mengunduh file PDF
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        alert("error data");
        console.error("Error generating PDF:", error);
      }
    },

    // cetakPDFNP() {
    //   const requestData = {
    //     selectedMapel: this.selectedMapel,
    //   };

    //   UserService.CetakPDFNP(requestData, {
    //     withCredentials: true,
    //     responseType: "blob",
    //   })
    //     .then((response) => {
    //       const namaMapel = this.selectedMapel.mapel.name_mapel;
    //       const filename = `${namaMapel}_nilai_pengetahuan.pdf`;

    //       const blob = new Blob([response.data], {
    //         type: "application/pdf",
    //       });
    //       const url = window.URL.createObjectURL(blob);
    //       const link = document.createElement("a");
    //       link.href = url;
    //       link.setAttribute("download", filename);
    //       document.body.appendChild(link);
    //       link.click();
    //       window.URL.revokeObjectURL(url);
    //     })
    //     .catch((error) => {
    //       console.error("Gagal mencetak PDF:", error);
    //     });
    // },

    // getNilaiNP(siswaId, guruId, jenis, i) {
    //   const nilai = this.npData.find(
    //     (item) => item.siswaId === siswaId && item.guruId === guruId
    //   );
    //   if (nilai) {
    //     return nilai[jenis + i] || "-";
    //   }
    //   return "-";
    // },

    getNilaiNP(siswaId, guruId, jenis, i) {
      const nilai = this.npData.find(
        (item) => item.siswaId === siswaId && item.guruId === guruId
      );

      if (nilai) {
        if (jenis === "uts" || jenis === "uas") {
          return nilai[jenis] ? nilai[jenis] : "-";
        } else {
          return nilai[jenis + i] ? nilai[jenis + i] : "-";
        }
      } else {
        return "-";
      }
    },
  },
};
</script>