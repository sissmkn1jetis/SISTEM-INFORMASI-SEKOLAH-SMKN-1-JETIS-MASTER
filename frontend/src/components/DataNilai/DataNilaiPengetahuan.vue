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
                              <div v-if="npData.length > 0">
                                {{
                                  npData.find(
                                    (item) => item.siswaId === child.id
                                  )
                                    ? npData.find(
                                        (item) => item.siswaId === child.id
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
                                    (item) => item.siswaId === child.id
                                  )
                                    ? npData.find(
                                        (item) => item.siswaId === child.id
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
                                    (item) => item.siswaId === child.id
                                  )
                                    ? npData.find(
                                        (item) => item.siswaId === child.id
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
                                    (item) => item.siswaId === child.id
                                  )
                                    ? npData.find(
                                        (item) => item.siswaId === child.id
                                      )["uas"]
                                    : "-"
                                }}
                              </div>
                              <div v-else>-</div>
                            </td>
                            <td class="align-middle text-center">
                              <!-- Tampilkan tombol tambah jika tidak ada data di nkData -->
                              <a
                                v-if="
                                  npData.length === 0 ||
                                  npData.filter(
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
                              <div v-if="npData.length > 0">
                                <div v-for="coba in npData" :key="coba.id">
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
                Tambah Nilai Pengetahuan
              </h5>
              <h5
                class="modal-title"
                id="exampleModalLongTitle"
                v-show="statusmodal"
              >
                Ubah Nilai Pengetahuan
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
                          <label for="uh1">UH1</label>
                          <input
                            type="number"
                            class="form-control"
                            id="uh1"
                            placeholder=""
                            v-model="form.uh1"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="uh2">UH2</label>
                          <input
                            type="number"
                            class="form-control"
                            id="uh2"
                            placeholder=""
                            v-model="form.uh2"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="uh3">UH3</label>
                          <input
                            type="number"
                            class="form-control"
                            id="uh3"
                            placeholder=""
                            v-model="form.uh3"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="uh4">UH4</label>
                          <input
                            type="number"
                            class="form-control"
                            id="uh4"
                            placeholder=""
                            v-model="form.uh4"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="uh5">UH5</label>
                          <input
                            type="number"
                            class="form-control"
                            id="uh5"
                            placeholder=""
                            v-model="form.uh5"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="uh6">UH6</label>
                          <input
                            type="number"
                            class="form-control"
                            id="uh6"
                            placeholder=""
                            v-model="form.uh6"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="uh7">UH7</label>
                          <input
                            type="number"
                            class="form-control"
                            id="uh7"
                            placeholder=""
                            v-model="form.uh7"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="uh8">UH8</label>
                          <input
                            type="number"
                            class="form-control"
                            id="uh"
                            placeholder=""
                            v-model="form.uh8"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label for="th1">TH1</label>
                          <input
                            type="number"
                            class="form-control"
                            id="th1"
                            placeholder=""
                            v-model="form.th1"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="th2">TH2</label>
                          <input
                            type="number"
                            class="form-control"
                            id="th2"
                            placeholder=""
                            v-model="form.th2"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="th3">TH3</label>
                          <input
                            type="number"
                            class="form-control"
                            id="th3"
                            placeholder=""
                            v-model="form.th3"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="th4">TH4</label>
                          <input
                            type="number"
                            class="form-control"
                            id="th4"
                            placeholder=""
                            v-model="form.th4"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="th5">TH5</label>
                          <input
                            type="number"
                            class="form-control"
                            id="th5"
                            placeholder=""
                            v-model="form.th5"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="th6">TH6</label>
                          <input
                            type="number"
                            class="form-control"
                            id="th6"
                            placeholder=""
                            v-model="form.th6"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="th7">TH7</label>
                          <input
                            type="number"
                            class="form-control"
                            id="th7"
                            placeholder=""
                            v-model="form.th7"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="th8">TH8</label>
                          <input
                            type="number"
                            class="form-control"
                            id="th"
                            placeholder=""
                            v-model="form.th8"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label for="uts">UTS</label>
                          <input
                            type="number"
                            class="form-control"
                            id="uts"
                            placeholder=""
                            v-model="form.uts"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="uas">UAS</label>
                          <input
                            type="number"
                            class="form-control"
                            id="uas"
                            placeholder=""
                            v-model="form.uas"
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
import NPService from "../../services/np.service";
import Swal from "sweetalert2";
import Joi from "joi";
export default {
  data() {
    return {
      content: null,
      users: {},
      selected: null,
      npData: [],
      loading: false,
      disabled: false,
      statusmodal: false,
      form: {
        id: "",
        siswaId: "",
        uh1: "",
        uh2: "",
        uh3: "",
        uh4: "",
        uh5: "",
        uh6: "",
        uh7: "",
        uh8: "",
        th1: "",
        th2: "",
        th3: "",
        th4: "",
        th5: "",
        th6: "",
        th7: "",
        th8: "",
        uts: "",
        uas: "",
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
      this.getNPById(coba);
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
          this.npData = response.data.np;
          console.log(response.data.np);
        })
        .catch((e) => {
          console.log(e);
        });

      this.$Progress.finish();
    },

    getNPById(id) {
      NPService.getNPById(id)
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
        uh1: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Ulangan Harian 1 harus berupa angka dan from Ulangan Harian 1 tidak diperbolehkan kosong",
          "number.min":
            "Ulangan Harian 1 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Ulangan Harian 1 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
        }),
        uh2: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Ulangan Harian 2 harus berupa angka dan from Ulangan Harian 2 tidak diperbolehkan kosong",
          "number.min":
            "Ulangan Harian 2 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Ulangan Harian 2 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
        }),
        uh3: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Ulangan Harian 3 harus berupa angka dan from Ulangan Harian 3 tidak diperbolehkan kosong",
          "number.min":
            "Ulangan Harian 3 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Ulangan Harian 3 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
        }),
        uh4: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Ulangan Harian 4 harus berupa angka dan from Ulangan Harian 4 tidak diperbolehkan kosong",
          "number.min":
            "Ulangan Harian 4 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Ulangan Harian 4 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
        }),
        uh5: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Ulangan Harian 5 harus berupa angka dan from Ulangan Harian 5 tidak diperbolehkan kosong",
          "number.min":
            "Ulangan Harian 5 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Ulangan Harian 5 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
        }),
        uh6: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Ulangan Harian 6 harus berupa angka dan from Ulangan Harian 6 tidak diperbolehkan kosong",
          "number.min":
            "Ulangan Harian 6 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Ulangan Harian 6 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
        }),
        uh7: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Ulangan Harian 7 harus berupa angka dan from Ulangan Harian 7 tidak diperbolehkan kosong",
          "number.min":
            "Ulangan Harian 7 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Ulangan Harian 7 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
        }),
        uh8: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Ulangan Harian 8 harus berupa angka dan from Ulangan Harian 8 tidak diperbolehkan kosong",
          "number.min":
            "Ulangan Harian 8 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Ulangan Harian 8 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
        }),
        th1: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Tugas Harian 1 harus berupa angka dan from Tugas Harian 1 tidak diperbolehkan kosong",
          "number.min":
            "Tugas Harian 1 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Tugas Harian 1 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
        }),
        th2: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Tugas Harian 2 harus berupa angka dan from Tugas Harian 2 tidak diperbolehkan kosong",
          "number.min":
            "Tugas Harian 2 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Tugas Harian 2 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
        }),
        th3: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Tugas Harian 3 harus berupa angka dan from Tugas Harian 3 tidak diperbolehkan kosong",
          "number.min":
            "Tugas Harian 3 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Tugas Harian 3 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
        }),
        th4: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Tugas Harian 4 harus berupa angka dan from Tugas Harian 4 tidak diperbolehkan kosong",
          "number.min":
            "Tugas Harian 4 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Tugas Harian 4 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
        }),
        th5: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Tugas Harian 5 harus berupa angka dan from Tugas Harian 5 tidak diperbolehkan kosong",
          "number.min":
            "Tugas Harian 5 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Tugas Harian 5 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
        }),
        th6: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Tugas Harian 6 harus berupa angka dan from Tugas Harian 6 tidak diperbolehkan kosong",
          "number.min":
            "Tugas Harian 6 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Tugas Harian 6 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
        }),
        th7: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Tugas Harian 7 harus berupa angka dan from Tugas Harian 7 tidak diperbolehkan kosong",
          "number.min":
            "Tugas Harian 7 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Tugas Harian 7 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
        }),
        th8: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Tugas Harian 8 harus berupa angka dan from Tugas Harian 8 tidak diperbolehkan kosong",
          "number.min":
            "Tugas Harian 8 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Tugas Harian 8 Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
        }),
        uts: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Ulangan Tengah Semester harus berupa angka dan from Ulangan Tengah Semester tidak diperbolehkan kosong",
          "number.min":
            "Ulangan Tengah Semester Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Ulangan Tengah Semester Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
        }),
        uas: Joi.number().integer().min(0).max(100).allow(null).messages({
          "number.base":
            "Ulangan Akhir Semester harus berupa angka dan from Ulangan Akhir Semester tidak diperbolehkan kosong",
          "number.min":
            "Ulangan Akhir Semester Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu kecil yaitu kurang dari 0",
          "number.max":
            "Ulangan Akhir Semester Nilai Yang Anda Masukkan Tidak Memenuhi karena terlalu besar yaitu lebih besar dari 100 ",
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
        uh1: this.form.uh1,
        uh2: this.form.uh2,
        uh3: this.form.uh3,
        uh4: this.form.uh4,
        uh5: this.form.uh5,
        uh6: this.form.uh6,
        uh7: this.form.uh7,
        uh8: this.form.uh8,
        th1: this.form.th1,
        th2: this.form.th2,
        th3: this.form.th3,
        th4: this.form.th4,
        th5: this.form.th5,
        th6: this.form.th6,
        th7: this.form.th7,
        th8: this.form.th8,
        uts: this.form.uts,
        uas: this.form.uas,
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

      NPService.createNP(this.form.siswaId, this.form)
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
        uh1: this.form.uh1,
        uh2: this.form.uh2,
        uh3: this.form.uh3,
        uh4: this.form.uh4,
        uh5: this.form.uh5,
        uh6: this.form.uh6,
        uh7: this.form.uh7,
        uh8: this.form.uh8,
        th1: this.form.th1,
        th2: this.form.th2,
        th3: this.form.th3,
        th4: this.form.th4,
        th5: this.form.th5,
        th6: this.form.th6,
        th7: this.form.th7,
        th8: this.form.th8,
        uts: this.form.uts,
        uas: this.form.uas,
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

      NPService.updateNP(this.form.id, this.form)
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
          NPService.deleteNP(id)
            .then((response) => {
              const index = this.npData.findIndex(
                (item) => item.siswaId === siswaId
              );
              if (index !== -1) {
                this.npData.splice(index, 1);
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

    resetForm() {
      (this.form.uh1 = ""),
        (this.form.uh2 = ""),
        (this.form.uh3 = ""),
        (this.form.uh4 = ""),
        (this.form.uh5 = ""),
        (this.form.uh6 = ""),
        (this.form.uh7 = ""),
        (this.form.uh8 = ""),
        (this.form.th1 = ""),
        (this.form.th2 = ""),
        (this.form.th3 = ""),
        (this.form.th4 = ""),
        (this.form.th5 = ""),
        (this.form.th6 = ""),
        (this.form.th7 = ""),
        (this.form.th8 = ""),
        (this.form.uts = ""),
        (this.form.uas = "");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>