<template>

    <div>
        <div class="loading-body">
            <div id="loading-group">
                <span class="circular small late"></span>
                <span class="circular small early"></span>
                <span class="circular middle late"></span>
                <span class="circular middle early"></span>
                <span class="circular big late"></span>
                <span class="circular big early"></span>
                <div id="loading-txt">Loading...</div>
            </div>

        </div>
        <div class="mask"></div>

    </div>

</template>

<script type="text/ecmascript-6">
    export default{
        props: {},
        computed: {},
        data(){
            return {}
        },
        created: function () {
            //  实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，还不可用。需要初始化处理一些数据时会比较有用。

        },
        mounted(){
            //  el挂载到实例上后会调用，第一个业务逻辑一般从这里开始。
            let _this = this;
            let screen_width = document.body.offsetWidth;
            let screen_height = document.body.offsetHeight;

            let loading_group = document.getElementById('loading-group');
            let loading_txt = document.getElementById('loading-txt');
            if (screen_width < 768) {
                loading_group.style.left = (screen_width / 2) - (48 + 64 + 80) / 2 + 'px';
                loading_group.style.top = (screen_height / 2) - (48 / 2) + 'px';
                loading_txt.style.top = 48 + 'px';
                loading_txt.style.width = 48 + 64 + 80 + 'px';
            } else if (screen_width < 1025) {
                loading_group.style.left = (screen_width / 2) - (64 + 80 + 96) / 2 + 'px';
                loading_group.style.top = (screen_height / 2) - (64 / 2) + 'px';
                loading_txt.style.top = 64 + 'px';
                loading_txt.style.width = 64 + 80 + 96 + 'px';
            } else {
                loading_group.style.left = (screen_width / 2) - (80 + 96 + 112) / 2 + 'px';
                loading_group.style.top = (screen_height / 2) - (80 / 2) + 'px';
                loading_txt.style.top = 80 + 'px';
                loading_txt.style.width = 80 + 90 + 112 + 'px';
            }


        },
        beforeDestroy: function () {
            //  实例销毁之前调用。主要是解绑一些使用addEventListener监听的事件等。
        },
        methods: {}

    }
</script>
<style scoped>
    .mask {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background: black;
        opacity: 0.5;
    }

    .loading-body {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
    }

    #loading-group {
        width: 50%;
        min-height: 160px;
        position: relative;
        display: inline-block;
    }

    .circular {
        border-radius: 50%;
        position: absolute;
        display: block;
        background: dodgerblue;
        animation: loading 1s infinite ease-in-out;
    }

    #loading-txt {
        color: white;
        position: absolute;
        text-align: center;
        animation: loadingTxt 1s infinite ease-in-out;
    }

    @media (max-width: 787px) {
        .small {
            width: 48px;
            height: 48px;
        }

        .middle {
            width: 64px;
            height: 64px;
            left: 48px;
            top: -8px;
        }

        .big {
            width: 80px;
            height: 80px;
            left: 112px;
            top: -16px;
        }

        #loading-txt {
            font-size: 40px;
        }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
        .small {
            width: 64px;
            height: 64px;
        }

        .middle {
            width: 80px;
            height: 80px;
            left: 64px;
            top: -8px;
        }

        .big {
            width: 96px;
            height: 96px;
            left: 144px;
            top: -16px;
        }

        #loading-txt {
            font-size: 56px;
        }
    }

    @media (min-width: 1025px) {
        .small {
            width: 80px;
            height: 80px;
        }

        .middle {
            width: 96px;
            height: 96px;
            left: 80px;
            top: -8px;
        }

        .big {
            width: 112px;
            height: 112px;
            left: 176px;
            top: -16px;
        }

        #loading-txt {
            font-size: 72px;
        }
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
            opacity: 1.0
        }
        50% {
            opacity: 0.7;
        }
    }

</style>