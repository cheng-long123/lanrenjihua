
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/notice/index","pages/my/index","pages/text/text","pages/login/index","pages/register/index","pages/Otherpages/gathering","pages/Otherpages/addCreditCard","pages/setting/index","pages/Otherpages/manual","pages/setting/changemm","pages/Otherpages/formsubmit","pages/setting/changeXinUpdate","pages/Otherpages/autoRefund","pages/Otherpages/fastRefund","pages/Otherpages/planDetails","pages/Otherpages/planDetailsList","pages/my/account","pages/my/promotionCenter","pages/my/Certification","pages/my/orderDetail","pages/my/orderParticulars","pages/my/profitDetail","pages/my/profitParticulars","pages/my/withdrawDeposit","pages/my/vip","pages/my/teamManagement","pages/my/profitSummary","pages/notice/authenticated"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"懒人计划","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#747474","selectedColor":"#209CFF","list":[{"text":"首页","pagePath":"pages/index/index","iconPath":"./static/image/index.png","selectedIconPath":"./static/image/select-index.png"},{"text":"公告","pagePath":"pages/notice/index","iconPath":"./static/image/notice.png","selectedIconPath":"./static/image/select-notice.png"},{"text":"我的","pagePath":"pages/my/index","iconPath":"./static/image/my.png","selectedIconPath":"./static/image/select-my.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"懒人计划","compilerVersion":"2.8.8","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","enablePullDownRefresh":true,"backgroundColor":"#f4f4f6","navigationStyle":"custom","titleNView":false}},{"path":"/pages/notice/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"公告","backgroundColor":"#f4f4f6","navigationBarBackgroundColor":"#fff","titleNView":{"titleText":"公告","titleSize":"16px","titleColor":"#4481EB"}}},{"path":"/pages/my/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationBarBackgroundColor":"#4481EB","type":"transparent","titleNView":{"titleText":"我的","titleSize":"16px","titleColor":"#fff","buttons":[{"type":"none","text":"","fontSrc":"/static/iconfont/iconfont.ttf","float":"right"}]}}},{"path":"/pages/text/text","meta":{},"window":{}},{"path":"/pages/login/index","meta":{},"window":{"navigationBarTitleText":" ","navigationBarBackgroundColor":"#fff","titleNView":{"titleSize":"16px","buttons":[{"type":"none","text":"注册","fontSrc":"/static/iconfont/iconfont.ttf","float":"right","fontSize":"16px"}]}}},{"path":"/pages/register/index","meta":{},"window":{"navigationBarTitleText":"注册","titleNView":{"titleText":"注册","titleSize":"16px","titleColor":"#4481EB"}}},{"path":"/pages/Otherpages/gathering","meta":{},"window":{"navigationBarTitleText":"商户收款","titleNView":{"titleText":"商户收款","titleSize":"16px","titleColor":"#4481EB"}}},{"path":"/pages/Otherpages/addCreditCard","meta":{},"window":{"navigationBarTitleText":"新增信用卡","titleNView":{"titleText":"新增信用卡","titleSize":"16px"}}},{"path":"/pages/setting/index","meta":{},"window":{"navigationBarTitleText":"设置","titleNView":{"titleText":"设置","titleSize":"16px"}}},{"path":"/pages/Otherpages/manual","meta":{},"window":{"navigationBarTitleText":"手动还款","titleNView":{"titleText":"手动还款","titleSize":"16px","titleColor":"#4481EB"}}},{"path":"/pages/setting/changemm","meta":{},"window":{"navigationBarTitleText":"修改密码"}},{"path":"/pages/Otherpages/formsubmit","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/setting/changeXinUpdate","meta":{},"window":{"navigationBarTitleText":"信用卡修改"}},{"path":"/pages/Otherpages/autoRefund","meta":{},"window":{"navigationBarTitleText":"一键还款","titleNView":{"titleText":"一键还款","titleSize":"16px","titleColor":"#4481EB"}}},{"path":"/pages/Otherpages/fastRefund","meta":{},"window":{"navigationBarTitleText":"极速还款","titleNView":{"titleText":"极速还款","titleSize":"16px","titleColor":"#4481EB"}}},{"path":"/pages/Otherpages/planDetails","meta":{},"window":{"navigationBarBackgroundColor":"#005BEA","navigationBarTitleText":"还款详情","titleNView":{"titleText":"还款详情","titleSize":"16px","titleColor":"#fff"}}},{"path":"/pages/Otherpages/planDetailsList","meta":{},"window":{"navigationBarTitleText":"计划详情","titleNView":{"titleText":"计划详情","titleSize":"16px","titleColor":"#4481EB"}}},{"path":"/pages/my/account","meta":{},"window":{"navigationBarTitleText":"账户管理","titleNView":{"titleText":"账户管理","titleSize":"16px","titleColor":"#4481EB"}}},{"path":"/pages/my/promotionCenter","meta":{},"window":{"navigationBarTitleText":"推广中心","titleNView":{"buttons":[{"text":"分享","fontSize":"14px","color":"#898989"}]}}},{"path":"/pages/my/Certification","meta":{},"window":{"navigationBarTitleText":"实名认证","titleNView":{"titleText":"实名认证","titleSize":"16px","titleColor":"#4481EB"}}},{"path":"/pages/my/orderDetail","meta":{},"window":{"navigationBarTitleText":"订单明细","navigationBarBackgroundColor":"#005BEA","titleNView":{"titleText":"订单明细","titleSize":"16px","titleColor":"#fff"}}},{"path":"/pages/my/orderParticulars","meta":{},"window":{"navigationBarTitleText":"订单详情","navigationBarBackgroundColor":"#005BEA","titleNView":{"titleText":"订单详情","titleSize":"16px","titleColor":"#fff"}}},{"path":"/pages/my/profitDetail","meta":{},"window":{"navigationBarTitleText":"分润明细","navigationBarBackgroundColor":"#005BEA","titleNView":{"titleText":"分润明细","titleSize":"16px","titleColor":"#fff"}}},{"path":"/pages/my/profitParticulars","meta":{},"window":{"navigationBarTitleText":"分润详情","navigationBarBackgroundColor":"#005BEA","titleNView":{"titleText":"分润详情","titleSize":"16px","titleColor":"#fff"}}},{"path":"/pages/my/withdrawDeposit","meta":{},"window":{"navigationBarTitleText":"余额提现","titleNView":{"titleText":"余额提现","titleSize":"16px","titleColor":"#4481EB"}}},{"path":"/pages/my/vip","meta":{},"window":{"navigationBarTitleText":"会员中心","navigationBarBackgroundColor":"#005BEA","titleNView":{"titleText":"会员中心","titleSize":"16px","titleColor":"#fff"}}},{"path":"/pages/my/teamManagement","meta":{},"window":{"navigationBarTitleText":"团队管理","titleNView":{"titleText":"团队管理","titleSize":"16px","titleColor":"#4481EB"}}},{"path":"/pages/my/profitSummary","meta":{},"window":{"navigationBarTitleText":"分润汇总","navigationBarBackgroundColor":"#005BEA","titleNView":{"titleText":"分润汇总","titleSize":"16px","titleColor":"#fff"}}},{"path":"/pages/notice/authenticated","meta":{},"window":{"navigationBarTitleText":"实名认证","titleNView":{"titleText":"实名认证","titleSize":"16px","titleColor":"#4481EB"}}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
