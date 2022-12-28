<script>
import chrData from '@/assets/chara.json'

export default{
    data(){
        return{
            chr_data: null,
            chr_data_filtered: null,
            img_size: "70",
            img_size_sm: "24",
            searchtext:'',
            searchtext_tmp:'',
            windowWidth:''
        }
    },
    methods:{
        async fetchChrData() {
            this.chr_data = chrData
            this.chr_data_filtered = chrData
        },
        search(){
            this.searchtext = this.searchtext_tmp;
            if (this.searchtext===''){
                this.chr_data_filtered = this.chr_data
            }else{
                this.chr_data_filtered = this.chr_data.filter((t)=>t["name"] == this.searchtext || t["name_en"] == this.searchtext)
            }
        },
        resizeWindow () {
            this.windowWidth = window.innerWidth;
            if(this.windowWidth<992){
                this.img_size=48;
                this.img_size_sm=18;
            }else if(this.windowWidth<992){
                this.img_size=70;
                this.img_size_sm=18;
            }else{
                this.img_size=70;
                this.img_size_sm=24;
            }
        },
        talentIdToWday: (id)=>{
            const idList={
                "104303":"月/木/日",
                "104306":"火/金/日",
                "104309":"水/土/日",
                "104312":"月/木/日",
                "104315":"火/金/日",
                "104318":"水/土/日",
                "104322":"月/木/日",
                "104325":"火/金/日",
                "104328":"水/土/日",
                "104331":"月/木/日",
                "104334":"火/金/日",
                "104337":"水/土/日",
            };
            return idList[id];
        },
    },
    mounted(){
        this.fetchChrData();
        this.resizeWindow();
        window.addEventListener('resize', this.resizeWindow);
    }
}

</script>

<template>
    <div class="container-xl">
    <div class="row align-items-center gx-3">
      <div class="col-xs-12 col-sm">
        <input v-model="searchtext_tmp" v-on:keydown.enter="search" type="text" class="form-control" placeholder="キャラ名">
      </div>
      <div class="col-xs-12 col-sm-auto">
        <button @click="search" type="button" class="btn btnx-blue">検索</button>
      </div>
    </div>
    <table class="table table-responsive">
        <thead>
            <tr>
                <th scope="col" style="width: 64px">画像</th>
                <th scope="col" style="width: 25%">名前</th>
                <th scope="col" style="width: 12%">武器</th>
                <th scope="col">育成素材</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="chr in chr_data_filtered">
                <td>
                    <img :src="`/assets/imgs/chara/UI_AvatarIcon_${chr.name_img}.png`" :width="img_size" :height="img_size">
                </td>
                <td>
                    <div v-if="this.windowWidth>=992">
                        <div class="row align-items-center row-cols-auto g-1">
                            <div class="col p-0 m-0">
                                <img :src="`/assets/imgs/other/${chr.element_en}.png`" :width="img_size_sm" :height="img_size_sm">
                            </div>
                            <div class="col px-1 chr_name">{{ chr.name }}</div>
                        </div>
                        {{ chr.name_en }}
                    </div>
                    <div v-else-if="this.windowWidth>=576">
                        <div class="row align-items-center row-cols-auto g-1">
                            <div class="col p-0 m-0">
                                <img :src="`/assets/imgs/other/${chr.element_en}.png`" :width="img_size_sm" :height="img_size_sm">
                            </div>
                            <b class="col px-1">{{ chr.name }}</b>
                        </div>
                        <div style="font-size:12px;">{{ chr.name_en }}</div>
                    </div>
                    <div v-else>
                        <div class="chr_name_sm">
                            <img :src="`/assets/imgs/other/${chr.element_en}.png`" :width="img_size_sm" :height="img_size_sm">
                            <br><b>{{ chr.name }}</b>
                        </div>
                    </div>
                </td>
                <td>
                    <b v-if="this.windowWidth>=992">{{ chr.weapon }}</b>
                    <div v-else style="font-size:15px">{{ chr.weapon }}</div>
                </td>
                <td>
                    <div class="row row-cols-auto">
                        <div v-for="(material,idx) in chr.materials" class="col px-0 px-xl-2">
                            <img v-if="material==='None'" src="/assets/imgs/other/genshin_avatar_bg.png" :width="img_size" :height="img_size">
                            <img v-else-if="idx!==4" :src="`/assets/imgs/material/UI_ItemIcon_${material}.png`" :width="img_size" :height="img_size">
                            <div v-else>
                                <img :src="`/assets/imgs/material/UI_ItemIcon_${material}.png`" :width="img_size" :height="img_size">
                                <div class="talent_wday">{{ talentIdToWday(material) }}</div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<style lang="scss">
.chr_name{
    font-size: 20px;
    font-weight: bold;
}
.talent_wday{
    margin: -24px 0px 0px; 
    font-size: 14px; 
    text-align: center;
    background-color: #fff3;
    border-radius: 0.125rem;
    user-select: none;

    @media screen and (max-width: 991px) {
        margin: -18px 0px 0px; 
        font-size: 11px;
    }
}
</style>