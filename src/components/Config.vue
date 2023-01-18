<script>
export default{
    props: ['devMode', 'showWday'],
    computed:{
        cfgs_devMode:{
            get(){return this.devMode;},
            set(newval){this.$emit('resCfg', {devMode:newval});}
        },
        cfgs_showWday:{
            get(){return this.showWday;},
            set(newval){ this.$emit('resCfg', {showWday:newval});}
        }
    }
}
</script>

<template>
    <div class="container-xl">
        <h3>設定</h3>
        <hr />
        <p>
            <h5>早見表</h5>
            <div class="form-check col">
                <input v-model="cfgs_showWday" class="form-check-input" type="checkbox" value="" id="cfgs_showWday" :checked="cfgs_showWday">
                <label class="form-check-label" for="cfgs_showWday">
                    詳細情報を表示する
                </label>
            </div>
        </p>
        <p v-if="false">
            <h5>その他</h5>
            <div class="form-check col">
                <input v-model="cfgs_devMode" class="form-check-input" type="checkbox" value="" id="cfgs_devMode" :checked="cfgs_devMode">
                <label class="form-check-label" for="cfgs_devMode">
                    開発者モードを有効にする
                </label>
            </div>
        </p>
        
    </div>
</template>