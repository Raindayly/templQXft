<template>
  <router-link  v-bind="linkProps(to)">
    <slot />
  </router-link>
</template>

<script>
// import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    // isExternal() {
    //   return isExternal(this.to)
    // },
    type() {
      console.log(1);
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      return {
        to: to
      }
    }
  }
}
</script>
