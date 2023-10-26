import { createWebHistory, createRouter } from "vue-router";
// import Home from "./components/Home.vue";
import Layout from "./layout/Layout.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
// lazy-loaded
const Dashboard = () => import("./components/Dashboard.vue")
const AdminProfile = () => import("./components/ProfileAdmin.vue")
const GuruProfile = () => import("./components/ProfileGuru.vue")
const WalasProfile = () => import("./components/ProfileWalas.vue")
const Guru = () => import("./components/DataGuru/Gurulist.vue")
const User = () => import("./components/DataUser/Userlist.vue")
const Jurusan = () => import("./components/DataJurusan/Jurusanlist.vue")
const Kelas = () => import("./components/DataKelas/Kelaslist.vue")
const Mapel = () => import("./components/DataMapel/Mapellist.vue")
const TahunAjar = () => import("./components/DataTahunAjar/TahunAjarlist.vue")
const Siswa = () => import("./components/DataSiswa/Siswalist.vue")
const Walas = () => import("./components/DataWalas/Walaslist.vue")
// const NK = () => import("./components/DataNilai/NKlist.vue")
const DataSiswaWalas = () => import("./components/DataCetak/DataSiswaWalas.vue")
const DataSiswaGuru = () => import("./components/DataNilai/DataSiswaGuru.vue")
const DataNilaiKetrampilan = () => import("./components/DataNilai/DataNilaiKetrampilan.vue")
const DataCetakNilaiKetrampilan = () => import("./components/DataCetak/DataCetakNilaiKetrampilan.vue")
const DataCetakNilaiPengetahuan = () => import("./components/DataCetak/DataCetakNilaiPengetahuan.vue")
const DataNilaiPengetahuan = () => import("./components/DataNilai/DataNilaiPengetahuan.vue")
const TempatPrakerin = () => import("./components/DataTempatPrakerin/TempatPrakerinList.vue")
const Absensi = () => import("./components/DataAbsensi/AbsensiList.vue")
const JurnalH = () => import("./components/DataJurnalHarian/JurnalHList.vue")
const Izin = () => import("./components/DataIzin/IzinList.vue")

const routes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    children: [
      {
        path: "/",
        component: Dashboard,
      },
      {
        path: "/dashboard",
        name: "dashboard",
        // lazy-loaded
        component: Dashboard,
      },
      {
        path: "/adminprofile",
        name: "adminprofile",
        // lazy-loaded
        component: AdminProfile,
      },
      {
        path: "/user",
        name: "user",
        // lazy-loaded
        component: User,
      },
      {
        path: "/guruprofile",
        name: "guruprofile",
        // lazy-loaded
        component: GuruProfile,
      },
      {
        path: "/walasprofile",
        name: "walasprofile",
        // lazy-loaded
        component: WalasProfile,
      },

      {
        path: "/guru",
        name: "guru",
        // lazy-loaded
        component: Guru,
      },

      {
        path: "/jurusan",
        name: "jurusan",
        // lazy-loaded
        component: Jurusan,
      },

      {
        path: "/kelas",
        name: "kelas",
        // lazy-loaded
        component: Kelas,
      },

      {
        path: "/mapel",
        name: "mapel",
        // lazy-loaded
        component: Mapel,
      },

      {
        path: "/thnajar",
        name: "thnajar",
        // lazy-loaded
        component: TahunAjar,
      },

      {
        path: "/siswa",
        name: "siswa",
        // lazy-loaded
        component: Siswa,
      },

      {
        path: "/walas",
        name: "walas",
        // lazy-loaded
        component: Walas,
      },

      // {
      //   path: "/nk",
      //   name: "nk",
      //   // lazy-loaded
      //   component: NK,
      // },

      {
        path: "/datanilaipengetahuan",
        name: "datanilaipengetahuan",
        // lazy-loaded
        component: DataNilaiPengetahuan,
      },

      {
        path: "/datanilaiketrampilan",
        name: "datanilaiketrampilan",
        // lazy-loaded
        component: DataNilaiKetrampilan,
      },

      {
        path: "/datasiswaguru",
        name: "datasiswaguru",
        // lazy-loaded
        component: DataSiswaGuru,
      },

      {
        path: "/datacetaknilaiketrampilan",
        name: "datacetaknilaiketrampilan",
        // lazy-loaded
        component: DataCetakNilaiKetrampilan,
      },

      {
        path: "/datacetaknilaipengetahuan",
        name: "datacetaknilaipengetahuan",
        // lazy-loaded
        component: DataCetakNilaiPengetahuan,
      },

      {
        path: "/datasiswawalas",
        name: "datasiswawalas",
        // lazy-loaded
        component: DataSiswaWalas,
      },


      {
        path: "/tempatpkl",
        name: "tempatpkl",
        // lazy-loaded
        component: TempatPrakerin,
      },

      {
        path: "/absensi",
        name: "absensi",
        // lazy-loaded
        component: Absensi,
      },

      {
        path: "/jurnalharian",
        name: "jurnalharian",
        // lazy-loaded
        component: JurnalH,
      },

      {
        path: "/izin",
        name: "izin",
        // lazy-loaded
        component: Izin,
      },
    ]
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // const publicPages = ['/login', '/register', '/home'];
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;