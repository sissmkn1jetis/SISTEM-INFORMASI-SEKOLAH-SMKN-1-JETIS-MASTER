<template>
  <!-- <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.username }}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{ currentUser.accessToken.substring(0, 20) }} ...
      {{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}
    </p>
    <p>
      <strong>Id:</strong>
      {{ currentUser.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="role in currentUser.roles" :key="role">{{ role }}</li>
    </ul>
  </div> -->
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Dashboard</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">Dashboard</router-link>
              </li>
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div v-if="currentUser.role === 'admin'">
          <!-- Konten untuk Admin -->
          <div class="row">
            <div class="col-lg-3 col-6">
              <!-- small box -->
              <div class="small-box bg-info">
                <div class="inner">
                  <h3>{{ totalUser }}</h3>

                  <p>Users</p>
                </div>
                <div class="icon">
                  <i class="fas fa-user-plus"></i>
                </div>
                <router-link to="/user" class="small-box-footer">
                  More info <i class="fas fa-arrow-circle-right"></i>
                </router-link>
              </div>
            </div>
            <div class="col-lg-3 col-6">
              <div class="small-box bg-success">
                <div class="inner">
                  <h3>{{ totalSiswa }}</h3>

                  <p>Siswa</p>
                </div>
                <div class="icon">
                  <i class="fas fa-user-friends"></i>
                </div>
                <router-link to="/siswa" class="small-box-footer">
                  More info <i class="fas fa-arrow-circle-right"></i>
                </router-link>
              </div>
            </div>
            <div class="col-lg-3 col-6">
              <div class="small-box bg-warning">
                <div class="inner">
                  <h3>{{ totalGuru }}</h3>

                  <p>Guru</p>
                </div>
                <div class="icon">
                  <i class="fas fa-users"></i>
                </div>
                <router-link to="/guru" class="small-box-footer">
                  More info <i class="fas fa-arrow-circle-right"></i>
                </router-link>
              </div>
            </div>
            <div class="col-lg-3 col-6">
              <div class="small-box bg-danger">
                <div class="inner">
                  <h3>{{ totalWaliKelas }}</h3>

                  <p>Wali kelas</p>
                </div>
                <div class="icon">
                  <i class="fas fa-user-tie"></i>
                </div>
                <router-link to="/walas" class="small-box-footer">
                  More info <i class="fas fa-arrow-circle-right"></i>
                </router-link>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Admin</h3>
            </div>
            <div class="card-body">
              <p class="welcome-msg">
                Selamat Datang <strong>{{ currentUser.username }}</strong
                >, Anda Login Sebagai
                <strong>{{ currentUser.role }}</strong>
              </p>
            </div>
          </div>
        </div>
        <div v-else-if="currentUser.role === 'guru'">
          <!-- Konten untuk Guru -->
          <div class="row">
            <div class="col-lg-6 col-6">
              <div class="small-box bg-info">
                <div class="inner">
                  <h3>{{ totalnp }}</h3>

                  <p>Nilai Pengetahuan</p>
                </div>
                <div class="icon">
                  <i class="fas fa-book-reader"></i>
                </div>
                <router-link
                  to="/datanilaipengetahuan"
                  class="small-box-footer"
                >
                  More info <i class="fas fa-arrow-circle-right"></i>
                </router-link>
              </div>
            </div>
            <div class="col-lg-6 col-6">
              <div class="small-box bg-warning">
                <div class="inner">
                  <h3>{{ totalnk }}</h3>

                  <p>Nilai Ketrampilan</p>
                </div>
                <div class="icon">
                  <i class="fas fa-book"></i>
                </div>
                <router-link
                  to="/datanilaiketrampilan"
                  class="small-box-footer"
                >
                  More info <i class="fas fa-arrow-circle-right"></i>
                </router-link>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Guru</h3>
            </div>
            <div class="card-body">
              Selamat Datang
              <strong>{{ currentUser.username }}</strong> Anda Login Sebagai
              <strong>{{ currentUser.role }}</strong>
            </div>
          </div>
        </div>
        <div v-else-if="currentUser.role === 'walas'">
          <!-- Konten untuk Wali Kelas -->
          <div class="row">
            <div class="col-lg-12 col-6">
              <div class="small-box bg-success">
                <div class="inner">
                  <h3>{{ totalSiswaKelas }}</h3>

                  <p>Siswa</p>
                </div>
                <div class="icon">
                  <i class="fas fa-user-friends"></i>
                </div>
                <router-link to="/datasiswawalas" class="small-box-footer">
                  More info <i class="fas fa-arrow-circle-right"></i>
                </router-link>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Wali Kelas</h3>
            </div>
            <div class="card-body">
              Selamat Datang
              <strong>{{ currentUser.username }}</strong> Anda Login Sebagai
              <strong>{{ currentUser.role }}</strong>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Anda tidak memiliki akses ke dashboard ini.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import DashboardService from "../services/dashboard.services";
export default {
  name: "Dashboard",
  data() {
    return {
      totalUser: 0,
      totalSiswa: 0,
      totalGuru: 0,
      totalWaliKelas: 0,
      totalnp: 0,
      totalnk: 0,
      totalSiswaKelas: 0,
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
  methods: {
    getData() {
      DashboardService.getTotal()
        .then((response) => {
          this.totalUser = response.data.totalUser;
          this.totalSiswa = response.data.totalSiswa;
          this.totalGuru = response.data.totalGuru;
          this.totalWaliKelas = response.data.totalWaliKelas;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

      DashboardService.getTotalNilai()
        .then((response) => {
          this.totalnp = response.data.totalnp;
          this.totalnk = response.data.totalnk;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

      DashboardService.getTotalSiswaByWalas()
        .then((response) => {
          this.totalSiswaKelas = response.data.totalSiswaKelas;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
