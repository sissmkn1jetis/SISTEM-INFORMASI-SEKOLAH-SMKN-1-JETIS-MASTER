<template>
  <!-- <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div> -->
  <div>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Profile</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">Dashboard</router-link>
              </li>
              <li class="breadcrumb-item active">User Profile</li>
            </ol>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <!-- /.col -->
          <div class="col-md-12">
            <div class="card card-default">
              <div v-if="users">
                <form>
                  <div class="card-body">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="username"
                        >Username:</label
                      >
                      <div class="col-sm-9">
                        <p>{{ users.username }}</p>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="nip"
                        >NIP:</label
                      >
                      <div class="col-sm-9">
                        <p v-if="users.guru">{{ users.guru.nip }}</p>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="nama"
                        >Nama:</label
                      >
                      <div class="col-sm-9">
                        <p v-if="users.guru">{{ users.guru.nama }}</p>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="tempat_lahir"
                        >Tempat Lahir:</label
                      >
                      <div class="col-sm-9">
                        <p v-if="users.guru">{{ users.tempat_lahir }}</p>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="tanggal_lahir"
                        >Tanggal Lahir:</label
                      >
                      <div class="col-sm-9">
                        <p v-if="users.guru">{{ users.tanggal_lahir }}</p>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="jenis_kelamin"
                        >Jenis Kelamin:</label
                      >
                      <div class="col-sm-9">
                        <p v-if="users.guru">{{ users.jenis_kelamin }}</p>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="agama"
                        >Agama:</label
                      >
                      <div class="col-sm-9">
                        <p v-if="users.guru">{{ users.agama }}</p>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="alamat"
                        >Alamat:</label
                      >
                      <div class="col-sm-9">
                        <p v-if="users.guru">{{ users.alamat }}</p>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label" for="no_telp"
                        >No HP:</label
                      >
                      <div class="col-sm-9">
                        <p v-if="users.guru">{{ users.no_telp }}</p>
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
                    <!-- <div v-if="users.guru && users.guru.kelas">
                      Mengajar Kelas:
                      <li v-for="tes in users.guru.kelas" :key="tes.id">
                        {{ tes.name_kelas }}
                      </li>
                    </div> -->
                  </div>
                </form>
              </div>
              <div v-else>
                <p>Loading user profile...</p>
              </div>
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import UserService from "../services/user.service";
export default {
  name: "Guru",
  data() {
    return {
      content: null,
      users: null,
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
    getData() {
      UserService.getProfileGuru()
        .then((response) => {
          this.users = response.data.user;
          console.log(response.data.user);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>