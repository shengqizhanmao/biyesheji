# biyesheji
## 本文
本文采用SpringBoot、Vue、Uni-App等前后端框架，
采用了WebSocket全双工通信协议来编写好友通信，
使用Shiro+JWT+Redis登录验证以及权限验证，使用MySQL来保存数据,Redis缓存数据，
采用Mioin框架保存图片，实现了游戏论坛用户发表帖子、对帖子进行评论，
与好友进行实时交流等主要功能。本文说明设计并实现基于SpringBoot框架的游戏论坛系统。
## 主要技术的版本号
Java	1.8
SpringBoot	2.5.6

Maven	3.5.4

MySql	5.7.26

Docker	20.10.17

Minio	8.3

Redis	5.0以上，6.0以下

Vue	3.0以上

Uniapp	基于Vue3版本

## 本文的五步走，
第一步主要根据目前游戏行业发展现状结合游戏爱好者需要交流游戏信息的需求从而引出开发游戏论坛的必要性。
第二步根据游戏用户需求指定需求分析和可行性分析，并介绍应用到的主要技术。
第三步对系统的功能和数据库进行设计，
第四步展示相关功能模块完成的核心代码和截图，
第五步做功能性测试、可用性测试、安全性测试确保程序能正常运行。
## 本系统具有以下优点：
该系统采用B/S结构，具有广泛的兼容性，在大多数个人电脑上均可使用。
此外，系统将用户权限分级，不同用户可以看到和操作不同的信息，拥有不同的操作权限。
此系统的界面简单易用。
