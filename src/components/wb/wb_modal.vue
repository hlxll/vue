<template>
    <div class="modal">
        <div class="main">
            <div style="text-align: right;">
                <span @click="f_cancel" class="pointer">x</span>
            </div>
            <slot/>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        f_cancel: function () {
            this.$emit('f_cancel', true)
        }
    }
}
</script>
<style scoped>
.modal{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
}
.main{
    background-color: white;
    width: max-content;
    height: max-content;
    margin: auto;
    padding: 5px;
    border-radius: 5px;
}
.pointer{
    cursor: pointer;
}
</style>