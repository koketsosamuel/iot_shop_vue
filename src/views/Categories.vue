<template>
  
    <div>

        <addCategory />
        <list />

    </div>

</template>

<script>
import add from "@/components/category/add"
import list from "@/components/category/list"

export default {

    name: "CategoriesPage",

    components: {
        addCategory: add,
        list
    }

}
</script>

<style>

</style>