

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for s_menu
-- ----------------------------
DROP TABLE IF EXISTS `s_menu`;
CREATE TABLE `s_menu`  (
  `s_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `effect` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sort` bigint(255) NULL DEFAULT NULL,
  PRIMARY KEY (`s_id`) USING BTREE,
  INDEX `s_id`(`s_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of s_menu
-- ----------------------------
INSERT INTO `s_menu` VALUES ('09de4da95360ba3a143660cf22e23726', '/examine', '审核', 'el-icon-finished', '审核', 10);
INSERT INTO `s_menu` VALUES ('1', '/welcome', '主页', 'el-icon-house', '主页', 1);
INSERT INTO `s_menu` VALUES ('10', '/category', '分类', 'el-icon-menu', '分类', 11);
INSERT INTO `s_menu` VALUES ('11', '/tags', '标签', 'el-icon-price-tag', '标签', 12);
INSERT INTO `s_menu` VALUES ('12', '/user', '普通用户', 'el-icon-user ', '普通用户', 3);
INSERT INTO `s_menu` VALUES ('2', '/suser', '系统用户', 'el-icon-user ', '用户管理', 2);
INSERT INTO `s_menu` VALUES ('3', '/role', '角色', 'el-icon-key', '角色管理', 4);
INSERT INTO `s_menu` VALUES ('4', '/resource', '资源', 'el-icon-key', '资源管理', 5);
INSERT INTO `s_menu` VALUES ('5', '/smenu', '系统目录', 'el-icon-setting ', '系统目录', 14);
INSERT INTO `s_menu` VALUES ('6', '/menu', '用户目录', 'el-icon-setting ', '用户目录', 13);
INSERT INTO `s_menu` VALUES ('7', '/palte', '板块', 'el-icon-copy-document', '板块管理', 6);
INSERT INTO `s_menu` VALUES ('8', '/modulars', '模块', 'el-icon-s-grid', '模块管理', 7);
INSERT INTO `s_menu` VALUES ('9', '/article', '帖子', 'el-icon-edit-outline', '帖子管理', 9);
INSERT INTO `s_menu` VALUES ('d5378d2704ab6af080eb6f15a264634c', '/announcement', '公告', 'el-icon-warning', '管理公告', 8);

-- ----------------------------
-- Table structure for s_user
-- ----------------------------
DROP TABLE IF EXISTS `s_user`;
CREATE TABLE `s_user`  (
  `s_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'id',
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '账号',
  `nickname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称',
  `realname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '真实姓名',
  `duties` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '职位',
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `salt` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码加密',
  `avatar` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `email` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `gender` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '性别,1为男,2为女',
  `create_date` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `enable_flag` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '状态,1为正常,-1为封禁',
  `login_date` datetime(0) NULL DEFAULT NULL COMMENT '最后登录时间',
  PRIMARY KEY (`s_id`) USING BTREE,
  INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of s_user
-- ----------------------------
INSERT INTO `s_user` VALUES ('398934718097129472', 'linshengwei', '林三十', '林胜3', '管理员', '66f5f86fe5f33017ea08d29f3ce183a9', 'TGS/i+3RH80K5NSLAl90JA==', NULL, '1149566912@qq.com', '男', '2023-01-05 20:25:59', '1', NULL);
INSERT INTO `s_user` VALUES ('398936181808562176', 'admin', '管理员', '管理员', '审核员', '8908f82311d1fd4d52c02fa261cc6fff', 'mfmXbW/1JzQUfcYAjq+C2g==', NULL, NULL, '男', '2023-01-05 20:29:58', '1', NULL);
INSERT INTO `s_user` VALUES ('398937048603426816', 'admin1', '管理员2', '管理员2', '审核员', '244cc722ebd521e8fa39f093290bc3aa', 'V3VZc93XDlsVbTwtH9FHEA==', NULL, NULL, NULL, '2023-01-05 20:33:24', '1', NULL);
INSERT INTO `s_user` VALUES ('400086473216360448', '12345654', '12312', '123', '管理员', '4f6922d9befa9aff70aed6c88124ffdf', 'MwkK/5nVZ7SPoZSoFo3/1g==', NULL, '1149566912@qq.com', '男', '2023-01-09 00:40:48', '1', NULL);
INSERT INTO `s_user` VALUES ('424389477658525696', '123', 'nan', '123', '123', '4a696c7445616f022e87d741593d8235', 'QGc/0rp5iV/n6D7hRKi+pg==', NULL, '123', '男', '2023-03-17 02:12:16', '1', NULL);
INSERT INTO `s_user` VALUES ('424710401205207040', '213', NULL, NULL, NULL, 'a64cf62c9ac089f63b320dba9d9c4303', 'ZY9vmjkPjE9ZScztbqYVmw==', NULL, NULL, '女', '2023-03-17 23:27:30', '1', NULL);
INSERT INTO `s_user` VALUES ('4f0273a7146e929fd9e0520a0b6a4b0f', '1365', '124', '124', '124124', '4b816fc2e1e00af0de63f5169e3bfabe', '6cSTupK5lYnPY8qlsqsiGA==', NULL, '214', '男', '2023-03-20 02:19:34', '1', NULL);
INSERT INTO `s_user` VALUES ('93cd92459ccdf11b89d06e35dce6be41', '23426', '234', '234', '234', 'c0ba751d7a301fca5544042c089ac676', 'Ilf4AztISWhbM0leumUSZA==', NULL, '234', '男', '2023-03-20 02:10:32', '1', NULL);

-- ----------------------------
-- Table structure for s_user_menu
-- ----------------------------
DROP TABLE IF EXISTS `s_user_menu`;
CREATE TABLE `s_user_menu`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `menu_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idMenuIdUserId`(`id`, `menu_id`, `user_id`) USING BTREE,
  INDEX `id`(`id`) USING BTREE,
  INDEX `userId`(`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of s_user_menu
-- ----------------------------
INSERT INTO `s_user_menu` VALUES ('1633127064571375618', '10', '398937048603426816');
INSERT INTO `s_user_menu` VALUES ('1633127064571375619', '3', '398937048603426816');
INSERT INTO `s_user_menu` VALUES ('1633127064600735745', '4', '398937048603426816');
INSERT INTO `s_user_menu` VALUES ('1633127064600735746', '11', '398937048603426816');
INSERT INTO `s_user_menu` VALUES ('1633136054764187649', '3', '');
INSERT INTO `s_user_menu` VALUES ('1633136054780964866', '11', '');
INSERT INTO `s_user_menu` VALUES ('1633136054780964867', '9', '');
INSERT INTO `s_user_menu` VALUES ('1633136054793547777', '5', '');
INSERT INTO `s_user_menu` VALUES ('1633138159965077505', '1', '400086473216360448');
INSERT INTO `s_user_menu` VALUES ('1633138159977660417', '9', '400086473216360448');
INSERT INTO `s_user_menu` VALUES ('1633138159977660418', '8', '400086473216360448');
INSERT INTO `s_user_menu` VALUES ('1633138159990243330', '7', '400086473216360448');
INSERT INTO `s_user_menu` VALUES ('1633444602815672321', '1', '398934718097129472');
INSERT INTO `s_user_menu` VALUES ('1633444602828255234', '2', '398934718097129472');
INSERT INTO `s_user_menu` VALUES ('1633444602828255235', '12', '398934718097129472');
INSERT INTO `s_user_menu` VALUES ('1633444602840838145', '3', '398934718097129472');
INSERT INTO `s_user_menu` VALUES ('1633444602853421057', '4', '398934718097129472');
INSERT INTO `s_user_menu` VALUES ('1633444602866003970', '7', '398934718097129472');
INSERT INTO `s_user_menu` VALUES ('1633444602866003971', '8', '398934718097129472');
INSERT INTO `s_user_menu` VALUES ('1633444602878586882', '9', '398934718097129472');
INSERT INTO `s_user_menu` VALUES ('1633444602878586883', '10', '398934718097129472');
INSERT INTO `s_user_menu` VALUES ('1633444602891169793', '11', '398934718097129472');
INSERT INTO `s_user_menu` VALUES ('1633444602891169794', '6', '398934718097129472');
INSERT INTO `s_user_menu` VALUES ('1633444602903752706', '5', '398934718097129472');
INSERT INTO `s_user_menu` VALUES ('1633444602903752707', '09de4da95360ba3a143660cf22e23726', '398934718097129472');
INSERT INTO `s_user_menu` VALUES ('1633444602916335618', 'd5378d2704ab6af080eb6f15a264634c', '398934718097129472');
INSERT INTO `s_user_menu` VALUES ('1633444676790611969', '1', '398936181808562176');
INSERT INTO `s_user_menu` VALUES ('1633444676790611970', '2', '398936181808562176');
INSERT INTO `s_user_menu` VALUES ('1633444676790611971', '12', '398936181808562176');
INSERT INTO `s_user_menu` VALUES ('1633444676807389186', '3', '398936181808562176');
INSERT INTO `s_user_menu` VALUES ('1633444676819972098', '4', '398936181808562176');
INSERT INTO `s_user_menu` VALUES ('1633444676819972099', '7', '398936181808562176');
INSERT INTO `s_user_menu` VALUES ('1633444676836749313', '8', '398936181808562176');
INSERT INTO `s_user_menu` VALUES ('1633444676836749314', '9', '398936181808562176');
INSERT INTO `s_user_menu` VALUES ('1633444676849332226', '10', '398936181808562176');
INSERT INTO `s_user_menu` VALUES ('1633444676849332227', '11', '398936181808562176');
INSERT INTO `s_user_menu` VALUES ('1633444676857720834', '6', '398936181808562176');
INSERT INTO `s_user_menu` VALUES ('1633444676861915138', '5', '398936181808562176');
INSERT INTO `s_user_menu` VALUES ('1633444676866109442', '09de4da95360ba3a143660cf22e23726', '398936181808562176');
INSERT INTO `s_user_menu` VALUES ('1633444676866109443', 'd5378d2704ab6af080eb6f15a264634c', '398936181808562176');
INSERT INTO `s_user_menu` VALUES ('1636773990516822018', '8', '424710401205207040');
INSERT INTO `s_user_menu` VALUES ('1636773990525210625', '7', '424710401205207040');

-- ----------------------------
-- Table structure for sh_resource
-- ----------------------------
DROP TABLE IF EXISTS `sh_resource`;
CREATE TABLE `sh_resource`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键',
  `parent_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '父资源',
  `resource_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '资源名称',
  `request_path` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '资源路径',
  `lavel` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '资源标签',
  `icon` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图标',
  `is_leaf` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否叶子节点,-1为否,1为是',
  `resource_type` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '资源类型',
  `sort_no` int(10) NULL DEFAULT NULL COMMENT '排序',
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述',
  `system_code` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '系统code',
  `is_system_root` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否根节点,-1为否,1为是',
  `enable_flag` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否有效,-1为禁用,1为正常',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '资源表' ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of sh_resource
-- ----------------------------
INSERT INTO `sh_resource` VALUES ('1', '1', '全部资源管理', '/**', '*:*', 'icon', '1', '目录', 1, '全部管理', '0', '1', '1');
INSERT INTO `sh_resource` VALUES ('11', '1', '资源管理', '/resource', 'resource:*', NULL, '1', '目录', 1, '资源管理', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('12', '11', '资源获取', '/resource/get', 'resource:get', NULL, '1', '资源', 1, '资源获取', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('13', '11', '资源添加', '/resource/add', 'resource:add', NULL, '1', '资源', 2, '资源添加', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('14', '11', '资源修改', '/resource/update', 'resource:update', NULL, '1', '资源', 3, '资源修改', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('15', '11', '资源删除', '/resource/delete', 'resource:delete', NULL, '1', '资源', 4, '资源删除', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1611697030416166914', '1', '角色管理', '/role', 'role:*', NULL, '1', '目录', 2, '角色管理', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1611697234469056513', '1611697030416166914', '角色添加', '/role/add', 'role:add', NULL, '0', '资源', 2, '角色添加', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1611697413674889218', '1611697030416166914', '角色获取', '/role/get', 'role:get', NULL, '0', '资源', 1, '角色获取', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1611697648849514498', '1611697030416166914', '角色修改', '/role/update', 'role:update', NULL, '0', '资源', 3, '角色修改', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1611697811684978690', '1611697030416166914', '角色删除', '/role/delete', 'role:delete', NULL, '0', '资源', 4, '角色删除', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612077622303510529', '1', '系统用户管理', '/sUser', 'sUser:*', NULL, '1', '目录', 3, '系统用户管理', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612077769339031554', '1612077622303510529', '系统用户获取', '/sUser/get', 'sUser:get', NULL, '0', '资源', 1, '系统用户获取', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612077974767652866', '1612077622303510529', '系统用户添加', '/sUser/add', 'sUser:add', NULL, '0', '资源', 2, '系统用户添加', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612078378305835010', '1612077622303510529', '系统用户修改', '/sUser/update', 'sUser:update', NULL, '0', '资源', 3, '系统用户修改', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612078739523489794', '1612077622303510529', '系统用户删除', '/sUser/delete', 'sUser:delete', NULL, '0', '资源', 4, '系统用户删除', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612087512929521666', '1', '普通用户管理', '/user', 'user:*', NULL, '1', '目录', 4, '普通用户管理', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612087746728415234', '1612087512929521666', '普通用户获取', '/user/get', 'user:get', NULL, '0', '资源', 1, '普通用户获取', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612087892002328577', '1612087512929521666', '普通用户添加', '/user/add', 'user:add', NULL, '0', '资源', 2, '普通用户添加', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612088039243370498', '1612087512929521666', '普通用户修改', '/user/update', 'user:update', NULL, '0', '资源', 3, '普通用户修改', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612088211243388930', '1612087512929521666', '普通用户删除', '/user/delete', 'user:delete', NULL, '0', '资源', 4, '普通用户删除', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612088462167625729', '1', '用户目录管理', '/menu', 'menu:*', NULL, '1', '目录', 6, '用户目录管理', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612088635472072706', '1', '系统目录管理', '/sMenu', 'sMenu:*', NULL, '1', '目录', 5, '系统目录管理', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612088976116666369', '1612088635472072706', '系统目录获取', '/sMenu/get', 'sMenu:get', NULL, '0', '资源', 1, '系统目录获取', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612089095041961985', '1612088635472072706', '系统目录添加', '/sMenu/add', 'sMenu:add', NULL, '0', '资源', 2, '系统目录添加', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612089207675801602', '1612088635472072706', '系统目录修改', '/sMenu/update', 'sMenu:update', NULL, '0', '资源', 3, '系统目录修改', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612089336650649602', '1612088635472072706', '系统目录删除', '/sMenu/delete', 'sMenu:delete', NULL, '0', '资源', 4, '系统目录删除', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612090123594354690', '1612088462167625729', '用户目录获取', '/menu/get', 'menu:get', NULL, '0', '资源', 1, '用户目录获取', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612090294965227522', '1612088462167625729', '用户目录添加', '/menu/add', 'menu:add', NULL, '0', '资源', 1, '用户目录添加', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612090401462800386', '1612088462167625729', '用户目录修改', '/menu/update', 'menu:update', NULL, '0', '资源', 3, '用户目录修改', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612090517141704706', '1612088462167625729', '用户目录删除', '/menu/delete', 'menu:delete', NULL, '0', '资源', 4, '用户目录删除', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612415414917136385', '1', '板块管理', '/palte', 'palte:*', NULL, '1', '目录', 7, '板块管理', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612415582827708418', '1612415414917136385', '板块获取', '/palte/get', 'palte:get', NULL, '0', '资源', 1, '板块获取', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612415688851324929', '1612415414917136385', '板块添加', '/palte/add', 'palte:add', NULL, '0', '资源', 2, '板块添加', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612415837363240961', '1612415414917136385', '板块修改', '/palte/update', 'palte:update', NULL, '0', '资源', 3, '板块修改', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612415976769323009', '1612415414917136385', '板块删除', '/palte/delete', 'palte:delete', NULL, '0', '资源', 4, '板块删除', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612417039715008514', '1', '模块管理', '/modulars', 'modulars:*', NULL, '1', '目录', 8, '模块管理', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612417197513113602', '1612417039715008514', '模块获取', '/modulars/get', 'modulars:get', NULL, '0', '资源', 1, '模块获取', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612417360440852481', '1612417039715008514', '模块添加', '/modeluars/add', 'modeluars:add', NULL, '0', '资源', 2, '模块添加', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612417460097515522', '1612417039715008514', '模块修改', '/modeluars/update', 'modeluars:update', NULL, '0', '资源', 3, '模块修改', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1612417559565434882', '1612417039715008514', '模块删除', '/modeluars/delete', 'modeluars:delete', NULL, '1', '资源', 4, '模块删除', '0', '0', '1');
INSERT INTO `sh_resource` VALUES ('1633496311281737730', '1', '公告管理', '/announcement', 'announcemen:*', NULL, '1', '目录', 9, '管理公告', '0', '0', '1');

-- ----------------------------
-- Table structure for sh_role
-- ----------------------------
DROP TABLE IF EXISTS `sh_role`;
CREATE TABLE `sh_role`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键',
  `role_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色名称',
  `label` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色标识',
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色描述',
  `sort_no` int(50) NULL DEFAULT NULL COMMENT '排序',
  `enable_flag` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否有效',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户角色表' ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of sh_role
-- ----------------------------
INSERT INTO `sh_role` VALUES ('1', '管理员', '1', '管理全部', 1, '1');
INSERT INTO `sh_role` VALUES ('1611772631231614977', '角色管理员', '2', '角色管理', 3, '1');
INSERT INTO `sh_role` VALUES ('1612507660186382338', '123', '123', '123', 4, '1');
INSERT INTO `sh_role` VALUES ('1636400681669246977', '审核员', '2', '审核帖子和作者', 5, '1');
INSERT INTO `sh_role` VALUES ('2', '资源管理员', '2', '资源管理', 2, '1');

-- ----------------------------
-- Table structure for sh_role_resource
-- ----------------------------
DROP TABLE IF EXISTS `sh_role_resource`;
CREATE TABLE `sh_role_resource`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `enable_flag` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `resource_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '角色资源表' ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of sh_role_resource
-- ----------------------------
INSERT INTO `sh_role_resource` VALUES ('1611772683031269377', '1', '1611772631231614977', '1611697030416166914');
INSERT INTO `sh_role_resource` VALUES ('1612076110198128641', '1', '2', '11');
INSERT INTO `sh_role_resource` VALUES ('1636431225228521474', '1', '1636400681669246977', '1611697030416166914');
INSERT INTO `sh_role_resource` VALUES ('1636431225245298689', '1', '1636400681669246977', '11');
INSERT INTO `sh_role_resource` VALUES ('1636431225257881601', '1', '1636400681669246977', '1612088635472072706');
INSERT INTO `sh_role_resource` VALUES ('1636431225274658817', '1', '1636400681669246977', '1612087512929521666');
INSERT INTO `sh_role_resource` VALUES ('1636431225274658818', '1', '1636400681669246977', '1612417039715008514');
INSERT INTO `sh_role_resource` VALUES ('1636431225291436034', '1', '1636400681669246977', '1633496311281737730');
INSERT INTO `sh_role_resource` VALUES ('1636431225304018946', '1', '1636400681669246977', '1612088462167625729');
INSERT INTO `sh_role_resource` VALUES ('1636431225320796162', '1', '1636400681669246977', '1612415414917136385');
INSERT INTO `sh_role_resource` VALUES ('1636431225337573378', '1', '1636400681669246977', '1612077622303510529');
INSERT INTO `sh_role_resource` VALUES ('1637067286862524418', '1', '1', '1');

-- ----------------------------
-- Table structure for sh_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sh_user_role`;
CREATE TABLE `sh_user_role`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `enable_flag` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户角色表' ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of sh_user_role
-- ----------------------------
INSERT INTO `sh_user_role` VALUES ('1', '1', '398937048603426816', '1');
INSERT INTO `sh_user_role` VALUES ('1630584059389984769', '1', '398934718097129472', '1');
INSERT INTO `sh_user_role` VALUES ('1630584059406761986', '1', '398934718097129472', '1');
INSERT INTO `sh_user_role` VALUES ('1630584059457093634', '1', '398934718097129472', '1611772631231614977');
INSERT INTO `sh_user_role` VALUES ('1636735986104500226', '1', '424389477658525696', '1611772631231614977');
INSERT INTO `sh_user_role` VALUES ('1636773966546374657', '1', '424710401205207040', '1636400681669246977');
INSERT INTO `sh_user_role` VALUES ('3', '1', '398936181808562176', '1');

-- ----------------------------
-- Table structure for u_announcement
-- ----------------------------
DROP TABLE IF EXISTS `u_announcement`;
CREATE TABLE `u_announcement`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `palte_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `modulars_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of u_announcement
-- ----------------------------
INSERT INTO `u_announcement` VALUES ('1', '1', '1', '英雄联盟的讨论区公告');
INSERT INTO `u_announcement` VALUES ('1634608922765250562', '1', '2', '3');
INSERT INTO `u_announcement` VALUES ('1634608940708483073', '1', '7', '1');
INSERT INTO `u_announcement` VALUES ('1636372673378017281', '1', '8', '151');
INSERT INTO `u_announcement` VALUES ('2', '1', '0', '英雄联盟的公告');

-- ----------------------------
-- Table structure for u_article
-- ----------------------------
DROP TABLE IF EXISTS `u_article`;
CREATE TABLE `u_article`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'id',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '文章标题',
  `front_cover` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '帖子封面',
  `summary` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '简介',
  `comment_counts` bigint(50) NULL DEFAULT NULL COMMENT '评论数量',
  `view_counts` bigint(50) NULL DEFAULT NULL COMMENT '浏览数量',
  `weight` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '是否置顶',
  `likes_counts` bigint(255) NULL DEFAULT NULL COMMENT '点赞人数',
  `collection_counts` bigint(255) NULL DEFAULT NULL COMMENT '收藏人数',
  `create_date` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `user_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '作者id',
  `category_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '分类id',
  `body_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '内容id',
  `modulars_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '模块id',
  `plate_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '板块id',
  `status` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '帖子状态,-1审核拒绝,0审核中,1审核通过',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `author_id`(`user_id`) USING BTREE,
  INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of u_article
-- ----------------------------
INSERT INTO `u_article` VALUES ('1628734834207690754', 'LOL团队官宣：今后霞洛的皮肤将不会专门制作回城互动特效', 'http://192.168.20.130:9000/article/d58c4e38cb0249028805fcae98edb0f7英雄联盟 (3).jpg', '对此LOL官方团队给出的解释是，通过分析玩家数据霞洛在同一局游戏出现的概率很少，而选择同一个系列皮肤的霞洛出现在同一局游戏的概率更是少之又少，基本上仅限于非常少的双排情况下才会出现。所以今后LOL团队都不会在霞洛的皮肤中专门制作回城互动特效。', 0, 44, '0', 1, 1, '2023-03-18 23:16:59', '411278722767781888', '1', '1628734834241245186', '1', '1', '1');
INSERT INTO `u_article` VALUES ('1628735997011365889', '英雄联盟标题二', 'http://192.168.20.130:9000/article/09bebe24298e4a7d90daa678b84d181c英雄联盟 (5).jpeg', '英雄联盟简介二', 5, 47, '0', 0, 1, '2023-03-16 22:16:35', '411278722767781888', '1', '1628735997028143106', '1', '1', '0');
INSERT INTO `u_article` VALUES ('1628948071509024770', '崩坏三标题一', 'http://192.168.20.130:9000/article/af444653a5c64e8f97f73ebb6ed2dd74英雄联盟 (5).jpeg', '崩坏三简介一', 0, 6, '0', 1, 0, '2023-03-18 23:04:15', '411278722767781888', '2', '1628948071538384898', '3', '2', '1');
INSERT INTO `u_article` VALUES ('1628948917508530177', '《原神》新活动似乎在致敬/玩梗《只狼：影逝二度》', 'http://192.168.20.130:9000/article/a5bf1f6c5199491ba48b0efd86ab23db原神 (6).jpeg', '《原神》于3月14日开启新的限时活动「振晶的复核实验」，所有冒险等阶≥28级且完成魔神任务「送仙」的玩家皆可参与，完成任务可以获得包括原石在内的多种道具。', 0, 9, '0', 0, 0, '2023-03-15 21:58:38', '411278722767781888', '3', '1628948917525307393', '5', '3', '0');
INSERT INTO `u_article` VALUES ('1628949529046441985', '原神标题二', 'http://192.168.20.130:9000/article/015587fb873f4d5bace2b6ea2e7589e6原神 (5).jpeg', '原神简介二', 0, 4, '0', 0, 0, '2023-03-15 22:03:09', '411278722767781888', '6', '1628949529063219201', '5', '3', '0');
INSERT INTO `u_article` VALUES ('1628950091645214721', '原神标题三', 'http://192.168.20.130:9000/article/fde4c77ec5374e6f8ba25ff97848c977原神 (7).jpeg', '原神简介三', 0, 5, '0', 0, 0, '2023-03-14 00:59:25', '411278722767781888', '6', '1628950091657797634', '5', '3', '0');
INSERT INTO `u_article` VALUES ('1628950454490259457', '崩坏三标题二', 'http://192.168.20.130:9000/article/1939a083513a4119b83adbddeed32b51崩坏三 (6).jpeg', '崩坏三简介二', 0, 8, '0', 1, 1, '2023-03-14 00:58:02', '411278722767781888', '2', '1628950454502842370', '9', '2', '1');
INSERT INTO `u_article` VALUES ('1628950688431759361', '崩坏三标题五', 'http://192.168.20.130:9000/article/dbf8cd8c570e4a09a6bf2c9f8620ffdf崩坏三 (4).jpeg', '崩坏三简介五', 0, 9, '0', 0, 0, '2023-03-14 00:57:49', '411278722767781888', '5', '1628950688448536578', '9', '2', '0');
INSERT INTO `u_article` VALUES ('1629837860764643329', 'LOL官方宣布英雄价格调整：悠米450 亚索、卢锡安1350', 'http://192.168.20.130:9000/article/2bb5a7e113ca4c6d989c7c128aea8446英雄联盟 (3).jpeg', '直播吧2月17日讯 英雄联盟官方发布了13.5版本英雄价格调整预告，将根据玩家上手度，以及英雄在登陆游戏后近一两个赛季的表现情况，进行价格调整。易于上手适合新玩家的英雄将调整为450蓝色精粹，比如石头人、女枪、猫咪；略微复杂，但有兴趣的玩家仍可以轻松上手的英雄调整为1350蓝色精', 14, 138, '0', 1, 0, '2023-03-14 01:02:43', '1622603670501744641', '1', '1629837860798197761', '1', '1', '0');
INSERT INTO `u_article` VALUES ('1630583793022320641', '离开23', 'http://192.168.20.130:9000/article/31bf96bae746461d9b9b9adf1c7f09de崩坏三 (3).jpeg', '123123', 0, 3, '0', 0, 0, '2023-03-14 00:57:36', '411278722767781888', '2', '1630583793039097857', '9', '2', '0');

-- ----------------------------
-- Table structure for u_article_likes_collection
-- ----------------------------
DROP TABLE IF EXISTS `u_article_likes_collection`;
CREATE TABLE `u_article_likes_collection`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `article_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `likes` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '0为无点赞,1为点赞',
  `collection` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '0为无收藏,1为收藏',
  `user_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of u_article_likes_collection
-- ----------------------------
INSERT INTO `u_article_likes_collection` VALUES ('1630198214942232577', '1628735997011365889', '0', '1', '411278722767781888');
INSERT INTO `u_article_likes_collection` VALUES ('1630198287587577858', '1629837860764643329', '0', '0', '411278722767781888');
INSERT INTO `u_article_likes_collection` VALUES ('1630198424506437634', '1628734834207690754', '1', '1', '411278722767781888');
INSERT INTO `u_article_likes_collection` VALUES ('1630245048540721154', '1629837860764643329', '1', '0', '1622603670501744641');
INSERT INTO `u_article_likes_collection` VALUES ('1630245453467217921', '1628948071509024770', '1', '0', '1622603670501744641');
INSERT INTO `u_article_likes_collection` VALUES ('1630263391700004865', '1628950454490259457', '1', '1', '411278722767781888');

-- ----------------------------
-- Table structure for u_article_tags
-- ----------------------------
DROP TABLE IF EXISTS `u_article_tags`;
CREATE TABLE `u_article_tags`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `article_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `tags_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of u_article_tags
-- ----------------------------
INSERT INTO `u_article_tags` VALUES ('1628738272052224002', '1628738271989309441', '1');
INSERT INTO `u_article_tags` VALUES ('1628738272069001217', '1628738271989309441', '2');
INSERT INTO `u_article_tags` VALUES ('1628951351488307202', '1628951351458947073', '10');
INSERT INTO `u_article_tags` VALUES ('1628951351505084417', '1628951351458947073', '11');
INSERT INTO `u_article_tags` VALUES ('1630583602596724738', '1628737478435307521', '1');
INSERT INTO `u_article_tags` VALUES ('1630583602596724739', '1628737478435307521', '2');
INSERT INTO `u_article_tags` VALUES ('1635324237362925569', '1630583793022320641', '10');
INSERT INTO `u_article_tags` VALUES ('1635324237383897089', '1630583793022320641', '12');
INSERT INTO `u_article_tags` VALUES ('1635324237383897090', '1630583793022320641', '9');
INSERT INTO `u_article_tags` VALUES ('1635324294451597313', '1628950688431759361', '10');
INSERT INTO `u_article_tags` VALUES ('1635324294451597314', '1628950688431759361', '9');
INSERT INTO `u_article_tags` VALUES ('1635324347366936577', '1628950454490259457', '10');
INSERT INTO `u_article_tags` VALUES ('1635324347379519489', '1628950454490259457', '9');
INSERT INTO `u_article_tags` VALUES ('1635324484986245122', '1628735997011365889', '1');
INSERT INTO `u_article_tags` VALUES ('1635324484998828034', '1628735997011365889', '3');
INSERT INTO `u_article_tags` VALUES ('1635324551461769217', '1628734834207690754', '1');
INSERT INTO `u_article_tags` VALUES ('1635324551478546434', '1628734834207690754', '2');
INSERT INTO `u_article_tags` VALUES ('1635324616322486274', '1628948071509024770', '10');
INSERT INTO `u_article_tags` VALUES ('1635324616339263490', '1628948071509024770', '12');
INSERT INTO `u_article_tags` VALUES ('1635324695141847042', '1628950091645214721', '6');
INSERT INTO `u_article_tags` VALUES ('1635324695158624257', '1628950091645214721', '8');
INSERT INTO `u_article_tags` VALUES ('1635325524959727617', '1629837860764643329', '1');
INSERT INTO `u_article_tags` VALUES ('1635325524972310529', '1629837860764643329', '2');
INSERT INTO `u_article_tags` VALUES ('1635325524972310530', '1629837860764643329', '3');
INSERT INTO `u_article_tags` VALUES ('1635325524989087746', '1629837860764643329', '4');
INSERT INTO `u_article_tags` VALUES ('1636003975416987649', '1628948917508530177', '6');
INSERT INTO `u_article_tags` VALUES ('1636003975437959170', '1628948917508530177', '8');
INSERT INTO `u_article_tags` VALUES ('1636005111968514050', '1628949529046441985', '5');
INSERT INTO `u_article_tags` VALUES ('1636005111985291266', '1628949529046441985', '8');

-- ----------------------------
-- Table structure for u_author
-- ----------------------------
DROP TABLE IF EXISTS `u_author`;
CREATE TABLE `u_author`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '0为申请中,1为申请成功,-1为申请失败',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of u_author
-- ----------------------------
INSERT INTO `u_author` VALUES ('1628310702741188610', '411278722767781888', '1');
INSERT INTO `u_author` VALUES ('1628376425580630017', '1612135936668233730', '1');
INSERT INTO `u_author` VALUES ('1629837353891393537', '1622603670501744641', '1');
INSERT INTO `u_author` VALUES ('1636374596286144514', '1627617427468648449', '-1');
INSERT INTO `u_author` VALUES ('1636374783175942145', '411278722767781890', '0');

-- ----------------------------
-- Table structure for u_body
-- ----------------------------
DROP TABLE IF EXISTS `u_body`;
CREATE TABLE `u_body`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `content_html` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `article_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `article_id`(`article_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of u_body
-- ----------------------------
INSERT INTO `u_body` VALUES ('1628734834241245186', '英雄联盟内容1\n', '<p>英雄联盟内容1</p>', '1628734834207690754');
INSERT INTO `u_body` VALUES ('1628735997028143106', '英雄联盟内容二\n', '<p>英雄联盟内容二</p>', '1628735997011365889');
INSERT INTO `u_body` VALUES ('1628948071538384898', '崩坏三内容一\n', '<p>崩坏三内容一</p>', '1628948071509024770');
INSERT INTO `u_body` VALUES ('1628948917525307393', '	《原神》于3月14日开启新的限时活动「振晶的复核实验」，所有冒险等阶≥28级且完成魔神任务「送仙」的玩家皆可参与，完成任务可以获得包括原石在内的多种道具。\n	该活动的任务名为「振晶，映射二度」，与宫崎英高的知名大作《只狼：影逝二度》名字不仅格式相同，后半段的发音也极为相似，像是在致敬这款TGA2019年度游戏。\n	有《原神》玩家表示：“这是我们原神的梗。没有原神谁知道你只狼啊，给你只狼引流可得好好感谢米哈游”。\n    额外补充一下，该任务的英文名和日文名均与《只狼》无关，仅仅简中版颇为相似，不知是致敬还是纯粹巧合呢。考虑到米哈游经常在《原神》的活动/成就里玩梗，可能是刻意的吧。\n\n', '<p>	《原神》于3月14日开启新的限时活动「振晶的复核实验」，所有冒险等阶≥28级且完成魔神任务「送仙」的玩家皆可参与，完成任务可以获得包括原石在内的多种道具。</p><p>	该活动的任务名为「振晶，映射二度」，与宫崎英高的知名大作《只狼：影逝二度》名字不仅格式相同，后半段的发音也极为相似，像是在致敬这款TGA2019年度游戏。</p><p>	有《原神》玩家表示：“这是我们原神的梗。没有原神谁知道你只狼啊，给你只狼引流可得好好感谢米哈游”。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;额外补充一下，该任务的英文名和日文名均与《只狼》无关，仅仅简中版颇为相似，不知是致敬还是纯粹巧合呢。考虑到米哈游经常在《原神》的活动/成就里玩梗，可能是刻意的吧。</p><p style=\"text-align: left;\"><br></p>', '1628948917508530177');
INSERT INTO `u_body` VALUES ('1628949529063219201', '原神内容二34123445\n', '<p>原神内容二34123445</p>', '1628949529046441985');
INSERT INTO `u_body` VALUES ('1628950091657797634', '原神内容三\n', '<p>原神内容三</p>', '1628950091645214721');
INSERT INTO `u_body` VALUES ('1628950454502842370', '崩坏三内容二\n', '<p>崩坏三内容二</p>', '1628950454490259457');
INSERT INTO `u_body` VALUES ('1628950688448536578', '崩坏三内容五\n', '<p>崩坏三内容五</p>', '1628950688431759361');
INSERT INTO `u_body` VALUES ('1629837860798197761', '大家好，Barackprobama和Riot August即将向各位简要介绍一下英雄定价模型的更新。更新的主要目标是让新玩家能更容易买到英雄，并且通过定价引导玩家去入手刚接触《英雄联盟》时比较友好的英雄。我们知道，如果玩家能够找到自己擅长或喜爱的英雄，就有更大的动力持续地在游戏中精进;而对于回归玩家来说，发现新的擅长英雄也会起到同样的作用。其实有一点我们都心知肚明：现有的定价模型有点过时了。这套体系反应迟钝，也与我们期望玩家获取英雄的方式相差甚远。归根结底，《英雄联盟》的精髓就是英雄，所以我们必须做出改进!\n新的体系仍会将英雄的登场年份纳入考量，但不再与发布时间直接绑定。随着设计策略的变化，新英雄登场的频率也从早期每隔一个版本发布一次，调整到更有利于我们作出整体规划的节奏，所以定价的方式也应该随之改变了。现在，我们将重点考虑某个英雄上线后经过的赛季数，而不是之后上线的英雄数量。\n目前，新英雄会以一个较高初始价格上线，一周后再进行折扣，这一惯例今后还会保持;在英雄上线两个赛季后，我们会根据这个英雄在新玩家和回归玩家两方面的数据情况，再次调整价格。如果一个英雄在经过诸如视觉玩法更新(如费德提克)、核心玩法更新(如奥瑞利安·索尔)或中型更新(较小规模的玩法更新，比如辛德拉)后，为新玩家或回归玩家带来了更好的体验，则这个英雄的价格也会更新。既然说到这一点，你也许会想到，某个英雄的价格有时反而会上调。虽然的确有这种可能，但我们会努力避免。中型更新应该不会出现这种情况，但不排除在视觉玩法更新和核心玩法更新后会有这种可能。再次重申，我们会尽量避免英雄价格上调。但万一出现，我们会提前进行沟通，将这一消息告知大家。\n为进一步说明这套体系，以下是英雄的各个定价层级：\n● 450蓝色精萃 / 1000点券 - 非常适合新玩家的英雄。这些英雄的人设鲜明，易于上手，我们的数据表明他们能够帮助玩家尽快掌握游戏。比如墨菲特、厄运小姐和悠米。\n● 1350蓝色精萃 /2000点券 - 比上个层级略微复杂一些，但有兴趣的玩家仍能较轻松上手。这些英雄的玩法需要更精细的技术，但门槛仍比较合理，深受粉丝们喜爱。比如亚索、卢锡安和瑟提。\n● 3150蓝色精萃 / 2500点券 - 难度较高，或玩法较特别的英雄。这些英雄的学习曲线比较陡峭，需要付出较大努力才能掌握。比如乐芙兰、萨科和约里克。\n● 4444蓝色精萃 / 3500点券 - 只有完美的英雄属于此列。哈哈哈哈。\n● 4800蓝色精萃 / 3500点券 - 大部分英雄都在这一档。\n● 6300蓝色精萃 / 4500点券 - 过去两个赛季中上线的英雄，超过两赛季后将移动至上述层级。\n● 7800蓝色精萃 / 4500点券 - 上线一周内的英雄。\n除了这些价格调整，我们还将推出新的英雄礼包，涵盖各层级内的多种不同玩法的英雄。对于想要快速扩充前期英雄池的玩家来说，这些礼包应该更具性价比。\n整体而言，这次改动会大幅降低全体英雄的蓝色精萃/点券花费，让刚刚开启《英雄联盟》之旅的玩家更快找到乐趣。\n不过再好的系统也总有一些小例外。特例：辛吉德、凯尔、崔斯特和瑞兹。这几位英雄都很棒，也深受众多玩家喜爱，但我们不认为新玩家能很快掌握其精髓，数据也证实了这一点。这几名英雄的价格将调至4800蓝色精萃，高于现有价格，但点券价格保持现有不变，确保有兴趣的玩家仍能较容易地得到他们。\n', '<p>大家好，Barackprobama和Riot August即将向各位简要介绍一下英雄定价模型的更新。更新的主要目标是让新玩家能更容易买到英雄，并且通过定价引导玩家去入手刚接触《英雄联盟》时比较友好的英雄。我们知道，如果玩家能够找到自己擅长或喜爱的英雄，就有更大的动力持续地在游戏中精进;而对于回归玩家来说，发现新的擅长英雄也会起到同样的作用。其实有一点我们都心知肚明：现有的定价模型有点过时了。这套体系反应迟钝，也与我们期望玩家获取英雄的方式相差甚远。归根结底，《英雄联盟》的精髓就是英雄，所以我们必须做出改进!</p><p>新的体系仍会将英雄的登场年份纳入考量，但不再与发布时间直接绑定。随着设计策略的变化，新英雄登场的频率也从早期每隔一个版本发布一次，调整到更有利于我们作出整体规划的节奏，所以定价的方式也应该随之改变了。现在，我们将重点考虑某个英雄上线后经过的赛季数，而不是之后上线的英雄数量。</p><p>目前，新英雄会以一个较高初始价格上线，一周后再进行折扣，这一惯例今后还会保持;在英雄上线两个赛季后，我们会根据这个英雄在新玩家和回归玩家两方面的数据情况，再次调整价格。如果一个英雄在经过诸如视觉玩法更新(如费德提克)、核心玩法更新(如奥瑞利安·索尔)或中型更新(较小规模的玩法更新，比如辛德拉)后，为新玩家或回归玩家带来了更好的体验，则这个英雄的价格也会更新。既然说到这一点，你也许会想到，某个英雄的价格有时反而会上调。虽然的确有这种可能，但我们会努力避免。中型更新应该不会出现这种情况，但不排除在视觉玩法更新和核心玩法更新后会有这种可能。再次重申，我们会尽量避免英雄价格上调。但万一出现，我们会提前进行沟通，将这一消息告知大家。</p><p>为进一步说明这套体系，以下是英雄的各个定价层级：</p><p>● 450蓝色精萃 / 1000点券 - 非常适合新玩家的英雄。这些英雄的人设鲜明，易于上手，我们的数据表明他们能够帮助玩家尽快掌握游戏。比如墨菲特、厄运小姐和悠米。</p><p>● 1350蓝色精萃 /2000点券 - 比上个层级略微复杂一些，但有兴趣的玩家仍能较轻松上手。这些英雄的玩法需要更精细的技术，但门槛仍比较合理，深受粉丝们喜爱。比如亚索、卢锡安和瑟提。</p><p>● 3150蓝色精萃 / 2500点券 - 难度较高，或玩法较特别的英雄。这些英雄的学习曲线比较陡峭，需要付出较大努力才能掌握。比如乐芙兰、萨科和约里克。</p><p>● 4444蓝色精萃 / 3500点券 - 只有完美的英雄属于此列。哈哈哈哈。</p><p>● 4800蓝色精萃 / 3500点券 - 大部分英雄都在这一档。</p><p>● 6300蓝色精萃 / 4500点券 - 过去两个赛季中上线的英雄，超过两赛季后将移动至上述层级。</p><p>● 7800蓝色精萃 / 4500点券 - 上线一周内的英雄。</p><p>除了这些价格调整，我们还将推出新的英雄礼包，涵盖各层级内的多种不同玩法的英雄。对于想要快速扩充前期英雄池的玩家来说，这些礼包应该更具性价比。</p><p>整体而言，这次改动会大幅降低全体英雄的蓝色精萃/点券花费，让刚刚开启《英雄联盟》之旅的玩家更快找到乐趣。</p><p>不过再好的系统也总有一些小例外。特例：辛吉德、凯尔、崔斯特和瑞兹。这几位英雄都很棒，也深受众多玩家喜爱，但我们不认为新玩家能很快掌握其精髓，数据也证实了这一点。这几名英雄的价格将调至4800蓝色精萃，高于现有价格，但点券价格保持现有不变，确保有兴趣的玩家仍能较容易地得到他们。</p>', '1629837860764643329');
INSERT INTO `u_body` VALUES ('1630583793039097857', '123123\n', '<p>123123</p>', '1630583793022320641');

-- ----------------------------
-- Table structure for u_category
-- ----------------------------
DROP TABLE IF EXISTS `u_category`;
CREATE TABLE `u_category`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `palte_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of u_category
-- ----------------------------
INSERT INTO `u_category` VALUES ('1', NULL, '英雄联盟分类1', NULL, '1');
INSERT INTO `u_category` VALUES ('1633440512106733570', NULL, '崩坏三分类3', NULL, '2');
INSERT INTO `u_category` VALUES ('2', NULL, '崩坏三分类1', NULL, '2');
INSERT INTO `u_category` VALUES ('3', NULL, '原神分类1', NULL, '3');
INSERT INTO `u_category` VALUES ('4', NULL, '英雄联盟分类2', NULL, '1');
INSERT INTO `u_category` VALUES ('5', NULL, '崩坏三分类2', NULL, '2');
INSERT INTO `u_category` VALUES ('6', NULL, '原神分类3', NULL, '3');

-- ----------------------------
-- Table structure for u_comment
-- ----------------------------
DROP TABLE IF EXISTS `u_comment`;
CREATE TABLE `u_comment`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '评论内容',
  `likes_counts` bigint(255) NOT NULL COMMENT '点赞',
  `create_date` datetime(0) NOT NULL COMMENT '评论时间',
  `article_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论文章id',
  `author_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论用户id',
  `parent_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '回复哪个评论的评论id',
  `to_uid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '回复谁的,用户id',
  `level` bigint(20) NOT NULL COMMENT '评论的第几层',
  `layer` bigint(20) NOT NULL COMMENT '评论区的第几层楼',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `article_id`(`article_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of u_comment
-- ----------------------------
INSERT INTO `u_comment` VALUES ('1630137603793256449', '评论1', 0, '2023-02-27 17:27:46', '1629837860764643329', '411278722767781888', '0', '0', 1, 1);
INSERT INTO `u_comment` VALUES ('1630137772542689281', '评论2', 0, '2023-02-27 17:28:26', '1629837860764643329', '411278722767781888', '0', '0', 1, 2);
INSERT INTO `u_comment` VALUES ('1630222082184503297', '评论1的子评论1', 0, '2023-02-27 23:03:27', '1629837860764643329', '411278722767781888', '1630137603793256449', '411278722767781888', 2, 1);
INSERT INTO `u_comment` VALUES ('1630232069438889986', '子评论的评论2', 0, '2023-02-27 23:43:08', '1629837860764643329', '411278722767781888', '1630137603793256449', '411278722767781888', 2, 2);
INSERT INTO `u_comment` VALUES ('1630232588026830849', '子评论的评论3', 0, '2023-02-27 23:45:12', '1629837860764643329', '411278722767781888', '1630137603793256449', '411278722767781888', 2, 3);
INSERT INTO `u_comment` VALUES ('1630235612870742018', '子评论33', 0, '2023-02-27 23:57:13', '1629837860764643329', '411278722767781888', '1630222082184503297', '411278722767781888', 2, 1);
INSERT INTO `u_comment` VALUES ('1630240848318558209', '这两款吉安市', 0, '2023-02-28 00:18:01', '1629837860764643329', '411278722767781888', '1630235612870742018', '411278722767781888', 2, 1);
INSERT INTO `u_comment` VALUES ('1630241382442201089', '蜡黄色的拉货收到卡拉斯', 0, '2023-02-28 00:20:09', '1629837860764643329', '411278722767781888', '1630240848318558209', '411278722767781888', 2, 1);
INSERT INTO `u_comment` VALUES ('1630241429602955266', '老师的房间里盛开的解放路口打扫房间考了多少分进口量', 0, '2023-02-28 00:20:20', '1629837860764643329', '411278722767781888', '1630241382442201089', '411278722767781888', 2, 1);
INSERT INTO `u_comment` VALUES ('1630242037068197890', '好的呢', 0, '2023-02-28 00:22:45', '1629837860764643329', '1622603670501744641', '1630232588026830849', '411278722767781888', 2, 1);
INSERT INTO `u_comment` VALUES ('1630243953114345474', '你好', 0, '2023-02-28 00:30:22', '1629837860764643329', '1622603670501744641', '1630137772542689281', '411278722767781888', 2, 1);
INSERT INTO `u_comment` VALUES ('1630244454056849410', '好的好的', 0, '2023-02-28 00:32:21', '1629837860764643329', '1622603670501744641', '1630243953114345474', '1622603670501744641', 2, 1);
INSERT INTO `u_comment` VALUES ('1630245201624428546', '我是一楼', 0, '2023-02-28 00:35:19', '1628737478435307521', '1622603670501744641', '0', '0', 1, 1);
INSERT INTO `u_comment` VALUES ('1630245273204420610', '我是二楼', 0, '2023-02-28 00:35:36', '1628737478435307521', '1622603670501744641', '0', '0', 1, 2);
INSERT INTO `u_comment` VALUES ('1630245299938914305', '开玩笑', 0, '2023-02-28 00:35:43', '1628737478435307521', '1622603670501744641', '1630245201624428546', '1622603670501744641', 2, 1);
INSERT INTO `u_comment` VALUES ('1630583449336856578', '啊实打实的', 0, '2023-02-28 22:59:24', '1629837860764643329', '411278722767781888', '0', '0', 1, 3);
INSERT INTO `u_comment` VALUES ('1630583472153870338', '开玩笑', 0, '2023-02-28 22:59:29', '1629837860764643329', '411278722767781888', '1630583449336856578', '411278722767781888', 2, 1);
INSERT INTO `u_comment` VALUES ('1637083639430430721', '354134', 0, '2023-03-18 21:28:50', '1628735997011365889', '411278722767781888', '0', '0', 1, 1);
INSERT INTO `u_comment` VALUES ('1637084680108556290', '1223', 0, '2023-03-18 21:32:58', '1628735997011365889', '411278722767781888', '0', '0', 1, 2);
INSERT INTO `u_comment` VALUES ('1637084740527505410', '125', 0, '2023-03-18 21:33:12', '1628735997011365889', '411278722767781888', '0', '0', 1, 3);
INSERT INTO `u_comment` VALUES ('1637084754687475714', '44', 0, '2023-03-18 21:33:16', '1628735997011365889', '411278722767781888', '1637084680108556290', '411278722767781888', 2, 1);
INSERT INTO `u_comment` VALUES ('1637084765114515457', '11', 0, '2023-03-18 21:33:18', '1628735997011365889', '411278722767781888', '1637084754687475714', '411278722767781888', 2, 1);

-- ----------------------------
-- Table structure for u_friends
-- ----------------------------
DROP TABLE IF EXISTS `u_friends`;
CREATE TABLE `u_friends`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `form_user_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `to_user_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `msg` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `created_date` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `to_user_id`(`to_user_id`) USING BTREE,
  INDEX `form_user_id`(`form_user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of u_friends
-- ----------------------------
INSERT INTO `u_friends` VALUES ('1627917501899452418', '411278722767781888', '1612132989855100929', '123', '2023-02-21 14:25:52');
INSERT INTO `u_friends` VALUES ('1627919633872564225', '411278722767781888', '1612132989855100929', '测试1', '2023-02-21 14:34:21');
INSERT INTO `u_friends` VALUES ('1627919670941822977', '1612132989855100929', '411278722767781888', '测试2', '2023-02-21 14:34:29');
INSERT INTO `u_friends` VALUES ('1627924702424702977', '411278722767781888', '1612132989855100929', '测试3', '2023-02-21 14:54:29');
INSERT INTO `u_friends` VALUES ('1627924722788048898', '1612132989855100929', '411278722767781888', '测试4', '2023-02-21 14:54:34');
INSERT INTO `u_friends` VALUES ('1627924738416025602', '411278722767781888', '1612132989855100929', '测试5', '2023-02-21 14:54:38');
INSERT INTO `u_friends` VALUES ('1627924756384423937', '1612132989855100929', '411278722767781888', '测试6', '2023-02-21 14:54:42');
INSERT INTO `u_friends` VALUES ('1627940471514533889', '411278722767781888', '1612132989855100929', '1324', '2023-02-21 15:57:09');
INSERT INTO `u_friends` VALUES ('1627940498777509889', '1612132989855100929', '411278722767781888', '256', '2023-02-21 15:57:15');
INSERT INTO `u_friends` VALUES ('1627940525235179521', '411278722767781888', '1612132989855100929', '测试639', '2023-02-21 15:57:22');
INSERT INTO `u_friends` VALUES ('1627940544793219073', '1612132989855100929', '411278722767781888', '空间和第三方23', '2023-02-21 15:57:26');
INSERT INTO `u_friends` VALUES ('1627953631147528194', '1612132989855100929', '411278722767781888', '开玩笑', '2023-02-21 16:49:26');
INSERT INTO `u_friends` VALUES ('1628032734169010178', '411278722767781888', '1612136075151568897', '135135', '2023-02-21 22:03:46');
INSERT INTO `u_friends` VALUES ('1628032748102488065', '1612136075151568897', '411278722767781888', '345373', '2023-02-21 22:03:49');
INSERT INTO `u_friends` VALUES ('1628033303893905410', '411278722767781888', '1612136075151568897', '客户卡萨丁', '2023-02-21 22:06:02');
INSERT INTO `u_friends` VALUES ('1628033320046170114', '411278722767781888', '1612136075151568897', '航空的飞机管理', '2023-02-21 22:06:06');
INSERT INTO `u_friends` VALUES ('1628033352694632449', '1612136075151568897', '411278722767781888', '爱说大话了23', '2023-02-21 22:06:13');
INSERT INTO `u_friends` VALUES ('1628050537152454657', '411278722767781888', '1612136075151568897', '啊收到了和记录234', '2023-02-21 23:14:30');
INSERT INTO `u_friends` VALUES ('1628054358268256258', '411278722767781888', '1612136075151568897', '良好的说服力', '2023-02-21 23:29:41');
INSERT INTO `u_friends` VALUES ('1628054618793254913', '411278722767781888', '1612132989855100929', '你好', '2023-02-21 23:30:44');
INSERT INTO `u_friends` VALUES ('1628054658177769474', '411278722767781888', '1612132989855100929', '你好', '2023-02-21 23:30:53');
INSERT INTO `u_friends` VALUES ('1628060323038306306', '1612135936668233730', '411278722767781888', '能够', '2023-02-21 23:53:24');
INSERT INTO `u_friends` VALUES ('1628065686802341889', '411278722767781888', '1612132989855100929', 'asdlo', '2023-02-22 00:14:42');
INSERT INTO `u_friends` VALUES ('1628068101307965441', '411278722767781888', '1612132989855100929', '125', '2023-02-22 00:24:18');
INSERT INTO `u_friends` VALUES ('1628068477880967170', '411278722767781888', '1612132989855100929', '你好啊', '2023-02-22 00:25:48');
INSERT INTO `u_friends` VALUES ('1628068578506514433', '411278722767781888', '1612132989855100929', '你好3214', '2023-02-22 00:26:12');
INSERT INTO `u_friends` VALUES ('1628069469523484674', '411278722767781888', '1612132989855100929', '的风格', '2023-02-22 00:29:44');
INSERT INTO `u_friends` VALUES ('1628069798503718914', '411278722767781888', '1612132989855100929', '124', '2023-02-22 00:31:03');
INSERT INTO `u_friends` VALUES ('1628069928644583426', '411278722767781888', '1612132989855100929', '254', '2023-02-22 00:31:34');
INSERT INTO `u_friends` VALUES ('1628070113227513857', '411278722767781888', '1612132989855100929', '拉开圣诞节了看', '2023-02-22 00:32:18');
INSERT INTO `u_friends` VALUES ('1628070173508050946', '411278722767781888', '1612136075151568897', '的风格', '2023-02-22 00:32:32');
INSERT INTO `u_friends` VALUES ('1628070206450114561', '411278722767781888', '1612132989855100929', '为对方', '2023-02-22 00:32:40');
INSERT INTO `u_friends` VALUES ('1628079996505104386', '1612135936668233730', '411278722767781888', 'kl12', '2023-02-22 01:11:34');
INSERT INTO `u_friends` VALUES ('1628082392505458690', '1612136075151568897', '1612135936668233730', '杰卡斯肯定会', '2023-02-22 01:21:05');
INSERT INTO `u_friends` VALUES ('1628082434884706305', '1612136075151568897', '1612135936668233730', '士大夫', '2023-02-22 01:21:15');
INSERT INTO `u_friends` VALUES ('1628082445311746049', '1612135936668233730', '1612136075151568897', '撒地方', '2023-02-22 01:21:18');
INSERT INTO `u_friends` VALUES ('1628087107414859777', '1612136075151568897', '1612135936668233730', '厉害', '2023-02-22 01:39:49');
INSERT INTO `u_friends` VALUES ('1628087120178126850', '1612135936668233730', '1612136075151568897', '的发生率', '2023-02-22 01:39:53');
INSERT INTO `u_friends` VALUES ('1628300943229145090', '411278722767781888', '1612136075151568897', '你好啊', '2023-02-22 15:49:32');
INSERT INTO `u_friends` VALUES ('1628302500062498817', '411278722767781888', '1612136075151568897', '123', '2023-02-22 15:55:43');
INSERT INTO `u_friends` VALUES ('1628302719558799362', '411278722767781888', '1612136075151568897', '235', '2023-02-22 15:56:35');
INSERT INTO `u_friends` VALUES ('1628302962446794753', '411278722767781888', '1612136075151568897', '12', '2023-02-22 15:57:33');
INSERT INTO `u_friends` VALUES ('1628303947357413378', '411278722767781888', '1612136075151568897', '234', '2023-02-22 16:01:28');
INSERT INTO `u_friends` VALUES ('1628306504700059650', '411278722767781888', '1612136075151568897', '124', '2023-02-22 16:11:38');
INSERT INTO `u_friends` VALUES ('1628306661197934593', '411278722767781888', '1612136075151568897', '我打了扣税的', '2023-02-22 16:12:15');
INSERT INTO `u_friends` VALUES ('1628976298017374210', '1612135936668233730', '1612136075151568897', '你好', '2023-02-24 12:33:09');
INSERT INTO `u_friends` VALUES ('1628979603510607874', '411278722767781888', '1612135936668233730', '测试中', '2023-02-24 12:46:17');
INSERT INTO `u_friends` VALUES ('1628979933891739649', '411278722767781888', '1612135936668233730', '1', '2023-02-24 12:47:36');
INSERT INTO `u_friends` VALUES ('1628979982109458433', '411278722767781888', '1612135936668233730', '2', '2023-02-24 12:47:47');
INSERT INTO `u_friends` VALUES ('1628980056583520257', '411278722767781888', '1612135936668233730', '1', '2023-02-24 12:48:05');
INSERT INTO `u_friends` VALUES ('1628980101441601538', '411278722767781888', '1612135936668233730', '1', '2023-02-24 12:48:16');
INSERT INTO `u_friends` VALUES ('1628980893791682562', '411278722767781888', '1612135936668233730', '你好', '2023-02-24 12:51:25');
INSERT INTO `u_friends` VALUES ('1628981166442524673', '411278722767781888', '1612135936668233730', '231', '2023-02-24 12:52:30');
INSERT INTO `u_friends` VALUES ('1628981381199278081', '411278722767781888', '1612135936668233730', '你好的', '2023-02-24 12:53:21');
INSERT INTO `u_friends` VALUES ('1628981861635829761', '1612132989855100929', '411278722767781888', '浓厚的', '2023-02-24 12:55:15');
INSERT INTO `u_friends` VALUES ('1628982165068566529', '1612132989855100929', '411278722767781888', '开玩笑', '2023-02-24 12:56:28');
INSERT INTO `u_friends` VALUES ('1628982207636557825', '1612132989855100929', '411278722767781888', '开玩笑', '2023-02-24 12:56:38');
INSERT INTO `u_friends` VALUES ('1628982250896609281', '1612132989855100929', '411278722767781888', '你好', '2023-02-24 12:56:48');
INSERT INTO `u_friends` VALUES ('1628982393410670593', '411278722767781888', '1612132989855100929', '你看', '2023-02-24 12:57:22');
INSERT INTO `u_friends` VALUES ('1628982430106636290', '411278722767781888', '1612132989855100929', '2', '2023-02-24 12:57:31');
INSERT INTO `u_friends` VALUES ('1628983200990294017', '411278722767781888', '1612132989855100929', '快点', '2023-02-24 13:00:35');
INSERT INTO `u_friends` VALUES ('1628983545556566017', '1612132989855100929', '411278722767781888', '快点', '2023-02-24 13:01:57');
INSERT INTO `u_friends` VALUES ('1628983569770283009', '1612132989855100929', '411278722767781888', '无效', '2023-02-24 13:02:03');
INSERT INTO `u_friends` VALUES ('1629413884020064258', '411278722767781888', '1612135936668233730', '看来都是风景', '2023-02-25 17:31:58');
INSERT INTO `u_friends` VALUES ('1629413939326156801', '411278722767781888', '1612135936668233730', '靠靠靠', '2023-02-25 17:32:11');
INSERT INTO `u_friends` VALUES ('1629414392038305793', '411278722767781888', '1612135936668233730', '你哈', '2023-02-25 17:33:59');
INSERT INTO `u_friends` VALUES ('1629415539323092994', '411278722767781888', '1612135936668233730', '735', '2023-02-25 17:38:32');
INSERT INTO `u_friends` VALUES ('1629415563759108098', '411278722767781888', '1612135936668233730', '阿斯拉达', '2023-02-25 17:38:38');
INSERT INTO `u_friends` VALUES ('1629416784758796290', '411278722767781888', '1612135936668233730', '离开', '2023-02-25 17:43:29');
INSERT INTO `u_friends` VALUES ('1630580668270104577', '411278722767781888', '1612135936668233730', '来看链接', '2023-02-28 22:48:21');
INSERT INTO `u_friends` VALUES ('1630581026111344642', '411278722767781888', '1622603670501744641', '你好啊', '2023-02-28 22:49:46');
INSERT INTO `u_friends` VALUES ('1630581060190064642', '1622603670501744641', '411278722767781888', '好的', '2023-02-28 22:49:54');
INSERT INTO `u_friends` VALUES ('1630581594456313857', '411278722767781888', '1622603670501744641', '·', '2023-02-28 22:52:02');
INSERT INTO `u_friends` VALUES ('1630581690887557121', '1622603670501744641', '411278722767781888', '1', '2023-02-28 22:52:25');
INSERT INTO `u_friends` VALUES ('1630581798186242049', '411278722767781888', '1622603670501744641', '213', '2023-02-28 22:52:50');
INSERT INTO `u_friends` VALUES ('1630581811331190785', '1622603670501744641', '411278722767781888', '123', '2023-02-28 22:52:53');
INSERT INTO `u_friends` VALUES ('1630581896311984129', '411278722767781888', '1622603670501744641', '436', '2023-02-28 22:53:13');
INSERT INTO `u_friends` VALUES ('1630581909591150594', '1622603670501744641', '411278722767781888', '3456', '2023-02-28 22:53:17');
INSERT INTO `u_friends` VALUES ('1630582012003471361', '411278722767781888', '1622603670501744641', '354', '2023-02-28 22:53:41');
INSERT INTO `u_friends` VALUES ('1630582025525907457', '1622603670501744641', '411278722767781888', '345', '2023-02-28 22:53:44');
INSERT INTO `u_friends` VALUES ('1630582108262748162', '1622603670501744641', '411278722767781888', '3', '2023-02-28 22:54:04');
INSERT INTO `u_friends` VALUES ('1630582413050236930', '411278722767781888', '1622603670501744641', '123', '2023-02-28 22:55:17');
INSERT INTO `u_friends` VALUES ('1630582445103108098', '1622603670501744641', '411278722767781888', '123', '2023-02-28 22:55:24');
INSERT INTO `u_friends` VALUES ('1630582481207676929', '411278722767781888', '1622603670501744641', '8888', '2023-02-28 22:55:33');
INSERT INTO `u_friends` VALUES ('1630582756454612994', '411278722767781888', '1622603670501744641', '234', '2023-02-28 22:56:39');
INSERT INTO `u_friends` VALUES ('1630582768924278785', '1622603670501744641', '411278722767781888', '243', '2023-02-28 22:56:42');
INSERT INTO `u_friends` VALUES ('1630583062190014465', '411278722767781888', '1612135936668233730', '123', '2023-02-28 22:57:51');
INSERT INTO `u_friends` VALUES ('1630583115516395521', '1612135936668233730', '411278722767781888', '好的呢', '2023-02-28 22:58:04');
INSERT INTO `u_friends` VALUES ('1630583133073752065', '1612135936668233730', '411278722767781888', '快快快', '2023-02-28 22:58:08');
INSERT INTO `u_friends` VALUES ('1637082938172162050', '411278722767781888', '1622603670501744641', '你哈', '2023-03-18 21:26:03');

-- ----------------------------
-- Table structure for u_friends_user
-- ----------------------------
DROP TABLE IF EXISTS `u_friends_user`;
CREATE TABLE `u_friends_user`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `form_user_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `to_user_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `status` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '1:好友,-1:非好友,0:申请好友中',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of u_friends_user
-- ----------------------------
INSERT INTO `u_friends_user` VALUES ('1627490733392633858', '411278722767781888', '411278722767781889', '0');
INSERT INTO `u_friends_user` VALUES ('1627578415198584834', '1622603670501744641', '1612136075151568897', '0');
INSERT INTO `u_friends_user` VALUES ('1627578427336900609', '1622603670501744641', '1612135936668233730', '0');
INSERT INTO `u_friends_user` VALUES ('1627578441337487362', '1622603670501744641', '1612132989855100929', '0');
INSERT INTO `u_friends_user` VALUES ('1627578449415716866', '1622603670501744641', '411278722767781888', '1');
INSERT INTO `u_friends_user` VALUES ('1627852499549052930', '411278722767781888', '1612132989855100929', '1');
INSERT INTO `u_friends_user` VALUES ('1627852541739556866', '1612132989855100929', '411278722767781888', '1');
INSERT INTO `u_friends_user` VALUES ('1628082180516945921', '1612136075151568897', '1612135936668233730', '1');
INSERT INTO `u_friends_user` VALUES ('1628082221876977665', '1612135936668233730', '1612136075151568897', '1');
INSERT INTO `u_friends_user` VALUES ('1628684083294523394', '411278722767781888', '1622603670501744641', '1');
INSERT INTO `u_friends_user` VALUES ('1630580587064184833', '411278722767781888', '1612136075151568897', '0');
INSERT INTO `u_friends_user` VALUES ('1630583222299181058', '411278722767781888', '1627617327602270210', '0');
INSERT INTO `u_friends_user` VALUES ('3', '411278722767781888', '1612135936668233730', '1');
INSERT INTO `u_friends_user` VALUES ('5', '1612136075151568897', '411278722767781888', '-1');
INSERT INTO `u_friends_user` VALUES ('6', '1612135936668233730', '411278722767781888', '1');

-- ----------------------------
-- Table structure for u_menu
-- ----------------------------
DROP TABLE IF EXISTS `u_menu`;
CREATE TABLE `u_menu`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `icon` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `path` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `effect` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `modulars_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of u_menu
-- ----------------------------
INSERT INTO `u_menu` VALUES ('1636378035695017986', '主页', NULL, '/index/index', '主页', NULL);
INSERT INTO `u_menu` VALUES ('1636378152019845122', '消息', NULL, '/news/news', '消息', NULL);
INSERT INTO `u_menu` VALUES ('1636378236899975169', '好友', NULL, '/news/friends/friends', '好友', NULL);
INSERT INTO `u_menu` VALUES ('1636378655038529537', '好友聊天', NULL, '/news/chat/chat', '好友聊天', NULL);
INSERT INTO `u_menu` VALUES ('1636379125261950977', '添加好友', NULL, '/news/friends/add/add', '添加好友', NULL);
INSERT INTO `u_menu` VALUES ('1636379276516941826', '添加好友详情页', NULL, '/news/friends/add/addDetailed', '添加好友详情页', NULL);

-- ----------------------------
-- Table structure for u_modulars
-- ----------------------------
DROP TABLE IF EXISTS `u_modulars`;
CREATE TABLE `u_modulars`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `icon` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `path` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `palte_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sort` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of u_modulars
-- ----------------------------
INSERT INTO `u_modulars` VALUES ('1', '讨论区', '', '', '1', '1');
INSERT INTO `u_modulars` VALUES ('10', '二创区', '', '', '2', '4');
INSERT INTO `u_modulars` VALUES ('11', '酒馆区', '', '', '3', '2');
INSERT INTO `u_modulars` VALUES ('12', '二创区', '', '', '3', '4');
INSERT INTO `u_modulars` VALUES ('1636382436342018050', '555', '55', '555', '2', '555');
INSERT INTO `u_modulars` VALUES ('1636382462539640834', '123', '123', '123', '4', '123');
INSERT INTO `u_modulars` VALUES ('1636382491736190977', '123', '124', '123', '3', '6');
INSERT INTO `u_modulars` VALUES ('1636383199596294146', '123', '123', '123', '1', '67');
INSERT INTO `u_modulars` VALUES ('2', '攻略区', '', '', '1', '3');
INSERT INTO `u_modulars` VALUES ('3', '讨论区', '', '', '2', '1');
INSERT INTO `u_modulars` VALUES ('4', '攻略区', '', '', '2', '3');
INSERT INTO `u_modulars` VALUES ('5', '讨论区', '', '', '3', '1');
INSERT INTO `u_modulars` VALUES ('6', '攻略区', '', '', '3', '3');
INSERT INTO `u_modulars` VALUES ('7', '酒馆区', '', '', '1', '2');
INSERT INTO `u_modulars` VALUES ('8', '二创区', '', '', '1', '4');
INSERT INTO `u_modulars` VALUES ('9', '酒馆区', '', '', '2', '2');

-- ----------------------------
-- Table structure for u_palte
-- ----------------------------
DROP TABLE IF EXISTS `u_palte`;
CREATE TABLE `u_palte`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `icon` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `path` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of u_palte
-- ----------------------------
INSERT INTO `u_palte` VALUES ('1', '英雄联盟', NULL, '');
INSERT INTO `u_palte` VALUES ('2', '崩坏三', NULL, '');
INSERT INTO `u_palte` VALUES ('3', '原神', NULL, '');
INSERT INTO `u_palte` VALUES ('4', '其他', NULL, NULL);

-- ----------------------------
-- Table structure for u_tags
-- ----------------------------
DROP TABLE IF EXISTS `u_tags`;
CREATE TABLE `u_tags`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `avatar` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `palte_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of u_tags
-- ----------------------------
INSERT INTO `u_tags` VALUES ('1', NULL, '英雄联盟标签1', '1');
INSERT INTO `u_tags` VALUES ('10', NULL, '崩坏三标签2', '2');
INSERT INTO `u_tags` VALUES ('11', NULL, '崩坏三标签3', '2');
INSERT INTO `u_tags` VALUES ('12', NULL, '崩坏三标签4', '2');
INSERT INTO `u_tags` VALUES ('1633397122770051074', NULL, '其他1', '4');
INSERT INTO `u_tags` VALUES ('1633397149177389057', NULL, '其他2', '4');
INSERT INTO `u_tags` VALUES ('1633397264554303489', NULL, '其他3', '4');
INSERT INTO `u_tags` VALUES ('2', NULL, '英雄联盟标签2', '1');
INSERT INTO `u_tags` VALUES ('3', NULL, '英雄联盟标签3', '1');
INSERT INTO `u_tags` VALUES ('4', NULL, '英雄联盟标签4', '1');
INSERT INTO `u_tags` VALUES ('5', NULL, '原神标签标签1', '3');
INSERT INTO `u_tags` VALUES ('6', NULL, '原神标签标签2', '3');
INSERT INTO `u_tags` VALUES ('7', NULL, '原神标签标签3', '3');
INSERT INTO `u_tags` VALUES ('8', NULL, '原神标签标签4', '3');
INSERT INTO `u_tags` VALUES ('9', NULL, '崩坏三标签1', '2');

-- ----------------------------
-- Table structure for u_user
-- ----------------------------
DROP TABLE IF EXISTS `u_user`;
CREATE TABLE `u_user`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户id',
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '账号',
  `nickname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名称',
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户密码',
  `salt` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码加密',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `gender` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '性别,1为男,2为女,3为不明',
  `create_date` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `enable_flag` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '状态,1为正常用户,-1为封禁状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of u_user
-- ----------------------------
INSERT INTO `u_user` VALUES ('1612132989855100929', 'lin5', 'lin5', 'e0dea6268581a1222a6f786039a9ebe0', 'WWhVG83b4xpU6o68ZhpFFA==', 'http://192.168.20.130:9000/user/d1a91ae58ece4912a07a6b58919238207.jpg', '', '男', '2023-01-09 01:03:51', '1');
INSERT INTO `u_user` VALUES ('1612135936668233730', 'lin4', 'lin4', '53b9d0070f5956ac5c50cf24d038c1d5', 'FeUX+TyQ0Udtu/zoRMasDw==', 'http://192.168.20.130:9000/user/b0b5f79b5ca640cd8169721a3a49081c8-1.jpg', '', '男', '2023-01-09 01:15:34', '1');
INSERT INTO `u_user` VALUES ('1612136075151568897', 'lin3', 'lin3', '0e6f7c2da5b0fc07e8b171772a30a74f', 'zapdabg6cjvaofZ4veWLYQ==', 'http://192.168.20.130:9000/user/d1f81fb482964305a6018ef7c9dd77d013.jpg', '', '男', '2023-01-09 01:16:07', '1');
INSERT INTO `u_user` VALUES ('1622603670501744641', 'lin2', 'lin2', '76eaf528d28b9c608335236913286064', 'uy4z5onRVwopimwU6z7uGQ==', 'http://192.168.20.130:9000/user/a4e561c3d5fa440ba1116565b7ff6f8b16.jpg', '', '男', '2023-02-06 22:30:36', '1');
INSERT INTO `u_user` VALUES ('1627617327602270210', 'lin123', 'lin1234', '83bfb5cc487fc15547917e0c2f2cb1d8', 'E/PEuB+hKV+JCPUriDt1Tg==', 'http://192.168.20.130:9000/user/ee90ba59d307411283f0ab5cbb83cd2311.jpeg', '', '男', '2023-02-20 18:33:05', '1');
INSERT INTO `u_user` VALUES ('1627617359302819842', 'lin12351', 'lin12353', 'ea8b749572eebd32930a5b3c2875c436', '/G6ui5HiNpRP/DE02fM6+w==', NULL, '', '男', '2023-02-20 18:33:13', '1');
INSERT INTO `u_user` VALUES ('1627617376994394113', '12315', 'lin12353', '67dc30f9fa42e2d19179c23d322d7e63', 'qXeZ8Wb4Co5anW3ZOva10Q==', NULL, '', '男', '2023-02-20 18:33:17', '1');
INSERT INTO `u_user` VALUES ('1627617427468648449', 'cs123', '测试好了', '6cb6c3f185c685449b4215adc838f559', 'jBhzrJs9ZZU1OK/cXeefFw==', NULL, '', '男', '2023-02-20 18:33:29', '1');
INSERT INTO `u_user` VALUES ('1637130704181239810', '11495669123', '123123', '3d2209bb7f5b626a8eea9d218ce6abb9', 'b29HGMZdgySDIWDuL9xmVA==', 'http://192.168.20.130:9000/user/9c5122c88d9f43709583425afa4a27032.jpg', NULL, NULL, '2023-03-19 00:35:51', '1');
INSERT INTO `u_user` VALUES ('411278722767781888', 'lin', 'lin1', 'def89fdfa6c6acc8d0e4acbd77416a72', 'AOlsf6NKgZM5YP6giX1uBw==', 'http://192.168.20.130:9000/user/79eadc8ac19b4060a7d8d5100bc866eb2.jpg', '1149566912@qq.com', '男', '2023-02-08 21:54:49', '1');
INSERT INTO `u_user` VALUES ('411278722767781889', '1145966912', '1145966912', 'def89fdfa6c6acc8d0e4acbd77416a72', 'AOlsf6NKgZM5YP6giX1uBw==', 'http://192.168.20.130:9000/user/5cb30e232a404c4c9388871e254e35f211.jpeg', NULL, '女', '2023-02-20 10:09:41', '1');
INSERT INTO `u_user` VALUES ('411278722767781890', '1133', '114533', 'def89fdfa6c6acc8d0e4acbd77416a72', 'AOlsf6NKgZM5YP6giX1uBw==', 'http://192.168.20.130:9000/user/d1f81fb482964305a6018ef7c9dd77d013.jpg', NULL, '女', '2023-02-23 10:14:39', '1');

SET FOREIGN_KEY_CHECKS = 1;
