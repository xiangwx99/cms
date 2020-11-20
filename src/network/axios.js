import originAxios from 'axios'
import store from '../store/index'
import router from '../router/index'
import localstorage from '../common/util'

export default function axios(option) {
	return new Promise((resolve, reject) => {
		// 1.创建axios的实例
		const instance = originAxios.create({
			baseURL: 'http://39.107.45.47:2222',
			timeout: 10000,
			// withCredentials: true
		});
		
		// 配置请求和响应拦截
		instance.interceptors.request.use(config => {
			// 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

			// 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面

			// 3.对请求的参数进行序列化(看服务器是否需要序列化)
			const passport = localstorage.getLocalStorage('passport')
			if(!passport) {
				router.replace({
					path: '/login',
					query: {
							redirect: router.currentRoute.fullPath
					}
				});
				return
			}
			config.headers["passport"] = passport
			return config
		}, err => {
			
			return err
		})

		instance.interceptors.response.use(response => {
			return response.data
		}, err => {
			console.log(err);
			// router.replace({
			// 	path: '/login',
			// 	query: {
			// 			redirect: router.currentRoute.fullPath
			// 	}
			// });
			if (err && err.response) {
				switch (err.response.status) {
					case 400:
						err.message = '请求错误'
						break
					case 401:
						localstorage.removeLocalStorage('token')
						router.replace({
							path: '/login',
							query: {
									redirect: router.currentRoute.fullPath
							}
						});
						err.message = '未授权的访问'
						break
					case 5000:
						err.message = '被禁止的访问'
						router.replace({
							path: '/login',
							query: {
									redirect: router.currentRoute.fullPath
							}
						});
						break
					case 500:
						err.message = '被禁止的访问'
						router.replace({
							path: '/login',
							query: {
									redirect: router.currentRoute.fullPath
							}
						});
						break
				}
			}
			return err
		})

		// 2.传入对象进行网络请求
		instance(option).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}