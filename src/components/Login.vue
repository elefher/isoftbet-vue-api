<template>
    <div class="login-form">
        <h2>Login</h2>
        <p v-if="$route.query.redirect">
            You need to login first.
        </p>
        <form @submit.prevent="login">
            <label><input v-model="email" placeholder="email"></label>
            <label><input v-model="pass" placeholder="password" type="password"></label> <br>
            <button type="submit">login</button>
            <p v-if="error" class="error">Bad login information</p>
        </form>
    </div>
</template>

<script>
    import auth from '../auth'

    export default {
        data() {
            return {
                email: 'dddwssd@gmail.com',
                pass: 'lefteris',
                error: false,
            }
        },
        methods: {
            login() {
                auth.login(this.email, this.pass, loggedIn => {
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

    .login-form {
        width: 500px;
        margin: 100px auto;
    }
</style>
