import * as THREE from "three";
import {  OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {  MTLLoader, OBJLoader } from "three-obj-mtl-loader";

export default{
	props: {
	    OBJPath: {
	        type: String,
	        default: () => {
	            ""
	        }
	    },
	    MTLPath: {
	        type: String,
	        default: () => {
	            ""
	        }
	    },
	    MAPPath: {
	        type: String,
	        default: () => {
	            ""
	        }
	    },
	    // 加载类型 0 不可控 1 可控（部分） 2 全控
	    loadType: [Number,String],
	},
	data() {
	    return {
	        showIf:true,
	        renderer: null,
	        camera: null,
	        scene: null,
	        light: null,
	        control: null,
	        model: null,
	        controls: null,
	        objLoader: null,
	        mtlLoader: null,
	        animationId:null,
	        isAutoPlay:true
	    };
	},
	mounted() {
	    // 执行
	    this.execute();
	},
	beforeDestroy(){
	    this.clearScene()
	},
	methods:{
		initScene() {
		    this.scene = new THREE.Scene();
		},
		initControls() {
		    this.control = new OrbitControls(this.camera, this.renderer.domElement)
			
		    // 开启自动旋转
		    this.control.autoRotate = this.isAutoPlay
			
		    // 设置缩放最大、最小距离
		    this.control.minDistance = 50
		    this.control.maxDistance = 400
			
		    // this.control.maxPolarAngle = - Math.PI
		    
		    if(this.loadType == 0){
		        this.control.enableRotate = false;
		        this.control.enableZoom = false;
		    }
		
		    // 禁用平移
		    this.control.enablePan = false
		    this.control.rotateSpeed = 0.5
		    // 开启拖拽惯性
		    this.control.enableDamping = true
		    this.control.dampingFactor = 0.1
		},
		initModel() {
		    const manager = new THREE.LoadingManager();
		    let _this=this
		    manager.onProgress =  (item, loaded, total)=> {
		        // 加载完时
		        loaded==total
		        if(loaded==total){
		            _this.showIf=false
		        }
		    };
		    //模型需要纹理Texture
		    const texture = new THREE.Texture();
		    const loader = new THREE.ImageLoader(manager);
		    loader.load(this.MAPPath, function (image) {
		        texture.image = image;
		        texture.needsUpdate = true;
		    });
		    // 实例化obj loader
		    this.objLoader = new OBJLoader(manager);
		    // 实例化mtl loader
		    this.mtlLoader = new MTLLoader(manager);
		    const that = this;
		    // 加载mtl
		    this.mtlLoader.load(that.MTLPath, function (materials) {
		        materials.preload();
		        that.objLoader.setMaterials(materials);
		        // 加载obj
		        that.objLoader.load(that.OBJPath, function (obj) {
		            // 缩小一下比例，方便显示
		            obj.scale.set(1.5, 1.5, 1.5);
					obj.rotation.y=135
		            // 设置可以投影
		            obj.traverse(function (child) {
		                if (child instanceof THREE.Mesh) {
		                    child.material.map = texture;
		                    // 设置镜面反光效果（陶瓷类模型使用）
		                    if (that.modelType == 2) {
		                        child.material.shininess = 5000;
		                        child.material.specular.r = .1;
		                        child.material.specular.g = .1;
		                        child.material.specular.b = .1;
		                    }
		                }
		                child.castShadow = true;
		                child.receiveShadow = true;
		            });
		            that.model = obj;
		            const setPosition = function(){
		                switch(that.modelType){
		                    case 1:return -90;
		                    case 2:return -25;
		                    case 3:return -25;
		                }
		            }
		            const y=setPosition()
		            that.model.position.y = y;
		            // 添加到场景
		            that.scene.add(that.model);
		            
		        });
		    });
		},
		render() {
		    this.control.update();
		    this.renderer.render(this.scene, this.camera);
		    this.animationId=window.requestAnimationFrame(this.render);
		},
		clearScene() {
		    cancelAnimationFrame(this.animationId);
		    this.scene.traverse((child) => {
		    if (child.material) {
		        child.material.dispose();
		    }
		    if (child.geometry) {
		        child.geometry.dispose();
		    }
		    child = null;
		    });
		    this.renderer.forceContextLoss();
		    this.renderer.renderLists.dispose();
		    this.renderer.dispose();
		    this.renderer.content = null;
		    this.scene.clear();
		    this.scene = null;
		    this.camera = null;
		    this.controls = null;
		    this.renderer.domElement = null;
		    this.renderer = null;
		    THREE.Cache.clear()
		},
		// 重置模型位置
		resetModel(){
		    this.initCamera()
		    this.initControls()
		},
		// 控制模型自动旋转与暂停
		startRotate(){
		    this.control.autoRotate=true
		},
		stopRotate(){
			this.control.autoRotate=false
		},
		execute() {
		    // 初始化场景
		    this.initScene();
		    // 初始化摄像头
		    this.initCamera();
		    // 初始化模型
		    this.initModel();
		    // 初始化渲染器
		    this.initRender();
		    // 初始化光源
		    this.initLight();
		    // 初始化控制器
		    this.initControls();
		    // 执行渲染
		    this.render();
		},
	}
}