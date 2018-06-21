<template>

    <div :class="['sidebar',position]" :style="bgColor">
        <div v-for="(item,value) in sbItems" :key="value" class="sidebar_item" :style="getActiveStyle(item.value)"
             @click="position === 'left'?handleItemClick(0,item.value):handleItemClick(1,item.value)">

            <a v-if="position === 'right'"
               :class="getItemTitleClass()" :style="language === 'en'?getActiveStyle(item.value):''">
                {{language === 'cn' ? item.name : item.name_en}}</a>
            <a v-if="position === 'left'">{{item.name}}</a>

            <span v-if="item.value === 1 && position === 'left'">/</span>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    export default{
        props: {
            position: {
                type: String,
                default: function () {
                    return 'left'
                }
            },
            backgroundColor: {
                type: String,
                default: function () {
                    return 'white'
                }
            },
            sidebarItems: {
                type: Array,
                default: function () {
                    return [
                        {name: '默认', value: 0}
                    ]
                }
            },
            active: {
                type: Number,
                default: function () {
                    return 0
                }
            },
            language: {
                type: String,
                default: 'cn'
            }
        },
        computed: {
            bgColor: function () {
                return {
                    'background-color': this.backgroundColor === 'alpha' ? 'rgba(0,0,0,0)' : this.backgroundColor
                }

            },
        },
        data(){
            return {
                pos: this.position,
                sbItems: this.sidebarItems,
                activeItem: this.active
            }
        },
        created: function () {
            //  实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，$el还不可用。需要初始化处理一些数据时会比较有用。

        },
        mounted: function () {
            //  el挂载到实例上后会调用，第一个业务逻辑一般从这里开始。
        },
        beforeDestroy: function () {
            //  实例销毁之前调用。主要是解绑一些使用addEventListener监听的事件等。
        },
        methods: {
            //  获取当前选中的状态
            getActiveStyle(value){
                if (this.language === 'en' && this.position === 'right') {
                    return {
                        'border-right': value === this.activeItem ? '2px solid dodgerblue' : 'none',
                        'font-size': '18px'
                    }
                } else {
                    return {
                        'border-bottom': value === this.activeItem ? '2px solid dodgerblue' : 'none'
                    }
                }
            },
            //获取item的title Class
            getItemTitleClass: function () {
                if (this.language === 'en' && this.position === 'right') {
                    return 'item_en'
                }
            },
            //  item的点击事件
            handleItemClick(type, value){
                let _this = this;
                if (!isRepeatClick(value)) {
                    emitToParent(type, value);
                }

                // 判断是否点击已选中的item
                function isRepeatClick(value) {
                    return _this.activeItem === value
                }

                // 给父级组件emit
                function emitToParent(type, value) {
                    _this.activeItem = value;
                    let data = {
                        type: type,
                        value: value
                    };
                    _this.$emit('sidebar-item-click', data);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./sidebar.scss";
</style>