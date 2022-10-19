
#注意事项

#初次加载本项目依赖包时，需要对依赖包node_modules做以下源码修改

-   1、THREE源码修改
-   PATH: node_modules/three-obj-mtl-loader/index.js
-   检索并删除 文件中的console.time 和 console.timeEnd,正式环境运行时该代码会导致模型加载失效
-   
-   2、阅读 libs/jsm/html2canvas_sourcecode_fixed.js 对html2canvaswen源码进行修改