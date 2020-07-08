<template>
    <div>
        <v-app-bar
        color="green"
        dense
        dark
        >

            <v-toolbar-title>IoT SHOP</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn color="white" class="green--text" @click="regDialog = true">Register</v-btn>

            <v-divider
                class="mx-4"
                vertical
            ></v-divider>

            <v-btn color="white" class="green--text" @click="loginDialog=true">Login</v-btn>

            <v-divider
                class="mx-4"
                vertical
            ></v-divider>

            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon>
                <v-badge right color="purple"  content="0" overlap>
                    <v-icon>mdi-cart</v-icon> 
                </v-badge>
            </v-btn>
        
        </v-app-bar>

        <!-- LOGIN DIALOG -->
        <v-dialog v-model="loginDialog" max-width="490" color="purple">
            
            <v-card color="purple">

                <v-card-title left class="headline white--text">Login</v-card-title>

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
                    @click="loginDialog = false"
                >
                    <v-icon>mdi-close-thick</v-icon>
                </v-btn>
            
                <login :done="doneOrcancel" :reset="resetDialog" />
            
            </v-card>
        </v-dialog>

        <!-- REGISTER DIALOG -->
        <v-dialog v-model="regDialog" max-width="490" color="purple">
            
            <v-card color="purple">

                <v-card-title left class="headline white--text">Register</v-card-title>

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
                    @click="regDialog = false"
                >
                    <v-icon>mdi-close-thick</v-icon>
                </v-btn>
            
                <register :done="doneOrcancel"/>
            
            </v-card>
        </v-dialog>

        <!-- PASS RESET DIALOG -->
        <v-dialog v-model="passResetDialog" max-width="490" color="purple">
            
            <v-card color="purple">

                <v-card-title left class="headline white--text">Reset Password</v-card-title>

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
                    @click="passResetDialog = false"
                >
                    <v-icon>mdi-close-thick</v-icon>
                </v-btn>
            
                <passReset :done="doneOrcancel"/>
            
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import login from "./auth/login"
import register from "./auth/register"
import passReset from "./auth/passResetLink"

export default {
    name: "navbar",

    components: {
        login,
        register,
        passReset
    },

    data: () => ({
        loginDialog: false,
        regDialog: false,
        cartDialog: false,
        passResetDialog: false
    }),

    methods: {
        doneOrcancel() {
            this.loginDialog = false
            this.regDialog = false
            this.cartDialog = false
            this.passResetDialog = false
        },

        resetDialog() {
            this.passResetDialog = true
        }
    }

}
</script>