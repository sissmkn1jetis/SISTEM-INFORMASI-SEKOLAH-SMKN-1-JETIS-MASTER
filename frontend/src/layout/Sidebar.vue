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
          <router-link
            v-if="currentUser"
            to="/dashboard"
            class="nav-link"
            :class="{ active: activeElement === 'dashboard' }"
            @click="setActiveElement('dashboard')"
          >
            <i class="nav-icon fas fa-tachometer-alt"></i>
            <p>Dashboard</p>
          </router-link>
        </li>

        <!-- Menu dan Submenu Admin -->
        <li
          v-if="showAdmin"
          class="nav-item"
          @mouseover="openDropdown"
          @mouseleave="closeDropdown"
        >
          <a
            href="#"
            class="nav-link"
            :class="{ active: activeElement === 'pengguna' }"
            @click="setActiveElement('pengguna')"
          >
            <i class="nav-icon fa fa-users"></i>
            <p>
              Data Pengguna
              <i class="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul v-if="isDropdownOpen" class="nav nav-treeview">
            <li v-if="showAdmin" class="nav-item">
              <router-link
                to="/adminprofile"
                class="nav-link"
                :class="{ active: activeElement === 'adminprofile' }"
                @click="setActiveElement('adminprofile')"
              >
                <i class="nav-icon fa fa-user"></i>
                <p>Profile</p>
              </router-link>
            </li>
            <li v-if="showAdmin" class="nav-item">
              <router-link
                to="/user"
                class="nav-link"
                :class="{ active: activeElement === 'user' }"
                @click="setActiveElement('user')"
              >
                <i class="nav-icon fa fa-users"></i>
                <p>Data User</p>
              </router-link>
            </li>
          </ul>
        </li>
        <li
          v-if="showAdmin"
          class="nav-item"
          @mouseover="openDropdown"
          @mouseleave="closeDropdown"
        >
          <a
            href="#"
            class="nav-link"
            :class="{ active: activeElement === 'menuGuru' }"
            @click="setActiveElement('menuGuru')"
          >
            <i class="nav-icon fas fa-clipboard-list"></i>
            <p>
              Guru
              <i class="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul v-if="isDropdownOpen" class="nav nav-treeview">
            <li v-if="showAdmin" class="nav-item">
              <router-link
                to="/guru"
                class="nav-link"
                :class="{ active: activeElement === 'guru' }"
                @click="setActiveElement('guru')"
              >
                <i class="nav-icon fa fa-users"></i>
                <p>Data Guru</p>
              </router-link>
            </li>
            <li v-if="showAdmin" class="nav-item">
              <router-link
                to="/walas"
                class="nav-link"
                :class="{ active: activeElement === 'walas' }"
                @click="setActiveElement('walas')"
              >
                <i class="nav-icon fa fa-users"></i>
                <p>Data Wali Kelas</p>
              </router-link>
            </li>
          </ul>
        </li>
        <li
          v-if="showAdmin"
          class="nav-item"
          @mouseover="openDropdown"
          @mouseleave="closeDropdown"
        >
          <a
            href="#"
            class="nav-link"
            :class="{ active: activeElement === 'akademik' }"
            @click="setActiveElement('akademik')"
          >
            <i class="nav-icon far fa-calendar-alt"></i>
            <p>
              Akademik
              <i class="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul v-if="isDropdownOpen" class="nav nav-treeview">
            <li v-if="showAdmin" class="nav-item">
              <router-link
                to="/jurusan"
                class="nav-link"
                :class="{ active: activeElement === 'jurusan' }"
                @click="setActiveElement('jurusan')"
              >
                <i class="nav-icon fas fa-clipboard-list"></i>
                <p>Data Jurusan</p>
              </router-link>
            </li>
            <li v-if="showAdmin" class="nav-item">
              <router-link
                to="/kelas"
                class="nav-link"
                :class="{ active: activeElement === 'kelas' }"
                @click="setActiveElement('kelas')"
              >
                <i class="nav-icon fa fa-university"></i>
                <p>Data Kelas</p>
              </router-link>
            </li>
            <li v-if="showAdmin" class="nav-item">
              <router-link
                to="/mapel"
                class="nav-link"
                :class="{ active: activeElement === 'mapel' }"
                @click="setActiveElement('mapel')"
              >
                <i class="nav-icon fas fa-book-open"></i>
                <p>Data Mata Pelajaran</p>
              </router-link>
            </li>
            <li v-if="showAdmin" class="nav-item">
              <router-link
                to="/thnajar"
                class="nav-link"
                :class="{ active: activeElement === 'thnajar' }"
                @click="setActiveElement('thnajar')"
              >
                <i class="nav-icon far fa-calendar-alt"></i>
                <p>Data Tahun Ajaran</p>
              </router-link>
            </li>
          </ul>
        </li>
        <li
          v-if="showAdmin || showKabeng"
          class="nav-item"
          @mouseover="openDropdown"
          @mouseleave="closeDropdown"
        >
          <a
            href="#"
            class="nav-link"
            :class="{ active: activeElement === 'siswamenu' }"
            @click="setActiveElement('siswamenu')"
          >
            <i class="nav-icon fa fa-user"></i>
            <p>
              Siswa
              <i class="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul v-if="isDropdownOpen" class="nav nav-treeview">
            <li v-if="showAdmin" class="nav-item">
              <router-link
                to="/siswa"
                class="nav-link"
                :class="{ active: activeElement === 'siswa' }"
                @click="setActiveElement('siswa')"
              >
                <i class="nav-icon fas fa-user-friends"></i>
                <p>Data Siswa</p>
              </router-link>
            </li>
            <li v-if="showAdmin || showKabeng" class="nav-item">
              <router-link
                to="/akunsiswa"
                class="nav-link"
                :class="{ active: activeElement === 'akunsiswa' }"
                @click="setActiveElement('akunsiswa')"
              >
                <i class="nav-icon fa fa-users"></i>
                <p>Akun Siswa</p>
              </router-link>
            </li>
            <li v-if="showAdmin || showKabeng" class="nav-item">
              <router-link
                to="/tempatpkl"
                class="nav-link"
                :class="{ active: activeElement === 'tempatpkl' }"
                @click="setActiveElement('tempatpkl')"
              >
                <i class="nav-icon fas fa-home"></i>
                <p>Tempat Prakerin</p>
              </router-link>
            </li>
            <li v-if="showAdmin || showKabeng" class="nav-item">
              <router-link
                to="/absensi"
                class="nav-link"
                :class="{ active: activeElement === 'absensi' }"
                @click="setActiveElement('absensi')"
              >
                <i class="nav-icon fas fa-clipboard-list"></i>
                <p>Data Presensi</p>
              </router-link>
            </li>
            <li v-if="showAdmin || showKabeng" class="nav-item">
              <router-link
                to="/jurnalharian"
                class="nav-link"
                :class="{ active: activeElement === 'jurnalharian' }"
                @click="setActiveElement('jurnalharian')"
              >
                <i class="nav-icon fas fa-book-open"></i>
                <p>Data Jurnal Harian</p>
              </router-link>
            </li>
            <li v-if="showAdmin || showKabeng" class="nav-item">
              <router-link
                to="/izin"
                class="nav-link"
                :class="{ active: activeElement === 'izin' }"
                @click="setActiveElement('izin')"
              >
                <i class="nav-icon fas fa-clipboard-list"></i>
                <p>Data Izin</p>
              </router-link>
            </li>
          </ul>
        </li>

        <!-- Menu dan Submenu Admin -->

        <!-- <li class="nav-item">
          <router-link v-if="currentUser" to="/dashboard" class="nav-link">
            <i class="nav-icon fas fa-tachometer-alt"></i>
            <p>Dashboard</p>
          </router-link>
        </li> -->

        <!-- Walas -->
        <li v-if="showWalas" class="nav-item">
          <router-link
            to="/walasprofile"
            class="nav-link"
            :class="{ active: activeElement === 'walasprofile' }"
            @click="setActiveElement('walasprofile')"
          >
            <i class="nav-icon fa fa-user"></i>
            <p>Profile</p>
          </router-link>
        </li>
        <li v-if="showWalas" class="nav-item">
          <router-link
            to="/datasiswawalas"
            class="nav-link"
            :class="{ active: activeElement === 'datasiswawalas' }"
            @click="setActiveElement('datasiswawalas')"
          >
            <i class="nav-icon fas fa-user-friends"></i>
            <p>Siswa</p>
          </router-link>
        </li>
        <li v-if="showWalas" class="nav-item">
          <router-link
            to="/datacetaknilaipengetahuan"
            class="nav-link"
            :class="{ active: activeElement === 'datacetaknilaipengetahuan' }"
            @click="setActiveElement('datacetaknilaipengetahuan')"
          >
            <i class="nav-icon far fa-address-card"></i>
            <p>Nilai Pengetahuan</p>
          </router-link>
        </li>
        <li v-if="showWalas" class="nav-item">
          <router-link
            to="/datacetaknilaiketrampilan"
            class="nav-link"
            :class="{ active: activeElement === 'datacetaknilaiketrampilan' }"
            @click="setActiveElement('datacetaknilaiketrampilan')"
          >
            <i class="nav-icon far fa-address-card"></i>
            <p>Nilai Ketrampilan</p>
          </router-link>
        </li>
        <!-- <li class="nav-item">
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
        </li> -->
        <!-- Walas -->

        <!-- Admin -->
        <!-- <li v-if="showAdmin" class="nav-item">
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
        </li> -->
        <!-- <li v-if="showAdmin" class="nav-item">
          <router-link to="/siswa" class="nav-link">
            <i class="nav-icon fas fa-user-friends"></i>
            <p>Data Siswa</p>
          </router-link>
        </li> -->
        <!-- <li v-if="showAdmin" class="nav-item">
          <router-link to="/walas" class="nav-link">
            <i class="nav-icon fa fa-users"></i>
            <p>Data Walas</p>
          </router-link>
        </li> -->
        <!-- Admin -->

        <!-- Guru -->
        <li v-if="showGuru" class="nav-item">
          <router-link
            to="/guruprofile"
            class="nav-link"
            :class="{ active: activeElement === 'guruprofile' }"
            @click="setActiveElement('guruprofile')"
          >
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
          <router-link
            to="/datanilaipengetahuan"
            class="nav-link"
            :class="{ active: activeElement === 'datanilaipengetahuan' }"
            @click="setActiveElement('datanilaipengetahuan')"
          >
            <i class="nav-icon far fa-address-card"></i>
            <p>Nilai Pengetahuan</p>
          </router-link>
        </li>
        <li v-if="showGuru" class="nav-item">
          <router-link
            to="/datanilaiketrampilan"
            class="nav-link"
            :class="{ active: activeElement === 'datanilaiketrampilan' }"
            @click="setActiveElement('datanilaiketrampilan')"
          >
            <i class="nav-icon far fa-address-card"></i>
            <p>Nilai Ketrampilan</p>
          </router-link>
        </li>
        <li v-if="showGuru" class="nav-item">
          <router-link
            to="/datasiswaguru"
            class="nav-link"
            :class="{ active: activeElement === 'datasiswaguru' }"
            @click="setActiveElement('datasiswaguru')"
          >
            <i class="nav-icon fas fa-user-friends"></i>
            <p>Siswa</p>
          </router-link>
        </li>

        <!-- <li v-if="showAdmin || showKabeng" class="nav-item">
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
        </li> -->
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
  data() {
    return {
      isDropdownOpen: false,
      activeElement: null,
    };
  },
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
    openDropdown() {
      this.isDropdownOpen = true;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    setActiveElement(element) {
      this.activeElement = element;
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


<style scoped>
.active {
  background-color: #007bff;
  color: #fff;
}
</style>