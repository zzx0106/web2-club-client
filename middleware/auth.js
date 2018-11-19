// export default function({ isClient, isServer, route, req, res, redirect }) {
//     //在服务端判读是否需要登陆(如果直接输地址，在客户端是判断不到的)
//     console.log('req.cookiesreq.cookies', req.cookies)
//     // if (isServer) {
//     //     let cookies = req.cookies;
//     //     let path = req.originalUrl;

//     //     if (path.indexOf('admin') > 0 && !cookies.token) {
//     //         redirect('/login');
//     //     }
//     // }
//     // //在客户端判读是否需要登陆
//     // if (isClient) {
//     //     if (route.path.indexOf('admin') > 0 && !isLogin()) {
//     //         redirect('login');
//     //     }
//     // }
// }

export default function({ route, req, res }) {
    // console.log(' process.client', process.client);
    // console.log(' process.process.server', process.server);
    // if (isClient) {
    //     console.log('客户端渲染');
    //     console.log('req.cookiesreq.cookies');
    // }
    // if (isServer) {
    //     console.log('服务端渲染');
    //     console.log('req.cookiesreq.cookies');
    // }
    // If the user is not authenticated
    // if (!store.state.authenticated) {
    //   return redirect('/login')
    // }
}
