<template>

    <div>
        <div :class="getButtonClass()" @click="handleClick()">{{buttonTxt}}</div>
    </div>

</template>

<script type="text/ecmascript-6">
    export default{
        components: {},
        props: {
            buttonTxt: {
                type: String,
                default: 'button'
            },
            buttonType: {
                type: String,
                default: ''
            },
            buttonPosition: {
                type: String,
                default: 'right'
            }
        },
        computed: {},
        data(){
            return {}
        },
        created: function () {
            //  实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，还不可用。需要初始化处理一些数据时会比较有用。

        },
        mounted(){
            //  el挂载到实例上后会调用，第一个业务逻辑一般从这里开始。
            let button = document.getElementsByClassName('button')[0];
            button.style.float = this.buttonPosition;
        },
        beforeDestroy: function () {
            //  实例销毁之前调用。主要是解绑一些使用addEventListener监听的事件等。
        },
        methods: {
            getButtonClass: function () {
                return 'button ' + (this.buttonType)
            },

            handleClick: function () {
                this.$emit('handleMbuttonClick')
            }
        }

    }
</script>
<style scoped>
    .button {
        float: right;
        min-width: 80px;
        padding: 8px;
        height: 24px;
        line-height: 24px;
        margin: 8px;
        border-radius: 4px;
        border: solid 2px black;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
        transition: all .6s;
    }

    .button:hover {
        background: dodgerblue;
        color: white;
    }

    @media (min-width: 320px) and (max-width: 414px) {
        .button{
            min-width: 60px;
            height: 18px;
            line-height: 18px;
            font-size: 12px;
            margin: 4px;
            padding: 4px;
        }
    }

    @media (min-width: 415px) and (max-width: 767px) {
        .button{
            min-width: 66px;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            margin: 4px;
            padding: 4px;
        }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
        .button{
            min-width: 73px;
            height: 22px;
            line-height: 22px;
            font-size: 14px;
            margin: 6px;
            padding: 6px;
        }
    }

    .blue {
        border-color: dodgerblue;
        color: dodgerblue;
    }

    .blue:hover {
        background: dodgerblue;
        color: white;
    }

    .red {
        border-color: red;
        color: red;
    }

    .red:hover {
        background: red;
        color: white;
    }
</style>