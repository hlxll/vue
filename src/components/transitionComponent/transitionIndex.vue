<template>
  <div>
    <!--appear是设置初始化渲染的过渡效果,没有设置，初始渲染妹=没过渡效果
        mode设置两个过渡的顺序问题，in-out: 新元素先进行进入过渡，完成之后当前元素过渡离开。
        out-in: 当前元素先进行离开过渡，完成之后新元素过渡进入
    -->
    <transition
      @before-enter="beforeEnter"
      name="transitionOne"
      appear
      mode="out-in"
    >
      <p v-if="enterLeave">过度动画</p>
      <p v-else>过度动画另一半</p>
    </transition>
    <transition
      @before-enter="beforeEnter"
      @before-leave="beforeLeave"
      :css="false"
    >
      <p>js钩子</p>
      <!--钩子函数，添加css=false,配置，让过渡不受css影响。只有过渡的时候，enter和leave的钩子函数的回调函数必须使用-->
    </transition>
    <button @click="changeOpacity">动画开发</button>

    <!--??列表过渡效果,
        默认情况下，这个组件transition-group不会渲染，通过tag指定渲染一个元素,下面的transition-group会渲染成p标签
    -->
    <button @click="shuffle">交错过渡</button>
    <button @click="add">Add</button>
    <button @click="remove">Remove</button>
    <transition-group tag="p" name="list">
      <span v-for="item in dataList" :key="item"><br />{{ item }}</span>
    </transition-group>
    <!--状态过渡-->
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      enterLeave: true,
      nextNum: 4,
      dataList: [1, 2, 3],
    };
  },
  methods: {
    changeOpacity() {
      this.enterLeave = !this.enterLeave;
    },
    beforeEnter(el) {
      //   第二个参数是回调函数
      //   gsap.set(el, {
      //     scaleX: 0.8,
      //     scaleY: 1.2,
      //   });
      console.log(el);
    },
    beforeLeave(el) {
      console.log(el);
    },
    randomIndex() {
      return Math.floor(Math.random() * this.dataList.length);
    },

    shuffle() {
      //   this.items = shuffle(this.items);??
    },
    add() {
      this.dataList.splice(this.randomIndex(), 0, this.nextNum++);
    },
    remove() {
      this.dataList.splice(this.randomIndex(), 1);
    },
  },
});
</script>
<style>
.transitionOne-enter-active {
  transition: opacity 0.5s ease;
}
.transitionOne-leave-active {
  transition: opacity 0.5s ease;
}
.transitionOne-enter-from {
  opacity: 1;
}
.transitionOne-enter-to {
  opacity: 0;
}
.transitionOne-leave-from {
  opacity: 1;
}
.transitionOne-leave-to {
  opacity: 0;
}

.list-enter-active {
  transition: opacity 2s ease;
}
.list-leave-active {
  transition: opacity 2s ease;
}
.list-enter-from {
  opacity: 0;
}
.list-enter-to {
  opacity: 1;
}
.list-leave-from {
  opacity: 1;
}
.list-leave-to {
  opacity: 0;
}
</style>
