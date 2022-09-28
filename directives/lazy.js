export default {
	inserted(el){
		const imgSrc = el.src;
		el.src="";
		//观察者 IntersectionObserver 是一个 api
		// 参数 entries 是一个数组,里面的 isIntersecting 属性 ----flase 为在可视区域外, true 表示出现在可视区域,可以解构赋值
		const observer = new IntersectionObserver(([{isIntersecting}])=>{
			if(isIntersecting){
				el.src = imgSrc
				//图片加载完,就得要停止观察了(这样图片就不会每次出现在可视区域或者离开都会触发了))
				observer.unobserve(el)
			}
		})
		//观察我锁定的元素
		observer.observe(el)
	}
}