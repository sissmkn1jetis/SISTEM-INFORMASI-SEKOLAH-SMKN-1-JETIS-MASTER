<template>
  <div>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Data Siswa</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">Dashboard</router-link>
              </li>
              <li class="breadcrumb-item active">Data Siswa</li>
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
                <div class="card-tools">
                  <button
                    type="button"
                    class="btn btn-success mb-2"
                    @click="showModal"
                  >
                    Tambah Siswa
                  </button>
                </div>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table id="myTable" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th class="align-middle text-center">No</th>
                        <th class="align-middle text-center">NIS</th>
                        <th class="align-middle text-center">Name</th>
                        <th class="align-middle text-center">Tanggal Lahir</th>
                        <th class="align-middle text-center">JK</th>
                        <th class="align-middle text-center">Alamat</th>
                        <th class="align-middle text-center">Kelas</th>
                        <!-- <th class="align-middle text-center">Tempat PKL</th> -->
                        <th class="align-middle text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(siswa, index) in siswas" :key="index.id">
                        <td class="align-middle text-center">
                          {{ index + 1 }}
                        </td>
                        <td class="align-middle text-center">
                          {{ siswa.nis }}
                        </td>
                        <td class="align-middle text-center">
                          {{ siswa.name }}
                        </td>
                        <td class="align-middle text-center">
                          {{ siswa.tgl_lahir }}
                        </td>
                        <td class="align-middle text-center">
                          {{ siswa.jks }}
                        </td>
                        <td class="align-middle text-center">
                          {{ siswa.alamat }}
                        </td>
                        <td class="align-middle text-center">
                          {{ siswa.kelas.name_kelas }}
                        </td>
                        <!-- <td class="align-middle text-center">
                          tempat_prakerin mengambil dari siswa controller getSiswa (tidak dipakai)
                          {{ siswa.tempat_prakerin.name_tempat }}
                        </td> -->
                        <td class="align-middle text-center">
                          <a
                            href="#"
                            class="badge bg-info mr-2"
                            @click="showModalEdit(siswa.id)"
                            ><i class="fas fa-edit"></i
                          ></a>
                          <a
                            href="#"
                            class="badge bg-danger"
                            @click="deleteData(siswa.id)"
                            ><i class="fas fa-trash-alt"></i
                          ></a>
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
      <div
        class="modal fade"
        id="modalmuncul"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modalmuncul1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                class="modal-title"
                id="exampleModalLongTitle"
                v-show="!statusmodal"
              >
                Tambah Siswa
              </h5>
              <h5
                class="modal-title"
                id="exampleModalLongTitle"
                v-show="statusmodal"
              >
                Ubah Siswa
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" @click="resetForm()">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="card card-default">
                <!-- /.card-header -->
                <!-- form start -->
                <form
                  @submit.prevent="statusmodal ? updateData() : simpanData()"
                >
                  <div class="card-body">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="nis"
                        >NIS:</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="number"
                          class="form-control"
                          id="nis"
                          placeholder="NIS"
                          v-model="form.nis"
                        />
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="validationErrors && validationErrors.nis"
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.nis }}
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="name"
                        >Name:</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          placeholder="Name"
                          v-model="form.name"
                        />
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="validationErrors && validationErrors.name"
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.name }}
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="tgl_lahir"
                        >Tanggal Lahir:</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="date"
                          class="form-control"
                          id="tgl_lahir"
                          placeholder="Tanggal Lahir"
                          v-model="form.tgl_lahir"
                        />
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="validationErrors && validationErrors.tgl_lahir"
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.tgl_lahir }}
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label"
                        >Jenis Kelamin:</label
                      >
                      <div class="col-sm-9 mt-2">
                        <label class="mb-0 mr-3">
                          <input
                            class="mr-1"
                            type="radio"
                            name="jks"
                            id="jks"
                            value="L"
                            v-model="form.jks"
                          />
                          Laki-Laki
                        </label>
                        <label class="mb-0 mr-3">
                          <input
                            class="mr-1"
                            type="radio"
                            name="jks"
                            id="jks"
                            value="P"
                            v-model="form.jks"
                          />
                          Perempuan
                        </label>
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="validationErrors && validationErrors.jks"
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.jks }}
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="alamat"
                        >Alamat:</label
                      >
                      <div class="col-sm-9">
                        <textarea
                          type="text"
                          class="form-control"
                          id="alamat"
                          placeholder="Alamat"
                          v-model="form.alamat"
                        ></textarea>
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="validationErrors && validationErrors.alamat"
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.alamat }}
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="kelasId"
                        >Kelas:</label
                      >
                      <div class="col-sm-9">
                        <select
                          class="form-control select2"
                          v-model="form.kelasId"
                        >
                          <option disabled value="">-- Pilih --</option>
                          <option
                            v-for="kelasId in kelas"
                            :key="kelasId.id"
                            :value="kelasId.id"
                          >
                            {{ kelasId.name_kelas }}
                          </option>
                        </select>
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="validationErrors && validationErrors.kelasId"
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.kelasId }}
                        </div>
                      </div>
                    </div>
                    <!-- Prakerin Start (Tidak Dipakai) -->
                    <!-- <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="tempat_pklId"
                        >Tempat PKL:</label
                      >
                      <div class="col-sm-9">
                        <select
                          class="form-control select2"
                          v-model="form.tempat_pklId"
                          required
                        >
                          <option disabled value="">-- Pilih --</option>
                          <option
                            v-for="tempat_pklId in tempatpkl"
                            :key="tempat_pklId.id"
                            :value="tempat_pklId.id"
                          >
                            {{ tempat_pklId.name_tempat }}
                          </option>
                        </select>
                      </div>
                    </div> -->
                    <!-- Prakerin End -->
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      @click="resetForm()"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      :disabled="disabled"
                      v-show="!statusmodal"
                    >
                      <i v-show="loading" class="fa fa-spinner fa-spin"></i>
                      Simpan
                    </button>
                    <button
                      type="submit"
                      class="btn btn-success"
                      :disabled="disabled"
                      v-show="statusmodal"
                    >
                      <i v-show="loading" class="fa fa-spinner fa-spin"></i>
                      Ubah
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import SiswaService from "../../services/siswa.service";
import KelasService from "../../services/kelas.service";
//import TempatPService from "../../services/tempat_prakerin.service";
import Swal from "sweetalert2";
import Joi from "joi";
export default {
  data() {
    return {
      loading: false,
      disabled: false,
      siswas: {},
      kelas: {},
      tempatpkl: {},
      statusmodal: false,
      form: {
        id: "",
        nis: "",
        name: "",
        tgl_lahir: "",
        jks: "",
        alamat: "",
        kelasId: "",
        // tempat_pklId: "",
      },
      validationErrors: null,
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
    showModalEdit(siswa) {
      this.statusmodal = true;
      $("#modalmuncul").modal("show");
      this.getSiswaById(siswa);
    },
    getdata() {
      this.$Progress.start();
      SiswaService.getSiswa()
        .then((response) => {
          this.siswas = response.data;
          // $(function () {
          //   $("#myTable")
          //     .DataTable({
          //       responsive: false,
          //       lengthChange: true,
          //       autoWidth: true,
          //       buttons: ["copy", "csv", "excel", "pdf", "print"],
          //     })
          //     .buttons()
          //     .container()
          //     .appendTo("#myTable_wrapper .col-md-6:eq(0)");
          // });
          $(document).ready(function () {
            $("#myTable").dataTable();
          });
        })
        .catch((e) => {
          console.log(e);
        });

      // TempatPService.getTempatP()
      //   .then((response) => {
      //     this.tempatpkl = response.data;
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });

      KelasService.getKelas()
        .then((response) => {
          this.kelas = response.data;
        })
        .catch((e) => {
          console.log(e);
        });

      this.$Progress.finish();
    },
    getSiswaById(id) {
      SiswaService.getSiswaById(id)
        .then((response) => {
          this.form = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    validateData(data) {
      const schema = Joi.object({
        nis: Joi.number().required().messages({
          "number.base": "NIS wajib diisi.",
        }),
        name: Joi.string().required().messages({
          "string.empty": "Nama wajib diisi.",
        }),
        tgl_lahir: Joi.date().messages({
          "date.base": "Format tanggal lahir tidak valid",
        }),
        jks: Joi.string().valid("L", "P").messages({
          "string.empty": "Jenis Kelamin wajib diisi",
        }),
        alamat: Joi.string().messages({
          "string.empty": "Alamat wajib diisi",
        }),
        kelasId: Joi.number().required().messages({
          "number.base": "Kelas wajib dipilih.",
        }),
      });

      const { error } = schema.validate(data, { abortEarly: false });
      return error ? error.details : null;
    },

    simpanData() {
      this.$Progress.start();
      this.loading = true;
      this.disabled = true;

      // Validasi data sebelum simpan
      const dataToCreate = {
        nis: this.form.nis,
        name: this.form.name,
        tgl_lahir: this.form.tgl_lahir,
        jks: this.form.jks,
        alamat: this.form.alamat,
        kelasId: this.form.kelasId,
      };

      const validationError = this.validateData(dataToCreate);
      if (validationError) {
        // Setel pesan kesalahan ke variabel validationErrors
        this.validationErrors = validationError.reduce((errors, error) => {
          errors[error.context.key] = error.message;
          return errors;
        }, {});

        this.$Progress.fail();
        this.loading = false;
        this.disabled = false;
        return;
      }

      // Clear pesan kesalahan jika validasi berhasil
      this.validationErrors = null;

      SiswaService.createSiswa(this.form)
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

      // Validasi data sebelum simpan
      const dataToCreate = {
        nis: this.form.nis,
        name: this.form.name,
        tgl_lahir: this.form.tgl_lahir,
        jks: this.form.jks,
        alamat: this.form.alamat,
        kelasId: this.form.kelasId,
      };

      const validationError = this.validateData(dataToCreate);
      if (validationError) {
        // Setel pesan kesalahan ke variabel validationErrors
        this.validationErrors = validationError.reduce((errors, error) => {
          errors[error.context.key] = error.message;
          return errors;
        }, {});

        this.$Progress.fail();
        this.loading = false;
        this.disabled = false;
        return;
      }

      // Clear pesan kesalahan jika validasi berhasil
      this.validationErrors = null;

      SiswaService.updateSiswa(this.form.id, this.form)
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
          SiswaService.deleteSiswa(id)
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
      (this.form.nis = ""),
        (this.form.name = ""),
        (this.form.tgl_lahir = ""),
        (this.form.jks = ""),
        (this.form.alamat = ""),
        (this.form.kelasId = ""),
        (this.validationErrors = "");
      // (this.form.tempat_pklId = "");
    },
  },
};
</script>
