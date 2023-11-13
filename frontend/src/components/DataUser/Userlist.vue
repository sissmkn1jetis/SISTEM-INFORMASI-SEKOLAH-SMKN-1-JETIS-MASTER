<template>
  <div>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Data User</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">Dashboard</router-link>
              </li>
              <li class="breadcrumb-item active">Data User</li>
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
                    Tambah User
                  </button>
                </div>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table id="myTable" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th class="align-middle text-center">No</th>
                        <th class="align-middle text-center">Username</th>
                        <!-- <th class="align-middle text-center">Email</th> -->
                        <th class="align-middle text-center">Role</th>
                        <th class="align-middle text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(user, index) in users" :key="index.id">
                        <td class="align-middle text-center">
                          {{ index + 1 }}
                        </td>
                        <td class="align-middle text-center">
                          {{ user.username }}
                        </td>
                        <!-- <td class="align-middle text-center">
                          {{ user.email }}
                        </td> -->
                        <td
                          class="align-middle text-center"
                          v-if="user && user.role === 'guru'"
                        >
                          <span class="badge bg-warning">{{ user.role }}</span>
                        </td>
                        <td
                          class="align-middle text-center"
                          v-if="user && user.role === 'walas'"
                        >
                          <span class="badge bg-success">{{ user.role }}</span>
                        </td>
                        <td
                          class="align-middle text-center"
                          v-if="user && user.role === 'admin'"
                        >
                          <span class="badge bg-info">{{ user.role }}</span>
                        </td>
                        <td
                          class="align-middle text-center"
                          v-if="user && user.role === 'kabeng'"
                        >
                          <span class="badge bg-primary">{{ user.role }}</span>
                        </td>
                        <td class="align-middle text-center">
                          <a
                            href="#"
                            class="badge bg-info mr-2"
                            @click="showModalEdit(user.id)"
                            ><i class="fas fa-edit"></i
                          ></a>
                          <a
                            href="#"
                            class="badge bg-danger"
                            @click="deleteData(user.id)"
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
                Tambah Pengguna
              </h5>
              <h5
                class="modal-title"
                id="exampleModalLongTitle"
                v-show="statusmodal"
              >
                Ubah Pengguna
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
                    <p v-if="message" class="alert-danger">
                      {{ message }}
                    </p>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="username"
                        >Username:</label
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
                      <label class="col-sm-3 col-form-label" for="tempat_lahir"
                        >Tempat Lahir:</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          id="tempat_lahir"
                          placeholder="Tempat Lahir"
                          v-model="form.tempat_lahir"
                        />
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="
                            validationErrors && validationErrors.tempat_lahir
                          "
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.tempat_lahir }}
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="tanggal_lahir"
                        >Tanggal Lahir:</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="date"
                          class="form-control"
                          id="tanggal_lahir"
                          placeholder="Tanggal Lahir"
                          v-model="form.tanggal_lahir"
                        />
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="
                            validationErrors && validationErrors.tanggal_lahir
                          "
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.tanggal_lahir }}
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
                            name="jenis_kelamin"
                            id="jenis_kelamin"
                            value="L"
                            v-model="form.jenis_kelamin"
                          />
                          Laki-Laki
                        </label>
                        <label class="mb-0 mr-3">
                          <input
                            class="mr-1"
                            type="radio"
                            name="jenis_kelamin"
                            id="jenis_kelamin"
                            value="P"
                            v-model="form.jenis_kelamin"
                          />
                          Perempuan
                        </label>
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="
                            validationErrors && validationErrors.jenis_kelamin
                          "
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.jenis_kelamin }}
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="agama"
                        >Agama:</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          id="agama"
                          placeholder="Agama"
                          v-model="form.agama"
                        />
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="validationErrors && validationErrors.agama"
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.agama }}
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="alamat"
                        >Alamat:</label
                      >
                      <div class="col-sm-9">
                        <textarea
                          rows="3"
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
                    <!-- <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="almt_kel"
                        >Kelurahan:</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          id="almt_kel"
                          placeholder="Kelurahan"
                          v-model="form.almt_kel"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="almt_kec"
                        >Kecamatan:</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          id="almt_kec"
                          placeholder="Kecamatan"
                          v-model="form.almt_kec"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="almt_kab"
                        >Kabupaten/Kota:</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          id="almt_kab"
                          placeholder="Kabupaten/Kota"
                          v-model="form.almt_kab"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="almt_prov"
                        >Provinsi:</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          id="almt_prov"
                          placeholder="Provinsi"
                          v-model="form.almt_prov"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="inputEmail"
                        >Email:</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="email"
                          class="form-control"
                          id="inputEmail"
                          placeholder="Email"
                          v-model="form.email"
                        />
                      </div>
                    </div> -->
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
                      <label class="col-sm-3 col-form-label" for="confPassword"
                        >Confirm Password:</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="password"
                          class="form-control"
                          id="confPassword"
                          placeholder="*******"
                          v-model="form.confPassword"
                        />
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="
                            validationErrors && validationErrors.confPassword
                          "
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.confPassword }}
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="confPassword"
                        >Role:</label
                      >
                      <div class="col-sm-9">
                        <select class="custom-select" v-model="form.role">
                          <option disabled value="">-- Pilih --</option>
                          <option value="admin">Admin</option>
                          <option value="guru">Guru</option>
                          <option value="walas">Walas</option>
                          <option value="kabeng">Kabeng</option>
                        </select>
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="validationErrors && validationErrors.role"
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.role }}
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="phoneNumber"
                        >No.Tlp:</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          id="phoneNumber"
                          placeholder="No.Tlp"
                          v-model="form.no_telp"
                        />
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="validationErrors && validationErrors.no_telp"
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.no_telp }}
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
import User from "../../services/user.service";
import Swal from "sweetalert2";
import Joi from "joi";
export default {
  data() {
    return {
      loading: false,
      disabled: false,
      users: {},
      statusmodal: false,
      message: "",
      form: {
        id: "",
        username: "",
        password: "",
        confPassword: "",
        role: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        agama: "",
        alamat: "",
        no_telp: "",
      },
      validationErrors: null,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    // guru() {
    //   if (this.form && this.form.role) {
    //     return this.form.role === "guru";
    //   }
    //   return false;
    // },
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
    showModalEdit(user) {
      this.statusmodal = true;
      $("#modalmuncul").modal("show");
      this.getUserById(user);
    },
    getdata() {
      this.$Progress.start();
      User.getUser()
        .then((response) => {
          this.users = response.data;
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
      this.$Progress.finish();
    },
    getUserById(id) {
      User.getUserById(id)
        .then((response) => {
          this.form = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    validateData(data) {
      const schema = Joi.object({
        username: Joi.string().messages({
          "string.empty": "Username wajib diisi",
        }),
        tempat_lahir: Joi.string().messages({
          "string.empty": "Tempat Lahir wajib diisi",
        }),
        tanggal_lahir: Joi.date().messages({
          "date.base": "Format tanggal lahir tidak valid",
        }),
        jenis_kelamin: Joi.string().valid("L", "P").messages({
          "string.empty": "Jenis Kelamin wajib diisi",
        }),
        agama: Joi.string().messages({
          "string.empty": "Agama wajib diisi",
        }),
        alamat: Joi.string().messages({
          "string.empty": "Alamat wajib diisi",
        }),
        password: Joi.string().min(8).messages({
          "string.empty": "Password wajib diisi",
          "string.min": "Password yang anda masukkan kurang dari 8 karakter",
        }),
        confPassword: Joi.any().valid(Joi.ref("password")).messages({
          "string.empty": "Confirm Password wajib diisi",
          "any.only": "Confirm Password Tidak Cocok",
        }),
        role: Joi.string().valid("admin", "guru", "walas", "kabeng").messages({
          "string.empty": "Role wajib diisi",
        }),
        no_telp: Joi.string().pattern(new RegExp("^[0-9]+$")).messages({
          "string.empty": "Nomor telepon wajib diisi",
          "string.pattern.base": "Nomor telepon hanya boleh berisi angka",
        }),
      });

      // const { error } = schema.validate(data);
      // return error ? error.details : null;
      const { error } = schema.validate(data, { abortEarly: false });
      return error ? error.details : null;
    },

    simpanData() {
      this.$Progress.start();
      this.loading = true;
      this.disabled = true;

      // Validasi data sebelum simpan
      const dataToCreate = {
        username: this.form.username,
        tempat_lahir: this.form.tempat_lahir,
        tanggal_lahir: this.form.tanggal_lahir,
        jenis_kelamin: this.form.jenis_kelamin,
        agama: this.form.agama,
        alamat: this.form.alamat,
        password: this.form.password,
        confPassword: this.form.confPassword,
        role: this.form.role,
        no_telp: this.form.no_telp,
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

      User.createUser(this.form)
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
          this.message =
            (e.response && e.response.data && e.response.data.message) ||
            e.message ||
            e.toString();
        });
    },
    updateData() {
      this.$Progress.start();
      this.loading = true;
      this.disabled = true;

      // Validasi data sebelum simpan
      const dataToCreate = {
        username: this.form.username,
        tempat_lahir: this.form.tempat_lahir,
        tanggal_lahir: this.form.tanggal_lahir,
        jenis_kelamin: this.form.jenis_kelamin,
        agama: this.form.agama,
        alamat: this.form.alamat,
        password: this.form.password,
        confPassword: this.form.confPassword,
        role: this.form.role,
        no_telp: this.form.no_telp,
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

      User.updateUser(this.form.id, this.form)
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
          User.deleteUser(id)
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
      (this.form.username = ""),
        (this.form.email = ""),
        (this.form.password = ""),
        (this.form.confPassword = ""),
        (this.form.role = ""),
        (this.form.tempat_lahir = ""),
        (this.form.tanggal_lahir = ""),
        (this.form.jenis_kelamin = ""),
        (this.form.agama = ""),
        (this.form.alamat = ""),
        (this.form.almt_kel = ""),
        (this.form.almt_kec = ""),
        (this.form.almt_kab = ""),
        (this.form.almt_prov = ""),
        (this.form.no_telp = ""),
        (this.validationErrors = ""),
        (this.message = "");
    },
  },
};
</script>

<style lang="scss" scoped></style>
