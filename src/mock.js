/**
 * Created by peterpan on 2018/6/5.
 */
// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
Random.extend({
    p_url: function () {
        const urls = [
            'http://www.ideas-camp.com/src/medias/home/camp-2.jpg',
            'http://www.ideas-camp.com/src/medias/home/camp-3.jpg',
            'http://www.ideas-camp.com/src/medias/home/camp-1.jpg',
            'http://www.ideas-camp.com/src/medias/home/camp-5.jpg',
            'http://www.ideas-camp.com/src/medias/home/camp-6.jpg',
            'http://www.ideas-camp.com/src/medias/home/camp-4.jpg',];
        return this.pick(urls)
    },
    p_pType: function () {
        const types = [
            0, 1, 2
        ];
        return this.pick(types)
    },
    p_title: function () {
        const titles = [
            {cn: '城市人文营', en: 'Urban humanities camp'},
            {cn: '阿那亚太空营', en: 'ANA space camp'},
            {cn: '自然探索营', en: 'Natural exploration camp'},
            {cn: '歌华综合营', en: 'Gogoa comprehensive camp'},
            {cn: '户外探索与运动营', en: 'Outdoor exploration and sports camps'},
            {cn: 'PBL研学营', en: 'PBL research camp'},
            {cn: '国际视野的世界', en: 'International vision of the world'},
        ];
        return this.pick(titles)
    },
    p_content: function () {
        const contents = [
            {
                cn: '启行日间营多年研究实践，融合传统美式日间营菁华，根据中国4-7岁低龄儿童特点专属设计营会理念及整体框架。多元体验，发掘兴趣，充分满足低龄儿童的好奇心和求知欲，引导小龄营员激发创意、认识自我、踏出主动探索第一步。',
                en: 'Many years of research and practice have been carried out in the daytime camp, which combines traditional American day camp with the unique design concept and overall framework of the 4-7 year old children. Multi experience, explore interest, fully meet the curiosity and curiosity of the young children, guide the young age camp to inspire creativity, self-awareness, step out the first step of exploration.'
            },
            {
                cn: '夏季亲近自然的户外探索与运动，冬季专业力与跨学科的大师工作坊，在营地独特的场景中，与同龄伙伴们共同生活、共同挑战，迈出舒适区，全面提升21世纪必备的沟通力、团队合作力、批判性思维与创新力，拥有独立解决问题、应对未知的能力。',
                en: 'Summer is close to the natural outdoor exploration and movement, the winter professional force and the cross discipline master workshop, in the unique scene of the camp, live together with the same age partners, make a common challenge, make a comfortable area, improve the necessary communication, team cooperation, critical thinking and innovation in twenty-first Century, and have an independent solution. The ability to deal with the unknown.'
            },
            {
                cn: '有成长就有启行。戏剧、音乐剧、绘本工坊、设计思维、英文阅读写作……营地中最受欢迎的课程，也可以在日常学期中助力孩子成长！创新教育，创意思维，跨学科的学习与学术修养，在这里开启。',
                en: 'If you grow up, there will be an inspiration. Drama, musicals, picture books workshop, design thinking, English reading and writing... The most popular courses in camps can help children grow up in the daily term. Innovative education, creative thinking, interdisciplinary learning and academic accomplishment are here.'
            },
            {
                cn: '通过创新教育形式，丰富学习体验，突破传统学校的“围墙”，做到“知行合一”。启行研学营在研学中加入PBL的项目设计、项目管理、成果展示，综合提升营员自主学习、研究性学习、团队合作和创造性解决问题的能力。',
                en: 'Through innovative education forms, enrich learning experience, break through the walls of traditional schools, and achieve "unity of knowledge and action". The project design, project management and achievement display of PBL are added to the research camp to improve the ability of independent study, research study, team cooperation and creative solution to the problem.'
            },
            {
                cn: '全球20个国家和地区，30+顶级海外营地，40+主题营会项目，包括美、加、俄、英、法、澳、芬兰、瑞士、希腊、葡萄牙、南非、西班牙等国，日间营、亲子营、单飞营……通过创建跨文化交流学习平台，鼓励青少年积极探索和体验多元世界文化，成长为具有国际视野的世界公民。',
                en: '20 countries and regions in the world, 30+ top overseas camps, 40+ theme camping projects, including the United States, Canada, Russia, Britain, France, Australia, Finland, Switzerland, Greece, Portugal, South Africa, Spain and other countries, day camps, parent-child camps, single flying camps... By creating a cross-cultural learning platform, we encourage youngsters to actively explore and experience multicultural culture and grow into a global citizen with an international perspective.'
            },
            {
                cn: '特别设置专项技能学习，营地语言课程学习，生活能力和生存技能培养等营会内容，为孩子预备独立成长第一步。',
                en: 'Specially set up special skills learning, camp language course learning, life skills and survival skills training, and so on, so as to prepare children for independent growth.'
            },
            {
                cn: '100+活动体验，感受文化与艺术、科学与体育的多重碰撞，在丰富体验中探索自己的兴趣点，为未来的成长赋能。',
                en: '100+ activities experience, feel the multiple collisions between culture and art, science and sports, explore their interests in enriching experience, and empower future growth. '
            }
        ];
        return this.pick(contents)
    },
    product: function () {
        let obj = {
            p_id: this.guid(),
            title: this.p_title(),
            content: this.p_content(),
            imgUrl: this.p_url(),
            p_type: this.p_pType()
        };
        return obj
    }
});

// mock一组数据
const productsData = function () {
    let products = [];
    for (let i = 0; i < 6; i++) {
        let newProductsObject = Random.product();
        products.push(newProductsObject)
    }

    return {
        products: products
    }
};
// mock一个数据
const productData = function () {
    let p = Random.product();
    return {
        product: p
    }
};

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news', 'get', productsData);

Mock.mock('/product', 'get', productData);
