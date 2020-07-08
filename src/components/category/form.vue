<template>
    <div class="px-4 py-4">

        <v-form @submit="executeAction">
          
            <v-text-field
                label="Name"
                id="id"
                v-model="name"
                solo
                :error="nameErr.error"
                :error-messages="nameErr.msg"
            ></v-text-field>

            <v-textarea
                label="Description"
                name="name"
                solo
                :error="descErr.error"
                :error-messages="descErr.msg"
                v-model="desc"
            ></v-textarea>

            <v-btn type="submit" :loading="loading">Submit</v-btn>

      </v-form>

  </div>
</template>

<script>
export default {

    name: "categoriesForm",

    props: ["action", "catData"],

    data: () => ({
        name: "",
        desc: "",
        loading: false,
        nameErr: {
            error: false,
            msg: ""
        },
        descErr: {
            error: false,
            msg: ""
        }
    }),

    methods: {
        async executeAction(e) {

            e.preventDefault()

            if(this.name == "") {
                this.nameErr.error = true
                this.nameErr.msg = "Enter name of category"
            } else {
                this.nameErr.error = false
                this.nameErr.msg = ""
            } 

            if(this.desc == "") {
                this.descErr.error = true
                this.descErr.msg = "Enter description of category"
            } else {
                this.descErr.error = false
                this.descErr.msg = ""
            } 
            
            if(this.name != "" && this.desc != ""){
                this.loading = true
                await this.action(this.name, this.desc)
                this.name = ""
                this.desc = ""
                this.loading = false
            }

        }
    },

    created() {

        if(this.catData) this.name = this.catData.name
        if(this.catData) this.desc = this.catData.desc 

    }

}
</script>

<style>

</style>