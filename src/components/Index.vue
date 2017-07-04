<template>
  <div>
    <mu-appbar title="主页"></mu-appbar>
     <ul>
        <li><router-link to="pageA">pageA</router-link></li>
        <li><router-link to="pageB">pageB</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>
