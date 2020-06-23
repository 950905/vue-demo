<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi'
export default {
  created () {
    this.init()
  },
  methods: {
    init () {
      try {
        dd.ready(function () {
          try {
            dd.runtime.permission.requestAuthCode({
              corpId: self.corpId,
              onSuccess: function (result) {
                console.log(corpId, result.code)
                // self.getUserInfo(self.corpId,result.code)
              },
              onFail: function (err) {
                alert(JSON.stringify(err))
              }

            });
          } catch (e) {
            console.log(e)
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
