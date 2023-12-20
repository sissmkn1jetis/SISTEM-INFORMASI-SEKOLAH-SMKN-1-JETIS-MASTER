<template>
  <div>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Data Akun Siswa</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">Dashboard</router-link>
              </li>
              <li class="breadcrumb-item active">Data Akun Siswa</li>
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
                    Tambah Akun
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
                        <th class="align-middle text-center">Nama</th>
                        <th class="align-middle text-center">Tempat PKL</th>
                        <th class="align-middle text-center">Status</th>
                        <th class="align-middle text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(akunsis, index) in akuns" :key="index.id">
                        <td class="align-middle text-center">
                          {{ index + 1 }}
                        </td>
                        <td class="align-middle text-center">
                          {{ akunsis.siswa.nis }}
                        </td>
                        <td class="align-middle text-center">
                          {{ akunsis.siswa.name }}
                        </td>
                        <td class="align-middle text-center">
                          {{ akunsis.tempat_prakerin.name_tempat }}
                        </td>
                        <td
                          class="align-middle text-center"
                          v-if="
                            akunsis.status &&
                            akunsis.status === 'AKTIF'
                          "
                        >
                          <span class="badge bg-success">{{
                            akunsis.status
                          }}</span>
                        </td>

                        <td
                          class="align-middle text-center"
                          v-if="
                            akunsis.status &&
                            akunsis.status === 'TIDAK AKTIF'
                          "
                        >
                          <span class="badge bg-danger">{{
                            akunsis.status
                          }}</span>
                        </td>
                        <td class="align-middle text-center">
                          <a
                            href="#"
                            class="badge bg-info mr-2"
                            @click="showModalEdit(akunsis.id)"
                            ><i class="fas fa-edit"></i
                          ></a>
                          <a
                            href="#"
                            class="badge bg-danger"
                            @click="deleteData(akunsis.id)"
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
                Tambah Akun
              </h5>
              <h5
                class="modal-title"
                id="exampleModalLongTitle"
                v-show="statusmodal"
              >
                Ubah Akun
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
                    <div class="form-group">
                      <div
                        v-if="message"
                        class="alert alert-danger"
                        role="alert"
                      >
                        <i class="fa fa-exclamation-circle"></i>
                        {{ message }}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <div class="form-group">
                          <label>Nama</label>
                          <select
                            class="form-control select2"
                            v-model="form.siswaId"
                          >
                            <option disabled value="">-- Pilih --</option>
                            <option
                              v-for="siswa in siswas"
                              :key="siswa.id"
                              :value="siswa.id"
                            >
                              {{ siswa.name }}
                            </option>
                          </select>
                          <div
                            class="alert alert-danger"
                            role="alert"
                            v-if="validationErrors && validationErrors.siswaId"
                          >
                            <i class="fa fa-exclamation-circle"></i>
                            {{ validationErrors.siswaId }}
                          </div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="form-group">
                          <label>NIS</label>
                          <select
                            class="form-control select2"
                            v-model="form.siswaId"
                            disabled
                          >
                            <option disabled value="">-- Pilih --</option>
                            <option
                              v-for="siswa in siswas"
                              :key="siswa.id"
                              :value="siswa.id"
                            >
                              {{ siswa.nis }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="username"
                        >Username</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          id="username"
                          placeholder="Username"
                          v-model="form.username"
                        />
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="validationErrors && validationErrors.username"
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.username }}
                        </div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="password"
                        >Password:</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="password"
                          class="form-control"
                          id="password"
                          placeholder="*******"
                          v-model="form.password"
                        />
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="validationErrors && validationErrors.password"
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.password }}
                        </div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="tempat_pklId"
                        >Tempat Prakerin:</label
                      >
                      <div class="col-sm-9">
                        <select
                          class="form-control select2"
                          v-model="form.tempat_pklId"
                        >
                          <option disabled value="">-- Pilih --</option>
                          <option
                            v-for="tempat in tpkl"
                            :key="tempat.id"
                            :value="tempat.id"
                          >
                            {{ tempat.name_tempat }}
                          </option>
                        </select>
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="validationErrors && validationErrors.tempat_pklId"
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.tempat_pklId }}
                        </div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="status"
                        >Status:</label
                      >
                      <div class="col-sm-9">
                        <div class="col-sm-9 mt-2">
                          <label class="mb-0 mr-3">
                            <input
                              class="mr-1"
                              type="radio"
                              name="status"
                              id="status"
                              value="AKTIF"
                              v-model="form.status"
                            />
                            AKTIF
                          </label>
                          <label class="mb-0 mr-3">
                            <input
                              class="mr-1"
                              type="radio"
                              name="status"
                              id="status"
                              value="TIDAK AKTIF"
                              v-model="form.status"
                            />
                            TIDAK AKTIF
                          </label>
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="validationErrors && validationErrors.status"
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.status }}
                        </div>
                        </div>
                      </div>
                    </div>
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
import KelasService from "../../services/kelas.service";
import AkunSiswaService from "../../services/akunsiswa.service";
import TempatPService from "../../services/tempat_prakerin.service";
import SiswaService from "../../services/siswa.service";

import Swal from "sweetalert2";
import Joi from "joi";
export default {
  data() {
    return {
      loading: false,
      disabled: false,

      tpkl: {},
      siswas: {},
      kelas: {},
      akuns: {},

      thn_ajars: {},
      users: [],
      gurus: [],
      statusmodal: false,
      form: {
        id: "",
        siswaId: "",
        username: "",
        password: "",
        tempat_pklId: "",
        status: "",
      },
      message: "",
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
    showModalEdit(akunsis) {
      this.statusmodal = true;
      $("#modalmuncul").modal("show");
      this.getByIdAkunSiswa(akunsis);
    },
    getdata() {
      this.$Progress.start();
      AkunSiswaService.getAkunSiswa()
        .then((response) => {
          this.akuns = response.data;
          $(document).ready(function () {
            $("#myTable").dataTable();
          });
        })
        .catch((e) => {
          console.log(e);
        });

      KelasService.getKelas()
        .then((response) => {
          this.kelas = response.data;
        })
        .catch((e) => {
          console.log(e);
        });

      TempatPService.getTempatP()
        .then((response) => {
          this.tpkl = response.data;
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
    getByIdAkunSiswa(id) {
      AkunSiswaService.getByIdAkunSiswa(id)
        .then((response) => {
          this.form = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    validateData(data) {
      const schema = Joi.object({
        siswaId: Joi.number().required().messages({
          "number.base": "Nama wajib dipilih.",
        }),
        username: Joi.number().messages({
          "number.base": "Username wajib diisi.",
        }),
        password: Joi.string().min(6).messages({
          "string.empty": "Password wajib diisi",
          "string.min": "Password yang anda masukkan kurang dari 6 karakter",
        }),
        tempat_pklId: Joi.number().required().messages({
          "number.base": "Tempat Prakerin wajib dipilih.",
        }),
        status: Joi.string().valid("AKTIF", "TIDAK AKTIF").messages({
          "string.empty": "Status wajib dipilih.",
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
        siswaId: this.form.siswaId,
        username: this.form.username,
        password: this.form.password,
        tempat_pklId: this.form.tempat_pklId,
        status: this.form.status,
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

      AkunSiswaService.createAkunSiswa(this.form)
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
          this.message =
            (e.response && e.response.data && e.response.data.message) ||
            e.message ||
            e.toString();
          console.log(e);
        });
    },
    updateData() {
      this.$Progress.start();
      this.loading = true;
      this.disabled = true;

      // Validasi data sebelum simpan
      const dataToCreate = {
        siswaId: this.form.siswaId,
        username: this.form.username,
        password: this.form.password,
        tempat_pklId: this.form.tempat_pklId,
        status: this.form.status,
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

      AkunSiswaService.updateAkunSiswa(this.form.id, this.form)
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
          this.message =
            (e.response && e.response.data && e.response.data.message) ||
            e.message ||
            e.toString();
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
          AkunSiswaService.deleteAkunSiswa(id)
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
        (this.form.username = ""),
        (this.form.password = ""),
        (this.form.tempat_pklId = ""),
        (this.form.status = ""),
        (this.message = ""),
        (this.validationErrors = "");
    },
  },
};
</script>