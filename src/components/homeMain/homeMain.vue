<template>
    <el-submenu :index="path" v-if="(menu.children&&menu.children.length>0)"> 
        <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{menu.title}}</span>
        </template>
        <recursionMenu  v-for="item in menu.children" :menu="item"  :key="item.path" :path="item.path"></recursionMenu>
    </el-submenu>
    <el-menu-item :index="path" v-else><i :class="menu.icon"></i><span>{{menu.title}}</span></el-menu-item>
</template>

<script>
export default {
    name:'recursionMenu',
    components:{
        // recursionMenu
    },
    props:{
        menu:{
            type:Object
        },
        path:{
            type:String
        }
    },
    data(){
        return {
        }
    }

}
</script>

<style>

</style>