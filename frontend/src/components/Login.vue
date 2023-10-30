<template>
  <!-- <div class="col-md-12"> -->
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <img
          id="profile-img"
          src="https://dindik.jatimprov.go.id/pak/images/foto/d0ec693900068c4c4890f179c3e064dalogo%20smk.png"
          class="profile-img-card"
        />
        <h2 class="login-heading">SMKN 1 JETIS MOJOKERTO</h2>
      </div>
      <Form
        @submit="handleLogin"
        :validation-schema="schema"
        class="login-form"
      >
        <div class="form-group">
          <div class="input-group py-2">
            <Field
              placeholder="Username"
              name="username"
              type="text"
              class="form-control username"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-user"></span>
              </div>
            </div>
          </div>
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <div class="input-group">
            <Field
              placeholder="Password"
              name="password"
              type="password"
              class="form-control"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <button
            class="btn btn-primary btn-block login-button"
            :disabled="loading"
          >
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span class="login-text">Login</span>
          </button>
        </div>
        <div v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
      </Form>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/dashboard");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #00b4db, #0083b0);
  font-family: "Poppins", sans-serif;
}

.login-card {
  width: 350px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.login-header {
  text-align: center;
  padding: 30px 0;
  background-color: #00b4db;
  color: #fff;
}

.login-heading {
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.profile-img-card {
  width: 100px;
  height: 100px;
  border-radius: 0%;
  margin: 0 auto 20px;
}

.login-form {
  padding: 0 20px 30px;
}

.form-group {
  margin-bottom: 20px;
}

.input-group {
  position: relative;
  margin-top: 15px;
}

.input-group-text {
  background-color: #f0f0f0;
}

.error-feedback {
  color: #dc3545;
}

.form-control {
  padding-left: 30px;
  color: #333;
}

.btn-primary {
  background-color: #00b4db;
  border-color: #00b4db;
  width: 100%;
  padding: 12px 0;
  font-weight: bold;
  letter-spacing: 1px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0083b0;
  border-color: #0083b0;
}

.login-button {
  position: relative;
  overflow: hidden;
}

.login-text {
  transition: transform 0.3s ease-in-out;
}

.login-button:hover .login-text {
  transform: translateY(-5px);
}

.alert {
  margin-top: 10px;
}
</style>