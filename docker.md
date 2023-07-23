

## 1.1.卸载（可选）

如果之前安装过旧版本的Docker，可以使用下面命令卸载：

```
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine \
                  docker-ce
```



## 1.2.安装docker

首先需要大家虚拟机联网，安装yum工具

```sh
yum install -y yum-utils \
           device-mapper-persistent-data \
           lvm2 --skip-broken
```



然后更新本地镜像源：

```shell
# 设置docker镜像源
yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    
#    
sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo
#
yum makecache fast
```

然后输入命令：

```shell
yum install -y docker-ce
```

docker-ce为社区免费版本。

docker--ee为企业付费版本。

### 1.21：docker-Compose

```
# 安装
curl -L https://github.com/docker/compose/releases/download/1.23.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
#
chmod +x /usr/local/bin/docker-compose
```

```
vim docker-compose.yaml
```

```
docker-compose ps
```



## 1.3.启动docker

Docker应用需要用到各种端口，逐一去修改防火墙设置。

```sh
# 关闭
systemctl stop firewalld
# 禁止开机启动防火墙
systemctl disable firewalld
#开启端口
firewall-cmd --zone=public --add-port=xxxx/tcp --permanent
#重新加载防火墙
firewall-cmd --reload	
#重新启动防火墙
systemctl restart firewalld.service  
```

通过命令启动docker：

```sh
systemctl start docker  # 启动docker服务
systemctl stop docker  # 停止docker服务
systemctl restart docker  # 重启docker服务,安装了redis和mysql重新启动

systemctl enable docker.service #让docker自动开机启动
systemctl disable docker.service #让docker取消自动开机启动

systemctl status docker #查看docker状态
systemctl stop docker  #停止docker
```

然后输入命令，docker基本命令：

```dockerfile
docker -v 				#查看docker版本
docker info				#查看docker信息
docker search xxx		#搜索xxx镜像
docker pull xxx 		#拉起xxx镜像(如果后面不加版本号则是默认下载最新的版本xxx:laster,版本号格式为xxx:1.0)
docker ps 				#查看已启动容器
docker ps -a 			#查看全部容器
docker images 			#查看全部镜像
docker run xxxxxxx 		#创建实例(--都是可以选择,并非需要)  docker run --name 容器名  -p linux端口映射:docker端口映射 -v linux目录映射:docker目录映射 -d(后台运行) -i  (启动这个容器)  -t(容器创建成功后我们可以进入到容器中) 容器名
docker start xxx  		#启动xxx容器
docker stop xxx  		#停止xxx容器
docker rmi xxx 			#删除xxx镜像
docker rm xxx 			#删除xxx容器
docker update --restart=always xxx #设置xxx容器自动开机启动
docker update --restart=no xxx #设置xxx容器自动开机启动
```

## 1.4Mysql

#### 1.拉取mysql

```
docker pull mysql:5.7.25
```

#### 2.创建目录/tmp/mysql/data和/tmp/mysql/conf

```
cd /tmp
mkdir mysql
cd mysql
mkdir data
mkdir conf
```

#### 3.hmy.cnf文件上传到/tmp/mysql/conf

hmy.cnf:

```
[mysqld]
skip-name-resolve
character_set_server=utf8
datadir=/var/lib/mysql
server-id=1000
```

#### 4.创建mysql实例

```
docker run --name mysqlrq -p 3306:3306  -v /tmp/mysql/conf/hmy.conf:/etc/mysql/conf.d/hmy.conf -v /tmp/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:5.7.25
```

#### 5.启动

```
docker start mysqlrq
```

#### 6.开启防火墙的端口

```
1. firewall-cmd --zone=public --add-port=3306/tcp --permanent 开启防火墙端口
2. firewall-cmd --reload	重新加载防火墙
3. systemctl restart firewalld.service   重新启动防火墙
```

## 1.5:redis

#### 1.拉取redis

```
docker pull redis
```

#### 2.创建目录/tmp/redis/data和/tmp/redis/conf

```
cd /tmp
mkdir redis
cd redis
mkdir data
mkdir conf
```

#### 3.redis.cnf文件上传到/tmp/mysql/conf

在网上找

#### 4.创建redis实例

```
 docker run -p 6379:6379 --name redisrq -v /tmp/redis/conf/redis.conf:/etc/redis/redis.conf  -v  /tmp/redis/data:/data -d redis redis-server /etc/redis/redis.conf --appendonly yes
```

#### 5.启动

```
docker start redisrq
```

#### 6.开启防火墙的端口

```
1. firewall-cmd --zone=public --add-port=6379/tcp --permanent 开启防火墙端口
2. firewall-cmd --reload	重新加载防火墙
3. systemctl restart firewalld.service   重新启动防火墙
```

## 1.6:oracle

#### 1.拉取

```
docker pull registry.cn-hangzhou.aliyuncs.com/helowin/oracle_11g
```

#### 2.创建目录

```
cd /tmp
mkdir oracle
cd oracle
mkdir data
```

#### 3.创建

```
docker run -d -it -p 1521:1521 \
--name oraclerq \
--restart=always \
--mount source=oracle_vol,target=/home/oracle/app/oracle/oradata registry.cn-hangzhou.aliyuncs.com/helowin/oracle_11g
```

#### 4.查看数据卷

```
 docker volume inspect oracle_vol
```

#### 5.进入进入容器

```
docker exec -it oraclerq bash
```

#### 6.切换到root账户（默认进入之后是oracle账户）

su root

输入密码：helowin（密码都是一样的）

#### 7.编辑环境变量

vi /etc/profile 添加以下内容：

```bash
export ORACLE_HOME=/home/oracle/app/oracle/product/11.2.0/dbhome_2
export ORACLE_SID=helowin
export PATH=$ORACLE_HOME/bin:$PATH
```

source /etc/profile 使配置生效

#### 8.创建软链接

```bash
ln -s $ORACLE_HOME/bin/sqlplus /usr/bin
```

#### 9..切换到oracle用户，登录sqlplus

```bash
su - oracle
sqlplus /nolog
conn /as sysdba
```

#### 10.修改sys、system用户密码：

```
修改sys、system用户密码：
alter user system identified by YOUR_PASSWORD;
alter user sys identified by YOUR_PASSWORD;
alter profile default limit PASSWORD_LIFE_TIME UNLIMITED;
```

#### 11.创建用户（可选，根据需要）

用一个具有dba权限的用户登录（sysdba)，然后输入以下语句

```sql
create user 用户名 identified by 密码;
grant connect,resource,dba to 用户名;
commit;	//提交
登录:
sqlplus //回车
user:用户
password:密码
```

#### 12.开启防火墙的端口

```
1. firewall-cmd --zone=public --add-port=1521/tcp --permanent 开启防火墙端口
2. firewall-cmd --reload	重新加载防火墙
3. systemctl restart firewalld.service   重新启动防火墙
```

#### 13.远程连接,需要本地下载oracle的basic-win32-11.2.0.1.0

#### 14.下载instantclient-sqlplus-windows.x64-12.1.0.2.0和instantclient-basic-windows.x64-11.2.0.4.0

#### 15.进行配置:在navicat工具->环境中配置ioc.dll和sqlplus

## 1.7Minio对象存储

------

#### 1.拉取镜像

```
docker pull minio/minio:RELEASE.2021-06-17T00-10-46Z
或者
docker pull minio/minio
```

#### 2.创建目录

```
cd /tmp
mkdir oracle
cd oracle
mkdir data
```

#### 3.创建

```
docker run -d -p 9000:9000 --name miniorq  -e "MINIO_ACCESS_KEY=admin"   -e "MINIO_SECRET_KEY=adminminio"   -v /tmp/minio/data:/data   -v /tmp/minio/config:/root/.minio   minio/minio:RELEASE.2021-06-17T00-10-46Z server /data
```

或者

```
docker run -d \
  -p 9000:9000 \
  -p 9001:9001 \
  --name miniorq \
  -v /tmp/minio/data:/data \
  -e "MINIO_ROOT_USER=admin" \
  -e "MINIO_ROOT_PASSWORD=adminminio" \
  minio/minio server /data --console-address ":9001"
```

用户:admin

密码:adminminio

#### 4.开启防火墙的端口

```
1. firewall-cmd --zone=public --add-port=1521/tcp --permanent 开启防火墙端口
2. firewall-cmd --reload	重新加载防火墙
3. systemctl restart firewalld.service   重新启动防火墙
```

#### 访问本地:9000,创建buckets(空间)即可 

## 1.8安装Minio Client

#### 1.拉起镜像

```
docker pull minio/mc
```

#### 2.Docker 启动 minio/mc

```
docker run -it --entrypoint=/bin/sh minio/mc
```

#### 3.启动之后 会直接 进入 `sh-4.4#` 输入mc version 查看版本信息

```
sh-4.4# mc version
结束后面按q
```

#### 4.绑定minio

```
mc config host add <ALIAS> <YOUR-S3-ENDPOINT> <YOUR-ACCESS-KEY> <YOUR-SECRET-KEY> [--api API-SIGNATURE]
```

1. ##### ALIAS: 别名就是给你的[云存储](https://cloud.tencent.com/product/cos?from=10680)服务起了一个短点的外号。

2. ##### S3 endpoint,access key和secret key是你的云存储服务提供的。    

   - ###### endpoint http://ip:9000

   - ###### access key、secret key 到这里大家肯定都知道啦。

3. ##### API签名是可选参数，默认情况下，它被设置为"S3v4"。

如下

```
mc config host add minioB http://ip:9000 admin adminminio --api S3v4
```

绑定成功会出现:

```
Added 'minioB' successfully
```

#### 5、设置公开访问 永久访问链接

```javascript
mc policy set public  minioB/htgl # 将minio 下 commons 桶设置为 公开的 可以永久访问
mc policy set public  minioB/yxlt
```

```
mc policy set download minioB/yxlt
mc policy set public minioB/yxlt

mc policy set public minioB/article
```

如果出现错误,将policy替成anonymous

```
mc anonymous set download minioB/yxlt
mc anonymous set public minioB/yxlt

mc anonymous set download minioB/htgl
mc anonymous set public minioB/htgl
```

官网文档:http://docs.minio.org.cn/docs/master/minio-client-complete-guide

#### 6.退出

```
exit
```

#### 7.再次进入

```
docker ps -a      作用:查看minio/mc容器名称
docker start 容器名	作用:启动容器
docker exec -it 容器名 /bin/sh 作用:进入容器
```



## 1.9.ElasticSearch



## 2.0

### 1.拉取镜像

```
docker pull postgres
```

1
(如需下载特定版本，docker pull postgres:9.6,即拉取9.6版本的postgresql)

二 启动
docker run --name postgres -e POSTGRES_PASSWORD=123456 -p 1885:5432 -d postgres
1
（启动特定版本：docker run --name postgres -e POSTGRES_PASSWORD=123456 -p 5432:5432 -d postgres:9.6）

注解：
run:创建并运行一个容器
–name:制定创建的容器的名字
-e:指定容器内的环境变量，指定数据库的登陆口令为设置的“123456”
-p 1885:5432:端口映射，将容器的5432端口映射到外部机器的1885端口
（如果需要外部远程连接，且是阿里云租用的服务器，需要在阿里云的云控制台将5432端口对外开放）
-d:postgres:指定使用postgres:latest作为镜像
(-d postgres:9.4，指定使用postgres:9.4作为镜像)

tips:
postgres镜像默认的用户名为postgres
登陆口令为创建容器时指定的值（本文为“123456”）

三 进入启动的postgres容器
docker exec -it postgres /bin/bash
1
注解：
exec: Run a command in a running container(在运行的容器中运行命令，即exec命令执行后你会进入你想进入的容器中，在容器中运行你想运行的命令)
-i：–interactive,“Keep STDIN open even if not attached”(交互式的使你想进入的容器内的标准输入保持打开，换言之，打开一个容器内的输入模式，可以输入命令使用容器，并且还得一直可以输入命令，一直能与容器交互）
-t:–tty," Allocate a pseudo-TTY"（分配一个伪终端，即给你一个终端）
-it:给你一个可以随时随地与你想进入容器交互的终端
/bin/bash:作用是因为docker后台必须运行一个进程，否则容器就会退出，在这里表示启动容器后启动bash。
总结：docker exec -it postgres /bin/bash 进入了一个命令行模式，但是这个命令行模式介于你的虚拟机环境和postgres容器之间，如果想进入postgres的命令行还需要如下操作：

psql -U postgres
1
注意：-U 必须大写

至此，我们进入到了postgresql的命令行模式：

postgres=# 
1

