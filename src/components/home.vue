<template>

    <div class="home clearfix" id="main-home">
        <!--轮播banner-->
        <div class="home-content">
            <banner></banner>
        </div>

        <!--介绍块-->
        <div class="introduce-txt" v-show="!isLoading">
            {{currentLanguage === 'cn' ? '看看我们这儿有什么' : 'Look at what we have here.'}}
            <br>{{currentLanguage === 'cn' ? '一起来吧！' : 'Let\'s go!'}}
        </div>
        <!--瀑布流产品展示-->
        <div class="home-content-product clearfix">
            <WaterFall :items="productArray" :size="deviceSize" :deviceType="deviceType" :language="currentLanguage"
                       v-if="isShowWaterfall"></WaterFall>
        </div>

        <!--介绍块-->
        <div class="introduce-txt" v-show="!isLoading">
            {{currentLanguage === 'cn' ? ' 关于我们' : 'About us.'}}
            <br>{{currentLanguage === 'cn' ? ' 你应该知道这些' : 'You should know this.'}}
        </div>
        <!--关于我们-->
        <div class="home-content-about" v-show="!isLoading">
            <div class="home-content-about-body clearfix">
                <figure id="about-img"></figure>
                <div class="home-content-about-right">
                    <div class="article">
                        <h3>{{currentLanguage === 'cn' ? '山顶部落' : 'MOUNTAIN CLANS CLUB'}}</h3>
                        <h5>
                            {{currentLanguage === 'cn' ? '没有围墙的学校，没有边界的教育' : 'A SCHOOL WITHOUT WALLS, AN EDUCATION WITHOUT BOUNDARIES.'}}</h5>
                        <p v-if="currentLanguage === 'cn'">
                            广东山顶部落教育科技有限公司（Mountain Clans Club）是一家专注于“欧洲体育与艺术”的游学及课外教育服务机构。
                            山顶部落的主要服务范围包括国内外的青少年营地教育，以各类体育与艺术为工具，达到期望的教育目标。
                            山顶部落是奥中经济促进会、奥地利新世纪文化交流协会中国代表处
                        </p>
                        <p v-if="currentLanguage === 'en'">
                            Guangdong hilltop tribal education technology Co., Ltd. (Mountain Clans Club, MCC) is a study and extracurricular education service dedicated to "European sports and art".
                            The main service areas of MCC include youth camps education at home and abroad, with all kinds of sports and arts as tools to achieve the desired educational goals.
                            <!--MCC is the China Representative Office of Austria China Economic Promotion Association and Austria New Century Cultural Exchange Association.-->
                        </p>
                    </div>
                    <m-button :buttonTxt="currentLanguage === 'cn' ? '了解更多' : 'More'" :buttonType="'blue'"
                              :buttonPosition="'left'"
                              @handleMbuttonClick=""
                    ></m-button>
                </div>
            </div>
        </div>

        <div class="home-content-info clearfix">
            <div class="info-item">
                <div v-show="currentLanguage === 'cn'">
                    <div class="info-item-title">联系我们吧</div>
                    <p>地址：广州市番禺区洛浦街洛溪村北环路自编88号</p>
                    <p>电话：0772-8614285</p>
                    <p>邮箱：mcc@qq.com</p>
                </div>
                <div v-show="currentLanguage === 'en'">
                    <div class="info-item-title">GET IN TOUCH</div>
                    <p>Address：广州市番禺区洛浦街洛溪村北环路自编88号</p>
                    <p>Tel：0772-8614285</p>
                    <p>Email：mcc@qq.com</p>
                </div>

            </div>
            <div class="info-item">
                <div class="info-item-title">{{currentLanguage === 'cn' ? '关注我们' : 'FOLLOW US'}}</div>
                <div class="info-item-contact">
                    <img src="../img/qrCodeWhite.png" class="qrCode">
                    <span class="iconfont icon-wechat"></span>
                </div>
                <div class="info-item-contact">
                    <img src="../img/qrCodeWhite.png" class="qrCode">
                    <span class="iconfont icon-weibo"></span>
                </div>
            </div>
            <div class="keepOnRecord">
                <p>Copyright © 2015-2018 广东山顶部落教育科技有限公司
                    ALL Rights Reserved.</p>
                <img src="../img/beian.png">粤ICP备17050793号-1
            </div>
        </div>

        <!--两侧导航-->
        <side-bar v-for="(item,index) in side_bar_array" :key="index" :position="item.position"
                  :active="item.position === 'left'?currentLanguage:currentNav"
                  :language="currentLanguage"
                  :backgroundColor="item.backgroundColor" :sidebarItems="item.items"
                  @sidebar-item-click="handleSideBarEvent"></side-bar>
        <!--右侧菜单-->
        <side-menu :menuItems="menuItems" @menu-click="handleMenuEvent"></side-menu>

        <!--Loading 加载组件-->
        <loading-mask v-show="isLoading"></loading-mask>

        <!--Dialog 对话框组件-->
        <my-dialog v-if="isOpenItem"
                   :loadingSuccess="itemLoadingSuccess"
                   :state="dialogState"
                   @dialog-open-success="handleDialogOpen()"
                   @dialog-closeFromDialog="handleDialogClose()">
            <div slot="title" v-if="itemLoadingSuccess">
                {{currentLanguage === 'cn' ? itemSelected.title.cn : itemSelected.title.en}}
            </div>
            <div slot="content" v-if="itemLoadingSuccess" class="my-dialog clearfix">
                <div class="dialog-img">
                    <img :src=itemSelected.imgUrl style="width:95%">
                </div>
                {{currentLanguage === 'cn' ? itemSelected.content.cn : itemSelected.content.en}}
            </div>
            <div slot="foot" class="clearfix">
                <m-button :buttonTxt="currentLanguage === 'cn' ? '立即报名' : 'SIGN UP NOW'"
                          :buttonType="'blue'"></m-button>
                <m-button :buttonTxt="currentLanguage === 'cn' ? '再去看看' : 'LOOK NEXT TIME'" :buttonType="'red'"
                          @handleMbuttonClick="handleDialogClose()"></m-button>
            </div>
        </my-dialog>
    </div>

</template>

<script type="text/ecmascript-6">
    import SideBar from './sidebar/sidebar.vue';
    import SideMenu from './sidemenu/sidemenu.vue';
    import Banner from './banner/banner.vue';
    import WaterFall from './waterfallflow/waterfallflow.vue';
    import LoadingMask from './loadingmask/loadingmask.vue';
    import MyDialog from './dialog/dialog.vue';
    import mButton from './mbutton/mbutton.vue';
    export default{
        components: {
            SideBar,
            SideMenu,
            Banner,
            WaterFall,
            LoadingMask,
            MyDialog,
            mButton
        },
        name: 'home',
        data(){
            return {
                side_bar_array: [
                    {
                        name: 'cn_en', position: 'left', backgroundColor: 'alpha',
                        items: [
                            {name: '中文', value: 0},
                            {name: 'EN', value: 1}]
                    },
                    {
                        name: 'nav', position: 'right', backgroundColor: 'white',
                        items: [
                            {name: '首页', name_en: 'HOME', value: 0},
                            {name: '最新营地', name_en: 'NEWS', value: 1},
                            {name: '查看更多', name_en: 'MORE', value: 2}
                        ]
                    },
                ],
                // 屏幕高度
                screenHeight: 0,
                // 当前页面 语言
                currentLanguage: 'cn',
                // 当前导航
                currentNav: 0,

                //瀑布流
                productArray: [],
                isShowWaterfall: false,
                deviceSize: '',
                deviceType: '',
                //打开item
                isOpenItem: false,
                itemSelected: {},
                itemLoadingSuccess: false,
                dialogState: 'close',
                //右侧菜单
                menuItems: [
                    {id: 'item-home', ready: true, title: '主页/HOME',},
                    {id: 'item-news', ready: true, title: '最新课程/NEWS',},
                    {id: 'item-process', ready: false, title: '发展历程/PROCESS',},
                    {id: 'item-about', ready: true, title: '关于我们/ABOUT US',},
                    {id: 'item-join', ready: false, title: '加入我们/JOIN US',}
                ],

                //loading加载
                isLoading: false,
            }
        },
        computed: {},
        created: function () {
            //  实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，$el还不可用。需要初始化处理一些数据时会比较有用。
            console.log('home组件创建完成');

            this.deviceSize = document.body.clientWidth >= 768 ? 'big' : 'small';

            this.screenHeight = document.body.clientHeight;

            this.deviceType = navigator.userAgent.indexOf('iPad') > 0 ? 'iPad' : '';

            this.http.get('/news').then(res => {
                this.productArray = res.data.products;
                this.isShowWaterfall = true;
            });
        },
        mounted: function () {
            //  el挂载到实例上后会调用，第一个业务逻辑一般从这里开始。
            let _this = this;
            console.log("home组件挂载完成");

            //初始化 关于我们 的Img高度
            let about_img = document.getElementById('about-img');
            about_img.style.height = Number((about_img.offsetWidth * 213.44) / 282.53).toFixed(2) + 'px';

            //瀑布流item 查看更多 的操作
            _this.$bus.$on('open-item-more', function (data) {
                console.log('查看item：' + data.p_id);
                //打开dialog
                _this.isOpenItem = true;
                _this.dialogState = 'open'
            });

        },
        beforeDestroy: function () {
            //  实例销毁之前调用。主要是解绑一些使用addEventListener监听的事件等。
        },
        props: {},
        methods: {
            //  监听sidebar 事件
            handleSideBarEvent(data){
                let _this = this;
                if (data.type === 0) {
                    //切换语言
                    _this.currentLanguage = (data.value === 0) ? 'cn' : 'en';

                    _this.isLoading = true;

                    //更新瀑布流 的内容 START
                    _this.isShowWaterfall = false;
                    setTimeout(showWaterfall, 2000);
                    function showWaterfall() {
                        _this.isShowWaterfall = true;
                        _this.isLoading = false;
                    }

                    //更新 瀑布流 END

                    //更新关于我们 的内容 START

                    //更新 关于我们 END
                } else if (data.type === 1) {
                    //切换导航
                    _this.currentNav = data.value;
                }
            },

            //监听menu 菜单点击事件
            handleMenuEvent(data){
                let target_id = data.targetId;
                switch (target_id) {
                    case 'item-home':
                        console.log('home');
                        break;
                    case 'item-news':
                        console.log('news');
                        break;
                    case 'item-process':
                        console.log('process');
                        break;
                    case 'item-about':
                        console.log('about');
                        break;
                    case 'item-join':
                        console.log('join');
                        break;
                }
            },

            //监听dialog事件
            handleDialogOpen(){
                let _this = this;
                console.log('dialog打开成功，开始加载数据');
                setTimeout(function () {
                    _this.http.get('/product').then(res => {
                        _this.itemSelected = res.data.product;
                        console.log(_this.itemSelected);
                        _this.itemLoadingSuccess = true;
                    });
                }, 2000);
            },
            handleDialogClose(){
                let _this = this;
                _this.dialogState = 'close';

                setTimeout(function () {
                    _this.isOpenItem = false;
                    _this.itemSelected = {};
                    _this.itemLoadingSuccess = false;
                },600);
            }
        }
    }
</script>
<style lang="scss" scoped>
    $base_color: dodgerblue;
    .home {
        width: 100%;
        height: 100%;
    }

    .clearfix:after {
        content: ".";
        clear: both;
        display: block;
        overflow: hidden;
        font-size: 0;
        height: 0;
    }

    .clearfix {
        zoom: 1;
    }

    .btn_hover {
        transition: all .6s;
        background: white;
        color: $base_color;
        border: 2px solid $base_color;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
            background: $base_color;
            color: white;
        }
    }

    .introduce-txt {
        color: $base_color;
        font-weight: bold;
        text-align: center;
    }

    .home-content-about-body {
        height: 80%;
        position: relative;
    }

    .home-content-info {
        background: #3B3B3B;
        margin: 16px 128px 0 0;
        padding: 24px 48px;
        color: white;
    }

    .info-item {
        float: left;
        width: 50%;
        display: inline-block;
        & .info-item-title {
            width: 100%;
            font-size: 24px;
            font-weight: 500;
            text-align: center;
        }
        & p {
            font-size: 18px;
        }
    }

    .info-item-contact {
        float: left;
        width: 50%;
        display: inline-block;
        text-align: center;
        margin-top: 10px;
        & .qrCode {
            width: 50%;
            display: block;
            margin-left: 25%;
        }
        & .iconfont {
            font-size: 32px;
        }
    }

    .keepOnRecord {
        width: 100%;
        margin-top: 8px;
        float: left;
        text-align: center;
        font-size: 16px;
        & p {
            width: 100%;
        }
        & img {
            width: 20px;
            height: 20px;
            transform: translate(-2px, 2px);
        }
    }

    /*dialog 样式*/
    .my-dialog {
        width: 100%;
    }

    .dialog-img {
        width: 50%;
        float: left;
    }

    /* 屏幕415以上通用样式 */
    @media (min-width: 415px) {
        .home-content-about-right {
            font-size: 16px;
            width: 30%;
            padding: 0 5%;
            height: 100%;
            background: white;
            display: inline-block;
            position: relative;
            float: right;
            z-index: 2;

            & h3 {
                font-size: 30px;
                color: dodgerblue;
                position: relative;
            }
            & h5 {
                font-size: 18px;
                font-weight: normal;
                color: dodgerblue;
            }
            & p {
                font-size: 16px;
                margin-top: 16px;
            }
            .btn_hover {
                width: 126px;
                height: 36px;
                font-size: 18px;
                margin-top: 16px;
            }
        }

        .home-content-about-body {
            & figure {
                display: inline-block;
                margin: 0;
                position: relative;
                top: 0;
                left: 0;
                width: 60%;
                height: 100%;
                background-image: url('http://www.ideas-camp.com/src/medias/home/activities.jpg');
                background-size: cover;
                background-position: center center;
                background-repeat: no-repeat
            }
        }

    }

    /*超小屏样式 320 - 414 */
    @mixin home-content-xSmall() {
        /*第一屏 banner*/
        .home-content {
            margin: 0 48px 0 0;
            /*   320 * 667 的40% */
            height: 40%;
        }
        .introduce-txt {
            font-size: 20px;
            margin-right: 48px;
            margin-top: 20px;
            height: 80px;
            line-height: 40px
        }
        /*第二屏 瀑布流*/
        .home-content-product {
            margin: 0 48px 0 0;
        }
        .home-content-about {
            margin: 0 48px 0 0;
            /*   320 * 667 的40% */
            min-height: 40%;
        }
        /*第三屏 关于我们*/
        .home-content-about-body {
            padding: 5%;
            & figure {
                width: 96%;
                height: 100%;
                margin-left: 2%;
                background-image: url("http://www.ideas-camp.com/src/medias/home/activities.jpg");
                background-size: cover;
                background-position: center center;
                background-repeat: no-repeat
            }
        }
        .home-content-about-right {
            font-size: 14px;
            font-weight: normal;
            width: 96%;
            margin-left: 2%;
            height: 100%;

            & h3 {
                font-size: 26px;
                color: $base_color;
                position: relative;
            }
            & h5 {
                font-size: 16px;
                font-weight: normal;
                color: $base_color;
            }
            & p {
                font-size: 14px;
                margin-top: 14px;
            }
            .btn_hover {
                width: 126px;
                height: 36px;
                font-size: 14px;
                margin-top: 14px;
                margin-left: 50%;
                transform: translateX(-50%);
            }
        }

        /*第四屏 联系方式*/
        .home-content-info {
            margin: 16px 48px 0 0;
            padding: 24px 48px;
        }
        .info-item {
            width: 100%;
            margin-top: 8px;
            border-bottom: 1px solid lightgray;
            & .info-item-title {
                width: 100%;
                font-size: 18px;
            }
            & p {
                font-size: 16px;
            }
        }
        .info-item-contact {
            margin-top: 8px;
            & .qrCode {
                width: 80%;
                margin-left: 10%;
            }
            & .iconfont {
                font-size: 28px;
            }
        }
        .keepOnRecord {
            margin-top: 8px;
            font-size: 12px;
            & img {
                width: 16px;
                height: 16px;
            }
        }

        /*dialog */
        .dialog-img {
            width: 100%;
        }
    }

    /*小屏样式 415 - 767*/
    @mixin home-content-small() {
        /*banner*/
        .home-content {
            margin: 0 48px 0 0;
            /*   414 * 736 的50% */
            height: 50%;
        }
        .introduce-txt {
            font-size: 30px;
            margin-right: 48px;
            margin-top: 30px;
            height: 120px;
            line-height: 60px
        }
        /*瀑布流*/
        .home-content-product {
            margin: 0 48px 0 0;
        }
        /*关于我们*/
        .home-content-about {
            margin: 0 48px 0 0;
            min-height: 50%;
        }
        .home-content-about-body {
            padding: 48px 0 0 80px;
        }

        .home-content-info {
            margin: 16px 48px 0 0;
            padding: 24px 48px;
        }
        .keepOnRecord {
            margin-top: 10px;
            font-size: 14px;
            & img {
                width: 18px;
                height: 18px;
            }
        }
    }

    /*中屏样式 768 - 1024*/
    @mixin home-content-middle() {
        /*banner*/
        .home-content {
            margin: 0 120px 0 0;
            /*   768 * 1024 的50% */
            height: 50%;
        }
        .introduce-txt {
            font-size: 38px;
            margin-right: 128px;
            margin-top: 38px;
            margin-bottom: 38px;
            height: 152px;
            line-height: 76px
        }
        /*瀑布流*/
        .home-content-product {
            margin: 0 128px 0 0;
        }
        /*关于我们*/
        .home-content-about {
            margin: 0 120px 0 0;
            min-height: 50%;
        }
        .home-content-about-body {
            padding: 48px 0 0 80px;
        }

        /*联系方式*/
        .keepOnRecord {
            margin-top: 10px;
            font-size: 16px;
            & img {
                width: 20px;
                height: 20px;
            }
        }
    }

    /*大屏样式 1024 以上*/

    @mixin home-content-big() {
        /*banner*/
        .home-content {
            margin: 0 128px 0 0;
            height: 100%;
        }
        .introduce-txt {
            font-size: 40px;
            margin-right: 128px;
            margin-top: 40px;
            margin-bottom: 40px;
            height: 160px;
            line-height: 80px
        }
        /*瀑布流*/
        .home-content-product {
            margin: 0 128px 0 0;
        }
        /*关于我们*/
        .home-content-about {
            margin: 0 128px 0 0;
            min-height: 100%;
        }
        .home-content-about-body {
            padding: 48px 0 0 80px;
        }
        .home-content-about-right {
            font-size: 18px;

            & h3 {
                font-size: 36px;
            }
            & h5 {
                font-size: 20px;
            }
            & p {
                font-size: 18px;
                margin-top: 18px;
            }
            .btn_hover {
                width: 140px;
                height: 40px;
                font-size: 20px;
                margin-top: 18px;
            }
        }

        /*联系方式*/
        .keepOnRecord {
            margin-top: 12px;
            font-size: 18px;
            & img {
                width: 22px;
                height: 22px;
            }
        }
    }

    @media (min-width: 320px) and (max-width: 414px) {
        @include home-content-xSmall()
    }

    @media (min-width: 415px) and (max-width: 767px) {
        @include home-content-small()
    }

    @media (min-width: 768px) and (max-width: 1024px) {
        @include home-content-middle()
    }

    @media (min-width: 1025px) {
        @include home-content-big();
    }

</style>