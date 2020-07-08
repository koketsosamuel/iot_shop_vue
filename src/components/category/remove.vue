<template>
    <div class="px-4 py-4">

        <v-form @submit="executeAction" class="white--text">
          
            <h2>Are you sure you want to delete {{name}}?</h2>
            <p>NB: Action is irreversible, and all sub categories will also be deleted!</p>
            <p>Verification Code: {{confirmKey}}</p>
            <v-text-field
                label="Verification Code"
                v-model="confirm"
                solo
                :error="confirmErr.error"
                :error-messages="confirmErr.msg"
            ></v-text-field>

            <v-btn type="submit" :loading="loading">Submit</v-btn>

      </v-form>

  </div>
</template>

<script>
export default {

    name: "categoriesForm",

    props: ["name", "desc", "id", "done"],

    data: () => ({
        loading: false,
        confirm: null,
        confirmKey: null,
        confirmErr: {
            error: false,
            msg: ""
        }
    }),

    methods: {
        async executeAction(e) {

            e.preventDefault()
            let valid = true

            if(this.confirm != this.confirmKey) {
                this.confirmErr.error = true
                this.confirmErr.msg = "Enter the code shown on the screen"
                valid = false
            } else {
                this.confirmErr.error = false
                this.confirmErr.msg = ""
            } 

            
            
            if(valid){
                this.loading = true
                await this.remove()
                this.loading = false
                this.done()
            }

        },

        async remove() {

            try{

                let res = await this.$axios.delete("/categories/"+this.id, {
                    name: this.nameTemp,
                    description: this.descTemp
                })

                if(res.data.err) throw res.data.err.msg
                if(res.data.msg) this.$alert(res.data, this.$toast)

            } catch(err) {

                this.$alert({err}, this.$toast)

            }

        },

        keyGen() {
            this.confirmKey = Math.ceil((Math.random() * 8999) + 1000)  
            this.confirm = ""  
            this.confirmErr.error = false
            this.confirmErr.msg = ""    
        }

        
    },

    watch: {
        name() {
            this.keyGen()
        },

        desc(){
            this.keyGen()
        }   
            
    },

    created() {
        this.keyGen()
    }

}
</script>

<style>

</style>