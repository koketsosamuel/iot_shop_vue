<template>
  	<v-app flat>
    
    	<navBar />

    	<v-main>
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
};
</script>
