<template>
    
    <div class="px-4 py-4">

        <v-form @submit="resetPwd">
            
            <v-text-field
                name="name"
                label="email"
                id="id"
                solo
                v-model="email"
                :error="emailErr.error"
                :error-messages="emailErr.msg"
            ></v-text-field>

            <v-btn type="submit" :loading="loading">Submit</v-btn>

        </v-form>

    </div>

</template>

<script>
import verify from "../../util/validation"

export default {
    name: "passwordResetLink",

    data: () => ({
        email: "",
        emailErr: {
            error: false,
            msg: ""
        },
        loading: false
    }),

    props: ["done"],

    methods: {
        async resetPwd(e) {

            e.preventDefault()

            // if email is valid
            if(verify.verifyEmail(this.email)) {
                
                try {
                    
                    this.loading = true
                    this.emailErr.error = false
                    this.emailErr.msg = ""
                    let res = await this.$axios.post("/users/pwdresetlink", {email: this.email})
                    this.loading = false
                    if(res.data.err) {
                        throw res.data.err.msg
                        alert(res.data.err.msg)
                    } else {
                        this.$alert(res.data, this.$toast)
                        this.email = ""
                        this.done()
                    }
                } catch (err) {
                    
                    let error = {
                        msg: ''
                    }
                    this.loading = false

                    error.msg = err
                    this.$alert({err: error}, this.$toast)

                }


            } else {
                
                // if email is invalid
                this.emailErr.error = true
                this.emailErr.msg = "Enter valid email address!"

            }

        }
    }
}
</script>