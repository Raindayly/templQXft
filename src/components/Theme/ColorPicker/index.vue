<template>
    <div>
        <el-color-picker v-model="theme" @active-change="colorChange"></el-color-picker>
    </div>
</template>
<script setup>
    import { ref  } from 'vue'; 
    import { varMap } from '@/initStyle.js'
    import { getCssVar } from '@/libs/utils.js'

    const theme = ref(getCssVar('menuBg') ||varMap.menuBg)
    const emit =  defineEmits(['colorChange'])

    function colorChange(color){
        emit('colorChange',color)
        theme.value = color
    }
</script>