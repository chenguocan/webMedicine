<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app{
  width: 100%;
  height: 100%;
}
//定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸
::-webkit-scrollbar{
  width: 8px;
  height: 8px;
}
//定义滑块 内阴影+圆角
::-webkit-scrollbar-thumb{
  border-radius: 1em;
  background-color: rgba(50,50,50,.3);
}
//定义滚动条轨道 内阴影+圆角
::-webkit-scrollbar-track{
  border-radius: 1em;
  background-color: rgba(50,50,50,.1);
}
</style>
