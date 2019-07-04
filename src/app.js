import express from 'express'
import config from './config'
import nunjucks from 'nunjucks'
import advertRouter from './routes/advert'
import indexRouter from './routes/index'
import bodyParser from './middlwares/body-parser'
import errlog from './middlwares/error-log'

const app = express()

//配置nunjucks
nunjucks.configure(config.viewPath, {
    autoescape: true,
    express: app,
    noCache:true
});

app.use('/node_modules', express.static(config.node_modules_Path))
app.use('/publish', express.static(config.publish_Path))

app.use(bodyParser)

//路由
app.use(advertRouter)
app.use(indexRouter)

//错误处理
app.use(errlog)

app.listen(3000, () => {
    console.log('running at http://127.0.0.1:3000')
})