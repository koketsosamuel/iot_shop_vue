<template>


    <div class="px-4 py-4">

        <v-form @submit="resetPassword">
            
            <v-text-field
                label="New Password"
                solo
                type="password"
                v-model="pwd"
                :error="pwdErr.error"
                :error-messages="pwdErr.msg"
            ></v-text-field>

            <v-text-field
                label="Verify New Password"
                solo
                type="password"
                v-model="pwd2"
                :error="pwd2Err.error"
                :error-messages="pwd2Err.msg"
            ></v-text-field>

            <v-btn type="submit">Submit</v-btn>

        </v-form>

    </div>

</template>

<script>
export default {

    name: "passReset",

    data: () => ({
        token: null,
        pwd: "",
        pwd2: "",
        loading: false,
        pwdErr: {
            error: false,
            msg: ""
        },
        pwd2Err: {
            error: false,
            msg: ""
        }
    }),

    props: ["done"],

    methods: {

        verified() {

            let verified = true

            if(this.pwd.length < 8) {
                verified = false
                this.pwdErr.error = true
                this.pwdErr.msg = "Password should be 8 or more charecters long"
            } else {
                this.pwdErr.error = false
                this.pwdErr.msg = ""
            }
            
            if(this.pwd2 != this.pwd) {
                verified = false
                this.pwd2Err.error = true
                this.pwd2Err.msg = "Passwords do not match"
            } else {
                this.pwdErr.error = false
                this.pwdErr.msg = ""
            }

            return verified

        },

        async resetPassword(e) {
            
            e.preventDefault()

            if(this.verified()) {
                
                try {
                    this.loading = true
                
                    let res = await this.$axios.post("/users/pwdreset/"+this.token, {pwd: this.pwd})
                    this.loading = false

                    if(res.data.err) throw res.data.err.msg
                    
                    // output message if its available
                    this.$alert(res.data, this.$toast)
                    this.done()

                } catch (err) {

                    let error = {}
                    error.msg = err
                    this.loading = false
                    this.$alert({err:error}, this.$toast)

                }
            }

        }
    },

    created() {
        this.token = this.$route.params.token
    }

}
</script>

<style>

</style>