<template>
  <div>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Data Guru</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">Dashboard</router-link>
              </li>
              <li class="breadcrumb-item active">Data Guru</li>
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
                    Tambah Guru
                  </button>
                </div>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table id="myTable" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th class="align-middle text-center">No</th>
                        <th class="align-middle text-center">NIP</th>
                        <th class="align-middle text-center">Nama</th>
                        <th class="align-middle text-center">Bidang Studi</th>
                        <th class="align-middle text-center">Mengajar Kelas</th>
                        <th class="align-middle text-center">Tahun Ajaran</th>
                        <th class="align-middle text-center">UserId</th>
                        <th class="align-middle text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(guru, index) in gurus" :key="index.id">
                        <td class="align-middle text-center">
                          {{ index + 1 }}
                        </td>
                        <td class="align-middle text-center">{{ guru.nip }}</td>
                        <td class="align-middle text-center">
                          {{ guru.nama }}
                        </td>
                        <td class="align-middle text-center">
                          {{ guru.mapel.name_mapel }}
                        </td>
                        <td class="align-middle text-center">
                          <li v-for="tes in guru.kelas" :key="tes.id">
                            {{ tes.name_kelas }}
                          </li>
                        </td>
                        <td class="align-middle text-center">
                          {{ guru.thn_ajar.thn_ajaran }}
                        </td>
                        <td class="align-middle text-center">
                          {{ guru.user.username }}
                        </td>
                        <td class="align-middle text-center">
                          <a
                            href="#"
                            class="badge bg-info mr-1"
                            @click="showModalEdit(guru.id)"
                            ><i class="fas fa-edit"></i
                          ></a>
                          <a
                            href="#"
                            class="badge bg-danger"
                            @click="deleteData(guru.id)"
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
                    <div v-if="message" class="alert alert-danger" role="alert">
                      {{ message }}
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="nip"
                        >NIP:</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          id="nip"
                          placeholder="NIP"
                          v-model="form.nip"
                          required
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="nama"
                        >Nama:</label
                      >
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          id="nama"
                          placeholder="Nama"
                          v-model="form.nama"
                          required
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="mapelId"
                        >Bidang Studi:</label
                      >
                      <div class="col-sm-9">
                        <select
                          class="form-control select2"
                          v-model="form.mapelId"
                          required
                        >
                          <option disabled value="">-- Pilih --</option>
                          <option
                            v-for="mapel in mapels"
                            :key="mapel.id"
                            :value="mapel.id"
                          >
                            {{ mapel.name_mapel }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <!-- <div v-for="kelass in kelas" :key="kelass.id">
                        <input
                          type="checkbox"
                          :id="kelass.id"
                          :value="kelass"
                          v-model="isikelas.kelasId"
                        />
                        <label :for="kelass.id">{{ kelass.name_kelas }}</label>
                      </div>
                      <div>
                        Selected Options:
                        <ul>
                          <li
                            v-for="kelass in isikelas.kelasId"
                            :key="kelass.id"
                          >
                            {{ kelass.name_kelas }}
                          </li>
                        </ul>
                      </div> -->
                      <label class="col-sm-3 col-form-label" for="kelasId"
                        >Kelas:</label
                      >
                      <div class="col-sm-9">
                        <!-- <select
                          class="form-control select2"
                          v-model="form.kelasId"
                          required
                        >
                          <option disabled value="">-- Pilih --</option>
                          <option
                            v-for="kelass in kelas"
                            :key="kelass.id"
                            :value="kelass.id"
                          >
                            {{ kelass.name_kelas }}
                          </option>
                        </select> -->
                        <div v-for="kelass in kelas" :key="kelass.id">
                          <label>
                            <input
                              type="checkbox"
                              :id="kelass.id"
                              :value="kelass.name_kelas"
                              v-model="kelasId"
                            />
                            {{ kelass.name_kelas }}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="thn_ajaran"
                        >Tahun Ajaran</label
                      >
                      <div class="col-sm-9">
                        <select
                          class="form-control select2"
                          v-model="form.thnAjarId"
                          required
                        >
                          <option disabled value="">-- Pilih --</option>
                          <option
                            v-for="thn_ajar in thn_ajars"
                            :key="thn_ajar.id"
                            :value="thn_ajar.id"
                          >
                            {{ thn_ajar.thn_ajaran }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="userId"
                        >UserId:</label
                      >
                      <div class="col-sm-9">
                        <select
                          class="form-control select2"
                          v-model="form.userId"
                          required
                        >
                          <option disabled value="">-- Pilih --</option>
                          <option
                            v-for="user in filterRoleGuru"
                            :key="user.id"
                            :value="user.id"
                          >
                            {{ user.username }}
                          </option>
                        </select>
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
import GuruService from "../../services/guru.service";
import UserService from "../../services/user.service";
import KelasService from "../../services/kelas.service";
import TahunAjarService from "../../services/thn_ajar.service";
import MapelService from "../../services/mapel.service";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      loading: false,
      disabled: false,
      gurus: {},
      users: [],
      mapels: {},
      thn_ajars: {},
      kelas: [],
      statusmodal: false,
      message: "",
      form: {
        id: "",
        nip: "",
        nama: "",
        mapelId: "",
        thnAjarId: "",
        userId: "",
      },
      kelasId: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    filterRoleGuru() {
      return this.users.filter((user) => user.role === "guru");
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
    showModalEdit(guru) {
      this.statusmodal = true;
      $("#modalmuncul").modal("show");
      this.getGuruById(guru);
    },
    getdata() {
      this.$Progress.start();
      GuruService.getGuru()
        .then((response) => {
          this.gurus = response.data;
          // $(function () {
          //   $("#myTable")
          //     .DataTable({
          //       responsive: true,
          //       lengthChange: true,
          //       autoWidth: false,
          //       buttons: ["copy", "csv", "excel", "pdf", "print"],
          //     })
          //     .buttons()
          //     .container()
          //     .appendTo("#myTable_wrapper .col-md-6:eq(0)");
          // });
          $(document).ready(function () {
            $("#myTable").DataTable();
          });
        })
        .catch((e) => {
          console.log(e);
        });
      UserService.getUser()
        .then((response) => {
          this.users = response.data;
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
      TahunAjarService.getTahunAjar()
        .then((response) => {
          this.thn_ajars = response.data;
        })
        .catch((e) => {
          console.log(e);
        });

      MapelService.getMapel()
        .then((response) => {
          this.mapels = response.data;
        })
        .catch((e) => {
          console.log(e);
        });

      this.$Progress.finish();
    },
    getGuruById(id) {
      GuruService.getGuruById(id)
        .then((response) => {
          this.form = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    simpanData() {
      this.$Progress.start();
      this.loading = true;
      this.disabled = true;
      GuruService.createGuru({
        id: this.form.id,
        nip: this.form.nip,
        nama: this.form.nama,
        mapelId: this.form.mapelId,
        thnAjarId: this.form.thnAjarId,
        userId: this.form.userId,
        kelasId: this.kelasId,
      })
        .then((response) => {
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
            (e.response && e.response.data && e.response.data.msg) ||
            e.message ||
            e.toString();
        });
    },
    updateData() {
      this.$Progress.start();
      this.loading = true;
      this.disabled = true;
      GuruService.updateGuru(this.form.id, {
        id: this.form.id,
        nip: this.form.nip,
        nama: this.form.nama,
        mapelId: this.form.mapelId,
        thnAjarId: this.form.thnAjarId,
        userId: this.form.userId,
        kelasId: this.kelasId,
      })
        .then((response) => {
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
          this.message =
            (e.response && e.response.data && e.response.data.msg) ||
            e.message ||
            e.toString();
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
          GuruService.deleteGuru(id)
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
      (this.message = ""),
        (this.form.nip = ""),
        (this.form.nama = ""),
        (this.form.mapelId = ""),
        (this.kelasId = []),
        (this.form.thnAjarId = ""),
        (this.form.userId = "");
    },
  },
};
</script>