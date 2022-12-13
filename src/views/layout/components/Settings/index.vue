<template>
  <div>
    <div v-show="hidden" class="setting-btn xyFlexCenter pointer" @click="hidden = !hidden">
      <i class="el-icon-set-up"></i>
    </div>
    <div v-show="!hidden" class="setting-body xyFlexCenter ">
      <ul class="wh-100percent pd10">
        <li>
          <color-picker @colorChange="colorChange"></color-picker>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import  ColorPicker  from '@/components/Theme/ColorPicker';
import  store  from '@/store/index'
export default {
  components: {
    ColorPicker
  },
  data() {
    return {
      hidden: true,

    }

  },
  methods: {
    colorChange(color){
      store.dispatch('settings/changeTheme',{
          name: 'menuBg', 
          value: color
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";
@import "@/styles/variables.module.scss";
    .setting-btn{
      position: fixed;
      right: 20px;
      bottom:0;
      width: 50px;
      height: 50px;
      background-color: $menuBg;
      border-radius: 10px;
      z-index: 1002;
    }
    .setting-body {
      position: fixed;
      right: 20px;
      bottom:0;
      width: 500px;
      height: 500px;
      background-color: $menuBg;
      border-radius: 10px;
      z-index: 1002;
    }
</style>