<template>
    <div class="px-4 py-4">
        <v-form @submit="register">

            <v-text-field
                label="Name"
                solo
                v-model="name"
                :error="nameErr.error"
                :error-messages="nameErr.msg"
            ></v-text-field>

            <v-text-field
                label="Phone"
                solo
                v-model="phone"
                :error="phoneErr.error"
                :error-messages="phoneErr.msg"
            ></v-text-field>

            <v-text-field
                label="Email"
                solo
                v-model="email"
                :error="emailErr.error"
                :error-messages="emailErr.msg"
            ></v-text-field>

            <v-text-field
                label="Verify Email"
                solo
                v-model="email2"
                :error="email2Err.error"
                :error-messages="email2Err.msg"
            ></v-text-field>

            

            <v-text-field
                label="Password"
                solo
                type="password"
                v-model="pwd"
                :error="pwdErr.error"
                :error-messages="pwdErr.msg"
            ></v-text-field>

            <v-text-field
                label="Verify Password"
                solo
                type="password"
                v-model="pwd2"
                :error="pwd2Err.error"
                :error-messages="pwd2Err.msg"
            ></v-text-field>

            <v-btn color="green" :loading="loading" type="submit">Register</v-btn> <v-divider vertical inset class="mx-2"></v-divider> 

        </v-form>
    </div>
</template>

<script>
import verify from "../../util/validation"

export default {
    name: "Register",

    data: () => ({
        pwd: "",
        pwd2: "",
        email: "",
        email2: "",
        name: "",
        phone: "",
        loading: false,

        pwdErr: {
            msg: "",
            error: false
        },

        pwd2Err: {
            msg: "",
            error: false
        },

        emailErr: {
            msg: "",
            error: false
        },

        email2Err: {
            msg: "",
            error: false
        },

        nameErr: {
            msg: "",
            error: false
        },

        phoneErr: {
            msg: "",
            error: false
        }

    }),

    props: ["done"],

    methods: {

        validate() {

            let validated = true
            
            
            let alpha = [
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
                'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 
                's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '
            ]

            // validate email
            if(!verify.verifyEmail(this.email)) {
                
                validated = false
                this.emailErr.error = true
                this.emailErr.msg = "Invalid Email!"

            } else {
                this.emailErr.error = false
                this.emailErr.msg = ""
            }

            // validate matching emails
            if(this.email2 != this.email) {
                validated = false
                this.email2Err.error = true
                this.email2Err.msg = "Emails do not match!"
            } else {
                this.email2Err.error = false
                this.email2Err.msg = ""
            }

            // validate phone
            if(!verify.verifyPhone(this.phone)) {
                validated = false
                this.phoneErr.error = true
                this.phoneErr.msg = "Enter a valid south african number!"
            } else {
                this.phoneErr.error = false
                this.phoneErr.msg = ""
            }

            // validate name
            let nameValidate = this.name.trim().split("")
            let nameIssues = false
            for(let i = 0; i < nameValidate.length; i++) {
                if(!alpha.includes(nameValidate[i].toLowerCase())) {
                    nameIssues = true
                    validated = false
                    this.nameErr.msg = "Please enter a valid name"
                    this.nameErr.error = true
                    break
                }
            }

            if(this.name.length < 3) {
                this.nameErr.msg = "Please enter a valid name"
                this.nameErr.error = true
            }

            if(!nameIssues && this.name.length > 2) {
                this.nameErr.msg = ""
                this.nameErr.error = false
            }

            // validate passwords
            if(this.pwd.length < 8) {
                validated = false
                this.pwdErr.error = true
                this.pwdErr.msg = "Password should be 8 or more charecters long!"
            } else {
                this.pwdErr.error = false
                this.pwdErr.msg
            }

            // passwords match
            if(this.pwd != this.pwd2) {
                
                validated = false
                this.pwd2Err.msg = "Passwords do not match!"
                this.pwd2Err.error = false

            } else {

                this.pwd2Err.error = false
                this.pwd2Err.msg = ""

            }

            return validated

        },

        async register(e) {

            e.preventDefault()

            if(this.validate()) {
                try {

                    this.loading = true

                    let res = await this.$axios.post("/users/register", {
                        name: this.name, 
                        pwd: this.pwd,
                        email: this.email,
                        phone: this.phone
                    })

                    if(res.data.err) throw res.data.err.msg

                    this.$alert(res.data, this.$toast)
                    this.done()
                    this.reset()
                    this.loading = false

                } catch (err) {
                    this.$toast.error(String(err))
                    this.loading = false
                }
            }


        },

        reset() {
            this.pwd = ""
            this.pwd2 = ""
            this.email2 = ""
            this.email = ""
            this.phone = ""
            this.name = ""
        }
    }

}
</script>