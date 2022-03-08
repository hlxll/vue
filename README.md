# 组合式API（setup）
## 优点
### 读取方便
当项目比较大，上面写data，下面写方法，其他人读代码的时候，会纠结数据在哪里使用，这个方法互相调用在哪里的，读起来很麻烦，就可以使用组合式API，一个功能的变量和方法全写在一个方法中，在外面定义好方法，然后在setup中引入调用，一个组件的功能，在setup中就能清晰查看阅读，每一个方法就是一个功能，一个方法有变量和函数
### 

# watch和watchEffect
都可以监听数据，watch可以确定监听对象和具体地说明应触发侦听器重新运行的状态，访问状态变化的新旧值，初始化不会执行，因为一开始就指定了依赖
watchEffect，是传入一个函数进入，然后对函数内部的依赖追踪，依赖变更重新运行传入的函数,可以监听多个，组件初始化就会执行一次用以手机依赖，而后收集到的依赖发生变化，回调才会再次执行，
watchEffect返回的函数，执行之后可以停止监听，如果是在setup或者生命周期注册的，组件取消挂载会自动停止
const stop = watchEffect(() => {
  /* ... */
})
stop()
普通watch，当监听一个接口返回数据时候，后面的变化会覆盖前面的，照成资源浪费，接口回调顺序还不能保证
而watchEffect可以做到，
watchEffect(() => {
      // 异步api调用，返回一个操作对象
      const apiCall = someAsyncMethod(props.userID)

      onInvalidate(() => {
        // 取消异步api的调用。
        apiCall.cancel()
      })
})
使用onInvalidate传入的回调会在watchEffect重新运行或者watchEffect停止的时候执行
# Effect API的好处
    在使用computed和watch，监听响应式的时候，如果想停止他们，办法就是把每一个监听的停止函数存在数组，然后在需要停止的时候执行数组的方法，全部停止
    但是当多一个监听就需要在数组中添加一个stop，而Effect API就解决了这个问题
## effect使用
const scope = effectScope()

scope.run(() => {
  const doubled = computed(() => counter.value * 2)
  watch(doubled, () => console.log(doubled.value))
  watchEffect(() => console.log('Count: ', doubled.value))
})

// 处理该作用域内的所有 effect
scope.stop()
在run中定义所有计算属性，调用stop之后，全部计算属性都会停止

