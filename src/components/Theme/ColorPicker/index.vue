<template>
    <div>
        <el-color-picker v-model="theme" @active-change="colorChange"></el-color-picker>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import cssvar from '@/styles/variables.module.scss'
    import store from '@/store';
    const re = new RegExp(/#[0-z][0-z][0-z][0-z][0-z][0-z]/g)
    const menuBg = cssvar.menuBg.match(re).pop()
    const theme = ref(menuBg)

    function colorChange(color){
        store.dispatch('settings/changeTheme',{
            name: 'menuBg',
            value: color
        })
        theme.value = color
    }
</script>