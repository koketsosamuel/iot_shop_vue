<template>
    <div>
        
        <v-btn @click="dialog = true"><v-icon>mdi-plus</v-icon> Category</v-btn>

        <v-dialog v-model="dialog" max-width="490" color="purple">
            
            <v-card color="purple">

                <v-card-title left class="headline white--text">Add Category</v-card-title>

                <!-- CANCEL BUTTON  -->
                <v-btn
                    absolute=""
                    dark
                    fab
                    top
                    right
                    color="pink"
                    small
                    class="mt-7"
                    @click="dialog = false"
                >
                    <v-icon>mdi-close-thick</v-icon>
                </v-btn>
            
                <categoryForm :action="addCat"/>
            
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import form from "./form"
import {mapActions} from "vuex"

export default {

    name: "addCategory",

    components: {
        categoryForm: form
    },

    data: () => ({
        dialog: false
    }),

    methods: {
        async addCat(name, description) {

            try {

                let res = await this.$axios.post("/categories/", {
                    name,
                    description
                })

                if(res.data.err) throw res.data.err.msg
                if(res.data.msg) this.$alert(res.data, this.$toast)
                this.dialog = false
                this.getCategories()

            } catch(err) {
                this.dialog = false
                this.$alert({err}, this.$toast)
            }

        },

        ...mapActions(["getCategories"])

    }

}
</script>

<style>

</style>