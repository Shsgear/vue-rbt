# SEXY ROBOT

## 简介

本项目是重构版机器人，根据之前[刷单机器人](http:///dobi/AutoTradeRobot/AtuoTradeRobot)的不足，综合改进而来。改进方法详见[交易规则优化](http:///dobi/AutoTradeRobot/SexyRobot/wikis/reports/trade_rule_optimization)。有关跟多信息，请查看 [Wiki](http://gitlab.szzztl.com/dobi/AutoTradeRobot/SexyRobot/wikis/home).

### 基本功能介绍

// TODO

## 使用方法

// TODO

## Development

### Requirement:

- OS: Ubuntu 18.04 (16.04 can't be compiled or installed cause of glib version)
- cmake >= 3.4
- gcc >= 5.0
- glib >= 2.52
- glib-io >= 2.0
- json-glib >= 1.0
- libsoup >= 2.4

### Build:

1. craete new dir to build:

    ```shell
    mkdir build && cd build
    ```

2. using cmake to create `Makefile`

    ```shell
    cmake -DCMAKE_BUILD_TYPE=Release $REPO_PATH
    ```

    where the `$REPO_PATH` is the path of this repository.

3. using `make` to build

    ```shell
    make
    ```

4. [optional] make the deb package by `cpack`

    ```shell
    cpack
    ```

    and there is a file named `sexyrobot-$VERSION.deb` will be generated.

5. if you skip step 4, you can only install SexyRobot by command `make install`, otherwise, you can use `dpkg -i sexyrobot*.deb` to install the pacakge.

### Contribute:

 - 邱星翔 (<anudorannador@gmail.com>, maintainer)
 - 陈进强 (<chenjinqiang@blockchainrdc.com>)
 - 刘彩娇 (<liucaijiao@blockchainrdc.com>)