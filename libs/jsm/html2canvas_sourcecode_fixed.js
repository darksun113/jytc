/*
html2canvas 截图时 当元素img有object.fit属性时，图片截取截图默认截取整个img
不能做到截取中心的显示区域，需要将源码 path:node_modules/html2canvas/dist/html2canavs.js
中的 CanvasRenderer.prototype.renderReplacedElement 函数替换为如下代码，方可解决
*/

CanvasRenderer.prototype.renderReplacedElement = function(container, curves, image) {
	// // 原来的代码 注释掉
	// if (image && container.intrinsicWidth > 0 && container.intrinsicHeight > 0) {
	//     var box = contentBox(container);
	//     var path = calculatePaddingBoxPath(curves);
	//     this.path(path);
	//     this.ctx.save();
	//     this.ctx.clip();
	//     this.ctx.drawImage(image, 0, 0, container.intrinsicWidth, container.intrinsicHeight, box.left, box.top, box.width, box.height);
	//     this.ctx.restore();
	// }
	// 改成下面的代码
	if (image && container.intrinsicWidth > 0 && container.intrinsicHeight > 0) {
		var box = contentBox(container);
		var path = calculatePaddingBoxPath(curves);

		this.path(path);
		this.ctx.save();
		this.ctx.clip();

		let newWidth;
		let newHeight;
		let newX = box.left;
		let newY = box.top;

		if (container.intrinsicWidth / box.width < container.intrinsicHeight / box
			.height) {
			newWidth = box.width;
			newHeight = container.intrinsicHeight * (box.width / container.intrinsicWidth);
			newY = box.top + (box.height - newHeight) / 2;
		} else {
			newWidth = container.intrinsicWidth * (box.height / container
				.intrinsicHeight);
			newHeight = box.height;
			newX = box.left + (box.width - newWidth) / 2;
		}

		this.ctx.drawImage(image, 0, 0, container.intrinsicWidth, container.intrinsicHeight, newX, newY, newWidth,
			newHeight);
		this.ctx.restore();
	}
};
