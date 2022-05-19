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
