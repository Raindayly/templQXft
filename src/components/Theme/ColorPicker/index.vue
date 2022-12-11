<template>
    <div>
        <el-color-picker v-model="theme" @active-change="colorChange"></el-color-picker>
    </div>
</template>
<script setup>
    import store from '@/store';
    import { ref } from 'vue';
    const theme = ref()

    function colorChange(color){
        console.log(theme.value);
        store.dispatch('settings/changeTheme',{
            name: 'menuBg',
            value: color
        })
    }
</script>