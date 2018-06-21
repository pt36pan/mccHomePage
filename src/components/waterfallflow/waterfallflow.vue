<template>

    <div class="waterfall-content">
        <!--<div v-for="(item,index) in items" class="waterfall-item" :style="getItemStyle(index)">-->
        <div v-for="(item,index) in items" class="waterfall-item">

            <div class="waterfall-item-title">
                <div class="waterfall-item-title-txt">
                    <span class="title-small">{{getItemType(item.p_type)}}</span><br>
                    <span class="title-big">{{language === 'cn' ? item.title.cn : item.title.en}}</span>
                </div>
            </div>
            <div class="waterfall-item-content">
                <div class="waterfall-item-content-txt">{{language === 'cn' ? item.content.cn : item.content.en}}
                    <img class="waterfall-item-content-img" :src="item.imgUrl" @load="imageLoaded()">
                    <button class="waterfall-item-content-button" @click="handleMore(item.p_id)">{{language === 'cn' ? '查看更多' : 'LEARN MORE'}}</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    export default{
        props: {
            count: {
                type: Number,
                default: 3
            },
            items: {
                type: Array,
                default: [
                    {
                        p_id: 0,
                        title: '活动哟0',
                        content: '内容阿里',
                        imgUrl: ''
                    }
                ]
            },
            size: {
                type: String,
                default: 'small'
            },
            deviceType: {
                type: String,
                default: ''
            },
            language: {
                type: String,
                default: 'cn'
            }
        },
        computed: {
            itemWidth: function () {
                let parentWidth = window.innerWidth - 120;
                return Number(parentWidth / (this.rowCount)).toFixed(2) + 'px';
            }
        },
        data(){
            return {
                rowCount: this.count,    //一行排列的Item个数
                myItems: [],
                imgCount: 0,
                maxItemToTop: 0          //距离父元素顶部最大的item的值
            }
        },
        created: function () {
            //  实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，$el还不可用。需要初始化处理一些数据时会比较有用。
//            console.log('waterfallflow created');
        },
        mounted(){
            //  el挂载到实例上后会调用，第一个业务逻辑一般从这里开始。
//            console.log('waterfallflow mounted');
            let _this = this;

            //初始化瀑布流

            if (_this.size === 'big') {
                const intervalNum = setInterval(function () {
                    if (_this.imgCount === _this.items.length) {
                        _this.updateWaterFallItems(_this);
                        clearInterval(intervalNum);
                        let content = document.getElementsByClassName('waterfall-content')[0];
                        content.style.height = _this.maxItemToTop + 'px';
                    }
                }, 100);
            }

        },
        beforeDestroy: function () {
            //  实例销毁之前调用。主要是解绑一些使用addEventListener监听的事件等。
            console.log('waterfallflow destroy');
        },
        methods: {
            getItemStyle: function (index) {
                if (this.size === 'small') {
                    return {}
                } else {
                    return {
                        width: this.itemWidth,
                    }
                }
            },
            //获取课程类型
            getItemType: function (type) {
                return (type === 0 ? '国内营地' : (type === 1 ? '海外营地' : '公益营地'))
            }
            ,
            //获取图片样式
            getItemImageStyle: function (url) {
                return {
                    'background-image': url,
                    'background-size': '100% 100%'
                }
            },
            //判断图片资源架子啊
            imageLoaded: function () {
                console.log('图片加载完成');
                this.imgCount++;
            },
            updateWaterFallItems: function (el) {
                let items = document.getElementsByClassName('waterfall-item');
                console.log('update：' + items.length);
                let topArray = [];
                let itemArray = [];
                for (let i = 0; i < items.length; i++) {
                    //当前height
                    let top = items[i].offsetHeight;
                    if (i < 3) {
                        topArray.push(top);
                        itemArray.push(items[i]);

                        items[i].style.left = i * getStyleWidth(items[i]) + 'px';
                    } else {
                        let minTopIndex = getMinTop(topArray);

                        items[i].style.left = itemArray[minTopIndex].offsetLeft + 'px';
                        items[i].style.top = itemArray[minTopIndex].offsetTop + itemArray[minTopIndex].offsetHeight + 10 + 'px';

                        itemArray[minTopIndex] = items[i];
                        topArray[minTopIndex] = items[i].offsetTop + items[i].offsetHeight;
                    }

                    //先将第一个值设为最大值
                    if (i === 0) {
                        el.maxItemToTop = items[0].offsetHeight + items[0].offsetTop;
                    }
                    if (i > 0) {
                        let toTop = items[i].offsetHeight + items[i].offsetTop;
                        el.maxItemToTop = (toTop > el.maxItemToTop) ? toTop : el.maxItemToTop;
                    }
                }

                function getMinTop(array) {
                    let min = Math.min(...array);
                    return array.indexOf(min)
                }

                function getStyleWidth(el) {
                    return el.offsetWidth;
//                    return parseInt(el.style.width.toString().substring(0, 3))
                }
            },

            //点击查看更多
            handleMore:function (id) {
                let data = {
                    p_id: id,
                    msg: '查看item：'+id
                };
                this.$bus.$emit('open-item-more',data)
            }
        }

    }
</script>
<style lang="scss" scoped>
    @import "./waterfallflow.scss";
</style>