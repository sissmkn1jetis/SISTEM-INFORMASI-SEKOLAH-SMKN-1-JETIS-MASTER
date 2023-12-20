<template>
  <div class="sidebar">
    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
      <div class="image">
        <img
          src="https://dindik.jatimprov.go.id/pak/images/foto/d0ec693900068c4c4890f179c3e064dalogo%20smk.png"
        />
      </div>
      <div class="info">
        <router-link
          to="/dashboard"
          class="d-block mt-1"
          style="font-size: 14px"
          >SMKN 1 JETIS MOJOKERTO</router-link
        >
      </div>
    </div>
    <nav class="mt-2">
      <ul
        class="nav nav-pills nav-sidebar flex-column"
        data-widget="treeview"
        role="menu"
        data-accordion="false"
      >
        <li class="nav-item">
          <router-link v-if="currentUser" to="/dashboard" class="nav-link">
            <i class="nav-icon fas fa-tachometer-alt"></i>
            <p>Dashboard</p>
          </router-link>
        </li>
        <!-- Walas -->
        <li class="nav-item">
          <router-link v-if="showWalas" to="/walasprofile" class="nav-link">
            <i class="nav-icon fas fa-user"></i>
            <p>Profile</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="showWalas" to="/datasiswawalas" class="nav-link">
            <i class="nav-icon fas fa-user-friends"></i>
            <p>Siswa</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            v-if="showWalas"
            to="/datacetaknilaipengetahuan"
            class="nav-link"
          >
            <i class="nav-icon far fa-address-card"></i>
            <p>Nilai Pengetahuan</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            v-if="showWalas"
            to="/datacetaknilaiketrampilan"
            class="nav-link"
          >
            <i class="nav-icon far fa-address-card"></i>
            <p>Nilai Ketrampilan</p>
          </router-link>
        </li>
        <!-- Admin -->
        <li v-if="showAdmin" class="nav-item">
          <router-link to="/adminprofile" class="nav-link">
            <i class="nav-icon fa fa-user"></i>
            <p>Profile</p>
          </router-link>
        </li>
        <li v-if="showAdmin" class="nav-item">
          <router-link to="/user" class="nav-link">
            <i class="nav-icon fa fa-users"></i>
            <p>Data User</p>
          </router-link>
        </li>
        <li v-if="showAdmin" class="nav-item">
          <router-link to="/guru" class="nav-link">
            <i class="nav-icon fa fa-users"></i>
            <p>Data Guru</p>
          </router-link>
        </li>
        <li v-if="showAdmin" class="nav-item">
          <router-link to="/jurusan" class="nav-link">
            <i class="nav-icon fas fa-clipboard-list"></i>
            <p>Data Jurusan</p>
          </router-link>
        </li>
        <li v-if="showAdmin" class="nav-item">
          <router-link to="/kelas" class="nav-link">
            <i class="nav-icon fa fa-university"></i>
            <p>Data Kelas</p>
          </router-link>
        </li>
        <li v-if="showAdmin" class="nav-item">
          <router-link to="/mapel" class="nav-link">
            <i class="nav-icon fas fa-book-open"></i>
            <p>Data Mata Pelajaran</p>
          </router-link>
        </li>
        <li v-if="showAdmin" class="nav-item">
          <router-link to="/thnajar" class="nav-link">
            <i class="nav-icon far fa-calendar-alt"></i>
            <p>Data Tahun Ajaran</p>
          </router-link>
        </li>
        <li v-if="showAdmin" class="nav-item">
          <router-link to="/siswa" class="nav-link">
            <i class="nav-icon fas fa-user-friends"></i>
            <p>Data Siswa</p>
          </router-link>
        </li>
        <li v-if="showAdmin" class="nav-item">
          <router-link to="/walas" class="nav-link">
            <i class="nav-icon fa fa-users"></i>
            <p>Data Walas</p>
          </router-link>
        </li>
        <!-- Guru -->
        <li v-if="showGuru" class="nav-item">
          <router-link to="/guruprofile" class="nav-link">
            <i class="nav-icon fas fa-user"></i>
            <p>Profile</p>
          </router-link>
        </li>
        <!-- <li v-if="showGuru" class="nav-item">
          <router-link to="/nk" class="nav-link">
            <i class="nav-icon fas fa-home"></i>
            <p>Nilai Ketrampilan</p>
          </router-link>
        </li> -->
        <li v-if="showGuru" class="nav-item">
          <router-link to="/datanilaipengetahuan" class="nav-link">
            <i class="nav-icon far fa-address-card"></i>
            <p>Nilai Pengetahuan</p>
          </router-link>
        </li>
        <li v-if="showGuru" class="nav-item">
          <router-link to="/datanilaiketrampilan" class="nav-link">
            <i class="nav-icon far fa-address-card"></i>
            <p>Nilai Ketrampilan</p>
          </router-link>
        </li>
        <li v-if="showGuru" class="nav-item">
          <router-link to="/datasiswaguru" class="nav-link">
            <i class="nav-icon fas fa-user-friends"></i>
            <p>Siswa</p>
          </router-link>
        </li>

        <li v-if="showAdmin || showKabeng" class="nav-item">
          <router-link to="/akunsiswa" class="nav-link">
            <i class="nav-icon fa fa-users"></i>
            <p>Akun Siswa</p>
          </router-link>
        </li>
        <li v-if="showAdmin || showKabeng" class="nav-item">
          <router-link to="/tempatpkl" class="nav-link">
            <i class="nav-icon fas fa-home"></i>
            <p>Tempat Prakerin</p>
          </router-link>
        </li>
        <li v-if="showAdmin || showKabeng" class="nav-item">
          <router-link to="/absensi" class="nav-link">
            <i class="nav-icon fas fa-clipboard-list"></i>
            <p>Data Absensi</p>
          </router-link>
        </li>
        <li v-if="showAdmin || showKabeng" class="nav-item">
          <router-link to="/jurnalharian" class="nav-link">
            <i class="nav-icon fas fa-book-open"></i>
            <p>Data Jurnal Harian</p>
          </router-link>
        </li>
        <li v-if="showAdmin || showKabeng" class="nav-item">
          <router-link to="/izin" class="nav-link">
            <i class="nav-icon fas fa-clipboard-list"></i>
            <p>Data Izin</p>
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <i class="nav-icon fas fa-sign-out-alt"></i>
            <p>LogOut</p>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import EventBus from "../common/EventBus";
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdmin() {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role === "admin";
      }
      return false;
    },
    showGuru() {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role === "guru";
      }
      return false;
    },
    showWalas() {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role === "walas";
      }
      return false;
    },
    showKabeng() {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role === "kabeng";
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeUnmount() {
    EventBus.remove("logout");
  },
};
</script>


<style lang="scss" scoped>
</style>