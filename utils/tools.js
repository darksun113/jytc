import request  from "./http.js"
import store from "../store/index.js"
import { md , pki } from "node-forge";
// 获取单张图片
export async function getFilePath(uuid) {
    try {
      const reg_result = uuid.indexOf("http")
      if (reg_result == 0) {
          return uuid
      } else {
         const path = store.state.filePath[uuid]
         if (!path) {
           const res = await request("/file/applydownload", {
             uuid
           })
           store.commit("saveFilePath", {
             uuid,
             path: res.data.url
           })
		   return res.data.url
         } else {
			 return path
         }
      }
    } catch (error) {
        throw new Error("系统错误", error)
    }
}
// 获取多张图片
export async function getFilesPath(data) {
    try {
        const result = {}
        const length = Object.keys(data).length
        let idx=0
        for (let key in data) {
            const reg_result = data[key].indexOf("http")
          if (reg_result == 0) {
            result[key] = data[key]
            idx++
          } else {
            const path = store.state.filePath[data[key]]
            if (!path) {
              const res = await request("/file/applydownload", {
                uuid: data[key]
              })
              store.commit("saveFilePath", {
                uuid: data[key],
                path: res.data.url
              })
              result[key] = res.data.url
              idx++
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
    return new Promise(function (resolve) {
      fr.addEventListener("loadend", function () {
        let result = fr.result;
        let digest = md.md5.create().update(result).digest();
        let data = window.btoa(digest.data);
        resolve(data);
      });
    });
  }
  
  /** blob转base64 */
export function blobToBase64(blob) {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(function (resolve) {
      reader.addEventListener("load", function () {
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
    return new Blob([u8arr], { type: mime });
}
  // 压缩图片
export function compress(path, config) {
    return new Promise((resolve) => {
      let img = new Image();
      img.src = path;
      img.onload = function () {
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
        let blob = Base64UrlToBlob(base64);
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
    if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf('_downloads') === 0) {
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

var index = 0
function getNewFileId() {
    return Date.now() + String(index++)
}

function biggerThan(v1, v2) {
    var v1Array = v1.split('.')
    var v2Array = v2.split('.')
    var update = false
    for (var index = 0; index < v2Array.length; index++) {
        var diff = v1Array[index] - v2Array[index]
        if (diff !== 0) {
            update = diff > 0
            break
        }
    }
    return update
}

// path转base64
export function pathToBase64(path) {
    return new Promise(function(resolve, reject) {
        if (typeof window === 'object' && 'document' in window) {
            if (typeof FileReader === 'function') {
                var xhr = new XMLHttpRequest()
                xhr.open('GET', path, true)
                xhr.responseType = 'blob'
                xhr.onload = function() {
                    if (this.status === 200) {
                        let fileReader = new FileReader()
                        fileReader.onload = function(e) {
                            resolve(e.target.result)
                        }
                        fileReader.onerror = reject
                        fileReader.readAsDataURL(this.response)
                    }
                }
                xhr.onerror = reject
                xhr.send()
                return
            }
            var canvas = document.createElement('canvas')
            var c2x = canvas.getContext('2d')
            var img = new Image
            img.onload = function() {
                canvas.width = img.width
                canvas.height = img.height
                c2x.drawImage(img, 0, 0)
                resolve(canvas.toDataURL())
                canvas.height = canvas.width = 0
            }
            img.onerror = reject
            img.src = path
            return
        }
        if (typeof plus === 'object') {
            plus.io.resolveLocalFileSystemURL(getLocalFilePath(path), function(entry) {
                entry.file(function(file) {
                    var fileReader = new plus.io.FileReader()
                    fileReader.onload = function(data) {
                        resolve(data.target.result)
                    }
                    fileReader.onerror = function(error) {
                        reject(error)
                    }
                    fileReader.readAsDataURL(file)
                }, function(error) {
                    reject(error)
                })
            }, function(error) {
                reject(error)
            })
            return
        }
        if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
            wx.getFileSystemManager().readFile({
                filePath: path,
                encoding: 'base64',
                success: function(res) {
                    resolve('data:image/png;base64,' + res.data)
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
            return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], { type: type })))
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
            if (!biggerThan(plus.os.name === 'Android' ? '1.9.9.80627' : '1.9.9.80472', plus.runtime.innerVersion)) {
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
                                writer.writeAsBinary(dataUrlToBase64(base64))
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