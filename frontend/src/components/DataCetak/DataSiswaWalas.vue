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
                <h3 class="card-title"></h3>
              </div>
              <form>
                <div class="card-body">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label" for="nip"
                      >NIP:</label
                    >
                    <div class="col-sm-9">
                      <p v-if="users.wala">{{ users.wala.guru.nip }}</p>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label" for="nama"
                      >Nama:</label
                    >
                    <div class="col-sm-9">
                      <p v-if="users.wala">{{ users.wala.guru.nama }}</p>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label" for="kelas"
                      >Kelas:</label
                    >
                    <div class="col-sm-9">
                      <p v-if="users.wala">{{ users.wala.kelas.name_kelas }}</p>
                    </div>
                  </div>
                </div>
              </form>
              <div v-if="users.wala && users.wala.kelas.siswa">
                <div class="card-body">
                  <div class="table-responsive">
                    <table
                      id="myTable"
                      class="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          <th class="align-middle text-center">No</th>
                          <th class="align-middle text-center">NIS</th>
                          <th class="align-middle text-center">Nama</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(child, index) in users.wala.kelas.siswa"
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
    </section>
  </div>
</template>

<script>
import UserService from "../../services/user.service";
export default {
  data() {
    return {
      content: null,
      users: [],
      selected: null,
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
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

      UserService.getProfileWalas()
        .then((response) => {
          this.content = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>