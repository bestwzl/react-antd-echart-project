import React from 'react';
import dynamic from 'dva/dynamic';
import { getMenuData } from './menu';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  // eslint-disable-next-line no-underscore-dangle
  models: () => models.filter(m => !app._models.some(({ namespace }) => namespace === m)).map(m => import(`../models/${m}.js`)),
  // add routerData prop
  component: () => {
    const routerData = getRouterData(app);
    return component().then((raw) => {
      const Component = raw.default || raw;
      return props => <Component {...props} routerData={routerData} />;
    });
  },
});

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = item.name;
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = item.name;
    }
  });
  return keys;
}

export const getRouterData = (app) => {
  const routerData = {
  	'/': {
      component: dynamicWrapper(app, [], () => import('../layouts/BasicLayout')),
   	},
  	'/userans/increase-ans': {
    	component: dynamicWrapper(app, ['userans'], () => import('../routes/Userans/IncreaseAns')),
	 	},
	 	'/userans/invitation-ans': {
    	component: dynamicWrapper(app, [], () => import('../routes/Userans/InvitationAns')),
	 	},
	 	'/userans/portrayal-ans-sex': {
    	component: dynamicWrapper(app, [], () => import('../routes/Userans/PortrayalAnsSex')),
	 	},
	 	'/userans/portrayal-ans-nouser': {
    	component: dynamicWrapper(app, [], () => import('../routes/Userans/PortrayalAnsNouser')),
	 	},
	 	'/userans/portrayal-ans-agerange': {
    	component: dynamicWrapper(app, [], () => import('../routes/Userans/PortrayalAnsAgerange')),
	 	},
  	'/activityans/activity-amount': {
    	component: dynamicWrapper(app, ['activityAmount'], () => import('../routes/Activityans/ActivityAmount')),
	 	},
	 	
	 	//交易分析-申购赎回分析
	 	'/dealans/subscribe-redeem': {
    	component: dynamicWrapper(app, [], () => import('../routes/Dealans/SubscribeRedeem')),
	 	},
	 	//交易分析-现金申购赎回单价分析
	 	'/dealans/subscribe-redeem-cash': {
    	component: dynamicWrapper(app, [], () => import('../routes/Dealans/SubscribeRedeemCash')),
	 	},
	 	//交易分析-成交金额分布分析
	 	'/dealans/trading-amount': {
    	component: dynamicWrapper(app, [], () => import('../routes/Dealans/TradingAmount')),
	 	},
	 	//交易分析-渠道银行支付成功率
	 	'/dealans/bank-pay-sucrate': {
    	component: dynamicWrapper(app, [], () => import('../routes/Dealans/BankPaySucrate')),
	 	},
	 	//交易分析-用户流失及复购分析
	 	'/dealans/loss-user-repbuy': {
    	component: dynamicWrapper(app, [], () => import('../routes/Dealans/LossUserRepbuy')),
	 	},
	 	
	 	//产品分析-派息分析
	 	'/productans/payout-ans': {
    	component: dynamicWrapper(app, [], () => import('../routes/Productans/PayoutAns')),
	 	},
	 	//产品分析-投资期限分析
	 	'/productans/invest-deadline-ans': {
    	component: dynamicWrapper(app, [], () => import('../routes/Productans/InvestDeadlineAns')),
	 	},
	 	//产品分析-定期申购情况统计
	 	'/productans/subscribe-tn': {
    	component: dynamicWrapper(app, [], () => import('../routes/Productans/SubscribeTn')),
	 	},
	 	
	 	'/user': {
    	component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
	  '/user/login': {
    	component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
	  },
//  '/': {
//    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
//  },
//  '/dashboard/analysis': {
//    component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
//  },
//  '/dashboard/monitor': {
//    component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
//  },
//  '/dashboard/workplace': {
//    component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
//    // hideInBreadcrumb: true,
//    // name: '工作台',
//  },
//'/form/basic-form': {
//  component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
//},
//  '/form/step-form': {
//    component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
//  },
//  '/form/step-form/info': {
//    component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step1')),
//  },
//  '/form/step-form/confirm': {
//    component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
//  },
//  '/form/step-form/result': {
//    component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
//  },
//  '/form/advanced-form': {
//    component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
//  },
//  '/list/table-list': {
//    component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
//  },
//  '/list/basic-list': {
//    component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
//  },
//  '/list/card-list': {
//    component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
//  },
//  '/list/search': {
//    component: dynamicWrapper(app, ['list'], () => import('../routes/List/List')),
//  },
//  '/list/search/projects': {
//    component: dynamicWrapper(app, ['list'], () => import('../routes/List/Projects')),
//  },
//  '/list/search/applications': {
//    component: dynamicWrapper(app, ['list'], () => import('../routes/List/Applications')),
//  },
//  '/list/search/articles': {
//    component: dynamicWrapper(app, ['list'], () => import('../routes/List/Articles')),
//  },
//  '/profile/basic': {
//    component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
//  },
//  '/profile/advanced': {
//    component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/AdvancedProfile')),
//  },
//  '/result/success': {
//    component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
//  },
//  '/result/fail': {
//    component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
//  },
//  '/exception/403': {
//    component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
//  },
//  '/exception/404': {
//    component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
//  },
//  '/exception/500': {
//    component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
//  },
//  '/exception/trigger': {
//    component: dynamicWrapper(app, ['error'], () => import('../routes/Exception/triggerException')),
//  },
//  '/user': {
//    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
//  },
//  '/user/login': {
//    component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
//  },
//  '/user/register': {
//    component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
//  },
//  '/user/register-result': {
//    component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
//  },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());
  const routerDataWithName = {};
  Object.keys(routerData).forEach((item) => {
    routerDataWithName[item] = {
      ...routerData[item],
      name: routerData[item].name || menuData[item.replace(/^\//, '')],
    };
  });
  return routerDataWithName;
};
