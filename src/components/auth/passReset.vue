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

            <v-btn type="submit">Reset</v-btn>

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
        }
    }),

    props: ["done"],

    methods: {
        async resetPwd(e) {

            e.preventDefault()

            // if email is valid
            if(verify.email(this.email)) {
                
                try {
                    
                    this.emailErr.error = false
                    this.emailErr.msg = ""
                    let res = await this.$axios.post("/users/pwdresetlink", {email: this.email})
                    if(res.data.err) throw res.data.err.msg
                    this.$alert(res.data)
                    this.email = ""
                    this.done()

                } catch (err) {
                    
                    let error = {
                        msg: ''
                    }

                    error.msg = err
                    this.$alert(error)

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