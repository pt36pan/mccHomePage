<template>

    <div class="dialog">

        <div :class="dialogClass">
            <div class="dialog-title">
                <slot name="title">
                    <div>默认标题</div>
                </slot>
                <span class="dialog-title-close" @click="handleClickClose()">X</span>
            </div>
            <div class="dialog-content">
                <slot name="content">
                    <div>默认内容</div>
                </slot>
            </div>
            <div class="dialog-foot">
                <slot name="foot">
                    <button style="float: right" @click="handleClickClose()">默认关闭</button>
                </slot>
            </div>
            <div class="loading-group" v-show="!loadingSuccess">
                <span class="circular late"></span>
                <span class="circular early"></span>
                <div class="loading-txt">Loading...</div>
            </div>
        </div>

        <div class="mask"></div>
    </div>

</template>

<script type="text/ecmascript-6">
    export default{
        components: {},
        props: {
            loadingSuccess: {
                type: Boolean,
                default: false
            },
            state: {
                type: String,
                default: 'close'
            }
        },
        computed: {
            dialogClass: function () {
                if (this.first) {
                    if (this.state === 'open') {
                        return 'dialog-body open'
                    }
                } else {
                    return 'dialog-body ' + (this.state === 'open' ? 'open' : 'close')
                }
            }
        },
        data(){
            return {
                first: true
            }
        },
        created: function () {
            //  实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，还不可用。需要初始化处理一些数据时会比较有用。

        },
        mounted(){
            //  el挂载到实例上后会调用，第一个业务逻辑一般从这里开始。
            let _this = this;

            let dialog = document.getElementsByClassName('dialog-body')[0];
            _this.first = false;
            _this.$emit('dialog-open-success');

        },
        beforeDestroy: function () {
            //  实例销毁之前调用。主要是解绑一些使用addEventListener监听的事件等。
        },
        methods: {
            handleClickClose(){
                let _this = this;
                _this.loading = true;
                _this.$emit('dialog-closeFromDialog');
            },
        }
    }
</script>
<style lang="scss" scoped>
    .dialog {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1200;
    }

    .open {
        animation: dialog-open .8s;
    }

    .close {
        animation: dialog-close .8s;
    }

    @keyframes dialog-open {
        0% {
            top: -50%;
        }
        100% {
            top: 50%;
        }
    }

    @keyframes dialog-close {
        0% {
            /*transform: translateY(50%);*/
            top: 50%;
        }
        100% {
            top: 150%;
        }
    }

    .dialog-body {
        position: fixed;
        z-index: 1;
        width: 90%;
        top: 50%;
        transform: translate(5%, -50%);
        box-shadow: 1px 1px 10px black;
        border: 1px solid white;
        border-radius: 4px;
    }

    .mask {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: #3B3B3B;
        opacity: 0.6;
    }

    .dialog-title {
        padding: 8px 16px;
        background: white;
        border-bottom: solid 1px lightgray;
        position: relative;
        font-size: 16px;

        & .dialog-title-close {
            width: 1.5em;
            height: 1.5em;
            font-size: 1.5em;
            text-align: center;
            cursor: pointer;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            transition: all .6s;
            &:hover {
                color: dodgerblue;
            }
        }
    }

    .dialog-content {
        padding: 8px 16px;
        min-height: 320px;
        background: white;
    }

    .dialog-foot {
        overflow: hidden;
        position: relative;
        background: white;
        left: 50%;
        transform: translateX(-50%);
    }

    .loading-group {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-32px, -32px);
    }

    .circular {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        position: absolute;
        display: block;
        background: dodgerblue;
        animation: loading 1s infinite ease-in-out;
    }

    .loading-txt {
        color: white;
        position: absolute;
        text-align: center;
        margin-top: 64px;
        font-size: 18px;
        animation: loadingTxt 1s infinite ease-in-out;
    }

    .late {
        opacity: 0.6;
    }

    .early {
        animation-delay: -0.5s;
    }

    @keyframes loading {
        0%, 100% {
            transform: scale(0.0);
        }
        50% {
            transform: scale(1.0);
        }
    }

    @keyframes loadingTxt {
        0%, 100% {
            opacity: 1.0;
            color: white;
        }
        50% {
            opacity: 0.7;
            color: black;
        }
    }
</style>