<template>
    <view style="position:relative">
        <view  id="model_pre" ref="modelPre"></view>
        <u-loading-icon :show="showIf" color="#A5A6FF" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)"></u-loading-icon>
    </view>
</template>
 
<script>
import * as THREE from "three";
import configMixins from "../../mixins/configMixins.js";
import initModelMixin from "../../mixins/initModelMixin.js"
export default {
    name: "LoadObjMtl",
    mixins:[configMixins,initModelMixin],
    methods: {
        initCamera() {
            this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
            // 设置相机位置
            this.camera.position.set(0 , 0 , 250)
            this.camera.receiveShadow=true
            // 设置相机指向的位置 默认0，0，0
            this.camera.lookAt(this.scene.position);
        },
        initRender() {
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                precision: "highp",
				premultipliedAlpha:true,
                alpha: true,
                preserveDrawingBuffer: true
            });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            // 告诉渲染器需要阴影效果
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            document.querySelector("#model_pre").appendChild(this.renderer.domElement);
        },
        // 重置模型位置
        resetModel(){
            this.initCamera()
            this.initControls()
        }
    }
}
</script>
<style lang="scss" scoped>
#model_pre{
    width: 100vw;
    height: 100vh;
    z-index: 9999;
}

</style>
