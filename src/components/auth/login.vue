<template>
    <div class="px-4 py-4">
        <v-form @submit="login">

            <v-text-field
                label="Email"
                solo
                v-model="email"
                :error="emailErrBool"
                :error-messages="emailErr"
            ></v-text-field>

            <v-text-field
                label="Password"
                solo
                type="password"
                v-model="pwd"
                :error="pwdErrBool"
                :error-messages="pwdErr"
            ></v-text-field>

            <v-btn :loading="loading" type="submit">Login</v-btn> 
            <v-divider vertical inset class="mx-2"></v-divider> 
            <a href="javascript:void(0)" class="white--text" @click="resetDial">Reset Password</a>

        </v-form>
    </div>
</template>

<script>
import verify from "../../util/validation"

export default {
    
    name: "Login",

    data: () => ({
        email: null,
        pwd: null,
        loading: false,
        emailErr: null,
        emailErrBool: false,
        pwdErr: null,
        pwdErrBool: false
    }),

    props: ["done", "reset"],

    methods: {
        async login(e) {

            e.preventDefault()

            if(this.validate()) {

                try {
                    this.loading = true
                    let res = await this.$axios.post("/users/login", {email: this.email, pwd: this.pwd})
                    
                    if(res.data.err) throw res.data.err.msg

                    this.$alert(res.data, this.$toast)

                    this.email = ""
                    this.pwd = ""
                    this.loading = false
                    this.done()

                } catch(err) {

                    let err2 = {}
                    err2.msg = err

                    this.$alert({err: err2}, this.$toast)
                    this.loading = false
                }

            }

        },

        validate() {

            let valid = true

            if(!verify.verifyEmail(this.email)) {
                this.emailErr = "Valid Email is required!"
                this.emailErrBool = true
                valid = false
            } else {
                this.emailErrBool = false
                this.emailErr = null
            }

            if(this.pwd == "" || this.pwd == null) {
                this.pwdErr = "Password is required!"
                this.pwdErrBool = true
                valid = false
            } else {
                this.pwdErr = null
                this.pwdErrBool = false
            }

            return valid
        },

        resetDial() {
            this.done()
            this.reset()
        }
    }

}
</script>

