<template>
    <div class="px-4 py-4">

        <v-form @submit="executeAction">
          
            <v-text-field
                label="Name"
                id="id"
                v-model="nameTemp"
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
                v-model="descTemp"
            ></v-textarea>

            <v-btn type="submit" :loading="loading">Submit</v-btn>

      </v-form>

  </div>
</template>

<script>
export default {

    name: "categoriesForm",

    props: ["name", "desc", "id", "done", "catNames"],

    data: () => ({
        loading: false,
        nameErr: {
            error: false,
            msg: ""
        },
        descErr: {
            error: false,
            msg: ""
        },
        nameTemp: "",
        descTemp: ""
    }),

    methods: {
        async executeAction(e) {

            e.preventDefault()
            let valid = true

            if(this.nameTemp == "") {
                this.nameErr.error = true
                this.nameErr.msg = "Enter name of category"
                valid = false
            } else {
                this.nameErr.error = false
                this.nameErr.msg = ""
            } 

            if(this.catNames.includes(this.nameTemp) && this.nameTemp != this.name) {
                this.nameErr.error = true
                this.nameErr.msg = "Name already exists"
                valid = false
            } else {
                this.nameErr.error = false
                this.nameErr.msg = ""
            }

            

            if(this.descTemp == "") {
                this.descErr.error = true
                this.descErr.msg = "Enter description of category"
                valid = false
            } else {
                this.descErr.error = false
                this.descErr.msg = ""
            } 
            
            if(valid){
                this.loading = true
                await this.update()
                this.nameTemp = ""
                this.descTemp = ""
                this.loading = false
                this.done()
            }

        },

        async update() {

            try{

                let res = await this.$axios.put("/categories/"+this.id, {
                    name: this.nameTemp,
                    description: this.descTemp
                })

                if(res.data.err) throw res.data.err.msg
                if(res.data.msg) this.$alert(res.data, this.$toast)

            } catch(err) {

                this.$alert({err}, this.$toast)

            }

        },

        fieldsInitiate() {
            this.descTemp = this.desc
            this.nameTemp = this.name

            this.nameErr = {
                error: false,
                msg: ""
            }

            this.descErr = {
                error: false,
                msg: ""
            }
        }

        
    },

    watch: {
        name() {
            this.fieldsInitiate()
        },

        desc(){
            this.fieldsInitiate()
        }   
            
    },

    created() {
        this.nameTemp = this.name
        this.descTemp = this.desc
    }

}
</script>

<style>

</style>