<template>
    <div>
        <div class="menu" @click="handleMenuClick()">
            <div class="iconfont icon-caidan"></div>
            <div class="menu-txt">MENU</div>
        </div>
        <transition @before-enter="handleBeforeEnter"
                    @enter="handleEnter"
                    @after-enter="handleAfterEnter"
                    @before-leave="handleBeforeLeave"
                    @leave="handleLeave"
                    @after-leave="handleAfterLeave"
                    :css="false">
            <div class="menu-body" v-show="showMenu" id="menu-content">
                <ul class="links">
                    <li v-for="(item,index) in menuItems" :key="index" :id="item.id"
                        :class="getMenuItemClass(item.ready)">
                        {{item.title}}
                    </li>
                </ul>
            </div>
        </transition>
        <div id="mask" v-show="showMenu"></div>
    </div>

</template>

<script type="text/ecmascript-6">
    export default{
        props: {
            speed: {
                type: Number,
                default: 800
            },
            menuItems: {
                type: Array,
                default: [
                    {id: 'item-home', ready: true, title: '主页/HOME',},
                    {id: 'item-process', ready: false, title: '发展历程/PROCESS',},
                ]
            }
        },
        data(){
            return {
                showMenu: false,
                firstClick: true,
                screenWidth: 0
            }
        },
        created: function () {
            //  实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，$el还不可用。需要初始化处理一些数据时会比较有用。
        },
        mounted: function () {
            //  el挂载到实例上后会调用，第一个业务逻辑一般从这里开始。
            this.screenWidth = document.body.clientWidth;

            let _this = this;

            //遮罩层点击事件
            let mask = document.getElementById('mask');
            mask.addEventListener('click', function (ev) {
                _this.handleMenuClick();
            });

            //菜单点击事件代理
            let menu_content = document.getElementById('menu-content');
            // IE8及以下只能使用attachEvent()来添加绑定事件 可以用try catch来实现兼容性
            // 如果是ie9以下addEventListener会报错，在catch里处理attachEvent
            menu_content.addEventListener('click', function (ev) {
                //标准浏览器用ev.target，IE浏览器用event.srcElement，
                let event = ev || window.event;
                let target = event.target || event.srcElement;
                if (target.nodeName.toLocaleLowerCase() === 'li') {
                    if(target.className === 'ready'){
                        let data = {
                            targetId: target.id,
                            msg: '来自sideMenu的item点击事件'
                        };
                        _this.$emit('menu-click', data);
                    }
                } else {
                    _this.handleMenuClick();
                }
            })
        },
        beforeDestroy: function () {
            //  实例销毁之前调用。主要是解绑一些使用addEventListener监听的事件等。
            let menu_content = document.getElementById('menu-content');
            menu_content.removeEventListener('click');
        },
        methods: {
            getMenuItemClass: function (ready) {
                return ready ? 'ready' : 'coming-soon'
            },
            //展开menu操作
            handleMenuClick: function () {
                this.showMenu = !this.showMenu;
            },

            //menu动画处理
            handleBeforeEnter: function (el) {
//                console.log('显示动画即将执行');
                let _this = this;

                el.style.right = -_this.screenWidth + 'px';
            },
            handleEnter: function (el, done) {
                let _this = this;
                if (_this.firstClick) {
                    if (_this.screenWidth < 768) {
                        el.style.width = el.offsetWidth * 0.7 - 48 + 'px';
                    } else if (_this.screenWidth <= 1024) {
                        el.style.width = el.offsetWidth / 2 * 0.85 - 48 + 'px';
                    } else {
                        el.style.width = el.offsetWidth / 2 * 0.9 - 48 + 'px';
                    }
                    _this.firstClick = !_this.firstClick;
                }
                _this.velocity(el, 'stop');
                _this.velocity(el, {
                        right: '48px',
                    },
                    {
                        duration: _this.speed,
                        easing: [.19, 1, .22, 1],
                        complete: done
                    }
                );
//                console.log('显示动画执行中...');
            },
            handleAfterEnter: function (el) {
//                console.log('显示动画结束');
            },
            handleBeforeLeave: function (el) {
//                console.log('隐藏动画即将执行');
            },
            handleLeave: function (el, done) {
                let _this = this;
                _this.velocity(el, 'stop');
                _this.velocity(el, {
                        right: -(_this.screenWidth) + 'px',
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
            }
            //menu动画处理结束
        }
    }
</script>
<style lang="scss" scoped>
    $menu_width: 48px;
    $base_color: dodgerblue;

    /*初始化字体大小*/
    @mixin initFontSize($size) {
        .links li {
            font-size: $size + px;
            padding: ($size + px) 0;
        }
        .coming-soon:after {
            font-size: ($size - 6) +px;
        }
    }

    /*初始化菜单大小 menu body*/
    @mixin initMenuBody($padding) {
        .menu-body {
            position: fixed;
            padding: $padding;
            z-index: 100;
            bottom: 0;
            top: 0;
            /*left: 0;*/
            width: 70%;
            background: $base-color;
        }
    }

    @mixin xSmallStyle() {
        @include initFontSize(18);
        @include initMenuBody(15%);
    }

    @mixin smallStyle() {
        @include initFontSize(20);
        @include initMenuBody(15%);
    }

    @mixin middleStyle() {
        @include initFontSize(22);
        @include initMenuBody(7.5%);
    }

    @mixin bigStyle() {
        @include initFontSize(24);
        @include initMenuBody(5%);
    }

    /*媒体查询*/
    @media (min-width: 320px) and (max-width: 414px) {
        @include xSmallStyle();
    }

    @media (min-width: 415px) and (max-width: 767px) {
        @include smallStyle();
    }

    @media (min-width: 768px) and (max-width: 1024px) {
        @include middleStyle();
    }

    @media (min-width: 1025px) {
        @include bigStyle();
    }

    /*menu start*/
    .menu {
        position: fixed;
        z-index: 101;
        top: 0;
        right: 0;
        width: $menu_width;
        height: 100%;
        background-color: $base_color;
    }

    .menu:hover {
        cursor: pointer;
    }

    /*menu end*/

    /*menu_icon start*/
    .iconfont {
        font-size: $menu_width/2;
        margin-left: $menu_width/4;
        color: white;
    }

    /*menu_icon end*/

    /*menu_text start*/
    .menu-txt {
        width: $menu_width/2;
        margin-left: $menu_width/4;
        font-size: $menu_width/2;
        color: white;
        transform: rotate(90deg)
    }

    /*menu_text end*/

    .links {
        width: 100%;
        height: 100%;
        list-style: none;

        & li {
            position: relative;
            color: white;
            width: 100%;
            text-align: right;
            border-bottom: 1px solid rgba(0, 0, 0, .2);
        }
    }

    .ready {
        cursor: pointer;
        &:hover {
            opacity: 0.5;
        }
    }

    .coming-soon:after {
        content: "COMING SOON";
        color: #363636;
        position: absolute;
        bottom: 0;
        right: 0;
        opacity: .7;
    }

    #mask {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: grey;
        opacity: 0.5;
        z-index: 99;
        transition: all .3s cubic-bezier(.19, 1, .22, 1);
    }

</style>