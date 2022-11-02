const eventBus = (function () {
    let eventNew;
    function bus(this: any) {
        this.eventMap = new Map()
    }
    bus.prototype.on = function (name, id, callback) {
        const list = this.eventMap.get(name) || {}
        list[id] = callback
        this.eventMap.set(name, list)

    }
    bus.prototype.emit = function (name, data) {
        const list = this.eventMap.get(name)
        for (const item in list) {
            list[item](data)
        }
    }
    return {
        bus: eventNew ? eventNew : new bus()
    }
})()
export default eventBus;

//使用方式；在每次要使用的地方引入当前的文件，再使用下面的方法
// eventBus.bus.emit('name', 'huanglin')
// eventBus.bus.on('name', '1', function (data) {
//     console.log(data)
// })