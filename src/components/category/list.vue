<template>
  
    <div>
    
        <!-- LIST -->
        <v-list dense>
            <v-list-item-group>

                <v-list-item v-for="cat in categories" :key="cat.id">
                    <v-list-item-content>
                        <v-list-item-title v-text="cat.name"></v-list-item-title>
                        <v-list-item-subtitle v-text="cat.description"></v-list-item-subtitle>
                        <v-list-item-action class="mx-0">
                            <div>

                                <v-btn color="blue white--text" small @click="category = cat; updateDialog = true">
                                    <v-icon>mdi-pen</v-icon> Edit
                                </v-btn>

                                <v-divider vertical class="mx-2 py- my-0 white"></v-divider>

                                <v-btn color="pink white--text" small @click="category = cat; remDialog = true">
                                    <v-icon>mdi-delete</v-icon> Remove
                                </v-btn>

                            </div>
                        </v-list-item-action>
                    </v-list-item-content>
                </v-list-item>

            </v-list-item-group>
        </v-list>
        <!-- END OF LIST -->

        <!-- UPDATE DIALOG -->
        <v-dialog v-model="updateDialog" max-width="500" color="purple">
            
            <v-card color="purple">

                <v-card-title left class="headline white--text">Edit Category</v-card-title>

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
                    @click="updateDialog = false"
                >
                    <v-icon>mdi-close-thick</v-icon>
                </v-btn>
            
                <categoryUpdate 
                    :name="category.name" 
                    :desc="category.description" 
                    :id="category.id"
                    :done="afterUpdate"
                    :catNames="catNames"
                />
            
            </v-card>
        </v-dialog>
        <!-- /UPDATE DIALOG -->

        <!-- REMOVE DIALOG -->
        <v-dialog v-model="remDialog" max-width="500" color="purple">
            
            <v-card color="purple">

                <v-card-title left class="headline white--text">Remove Category</v-card-title>

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
                    @click="remDialog = false"
                >
                    <v-icon>mdi-close-thick</v-icon>
                </v-btn>
            
                <categoryRem
                    :name="category.name" 
                    :desc="category.description" 
                    :id="category.id"
                    :done="afterRemove"
                />
            
            </v-card>
        </v-dialog>
        <!-- /REMOVE DIALOG -->


    </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex"
import categoryUpdate from "./update"
import categoryRem from "./remove"

export default {

    name: "CategoryList",

    components: {
        categoryUpdate,
        categoryRem
    },

    data: () => ({
        updateDialog: false,
        remDialog: false,
        categoryVal: {
            name: "",
            description: "",
            id: null
        },
        catNames: []
    }),

    methods: {
        ...mapActions(["getCategories"]),

        afterUpdate() {
            this.updateDialog = false
            this.getCategories()
        },

        afterRemove() {
            this.remDialog = false
            this.getCategories()
        }
    },

    computed: {
        ...mapGetters(["categories"]),
        category: {
            set(val) {
                this.categoryVal = val
            },

            get() {
                return this.categoryVal
            }
        }
    },

    async created() {
        await this.getCategories()
        for(let i = 0; i < this.categories.length; i++) {
            this.catNames.push(this.categories[i].name)
        }
    }

}
</script>

<style>

</style>