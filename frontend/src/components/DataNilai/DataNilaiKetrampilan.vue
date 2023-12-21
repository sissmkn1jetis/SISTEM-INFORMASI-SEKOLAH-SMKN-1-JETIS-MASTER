<template>
  <div>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Data Nilai</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">Dashboard</router-link>
              </li>
              <li class="breadcrumb-item active">Data Nilai</li>
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
                      <p v-if="users && users.guru">
                        {{ users.guru.nip }}
                      </p>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label" for="nama"
                      >Nama:</label
                    >
                    <div class="col-sm-9">
                      <p v-if="users && users.guru">
                        {{ users.guru.nama }}
                      </p>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label" for="name_mapel"
                      >Mengajar Mata Pelajaran:</label
                    >
                    <div class="col-sm-9">
                      <p v-if="users.guru && users.guru.mapel">
                        {{ users.guru.mapel.name_mapel }}
                      </p>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label" for="name_mapel"
                      >Tahun Ajaran:</label
                    >
                    <div class="col-sm-9">
                      <p v-if="users.guru && users.guru.thn_ajar">
                        {{ users.guru.thn_ajar.thn_ajaran }}
                      </p>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label" for="kelas"
                      >Pilih Kelas:</label
                    >
                    <div class="col-sm-9">
                      <select
                        v-if="users.guru && users.guru.kelas"
                        class="form-control select2"
                        v-model="selected"
                      >
                        <option
                          v-for="tes in users.guru.kelas"
                          :key="tes.id"
                          :value="tes"
                        >
                          {{ tes.name_kelas }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>

              <div v-if="selected">
                <div v-if="selected.siswa">
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
                            <th rowSpan="2" class="align-middle">Action</th>
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
                            v-for="(child, index) in selected.siswa"
                            :key="index.id"
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
                              <div v-if="nkData.length > 0">
                                {{
                                  nkData.find(
                                    (item) => item.siswaId === child.id
                                  )
                                    ? nkData.find(
                                        (item) => item.siswaId === child.id
                                      )["proses" + i]
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
                              <div v-if="nkData.length > 0">
                                {{
                                  nkData.find(
                                    (item) => item.siswaId === child.id
                                  )
                                    ? nkData.find(
                                        (item) => item.siswaId === child.id
                                      )["proyek" + i]
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
                              <div v-if="nkData.length > 0">
                                {{
                                  nkData.find(
                                    (item) => item.siswaId === child.id
                                  )
                                    ? nkData.find(
                                        (item) => item.siswaId === child.id
                                      )["produk" + i]
                                    : "-"
                                }}
                              </div>
                              <div v-else>-</div>
                            </td>
                            <td class="align-middle text-center">
                              <!-- Tampilkan tombol tambah jika tidak ada data di nkData -->
                              <a
                                v-if="
                                  nkData.length === 0 ||
                                  nkData.filter(
                                    (coba) => coba.siswaId === child.id
                                  ).length === 0
                                "
                                href="#"
                                class="badge bg-success mr-2"
                                @click="showModal(child.id)"
                              >
                                <i class="fas fa-pen"></i>
                              </a>

                              <!-- Tampilkan tombol edit dan delete jika ada data di nkData -->
                              <div v-if="nkData.length > 0">
                                <div v-for="coba in nkData" :key="coba.id">
                                  <div v-if="coba.siswaId === child.id">
                                    <a
                                      href="#"
                                      class="badge bg-info mr-2"
                                      @click="showModalEdit(coba.id)"
                                    >
                                      <i class="fas fa-edit"></i>
                                    </a>
                                    <a
                                      href="#"
                                      class="badge bg-danger mr-2"
                                      @click="deleteData(coba.id)"
                                    >
                                      <i class="fas fa-trash-alt"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <!-- <td class="align-middle text-center">
                              <router-link to="/nk" class="btn btn-primary"
                                >Nilai</router-link
                              >
                            </td>
                            <td class="align-middle text-center">
                              <router-link to="/nk" class="btn btn-primary"
                                >Nilai</router-link
                              >
                            </td> -->
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
                Tambah Nilai Ketrampilan
              </h5>
              <h5
                class="modal-title"
                id="exampleModalLongTitle"
                v-show="statusmodal"
              >
                Ubah Nilai Ketrampilan
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
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label for="proses1">Proses1</label>
                          <input
                            type="number"
                            class="form-control"
                            id="proses1"
                            placeholder=""
                            v-model="form.proses1"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="proses2">Proses2</label>
                          <input
                            type="number"
                            class="form-control"
                            id="proses2"
                            placeholder=""
                            v-model="form.proses2"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="proses3">Proses3</label>
                          <input
                            type="number"
                            class="form-control"
                            id="proses3"
                            placeholder=""
                            v-model="form.proses3"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="proses4">Proses4</label>
                          <input
                            type="number"
                            class="form-control"
                            id="proses4"
                            placeholder=""
                            v-model="form.proses4"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="proses5">Proses5</label>
                          <input
                            type="number"
                            class="form-control"
                            id="proses5"
                            placeholder=""
                            v-model="form.proses5"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="proses6">Proses6</label>
                          <input
                            type="number"
                            class="form-control"
                            id="proses6"
                            placeholder=""
                            v-model="form.proses6"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="proses7">Proses7</label>
                          <input
                            type="number"
                            class="form-control"
                            id="proses7"
                            placeholder=""
                            v-model="form.proses7"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="proses8">Proses8</label>
                          <input
                            type="number"
                            class="form-control"
                            id="proses"
                            placeholder=""
                            v-model="form.proses8"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label for="proyek1">Proyek1</label>
                          <input
                            type="number"
                            class="form-control"
                            id="proyek1"
                            placeholder=""
                            v-model="form.proyek1"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="proyek2">Proyek2</label>
                          <input
                            type="number"
                            class="form-control"
                            id="proyek2"
                            placeholder=""
                            v-model="form.proyek2"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="proyek3">Proyek3</label>
                          <input
                            type="number"
                            class="form-control"
                            id="proyek3"
                            placeholder=""
                            v-model="form.proyek3"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="proyek4">Proyek4</label>
                          <input
                            type="number"
                            class="form-control"
                            id="proyek4"
                            placeholder=""
                            v-model="form.proyek4"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="proyek5">Proyek5</label>
                          <input
                            type="number"
                            class="form-control"
                            id="proyek5"
                            placeholder=""
                            v-model="form.proyek5"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="proyek6">Proyek6</label>
                          <input
                            type="number"
                            class="form-control"
                            id="proyek6"
                            placeholder=""
                            v-model="form.proyek6"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="proyek7">Proyek7</label>
                          <input
                            type="number"
                            class="form-control"
                            id="proyek7"
                            placeholder=""
                            v-model="form.proyek7"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="proyek8">Proyek8</label>
                          <input
                            type="number"
                            class="form-control"
                            id="proyek"
                            placeholder=""
                            v-model="form.proyek8"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label for="produk1">Produk1</label>
                          <input
                            type="number"
                            class="form-control"
                            id="produk1"
                            placeholder=""
                            v-model="form.produk1"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="produk2">Produk2</label>
                          <input
                            type="number"
                            class="form-control"
                            id="produk2"
                            placeholder=""
                            v-model="form.produk2"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="produk3">Produk3</label>
                          <input
                            type="number"
                            class="form-control"
                            id="produk3"
                            placeholder=""
                            v-model="form.produk3"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="produk4">Produk4</label>
                          <input
                            type="number"
                            class="form-control"
                            id="produk4"
                            placeholder=""
                            v-model="form.produk4"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="produk5">Produk5</label>
                          <input
                            type="number"
                            class="form-control"
                            id="produk5"
                            placeholder=""
                            v-model="form.produk5"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="produk6">Produk6</label>
                          <input
                            type="number"
                            class="form-control"
                            id="produk6"
                            placeholder=""
                            v-model="form.produk6"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="produk7">Produk7</label>
                          <input
                            type="number"
                            class="form-control"
                            id="produk7"
                            placeholder=""
                            v-model="form.produk7"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="produk8">Produk8</label>
                          <input
                            type="number"
                            class="form-control"
                            id="produk"
                            placeholder=""
                            v-model="form.produk8"
                          />
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
import UserService from "../../services/user.service";
import NKService from "../../services/nk.service";
import Swal from "sweetalert2";
import Joi from "joi";
export default {
  data() {
    return {
      content: null,
      users: {},
      selected: null,
      nkData: [],
      loading: false,
      disabled: false,
      statusmodal: false,
      form: {
        id: "",
        siswaId: "",
        proyek1: "",
        proyek2: "",
        proyek3: "",
        proyek4: "",
        proyek5: "",
        proyek6: "",
        proyek7: "",
        proyek8: "",
        proses1: "",
        proses2: "",
        proses3: "",
        proses4: "",
        proses5: "",
        proses6: "",
        proses7: "",
        proses8: "",
        produk1: "",
        produk2: "",
        produk3: "",
        produk4: "",
        produk5: "",
        produk6: "",
        produk7: "",
        produk8: "",
      },
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
    UserService.getProfileGuru().then(
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
    showModal(siswaId) {
      this.statusmodal = false;
      this.form.siswaId = siswaId;
      this.resetForm();
      $("#modalmuncul").modal("show");
    },
    showModalEdit(coba) {
      this.statusmodal = true;
      $("#modalmuncul").modal("show");
      this.getNKById(coba);
    },

    getData() {
      this.$Progress.start();
      UserService.getProfileGuru()
        .then((response) => {
          this.users = response.data.user;
          console.log(response.data.user);
          // $(document).ready(function () {
          //   $("#myTable").DataTable();
          // });
        })
        .catch((e) => {
          console.log(e);
        });

      UserService.getProfileGuru()
        .then((response) => {
          this.nkData = response.data.nk;
          console.log(response.data.nk);
        })
        .catch((e) => {
          console.log(e);
        });

      this.$Progress.finish();
    },

    getNKById(id) {
      NKService.getNKById(id)
        .then((response) => {
          console.log(response.data);
          this.form = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    validateData(data) {
      const schema = Joi.object({
        proses1: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Proses1 harus berupa angka dan form Proses1 tidak diperbolehkan kosong",
          "number.min":
            "Proses1 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Proses1 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        proses2: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Proses2 harus berupa angka dan form Proses2 tidak diperbolehkan kosong",
          "number.min":
            "proses2 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "proses2 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        proses3: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Proses3 harus berupa angka dan form Proses3 tidak diperbolehkan kosong",
          "number.min":
            "proses3 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "proses3 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        proses4: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Proses4 harus berupa angka dan form Proses4 tidak diperbolehkan kosong",
          "number.min":
            "proses4 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "proses4 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        proses5: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Proses5 harus berupa angka dan form Proses5 tidak diperbolehkan kosong",
          "number.min":
            "proses5 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "proses5 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        proses6: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Proses6 harus berupa angka dan form Proses6 tidak diperbolehkan kosong",
          "number.min":
            "proses6 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "proses6 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        proses7: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Proses7 harus berupa angka dan form Proses7 tidak diperbolehkan kosong",
          "number.min":
            "proses7 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "proses7 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        proses8: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Proses8 harus berupa angka dan form Proses8 tidak diperbolehkan kosong",
          "number.min":
            "proses8 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "proses8 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        proyek1: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Proyek1 harus berupa angka dan form Proyek1 tidak diperbolehkan kosong",
          "number.min":
            "proyek1 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "proyek1 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        proyek2: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Proyek2 harus berupa angka dan form Proyek2 tidak diperbolehkan kosong",
          "number.min":
            "proyek2 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "proyek2 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        proyek3: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Proyek3 harus berupa angka dan form Proyek3 tidak diperbolehkan kosong",
          "number.min":
            "proyek3 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "proyek3 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        proyek4: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Proyek4 harus berupa angka dan form Proyek4 tidak diperbolehkan kosong",
          "number.min":
            "proyek4 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "proyek4 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        proyek5: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Proyek5 harus berupa angka dan form Proyek5 tidak diperbolehkan kosong",
          "number.min":
            "proyek5 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "proyek5 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        proyek6: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Proyek6 harus berupa angka dan form Proyek6 tidak diperbolehkan kosong",
          "number.min":
            "proyek6 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "proyek6 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        proyek7: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Proyek7 harus berupa angka dan form Proyek7 tidak diperbolehkan kosong",
          "number.min":
            "proyek7 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "proyek7 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        proyek8: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Proyek8 harus berupa angka dan form Proyek8 tidak diperbolehkan kosong",
          "number.min":
            "proyek8 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "proyek8 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        produk1: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Produk1 harus berupa angka dan form Produk1 tidak diperbolehkan kosong",
          "number.min":
            "produk1 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "produk1 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        produk2: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Produk2 harus berupa angka dan form Produk2 tidak diperbolehkan kosong",
          "number.min":
            "produk2 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "produk2 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        produk3: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Produk3 harus berupa angka dan form Produk3 tidak diperbolehkan kosong",
          "number.min":
            "produk3 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "produk3 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        produk4: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Produk4 harus berupa angka dan form Produk4 tidak diperbolehkan kosong",
          "number.min":
            "produk4 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "produk4 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        produk5: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Produk5 harus berupa angka dan form Produk5 tidak diperbolehkan kosong",
          "number.min":
            "produk5 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "produk5 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        produk6: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Produk6 harus berupa angka dan form Produk6 tidak diperbolehkan kosong",
          "number.min":
            "produk6 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "produk6 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        produk7: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Produk7 harus berupa angka dan form Produk7 tidak diperbolehkan kosong",
          "number.min":
            "produk7 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "produk7 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
        produk8: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Produk8 harus berupa angka dan form Produk8 tidak diperbolehkan kosong",
          "number.min":
            "produk8 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "produk8 hNilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100",
        }),
      });

      const { error } = schema.validate(data);
      return error ? error.details : null;
    },

    simpanData() {
      this.$Progress.start();
      this.loading = true;
      this.disabled = true;

      // Validasi data sebelum simpan
      const dataToCreate = {
        proses1: this.form.proses1,
        proses2: this.form.proses2,
        proses3: this.form.proses3,
        proses4: this.form.proses4,
        proses5: this.form.proses5,
        proses6: this.form.proses6,
        proses7: this.form.proses7,
        proses8: this.form.proses8,
        proyek1: this.form.proyek1,
        proyek2: this.form.proyek2,
        proyek3: this.form.proyek3,
        proyek4: this.form.proyek4,
        proyek5: this.form.proyek5,
        proyek6: this.form.proyek6,
        proyek7: this.form.proyek7,
        proyek8: this.form.proyek8,
        produk1: this.form.produk1,
        produk2: this.form.produk2,
        produk3: this.form.produk3,
        produk4: this.form.produk4,
        produk5: this.form.produk5,
        produk6: this.form.produk6,
        produk7: this.form.produk7,
        produk8: this.form.produk8,
      };

      const validationError = this.validateData(dataToCreate);
      if (validationError) {
        // Menampilkan pesan kesalahan
        const errorMessages = validationError.map((error) => error.message);
        const errorMessage = errorMessages.join(", ");
        Swal.fire({
          icon: "error",
          title: "Validasi Gagal",
          text: errorMessage,
        });
        this.$Progress.fail();
        this.loading = false;
        this.disabled = false;
        return;
      }

      NKService.createNK(this.form.siswaId, this.form)
        .then((response) => {
          this.from = response.data;
          console.log(response.data);
          this.getData();
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
        proses1: this.form.proses1,
        proses2: this.form.proses2,
        proses3: this.form.proses3,
        proses4: this.form.proses4,
        proses5: this.form.proses5,
        proses6: this.form.proses6,
        proses7: this.form.proses7,
        proses8: this.form.proses8,
        proyek1: this.form.proyek1,
        proyek2: this.form.proyek2,
        proyek3: this.form.proyek3,
        proyek4: this.form.proyek4,
        proyek5: this.form.proyek5,
        proyek6: this.form.proyek6,
        proyek7: this.form.proyek7,
        proyek8: this.form.proyek8,
        produk1: this.form.produk1,
        produk2: this.form.produk2,
        produk3: this.form.produk3,
        produk4: this.form.produk4,
        produk5: this.form.produk5,
        produk6: this.form.produk6,
        produk7: this.form.produk7,
        produk8: this.form.produk8,
      };

      const validationError = this.validateData(dataToCreate);
      if (validationError) {
        // Menampilkan pesan kesalahan
        const errorMessages = validationError.map((error) => error.message);
        const errorMessage = errorMessages.join(", ");
        Swal.fire({
          icon: "error",
          title: "Validasi Gagal",
          text: errorMessage,
        });
        this.$Progress.fail();
        this.loading = false;
        this.disabled = false;
        return;
      }

      NKService.updateNK(this.form.id, this.form)
        .then((response) => {
          this.from = response.data;
          console.log(response.data);
          this.getData();
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
      const siswaId = this.form.siswaId;
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
          NKService.deleteNK(id)
            .then((response) => {
              const index = this.nkData.findIndex(
                (item) => item.siswaId === siswaId
              );
              if (index !== -1) {
                this.nkData.splice(index, 1);
              }
              console.log(response.data);
              this.getData();
              Swal.fire("Terhapus", "Data Anda Sudah Terhapus", "success");
            })
            .catch(() => {
              Swal.fire("Gagal", "Data Gagal Terhapus", "warning");
            });
        }
      });
    },

    // deleteData(id) {
    //   Swal.fire({
    //     title: "Anda Yakin Ingin Menghapus Data Ini ?",
    //     text: "Klik Batal Untuk Membatalkan Penghapusan",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Hapus",
    //   }).then((result) => {
    //     if (result.value) {
    //       NKService.deleteNK(id)
    //         .then((response) => {
    //           Swal.fire("Terhapus", "Data Anda Sudah Terhapus", "success");
    //           console.log(response.data);
    //           this.getdata();
    //         })
    //         .catch(() => {
    //           Swal.fire("Gagal", "Data Gagal Terhapus", "warning");
    //         });
    //     }
    //   });
    // },

    resetForm() {
      (this.form.proyek1 = ""),
        (this.form.proyek2 = ""),
        (this.form.proyek3 = ""),
        (this.form.proyek4 = ""),
        (this.form.proyek5 = ""),
        (this.form.proyek6 = ""),
        (this.form.proyek7 = ""),
        (this.form.proyek8 = ""),
        (this.form.proses1 = ""),
        (this.form.proses2 = ""),
        (this.form.proses3 = ""),
        (this.form.proses4 = ""),
        (this.form.proses5 = ""),
        (this.form.proses6 = ""),
        (this.form.proses7 = ""),
        (this.form.proses8 = ""),
        (this.form.produk1 = ""),
        (this.form.produk2 = ""),
        (this.form.produk3 = ""),
        (this.form.produk4 = ""),
        (this.form.produk5 = ""),
        (this.form.produk6 = ""),
        (this.form.produk7 = ""),
        (this.form.produk8 = "");
    },
  },
};
</script>