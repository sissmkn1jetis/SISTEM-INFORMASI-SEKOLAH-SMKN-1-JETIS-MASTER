<template>
  <div>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Data Presensi</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">Dashboard</router-link>
              </li>
              <li class="breadcrumb-item active">Data Presensi</li>
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
                <!-- <div class="card-tools">
                  <button type="button" class="btn btn-success mb-2" @click="showModal">
                    Tambah Siswa
                  </button>
                </div> -->
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table id="myTable" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th class="align-middle text-center">No</th>
                        <th class="align-middle text-center">NIS</th>
                        <th class="align-middle text-center">Siswa</th>
                        <th class="align-middle text-center">Lokasi Masuk</th>
                        <th class="align-middle text-center">Lokasi Pulang</th>
                        <th class="align-middle text-center">Tgl Absen</th>
                        <th class="align-middle text-center">Jam Masuk</th>
                        <th class="align-middle text-center">Jam Pulang</th>
                        <th class="align-middle text-center">Foto Masuk</th>
                        <th class="align-middle text-center">Foto Pulang</th>
                        <th class="align-middle text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(absen, index) in absensi" :key="index.id">
                        <td class="align-middle text-center">
                          {{ index + 1 }}
                        </td>
                        <td class="align-middle text-center">
                          {{ absen.siswa.nis }}
                        </td>
                        <td class="align-middle text-center">
                          {{ absen.siswa.name }}
                        </td>
                        <td class="align-middle text-center">
                          <a v-bind:href="'https://www.google.com/maps/search/?api=1&query='+absen.lokasi_masuk" target="_blank">{{ absen.lokasi_masuk }}</a>
                        </td>
                        <td class="align-middle text-center">
                          <a v-bind:href="'https://www.google.com/maps/search/?api=1&query='+absen.lokasi_pulang" target="_blank">{{ absen.lokasi_pulang }}</a>
                        </td>
                        <td class="align-middle text-center">
                          {{ absen.tgl_absen }}
                        </td>
                        <td class="align-middle text-center">
                          {{ absen.jm_masuk }}
                        </td>
                        <td class="align-middle text-center">
                          {{ absen.jm_pulang }}
                        </td>
                        <td class="align-middle text-center">
                          <img :src="'https://api1.sissmkn1jetis.my.id/uploads/absen/'+absen.foto_masuk" width="100"/>
                        </td>
                        <td class="align-middle text-center">
                          <img :src="'https://api1.sissmkn1jetis.my.id/uploads/absen/'+absen.foto_pulang" width="100"/>
                        </td>
                        <td class="align-middle text-center">
                          <!-- <a href="#" class="badge bg-info mr-2" @click="showModalEdit(siswa.id)"><i
                              class="fas fa-edit"></i></a> -->
                          <a href="#" class="badge bg-danger" @click="deleteData(absen.id)"><i
                              class="fas fa-trash-alt"></i></a>
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
      <!-- <div class="modal fade" id="modalmuncul" tabindex="-1" role="dialog" aria-labelledby="modalmuncul1"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle" v-show="!statusmodal">
                Tambah Siswa
              </h5>
              <h5 class="modal-title" id="exampleModalLongTitle" v-show="statusmodal">
                Ubah Siswa
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="resetForm()">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="card card-default"> -->
                <!-- /.card-header -->
                <!-- form start -->
                <!-- <form @submit.prevent="statusmodal ? updateData() : simpanData()">
                  <div class="card-body">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="nis">NIS:</label>
                      <div class="col-sm-9">
                        <input type="number" class="form-control" id="nis" placeholder="NIS" v-model="form.nis"
                          required />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="name">Name:</label>
                      <div class="col-sm-9">
                        <input type="text" class="form-control" id="name" placeholder="Name" v-model="form.name"
                          required />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="tgl_lahir">Tanggal Lahir:</label>
                      <div class="col-sm-9">
                        <input type="date" class="form-control" id="tgl_lahir" placeholder="Tanggal Lahir"
                          v-model="form.tgl_lahir" required />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Jenis Kelamin:</label>
                      <div class="col-sm-9 mt-2">
                        <label class="mb-0 mr-3">
                          <input class="mr-1" type="radio" name="jks" id="jks" value="L" v-model="form.jks" />
                          Laki-Laki
                        </label>
                        <label class="mb-0 mr-3">
                          <input class="mr-1" type="radio" name="jks" id="jks" value="P" v-model="form.jks" />
                          Perempuan
                        </label>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="alamat">Alamat:</label>
                      <div class="col-sm-9">
                        <textarea type="text" class="form-control" id="alamat" placeholder="Alamat" v-model="form.alamat"
                          required></textarea>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="kelasId">Kelas:</label>
                      <div class="col-sm-9">
                        <select class="form-control select2" v-model="form.kelasId" required>
                          <option disabled value="">-- Pilih --</option>
                          <option v-for="kelasId in kelas" :key="kelasId.id" :value="kelasId.id">
                            {{ kelasId.name_kelas }}
                          </option>
                        </select>
                      </div>
                    </div> -->
                    <!-- Prakerin Start -->
                    <!-- <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="tempat_pklId">Tempat PKL:</label>
                      <div class="col-sm-9">
                        <select class="form-control select2" v-model="form.tempat_pklId" required>
                          <option disabled value="">-- Pilih --</option>
                          <option v-for="tempat_pklId in tempatpkl" :key="tempat_pklId.id" :value="tempat_pklId.id">
                            {{ tempat_pklId.name_tempat }}
                          </option>
                        </select>
                      </div>
                    </div> -->
                    <!-- Prakerin End -->
                  <!-- </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="resetForm()">
                      Close
                    </button>
                    <button type="submit" class="btn btn-primary" :disabled="disabled" v-show="!statusmodal">
                      <i v-show="loading" class="fa fa-spinner fa-spin"></i>
                      Simpan
                    </button>
                    <button type="submit" class="btn btn-success" :disabled="disabled" v-show="statusmodal">
                      <i v-show="loading" class="fa fa-spinner fa-spin"></i>
                      Ubah
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </section>
  </div>
</template>
<script>
import AbsensiService from "../../services/absensi.service";
import SiswaService from "../../services/siswa.service";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      loading: false,
      disabled: false,
      siswas: {},
      absensi: {},
      statusmodal: false,
      form: {
        siswaId: "",
        lokasi_masuk: "",
        lokasi_pulang: "",
        tgl_absen: "",
        jm_masuk: "",
        jm_pulang: "",
        foto_masuk: "",
        foto_pulang: "",
      },
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.getdata();
  },
  methods: {
    showModal() {
      this.statusmodal = false;
      this.resetForm();
      $("#modalmuncul").modal("show");
    },
    showModalEdit(absen) {
      this.statusmodal = true;
      $("#modalmuncul").modal("show");
      this.getSiswaById(absen);
    },
    getdata() {
      this.$Progress.start();
      AbsensiService.getAbsensi()
        .then((response) => {
          this.absensi = response.data;
          $(function () {
            $("#myTable")
              .DataTable({
                responsive: false,
                lengthChange: true,
                autoWidth: true,
                buttons: ["copy", "csv", "excel", "pdf", "print"],
              })
              .buttons()
              .container()
              .appendTo("#myTable_wrapper .col-md-6:eq(0)");
          });
        })
        .catch((e) => {
          console.log(e);
        });

      SiswaService.getSiswa()
        .then((response) => {
          this.siswas = response.data;
        })
        .catch((e) => {
          console.log(e);
        });

      this.$Progress.finish();
    },
    getAbsensiById(id) {
      AbsensiService.getAbsensiById(id)
        .then((response) => {
          this.form = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    simpanData() {
      this.$Progress.start();
      this.loading = true;
      this.disabled = true;
      AbsensiService.createAbsensi(this.form)
        .then((response) => {
          this.from = response.data;
          console.log(response.data);
          this.getdata();
          this.resetForm();
          $("#modalmuncul").modal("hide");
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Data Berhasil Tersimpan",
          });
          this.$Progress.finish();
          this.loading = false;
          this.disabled = false;
        })
        .catch((e) => {
          this.$Progress.fail();
          this.loading = false;
          this.disabled = false;
          console.log(e);
        });
    },
    updateData() {
      this.$Progress.start();
      this.loading = true;
      this.disabled = true;
      AbsensiService.updateAbsensi(this.form.id, this.form)
        .then((response) => {
          this.from = response.data;
          console.log(response.data);
          this.getdata();
          this.resetForm();
          $("#modalmuncul").modal("hide");
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Data Berhasil Terupdate",
          });
          this.$Progress.finish();
          this.loading = false;
          this.disabled = false;
        })
        .catch((e) => {
          this.$Progress.fail();
          this.loading = false;
          this.disabled = false;
          console.log(e);
        });
    },

    deleteData(id) {
      Swal.fire({
        title: "Anda Yakin Ingin Menghapus Data Ini ?",
        text: "Klik Batal Untuk Membatalkan Penghapusan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus",
      }).then((result) => {
        if (result.value) {
          AbsensiService.deleteAbsensi(id)
            .then((response) => {
              Swal.fire("Terhapus", "Data Anda Sudah Terhapus", "success");
              console.log(response.data);
              this.getdata();
            })
            .catch(() => {
              Swal.fire("Gagal", "Data Gagal Terhapus", "warning");
            });
        }
      });
    },

    resetForm() {
      (this.form.siswaId = ""),
      (this.form.lokasi_masuk = ""),
      (this.form.lokasi_pulang = ""),
      (this.form.tgl_absen = ""),
      (this.form.jm_masuk = ""),
      (this.form.jm_pulang = ""),
      (this.form.foto_masuk = ""),
      (this.form.foto_pulang = "");
    },
  },
};
</script>
