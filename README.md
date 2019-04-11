# xiao_injiu
php + wx小程序。
# 一 从搭建到开发：
  1、在小程序开发注册：在微信公众平台注册小程序，完成注册后可以同步进行信息完善和开发。<br>
  2、小程序信息完善：填写小程序基本信息，包括名称、头像、介绍及服务范围等。<br>
  3、开发小程序：完成小程序开发者绑定、开发信息配置后，开发者可下载开发者工具、参考开发文档进行小程序的开发和调试。<br>
  4、提交审核和发布：完成小程序开发后，提交代码至微信团队审核，审核通过后即可发布（公测期间不能发布）。<br>
# 二 全局配置
  1、app.josn文件中配置文件路径，保存自动添加路径文件。<br>
  2、app.josn中还可以配置tabar导航：只能配置最少 2 个、最多 5 个 tab。<br>
  '"tabBar": {
    "color" : "#727272",
    "selectedColor": "#FF1A1A",
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "/images/icon_tag_home_nor@3x.png",
        "selectedIconPath": "/images/icon_tag_home_pre@3x.png",
        "text": "首页"
      },
      {
        "pagePath": "pages/nearby/nearby",
        "iconPath": "/images/icon_tag_nearby_nor@3x.png",
        "selectedIconPath": "/images/icon_tag_nearby_pre@3x.png",
        "text": "附近"
      },
      {
        "pagePath": "pages/welfare/welfare",
        "iconPath": "/images/icon_tag_welfare_nor@3x.png",
        "selectedIconPath": "/images/icon_tag_welfare_pre@3x.png",
        "text": "福利"
      },
      {
        "pagePath": "pages/my/my",
        "iconPath": "/images/icon_tag_personal_nor@3x.png",
        "selectedIconPath": "/images/icon_tag_personal_pre@3x.png",
        "text": "我的"
      }
    ]
  },'
  3、在开发过程中需要调用微信权限时需要在app.json中配置。 例：<br>
