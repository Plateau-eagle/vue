var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var common = require('../src/assets/js/common.js');
var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'wsj2008',
    database: 'userinfo'
});


router.post('/goLogin', (req, res) => {

    let username = req.body.loginName;
    let password = req.body.loginPawd;
    console.log(username, password);

    db.query('SELECT * FROM `user`', (err, data) => {
        if (err) {
            console.log(err);
            res.send({ 'msg': '服务器出错', 'status': 0 }).end();
        } else {
            if (data.length == 0) {
                res.send({ 'msg': '该用户不存在', 'status': -1 }).end();
            } else {
                var dataw = data[0];
                console.log(dataw);
                //login sucess
                if (dataw.password === password && dataw.username === username) {
                    //save the session 
                    //req.session['id'] = dataw.id;
                    dataw.msg = "登录成功";
                    dataw.status = 1;
                    res.send(dataw).end();
                } else {
                    res.send({ 'msg': '用户名或密码不正确', 'status': -2 }).end();
                }
            }
        }
    });

});
//获取数据库客户列表
router.get('/getnews', (req, res) => {
    db.query('SELECT * FROM `customer`', (err, data) => {
        res.json(data);
    });
});

//客户录入
router.post('/insert', (req, res) => {
    var name = req.body.cusName;
    linkman = req.body.cusLinkman;
    email = req.body.cusEmail;
    web = req.body.cusWeb;
    phone = req.body.cusPhone;
    db.query("INSERT INTO `customer`(`name`,`linkman`,`email`,`web`,`phone`)VALUES(?,?,?,?,?)", [name, linkman, email, web, phone], function(err, result) {
        if (!err) {
            res.json(result);
        }
    });
});

//确认删除
router.post('/delete', function(req, res) {
    var id = req.body.cusId;
    console.log(id);
    db.query("DELETE FROM `customer` WHERE `customer`.`id` = ?", [id], function(err, result) {
        res.json(result);
    });
});

//模态框取值
router.post('/curInfo', function(req, res) {
    var id = req.body.cusId;
    console.log(id);
    db.query('SELECT * FROM `customer` WHERE id=?', [id], function(err, rows) {
        res.json(rows);
    });
});
//确认更新
router.post('/update', function(req, res) {
    var id = req.body.cusId;
    var name = req.body.cusName;
    linkman = req.body.cusLinkman;
    email = req.body.cusEmail;
    web = req.body.cusWeb;
    phone = req.body.cusPhone;
    db.query('UPDATE `customer` SET `name` =?,`linkman` =?,`email` =?,`web` =?,`phone` =? WHERE `id` =?', [name, linkman, email, web, phone, id], function(err, rows, fields) {
        res.json(rows);
    });
});

//搜索
router.get('/search', (req, res) => {
	var keywords =req.body.keyWords;
    db.query('SELECT * FROM `customer` where LIKE`%keywords%`', (err, data) => {
        res.json(data);
    });
});
module.exports = router;
