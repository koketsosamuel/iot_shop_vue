export default {

    state: {

        categories: []

    },

    getters: {

        categories: state => state.categories

    },

    actions: {

        async getCategories ({commit}, categories) {
            categories = await this._vm.$axios.get("/categories/")
            commit("setCategories", categories.data.results)
        }

    },

    mutations: {

        setCategories(state, cats) {
            state.categories = cats
        }

    }

}