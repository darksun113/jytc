import request from "./http.js"
import store from "../store/index.js"
import axios from "axios"
import {
	md,
	pki
} from "node-forge";

// 获取多张图片
// data:object|array
// keysList:string[] 
export async function getFilePath(data,keysList){
	try{
		if((!Array.isArray(data) || data.toString() !== "[object Object]") && !Array.isArray(keysList)){
			console.error("getFilePath(a,b) 当前参数不正确，请确保a为object或array 且b为array")
			return
		}
		if(Array.isArray(data)){
			const temp={}
			keysList.forEach(key=>{
				temp[key]=""
			})
			for(let i=0;i<data.length;i++){
				Object.keys(temp).forEach(key=>{
					if(data[i][key]){
						temp[key]=data[i][key]
					}else{
						console.error(key+"无内容，请检查")
						return
					}
				})
				const objData = await getFilesPath_(temp)
				Object.keys(objData).forEach(key=>{
					data[i][key] = objData[key]
				})
			}
			return data
		}else if(data.toString() == "[object Object]"){
			const temp={}
			keysList.forEach(key=>{
				if(data[key]){
					temp[key]=data[key]
				}else{
					debugger
					console.error(key+"无内容，请检查")
					return
				}
			})
			const objData = await getFilesPath_(temp)
			Object.keys(objData).forEach(key=>{
				data[key] = objData[key]
			})
			return data
		}
	}catch(e){
		//TODO handle the exception
	}
}

// 获取图片请求
async function getFilesPath_(data) {
	try {
		const result = {}
		const length = Object.keys(data).length
		let idx = 0
		for (let key in data) {
			const reg_result = data[key].indexOf("https")
			if (reg_result == 0) {
				result[key] = data[key]
				idx++
			} else {
				const path = store.state.filePath[data[key]]
				if (!path) {
					const res = await request("/file/applydownload", {
						uuid: data[key]
					})
					if(res.code==0){
						store.commit("saveFilePath", {
							uuid: data[key],
							path: res.data.url
						})
						result[key] = res.data.url
						idx++
					}else{
						idx++
						console.error(res.errorMsg)
					}
				} else {
					result[key] = path
					idx++
				}
			}
		}
		if (idx == length) {
			return result
		}
	} catch (error) {
		throw new Error("系统错误", error)
	}
}

/** 获取文件的md5值 */
export function getFileMd5(file) {
	let fr = new FileReader();
	fr.readAsBinaryString(file);
	return new Promise(function(resolve) {
		fr.addEventListener("loadend", function() {
			let result = fr.result;
			let digest = md.md5.create().update(result).digest();
			let data = window.btoa(digest.data);
			resolve(data);
		});
	});
}

/* 文件上传 */
export async function uploadFile(md5, file) {
	try {
		const fileData = {}
		fileData.md5 = md5;
		fileData.contentType = file.type;
		fileData.filename = file.name
		fileData.size = file.size;
		return await sendRequest(fileData, file);
	} catch (e) {
		//TODO handle the exception
	}
}
async function sendRequest(fileData, file) {
	try {
		const res = await uni.$http("/file/applyupload", fileData);
		if (res.code == 0) {
			const uuid = res.data.uuid;
			// hit为false，表示数据库没有file，执行上传
			if (!res.data.hit) {
				let data = {
					method: "put",
					url: res.data.url,
					headers: {
						"Content-Type": fileData.contentType,
						"Content-Md5": fileData.md5
					},
					data:file,
					timeout: 30 * 1000,
				}
				const res_ = await axios({...data})
				if (res_.status == 200) {
					const res_1 = await uni.$http("/file/uploadsuccess", {uuid})
					if (res_1.code == 0) {
						return {
							status: "success",
							info: uuid
						}
					} else {
						return {
							status: "fail",
							data: res_1.errorMsg
						}
					}
				} else {
					return {
						status: "fail",
						info: "上传服务器失败"
					}
				}
			} else {
				return {
					status: "success",
					info: uuid
				}
			}
		} else {
			return {
				status: "fail",
				info: res.errorMsg
			}
		}
	} catch (e) {
		//TODO handle the exception
	}
}

/** blob转base64 */
export function blobToBase64(blob) {
	let reader = new FileReader();
	reader.readAsDataURL(blob);
	return new Promise(function(resolve) {
		reader.addEventListener("load", function() {
			return resolve(reader.result);
		});
	});
}
// 将base64转换为blob
export function Base64UrlToBlob(urlData) {
	let arr = urlData.split(",");
	let mime = arr[0].match(/:(.*?);/)[1];
	let bstr = atob(arr[1]);
	let n = bstr.length;
	let u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {
		type: mime
	});
}
// 压缩图片
export function compress(path, config) {
	return new Promise((resolve) => {
		let img = new Image();
		img.src = path;
		img.onload = function() {
			let that = this;
			let w = that.width;
			let h = that.height;
			let scale = w / h;
			w = config.width || config.height * scale;
			h = config.height || config.width / scale;
			let quality = 0.7; // 默认图片质量为0.7
			// 生成canvas
			let canvas = document.createElement("canvas");
			let ctx = canvas.getContext("2d");
			// 创建属性节点
			let anw = document.createAttribute("width");
			anw.nodeValue = w;
			let anh = document.createAttribute("height");
			anh.nodeValue = h;
			canvas.setAttributeNode(anw);
			canvas.setAttributeNode(anh);
			ctx.drawImage(that, 0, 0, w, h);
			if (config.quality && config.quality <= 1 && config.quality > 0) {
				quality = config.quality;
			}
			let base64 = canvas.toDataURL("image/*", quality);
			let blob = base64toFile(base64, "图片");
			// 回调函数返回base64的值，也可根据自己的需求返回blob的值
			resolve(blob);
		};
	});
}
// 密码加密
export function rsaEncrypt(data) {
	// 定义公钥
	const pemStrs = {
		development: `
    -----BEGIN RSA PUBLIC KEY-----
    MIIBCgKCAQEAtunt+ttPzWhfPrjP1P2wpKtGOjKaN7uxI+0pIzbpWaD6rs6PmI4y
    8ZezXedZpuQhYj3Lt1BfRjCv/JSle7DTBoGCzZh5OdMmKDDonjM0Elh4btBBxNES
    5bTM4HwrijipFNuy/XADOLgGmKZjI9JUSvQiI2y8e6D2Aoykd17+aF5kqiqq57qt
    RS6mS8JmS1mFDiX+pR0rL2cVED0itVfWjK89t6uyx4/ls8Sdyxzw2m6NOeCF7y1M
    mNZ0LE0QRZke1I5esmluHSJUUrIZaOXLbgaV/wh8laEmZQk19sAe+lgETuXFFcrY
    nBF+JLlF4xj5rUbIgpMslufC1zxxwqxIjQIDAQAB
    -----END RSA PUBLIC KEY----- 
  `,
		production: `
    -----BEGIN RSA PUBLIC KEY-----
    MIIBCgKCAQEAtunt+ttPzWhfPrjP1P2wpKtGOjKaN7uxI+0pIzbpWaD6rs6PmI4y
    8ZezXedZpuQhYj3Lt1BfRjCv/JSle7DTBoGCzZh5OdMmKDDonjM0Elh4btBBxNES
    5bTM4HwrijipFNuy/XADOLgGmKZjI9JUSvQiI2y8e6D2Aoykd17+aF5kqiqq57qt
    RS6mS8JmS1mFDiX+pR0rL2cVED0itVfWjK89t6uyx4/ls8Sdyxzw2m6NOeCF7y1M
    mNZ0LE0QRZke1I5esmluHSJUUrIZaOXLbgaV/wh8laEmZQk19sAe+lgETuXFFcrY
    nBF+JLlF4xj5rUbIgpMslufC1zxxwqxIjQIDAQAB
    -----END RSA PUBLIC KEY-----
  `,
	};
	const isDev = process.env.NODE_ENV == 'development' ? 'development' : 'production'
	const pemStr = pemStrs[isDev];
	let publicKey = pki.publicKeyFromPem(pemStr);
	// 获取到rsa加密结果
	let encrypted = publicKey.encrypt(data, 'RSAES-PKCS1-V1_5');
	// rsa加密后转base64
	return window.btoa(encrypted);
}

function getLocalFilePath(path) {
	if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf(
			'_downloads') === 0) {
		return path
	}
	if (path.indexOf('file://') === 0) {
		return path
	}
	if (path.indexOf('/storage/emulated/0/') === 0) {
		return path
	}
	if (path.indexOf('/') === 0) {
		var localFilePath = plus.io.convertAbsoluteFileSystem(path)
		if (localFilePath !== path) {
			return localFilePath
		} else {
			path = path.substr(1)
		}
	}
	return '_www/' + path
}

function dataUrlToBase64(str) {
	var array = str.split(',')
	return array[array.length - 1]
}



// path转base64
export function imgPathToBase64(url, cb) {
	let canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		img = new Image;
	img.crossOrigin = 'Anonymous';
	img.src = /^data:image/.test(url) ? url : url + '?' + new Date().getTime();
	img.onload = function() {
		canvas.height = img.height;
		canvas.width = img.width;
		ctx.drawImage(img, 0, 0);
		const dataURL = canvas.toDataURL('image/png');
		cb && cb(dataURL);
		canvas = null;
	};
}

//base64转file对象
export function base64toFile(base, filename) {
	const arr = base.split(',');
	const mime = arr[0].match(/:(.*?);/)[1];
	const suffix = mime.split("/")[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	//转换成file对象
	return new File([u8arr], `${filename}.${suffix}`, {
		type: mime
	});
}

// base64转path
export function base64ToPath(base64) {
	return new Promise(function(resolve, reject) {
		if (typeof window === 'object' && 'document' in window) {
			base64 = base64.split(',')
			var type = base64[0].match(/:(.*?);/)[1]
			var str = atob(base64[1])
			var n = str.length
			var array = new Uint8Array(n)
			while (n--) {
				array[n] = str.charCodeAt(n)
			}
			return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], {
				type: type
			})))
		}
		var extName = base64.split(',')[0].match(/data\:\S+\/(\S+);/)
		if (extName) {
			extName = extName[1]
		} else {
			reject(new Error('base64 error'))
		}
		var fileName = getNewFileId() + '.' + extName
		if (typeof plus === 'object') {
			var basePath = '_doc'
			var dirPath = 'uniapp_temp'
			var filePath = basePath + '/' + dirPath + '/' + fileName
			if (!biggerThan(plus.os.name === 'Android' ? '1.9.9.80627' : '1.9.9.80472', plus.runtime
					.innerVersion)) {
				plus.io.resolveLocalFileSystemURL(basePath, function(entry) {
					entry.getDirectory(dirPath, {
						create: true,
						exclusive: false,
					}, function(entry) {
						entry.getFile(fileName, {
							create: true,
							exclusive: false,
						}, function(entry) {
							entry.createWriter(function(writer) {
								writer.onwrite = function() {
									resolve(filePath)
								}
								writer.onerror = reject
								writer.seek(0)
								writer.writeAsBinary(dataUrlToBase64(
									base64))
							}, reject)
						}, reject)
					}, reject)
				}, reject)
				return
			}
			var bitmap = new plus.nativeObj.Bitmap(fileName)
			bitmap.loadBase64Data(base64, function() {
				bitmap.save(filePath, {}, function() {
					bitmap.clear()
					resolve(filePath)
				}, function(error) {
					bitmap.clear()
					reject(error)
				})
			}, function(error) {
				bitmap.clear()
				reject(error)
			})
			return
		}
		if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
			var filePath = wx.env.USER_DATA_PATH + '/' + fileName
			wx.getFileSystemManager().writeFile({
				filePath: filePath,
				data: dataUrlToBase64(base64),
				encoding: 'base64',
				success: function() {
					resolve(filePath)
				},
				fail: function(error) {
					reject(error)
				}
			})
			return
		}
		reject(new Error('not support'))
	})
}
function getNewFileId() {
	return Date.now() + String(index++)
}
// 图片格式转换
export async function formatImg(file, type,cb) {
    try {
        let resFile = null;
        let urlData = "";
        // 把image 转换为 canvas对象
        const imgToCanvas = (image) => {
            const canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            canvas.getContext("2d").drawImage(image, 0, 0);
            return canvas;
        }
        //canvas转换为image
        const canvasToImg = (canvas, type) => {
            const src = canvas.toDataURL(type);
            return src;
        }
        // base64转blob
        const Base64UrlToBlob= (urlData)=> {
            let arr = urlData.split(",");
            let mime = arr[0].match(/:(.*?);/)[1];
            let bstr = atob(arr[1]);
            let n = bstr.length;
            let u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type: mime})
        }
        //获取图片信息
        const getImg = (fn)=>{
            let imgFile = new FileReader();
            try {
                // 使用FileReader来把文件读入内存，并且读取文件中的数据。 readAsDataURL方法可以在浏览器主线程中异步访问文件系统，读取文件中的数据，且读取后 result 为 DataURL, DataURL 可直接 赋值给 img.src
                imgFile.readAsDataURL(file);
                imgFile.onload = function (e) {
                    let image = new Image();
                    image.src = e.target.result; //base64数据
                    image.onload = async function () {
                        fn(image);
                    }
                }
            } catch (e) {
                console.log("请上传图片！" + e);
            }
        }
        getImg(async image => {
            let can = await imgToCanvas(image)
            urlData = await canvasToImg(can, type)
            resFile = await Base64UrlToBlob(urlData)
            cb({
                urlData,
                resFile
            })
        })
    } catch (error) {
        throw new Error("系统错误")
    }
}
