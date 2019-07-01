<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <label><input v-model="email" placeholder="email"></label>
      <label><input v-model="pass" placeholder="password" type="password"></label> <br>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  data () {
    return {
      email: '',
      pass: '',
      error: false,
    }
  },
  methods: {
    register () {
      auth.register(this.email, this.pass, loggedIn => {
        if (!loggedIn) {
          this.error = true
        } else {
          this.$store.state.token = loggedIn.token;
          this.$router.replace('/transactions')
        }
      })
    }
  }
}
</script>

<style>
  .error {
    color: red;
  }

  .register-form {
    width: 500px;
    margin: 100px auto;
  }
</style>
