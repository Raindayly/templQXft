<template>
    <div>
        <el-color-picker v-model="theme" @active-change="colorChange"></el-color-picker>
    </div>
</template>
<script setup>
    import { computed, ref, watch } from 'vue'; 
    import { varMap } from '@/initStyle.js'
    import store from '@/store';
    import { getCssVar } from '@/libs/utils.js'

    const theme = ref(getCssVar('menuBg') ||varMap.menuBg)


    function colorChange(color){
        store.dispatch('settings/changeTheme',{
            name: 'menuBg', 
            value: color
        })
        theme.value = color
    }
</script>