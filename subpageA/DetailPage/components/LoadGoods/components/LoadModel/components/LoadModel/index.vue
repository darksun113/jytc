<template>
    <div style="height:100%;width:100%;position:relative">
        <div  id="model" ref="model" style="width:100%;height:100%" ></div>
		<u-loading-icon :show="showIf" color="#28D8E5" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)"></u-loading-icon>
    </div>
</template>
 
<script>
import * as THREE from "three";
import configMixins from "../../mixins/configMixins.js";
import initModelMixin from "../../mixins/initModelMixin.js"
export default {
    name: "LoadObjMtl",
    mixins:[configMixins,initModelMixin],
    methods: {
        initRender() {
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                precision: "highp",
				premultipliedAlpha:true,
                alpha: true,
                preserveDrawingBuffer: true
            });
            this.renderer.setSize(this.$refs.model.clientWidth, this.$refs.model.clientHeight);
			// 设置像素比，解决模型失真问题
			this.renderer.setPixelRatio(window.devicePixelRatio);
            // 告诉渲染器需要阴影效果
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            document.querySelector("#model").appendChild(this.renderer.domElement);
        },
		initCamera() {
		    this.camera = new THREE.PerspectiveCamera(45, this.$refs.model.clientWidth / this.$refs.model.clientHeight, 1, 2000);
		    // 设置相机位置
		    this.camera.position.set(0 , 0 , 250)
			this.camera.receiveShadow=true
		    // 设置相机指向的位置 默认0，0，0
		    this.camera.lookAt(this.scene.position);
		},
    }
}
</script>
<style lang="scss">
#model{
    cursor: pointer;
    width: 100%;
    height: 100%;
    z-index: 9999;
}
</style>
