<template>
    
    <div>
        <passReset :done="whenDoneWithReset" />
    </div>

</template>

<script>
import passReset from "../components/auth/passReset"

export default {

    name: "passResetPage",

    components: {
        passReset
    },

    methods: {
        whenDoneWithReset() {
            this.$router.push("/")
        }
    }

}
</script>

<style>

</style>