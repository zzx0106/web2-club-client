// const express = require('express');
// // import express from 'express'
// // Create express router
// const router = express.Router();
// import config from '../config/config';
// // const config = require('../config/config');
// import SuperHttp from '../utils/super_http';
// const http = new SuperHttp(true, true);
// const { baseClientURL } = config.axios_config;

// // Transform req & res to have the same API as express
// // So we can use res.status() & res.json()
// const app = express();
// router.use((req, res, next) => {
//     Object.setPrototypeOf(req, app.request);
//     Object.setPrototypeOf(res, app.response);
//     req.res = res;
//     res.req = req;
//     next();
// });

// // Add POST - /api/login

// router.post('/login', async (req, res, next) => {
//     // const sing = await axios.get(config.axios_config.baseClientURL + '/user/get_key');
//     const user = await http.login(req.body);
//     if (user.msg === 'ok') {
//         res.cookie('ck_token', user.data.token, { path: '/', 
//         // httpOnly: true,
//          maxAge: 60 * 60 * 24 * 7, domain: 'http://localhost:7001' });
//         delete user.data.token; // 删除返回前端的token
//         return res.json(user);
//     } else {
//         res.status(401).json(user);
//     }

// });

// router.get('/topic/home', (req, res, next) => {
//     console.log('topic/home');
//     // console.log('进入*', req.cookie());
//     next();
//     //   if (req.body.username === 'demo' && req.body.password === 'demo') {
//     //     req.session.authUser = { username: 'demo' }
//     //     return res.json({ username: 'demo' })
//     //   }
//     //   res.status(401).json({ message: 'Bad credentials' })
// });
// router.get('*', (req, res, next) => {
//     // console.log('进入*', req.cookie());
//     next();
//     //   if (req.body.username === 'demo' && req.body.password === 'demo') {
//     //     req.session.authUser = { username: 'demo' }
//     //     return res.json({ username: 'demo' })
//     //   }
//     //   res.status(401).json({ message: 'Bad credentials' })
// });

// // Add POST - /api/logout
// router.post('/logout', (req, res) => {
//     delete req.session.authUser;
//     res.json({ ok: true });
// });
// module.exports = router;
