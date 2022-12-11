<template>
    <div>
        <el-color-picker v-model="theme"></el-color-picker>
    </div>
</template>
<script setup>
    import store from '@/store';
    import { ref , watch } from 'vue';
    const theme = ref()

    watch(theme,(val)=>{
        

        store.dispatch('settings/changeSetting',{
            key: 'theme',
            value: val
        })
        
    })
</script>