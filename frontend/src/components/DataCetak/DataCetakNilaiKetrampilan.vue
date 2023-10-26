<template>
  <div>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Data Nilai Ketrampilan</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">Dashboard</router-link>
              </li>
              <li class="breadcrumb-item active">Data Nilai Ketrampilan</li>
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
                        @click="cetakPDFNK"
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
                              {{
                                getNilaiNK(
                                  child.id,
                                  selectedMapel.id,
                                  "proses",
                                  i
                                )
                              }}
                            </td>
                            <td
                              v-for="i in 8"
                              :key="i"
                              class="align-middle text-center"
                            >
                              {{
                                getNilaiNK(
                                  child.id,
                                  selectedMapel.id,
                                  "proyek",
                                  i
                                )
                              }}
                            </td>
                            <td
                              v-for="i in 8"
                              :key="i"
                              class="align-middle text-center"
                            >
                              {{
                                getNilaiNK(
                                  child.id,
                                  selectedMapel.id,
                                  "produk",
                                  i
                                )
                              }}
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
      nkData: [],
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
          this.nkData = response.data.nk;
          this.filterguru = response.data.filterdataguru;
          const kelasId = this.users.wala.kelas.id;
          this.filteredGuru = this.filterguru.filter((guru) => {
            return guru.kelas[0].id === kelasId;
          });

          console.log("Users Data:", this.users);
          console.log("Filter Guru Data:", this.filterguru);
          console.log("Filtered Guru Data:", this.filteredGuru);
          console.log("NK Data:", this.nkData);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    cetakPDFNK() {
      const requestData = {
        selectedMapel: this.selectedMapel,
      };

      UserService.CetakPDFNK(requestData, {
        withCredentials: true,
        responseType: "blob",
      })
        .then((response) => {
          const namaMapel = this.selectedMapel.mapel.name_mapel;
          const filename = `${namaMapel}_nilai_ketrampilan.pdf`;

          const blob = new Blob([response.data], {
            type: "application/pdf",
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.log("Gagal mencetak PDF:", error);
        });
    },

    // async cetakPDFNK() {
    //   try {
    //     const requestData = {
    //       selectedMapel: this.selectedMapel,
    //     };

    //     // Replace with the correct URL to your PDF generation endpoint
    //     const apiUrl = "http://localhost:8080/api/pdfnilaiketrampilan";

    //     const response = await axios.post(apiUrl, requestData, {
    //       responseType: "blob",
    //       withCredentials: true, // Include cookies if needed for authentication
    //     });

    //     const blob = new Blob([response.data], {
    //       type: "application/pdf",
    //     });

    //     const namaMapel = this.selectedMapel.mapel.name_mapel;
    //     const filename = `${namaMapel}_nilai_ketrampilan.pdf`;

    //     const url = window.URL.createObjectURL(blob);

    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", filename);
    //     document.body.appendChild(link);

    //     link.click();

    //     window.URL.revokeObjectURL(url);

    //     alert("PDF berhasil dicetak");
    //   } catch (error) {
    //     console.error("Gagal mencetak PDF:", error);
    //     alert("Gagal mencetak PDF. Silakan coba lagi nanti.");
    //   }
    // },

    getNilaiNK(siswaId, guruId, jenis, i) {
      const nilai = this.nkData.find(
        (item) => item.siswaId === siswaId && item.guruId === guruId
      );
      if (nilai) {
        return nilai[jenis + i] || "-";
      }
      return "-";
    },
  },
};
</script>