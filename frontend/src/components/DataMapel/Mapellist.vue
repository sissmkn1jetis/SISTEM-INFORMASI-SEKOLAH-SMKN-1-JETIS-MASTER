<template>
  <div>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Data Mata Pelajaran</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">Dashboard</router-link>
              </li>
              <li class="breadcrumb-item active">Data Mata Pelajaran</li>
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
                    Tambah Mata Pelajaran
                  </button>
                </div>
              </div>
              <div class="card-body">
                <table id="myTable" class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th class="align-middle text-center">No</th>
                      <th class="align-middle text-center">Mata Pelajaran</th>
                      <th class="align-middle text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(mapel, index) in mapels" :key="index.id">
                      <td class="align-middle text-center">
                        {{ index + 1 }}
                      </td>
                      <td class="align-middle text-center">
                        {{ mapel.name_mapel }}
                      </td>
                      <td class="align-middle text-center">
                        <a
                          href="#"
                          class="badge bg-info mr-2"
                          @click="showModalEdit(mapel.id)"
                          id="edit"
                          ><i class="fas fa-edit"></i
                        ></a>
                        <a
                          href="#"
                          class="badge bg-danger"
                          @click="deleteData(mapel.id)"
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
                v-show="statusmodal"
              >
                Tambah Mata Pelajaran
              </h5>
              <h5
                class="modal-title"
                id="exampleModalLongTitle"
                v-show="statusmodal"
              >
                Ubah Mata Pelajaran
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
                      <label class="col-sm-3 col-form-label" for="name_mapel"
                        >Mata Pelajaran:</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          id="name_mapel"
                          placeholder="Mata Pelajaran"
                          v-model="form.name_mapel"
                        />
                        <div
                          class="alert alert-danger"
                          role="alert"
                          v-if="validationErrors && validationErrors.name_mapel"
                        >
                          <i class="fa fa-exclamation-circle"></i>
                          {{ validationErrors.name_mapel }}
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
import MapelService from "../../services/mapel.service";
import Swal from "sweetalert2";
import Joi from "joi";
export default {
  data() {
    return {
      loading: false,
      disabled: false,
      mapels: [],
      statusmodal: false,
      search: "",
      form: {
        id: "",
        name_mapel: "",
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
    showModalEdit(mapel) {
      this.statusmodal = true;
      $("#modalmuncul").modal("show");
      this.getMapelById(mapel);
    },
    getdata() {
      this.$Progress.start();
      MapelService.getMapel()
        .then((response) => {
          this.mapels = response.data;
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

    getMapelById(id) {
      MapelService.getMapelById(id)
        .then((response) => {
          this.form = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    validateData(data) {
      const schema = Joi.object({
        name_mapel: Joi.string().required().messages({
          "string.empty": "Mata Pelajaran wajib diisi",
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
        name_mapel: this.form.name_mapel,
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

      MapelService.createMapel(this.form)
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
        name_mapel: this.form.name_mapel,
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

      MapelService.updateMapel(this.form.id, this.form)
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
          MapelService.deleteMapel(id)
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
      (this.form.name_mapel = ""), (this.validationErrors = "");
    },
  },
};
</script>