'use strict';

// 抽象公用方法
const Controller = require('egg').Controller;
// 业务逻辑里面通用的
class BaseController extends Controller {
  message(message){
    this.ctx.body={
      code:0,
      message
    }
  }
  success(data){
    this.ctx.body={
      code:0,
      data
    }
  }
  error(message,code=-1){
    this.ctx.body={
      code,
      message
    }
  }
}

module.exports = BaseController;
