<template>

    <div class="banner" :style="bannerBackground">
        <transition-group
                @before-enter="handleBeforeEnter"
                @enter="handleEnter"
                @after-enter="handleAfterEnter"
                @before-leave="handleBeforeLeave"
                @leave="handleLeave"
                @after-leave="handleAfterLeave"
                :css="false">
            <div v-for="(item,index) in bannerItems" :key="index" :class=getBannerItemClass(index)
                 v-show=" index === activeItem">
                <img class="banner-item-bg" :src="item.imgUrl">
            </div>
        </transition-group>

    </div>

</template>

<script type="text/ecmascript-6">

    import img1 from '../../img/banner-1.jpg';
    import img2 from '../../img/banner-2.jpg';
    import img3 from '../../img/banner-3.jpg';


    export default{
        name: 'banner',
        props: {
            Items: {
                type: Array,
                default: [
                    {
                        title: 'no.1',
                        imgUrl: img1,
                        weight: 1
                    },
                    {
                        title: 'no.2',
                        imgUrl: img2,
                        weight: 2
                    },
                    {
                        title: 'no.3',
                        imgUrl: img3,
                        weight: 3
                    }
                ]
            },
            speed: {
                type: Number,
                default: 5000
            }
        },
        data(){
            return {
                bannerItems: this.Items,
                scrollSpeed: this.speed,
                activeItem: -1,
            }
        },
        computed: {
            bannerBackground: function () {
                let index = -1;
                if (this.activeItem === this.bannerItems.length - 1) {
                    index = 0;
                } else {
                    index = this.activeItem + 1;
                }
//                console.log('正在移动的是第'+this.activeItem+'个');
//                console.log('背景是第'+index+'个');
                let bgUrl = this.bannerItems[index].imgUrl;
                return {
                    'background-image': 'url(' + bgUrl + ')',
                    'background-size': '100% 100%'
                }
            }
        },
        mounted(){
            console.log('banner挂载完成');
            let _this = this;

            //启动banner滚动
            setTimeout(function () {
                _this.activeItem = 0;
            }, 5000)
        },
        methods: {
            //get banner-item class
            getBannerItemClass(index){
//                return 'banner-item ' + (index === this.activeItem ? 'banner-item-active' : '')
                return 'banner-item'
            },

            handleBeforeEnter: function (el) {
//                el.style.left = 0;
//                console.log('显示动画即将执行');
            },
            handleEnter: function (el, done) {
                let _this = this;
                _this.velocity(el, 'stop');
                _this.velocity(el, {
                        left: '100%',
                        opacity: 0.8
//                        width: '100%'
                    },
                    {
                        duration: _this.speed,
                        easing: [0.4, 0.01, 0.165, 0.99],
                        complete: done
                    }
                    );
//                console.log('显示动画执行中...');
            },
            handleAfterEnter: function (el) {
//                console.log('显示动画结束');
                if (this.activeItem < this.bannerItems.length - 1) {
                    this.activeItem++;
                } else {
                    this.activeItem = 0;
                }

            },
            handleBeforeLeave: function (el) {
//                console.log('隐藏动画即将执行');
            },
            handleLeave: function (el, done) {
                let _this = this;
                _this.velocity(el, 'stop');
                _this.velocity(el, {
//                        left: '100%',
                        opacity: 1
//                        width:0
                    },
                    {
                        duration: _this.speed,
                        easing: [0.4, 0.01, 0.165, 0.99],
                        complete: done
                    });
//                console.log('隐藏动画执行中...');
            },
            handleAfterLeave: function (el) {
//                console.log('隐藏动画结束');
                el.style.left = 0;
//                el.style.width = '100%'
            }
        }

    }
</script>
<style scoped>
    .banner {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: white;
        overflow: hidden;
    }

    .banner-item {
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        background-color: lightgoldenrodyellow;
    }

    /*
    v-enter-active:
    定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。
    这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
        v-enter
         定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
        ——>  v-enter-to
         2.1.8版及以上 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
    v-leave-active:
    定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。
    这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
        v-leave
         定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
        ——>  v-leave-to
         2.1.8版及以上 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。
    */

    .banner-item-bg {
        width: 100%;
        height: 100%;
    }

    button {
        position: absolute;
        left: 50%;
        width: 100px;
        height: 40px;
    }
</style>