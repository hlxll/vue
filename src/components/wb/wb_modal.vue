<template>
    <Teleport to="body">
        <div class="modal">
            <div class="main">
                <div style="text-align: right;">
                    <span class="title">
                        <slot name="headTitle"></slot>
                    </span>
                    <span @click="f_cancel" class="pointer">x</span>
                </div>
                <slot />
                <slot name="userpass" />
            </div>
        </div>
    </Teleport>
</template>
<script>
export default {
    methods: {
        f_cancel: function () {
            this.$emit('f-cancel', true)
        }
    },
    mounted() {
        document.body.style.overflow = 'hidden'
    },
    unmounted() {
        document.body.style.overflow = 'auto'
    }

}
</script>
<style scoped>
.modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    overflow: hidden;
}

.main {
    background-color: white;
    width: max-content;
    height: max-content;
    margin: auto;
    padding: 15px;
    border-radius: 5px;
    text-align: center;
}

.title {
    float: left;
}

.pointer {
    cursor: pointer;
}
</style>