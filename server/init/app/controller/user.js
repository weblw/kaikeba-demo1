'use strict';
let md5=require('md5')
const BaseController = require('./base')

class UserController extends BaseController {
  // 测试
  async detail(){
    // 只有token怎么获取详情
    const {ctx}=this
    const user=await this.checkEmail(ctx.state.email)
    this.success(user)
  }
  async index(){
    const {ctx}=this
    ctx.body='用户信息'
  }
  async checkEmail(email){
    const user=await this.ctx.model.User.findOne({email})
    return user
  }
  async login(){
    console.log('登陆请求')
    // jwt
    const {ctx,app}=this
    const {email,password}=ctx.request.body
    // 先查询一下用户是否存在
    // 可以先查用户名，再查密码
    let user=await ctx.model.User.findOne({
      email,
      password:md5(password)
    })
    if(user){
      // 生成token
      const {nickname}=user
      const token=app.jwt.sign({
        nickname,
        email,
        id:user._id
      },app.config.jwt.secret,{
        expiresIn:'1h'
      })
      this.success({token,email})
    }else{
      this.error('用户名或密码错误')
    }
  }
  async create(){
    const{ctx}=this
    let {email,password,emailcode,captcha,nickname}=ctx.request.body
    if(emailcode!==ctx.session.emailcode){
      return this.error('邮箱验证码出错')
    }
    console.log(captcha,ctx.session.captcha)
    if(captcha.toUpperCase()!==ctx.session.captcha.toUpperCase()){
      return this.error('图片验证码出错')
    }
    if(await this.checkEmail(email)){
      return this.error('邮箱已存在')
    }
    let ret=await ctx.model.User.create({
      email,
      nickname,
      password:md5(password)
    })
    if(ret._id){
      this.success('注册成功')
    }
  }
  async captcha(){
    // 生成验证码，我们也需要service
    const {ctx}=this
    let captcha=await this.service.tools.captcha()

    ctx.session.captcha=captcha.text
    console.log('图片验证码'+captcha.text)
    ctx.response.type='image/svg+xml'
    ctx.body=captcha.data
  }
  async email(){
    // controller 写业务逻辑，通用的逻辑抽象成service
    const {ctx}=this
    const email=ctx.query.email
    const code=Math.random().toString().slice(2,6)
    console.log('邮件'+email+'验证码是'+code)
    const title='开课吧验证码'
    const html=`
      <h1>开课吧注册验证码</h1>
      <div>
        <a href='https://kaikeba.com/'>${code}</a>
      </div>
    `
    const hasSend=await this.service.tools.sendEmail(email,title,html)
    if(hasSend){
      ctx.session.emailcode=code
      this.message('发送成功')
    }else{
      this.error('发送失败')
    }
  }
}

module.exports = UserController;
