const menuData = [{
  name: '用户分析',
  icon: 'dashboard',
  path: 'userans',
  children: [{
    name: '用户增长分析',
    path: 'increase-ans',
  }, {
    name: '邀请分析',
    path: 'invitation-ans',
  },{
    name: '用户画像分析-性别',
    path: 'portrayal-ans-sex',
  },{
    name: '用户画像分析-新老用户',
    path: 'portrayal-ans-nouser',
  },{
    name: '用户画像分析-年龄区间',
    path: 'portrayal-ans-agerange',
  }],
}, {
  name: '活动分析',
  icon: 'table',
  path: 'activityans',
  children: [{
    name: '活动发放金额',
    path: 'activity-amount',
  }],
},{
  name: '交易分析',
  icon: 'profile',
  path: 'dealans',
  children: [{
    name: '申购赎回分析',
    path: 'subscribe-redeem',
  },{
    name: '现金申购赎回单价分析',
    path: 'subscribe-redeem-cash',
  },{
    name: '成交金额分布分析',
    path: 'trading-amount',
  },{
    name: '渠道银行支付成功率',
    path: 'bank-pay-sucrate',
  },{
    name: '用户流失及复购分析',
    path: 'loss-user-repbuy',
  }],
},{
  name: '产品分析',
  icon: 'check-circle-o',
  path: 'productans',
  children: [{
    name: '派息分析',
    path: 'payout-ans',
  },{
    name: '投资期限分析',
    path: 'invest-deadline-ans',
  },{
    name: '定期申购情况统计',
    path: 'subscribe-tn',
  }],
},{
  name: '使用文档',
  icon: 'book',
  path: 'http://pro.ant.design/docs/getting-started',
  target: '_blank',
}];

function formatter(data, parentPath = '') {
  const list = [];
  data.forEach((item) => {
    if (item.children) {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
        children: formatter(item.children, `${parentPath}${item.path}/`),
      });
    } else {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
      });
    }
  });
  return list;
}

export const getMenuData = () => formatter(menuData);



//const menuData = [{
//name: 'dashboard',
//icon: 'dashboard',
//path: 'dashboard',
//children: [{
//  name: '分析页',
//  path: 'analysis',
//}, {
//  name: '监控页',
//  path: 'monitor',
//}, {
//  name: '工作台',
//  path: 'workplace',
//  // hideInMenu: true,
//}],
//}, {
//name: '表单页',
//icon: 'form',
//path: 'form',
//children: [{
//  name: '基础表单',
//  path: 'basic-form',
//}, {
//  name: '分步表单',
//  path: 'step-form',
//}, {
//  name: '高级表单',
//  path: 'advanced-form',
//}],
//}, {
//name: '列表页',
//icon: 'table',
//path: 'list',
//children: [{
//  name: '查询表格',
//  path: 'table-list',
//}, {
//  name: '标准列表',
//  path: 'basic-list',
//}, {
//  name: '卡片列表',
//  path: 'card-list',
//}, {
//  name: '搜索列表',
//  path: 'search',
//  children: [{
//    name: '搜索列表（文章）',
//    path: 'articles',
//  }, {
//    name: '搜索列表（项目）',
//    path: 'projects',
//  }, {
//    name: '搜索列表（应用）',
//    path: 'applications',
//  }],
//}],
//}, {
//name: '详情页',
//icon: 'profile',
//path: 'profile',
//children: [{
//  name: '基础详情页',
//  path: 'basic',
//}, {
//  name: '高级详情页',
//  path: 'advanced',
//}],
//}, {
//name: '结果页',
//icon: 'check-circle-o',
//path: 'result',
//children: [{
//  name: '成功',
//  path: 'success',
//}, {
//  name: '失败',
//  path: 'fail',
//}],
//}, {
//name: '异常页',
//icon: 'warning',
//path: 'exception',
//children: [{
//  name: '403',
//  path: '403',
//}, {
//  name: '404',
//  path: '404',
//}, {
//  name: '500',
//  path: '500',
//}, {
//  name: '触发异常',
//  path: 'trigger',
//}],
//}, {
//name: '账户',
//icon: 'user',
//path: 'user',
//children: [{
//  name: '登录',
//  path: 'login',
//}, {
//  name: '注册',
//  path: 'register',
//}, {
//  name: '注册结果',
//  path: 'register-result',
//}],
//}, {
//name: '使用文档',
//icon: 'book',
//path: 'http://pro.ant.design/docs/getting-started',
//target: '_blank',
//}];


