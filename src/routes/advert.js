import express from "express"
import Advert from '../models/advert'
import formidable from 'formidable'
import { basename } from "upath";
import config from '../config'
import advert from "../models/advert";

const router = express.Router()

/**
 * 获取广告列表 */
router.get('/adverts', (req, res, next) => {

    res.render('advert_list.html')


    // const page = Number.parseInt(req.query.page, 10)
    // const pageSize = 1
    // Advert
    //     .find()
    //     .skip((page - 1) * pageSize)
    //     .limit(pageSize)
    //     .exec((err, adverts) => {
    //         if (err) {
    //             return next(err)
    //         }
    //         Advert.count((err, count) => {
    //             if (err) {
    //                 return next(err)
    //             }
    //             const totalPage = Math.ceil(count / pageSize)
    //             res.render('advert_list.html', { adverts, totalPage, page })

    //         })
    //     })
})

/**
 * 获取总条数
 */
router.get('/adverts/count', (req, res, next) => {
    Advert.find().estimatedDocumentCount((err, result) => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0,
            result: result
        })
    })
})

/**
 * 分页查询
 */
router.get('/adverts/list', (req, res, next) => {
    let pageSize = Number.parseInt(req.query.pageSize)
    let page = Number.parseInt(req.query.page)
    Advert.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec((err, result) => {
            if (err) {
                return next(err)
            }
            res.json({
                err_code: 0,
                result: result
            })
        })
})


/**
 * 添加广告
 */
router.get('/adverts/add', (req, res, next) => {
    res.render('advert_add.html')
})

/**
 * 添加广告 */
// router.post('/adverts/add', (req, res, next) => {
//     var form = new formidable.IncomingForm();

//     form.keepExtensions = true
//     form.uploadDir = config.uploadDir

//     form.parse(req, function (err, fields, files) {
//         if (err) {
//             return next(err)
//         }
//         let body = fields
//         body.image = basename(files.image.path)

//         let advert = new Advert({
//             title: body.title,
//             image: body.image,
//             link: body.link,
//             start_time: body.start_time,
//             end_time: body.end_time,
//         })

//         advert.save((err, result) => {
//             if (err) {
//                 return next(err)
//             }
//             res.json({
//                 err_code: 0
//             })
//         })
//     });
// })

/**
 * 添加广告 */
router.post('/adverts/add', (req, res, next) => {

    myformidable(req)
        .then(result => {
            const [fields, files] = result
            let body = fields
            body.image = basename(files.image.path)

            let advert = new Advert({
                title: body.title,
                image: body.image,
                link: body.link,
                start_time: body.start_time,
                end_time: body.end_time,
            })

            return advert.save()
        })
        .then(result => {
            res.json({
                err_code: 0
            })
        })
        .catch(err => {
            next(err)
        })


    function myformidable(req) {
        return new Promise((resolve, reject) => {
            var form = new formidable.IncomingForm();
            form.keepExtensions = true
            form.uploadDir = config.uploadDir
            form.parse(req, function (err, fields, files) {
                if (err) {
                    reject(err)
                }
                resolve([fields, files])
            })
        })
    }

})


/**
 * 根据id获取广告 */
router.get('/adverts/:advertId', (req, res, next) => {
    // Advert.findById(req.params.advertId, (err, result) => {
    //     if (err) {
    //         return next(err)
    //     }
    //     res.json({
    //         err_code: 0,
    //         result: result
    //     })
    // })
    Advert.findById(req.params.advertId)
        .then(result => {
            res.json({
                err_code: 0,
                result: result
            })
        })
        .catch(err => {
            next(err)
        })
})

/**
 * 更新广告
 */
router.post('/adverts/edit', (req, res, next) => {
    let body = req.body
    Advert.findById(body.id, (err, advert) => {
        if (err) {
            return next(err)
        }
        advert.title = body.title
        advert.image = body.image
        advert.link = body.link
        advert.start_time = body.start_time
        advert.end_time = body.end_time
        advert.last_modified_time = Date.now()
        advert.save((err, result) => {
            if (err) {
                return next(err)
            }
            res.json({
                err_code: 0
            })
        })
    })
})

/**
 * 删除广告
 */
router.delete('/adverts/:advertId', (req, res, next) => {
    Advert.deleteOne({ _id: req.params.advertId }, (err, result) => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0,
            result: result
        })
    })
})

export default router