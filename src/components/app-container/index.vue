<template>
  <div class="app-container">
    <router-view class="app-wrapper" />
  </div>
</template>

<script>
import 'normalize.css';

export default {};
</script>

<style lang="sass">
@import './reset.sass'

.app-container
  height: 100%
  font-size: 14px
  line-height: 1.428571429
  color: #333

.app-wrapper
  height: 100%

[v-cloak]
  display: none

</style>
