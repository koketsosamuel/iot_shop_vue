<template>
  	<v-app flat>
    
    	<navBar />

    	<v-main>
			<router-view></router-view>
    	</v-main>
  	</v-app>
</template>

<script>
import navBar from './components/navbar'

export default {
	name: 'App',

	components: {
		navBar
	},

	data: () => ({
		//
	}),

	created() {
		// this.$axios.get("/")
		// console.log(document.cookie)  
	}

}
</script>
