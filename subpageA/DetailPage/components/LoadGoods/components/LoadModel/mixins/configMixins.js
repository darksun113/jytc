import * as THREE from "three";
export default {
    props: {
        // 模型类型 1 画卷类 2 瓷器类 3 金属类
        modelType: [Number, String],
    },
    methods: {
        initLight() {
            switch (this.modelType) {
                case 1:
                    this.lightTypeOfPainting()
                    break;
                case 2:
                    this.lightTypeOfPorcelain()
                    break;
                case 3:
                    this.lightTypeOfMetal()
                    break;
            }
        },
        // 画卷类灯光
        lightTypeOfPainting() {
            // 基础光源
            let ambientLight = new THREE.AmbientLight(0xeeeeee, 0.5);
            // 创建点光源（漫反射光）
            let pointLight = new THREE.PointLight(0xffffff, 0.6);
            pointLight.position.set(60000, 40000, 40000)
            this.camera.add(ambientLight);
            this.camera.add(pointLight)
            this.scene.add(this.camera);
        },
        // 瓷器类灯光
        lightTypeOfPorcelain() {
            // 基础光源
            let ambientLight = new THREE.AmbientLight();
            // 平行光
            let DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            DirectionalLight.position.set(60000, 40000, 40000)
            this.camera.add(ambientLight);
            this.camera.add(DirectionalLight);
            this.scene.add(this.camera);
        },
        // 金属类灯光
        lightTypeOfMetal() {
            // 基础光源
            let ambientLight = new THREE.AmbientLight();
            // 平行光
            let DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            let pointLight = new THREE.PointLight(0xffffff, 0.6);
            pointLight.position.set(60000, 40000, 40000)
            DirectionalLight.position.set(60000, 40000, 40000)
            this.camera.add(ambientLight);
            this.camera.add(DirectionalLight);
            this.camera.add(pointLight);
            this.scene.add(this.camera);
        }
    }
}