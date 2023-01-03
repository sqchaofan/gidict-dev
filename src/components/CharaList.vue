<script>
import chrData from '@/assets/chara.json'

export default{
    props: ['showWday'],
    data(){
        return{
            chr_data: chrData,
            //chr_data_filtered: null,
            img_size: "70",
            img_size_sm: "24",
            searchtext:'',
            searchtext_tmp:'',
            windowWidth:'',
            red:"#ff0000",
            weapons: {
                "片手剣":{"name":"片手剣", "checked": true},
                "両手剣":{"name":"両手剣", "checked": true},
                "弓":{"name":"弓", "checked": true},
                "長柄武器":{"name":"長柄武器", "checked": true},
                "法器":{"name":"法器", "checked": true}
            },
            countries: {
                "モンド":{"name":"モンド", "checked": true},
                "璃月":{"name":"璃月", "checked": true},
                "稲妻":{"name":"稲妻", "checked": true},
                "稲妻":{"name":"稲妻", "checked": true},
                "スメール":{"name":"スメール", "checked": true},
                "フォンテーヌ":{"name":"フォンテーヌ", "checked": true},
                "ナタ":{"name":"ナタ", "checked": true},
                "スネージナヤ":{"name":"スネージナヤ", "checked": true},
                "その他":{"name":"その他", "checked": true}
            },
            elementals: {
                "anemo":{"name":"風", "value":"anemo", "checked": true},
                "cryo":{"name":"氷", "value":"cryo", "checked": true},
                "dendro":{"name":"草", "value":"dendro", "checked": true},
                "electro":{"name":"雷", "value":"electro", "checked": true},
                "geo":{"name":"岩", "value":"geo", "checked": true},
                "hydro":{"name":"水", "value":"hydro", "checked": true},
                "pyro":{"name":"炎", "value":"pyro", "checked": true},
            }
        }
    },
    methods:{
        resizeWindow () {
            this.windowWidth = window.innerWidth;
            if(this.windowWidth<768){
                this.img_size=48;
                this.img_size_sm=18;
            }else if(this.windowWidth<992){
                this.img_size=64;
                this.img_size_sm=24;
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
        checkAll(dataDict){
          Object.keys(dataDict).forEach((t)=>{dataDict[t]["checked"]=true});
        },
        uncheckAll(dataDict){
            Object.keys(dataDict).forEach((t)=>{dataDict[t]["checked"]=false});
        }
    },
    mounted(){
        this.resizeWindow();
        window.addEventListener('resize', this.resizeWindow);
    },
    computed:{
        chrDataFiltered(){
            let chrData_tmp = [];

            this.chr_data.forEach(chr=>{
                if(Object.keys(this.weapons).indexOf(chr.weapon)!==-1&&
                    Object.keys(this.countries).indexOf(chr.country)!==-1&&
                    Object.keys(this.elementals).indexOf(chr.element_en)!==-1
                ){
                    if(this.weapons[chr.weapon].checked && 
                        this.elementals[chr.element_en].checked&&
                        this.countries[chr.country].checked
                    )chrData_tmp.push(chr);
                }
                
            });

            if (this.searchtext!==''){
                chrData_tmp= chrData_tmp.filter((t)=>~t["name"].indexOf(this.searchtext) || ~t["name_en"].toLowerCase().indexOf(this.searchtext.toLowerCase()))
            }

            return chrData_tmp;
        }
    }
}
</script>

<template>
  <div class="container-xl">
    <div class="row align-items-center gx-2">
      <div class="col-xs-12 col-sm-auto">
        <button type="button" class="btn btnx-gv-yellow" data-bs-toggle="modal" data-bs-target="#filterModal">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 32 512 512" style="width: 16px; height: 16px; opacity: 1;" xml:space="preserve">
            <g>
              <polygon class="st0" points="0,27.435 211.912,255.993 211.912,484.565 300.076,457.137 300.076,255.993 512,27.435 	" style="fill: rgb(236, 228, 217);"></polygon>
            </g>
          </svg>
          フィルタ</button>
      </div>
      <div class="col-xs-12 col-sm">
        <input v-model="searchtext" type="text" class="form-control" placeholder="キャラ名">
      </div>
    </div>
    <table class="table table-responsive">
        <thead>
          <tr>
            <th scope="col" style="width: 64px">画像</th>
            <th scope="col" style="width: 23%">名前</th>
            <th scope="col" style="width: 14%">武器</th>
            <th scope="col">育成素材</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="chr in chrDataFiltered">
                <td>
                  <img :src="`./assets/imgs/chara/UI_AvatarIcon_${chr.name_img}.png`" :width="img_size" :height="img_size">
                </td>
                <td>
                  <div v-if="this.windowWidth>=992">
                    <div class="row align-items-center row-cols-auto g-1">
                      <div class="col p-0 m-0">
                        <img :src="`./assets/imgs/other/${chr.element_en}.png`" :width="img_size_sm" :height="img_size_sm">
                      </div>
                      <div class="col px-1 chr_name">{{ chr.name }}</div>
                    </div>
                    {{ chr.name_en }}
                  </div>
                  <div v-else-if="this.windowWidth>=576">
                    <div class="row align-items-center row-cols-auto g-1">
                      <div class="col p-0 m-0">
                        <img :src="`./assets/imgs/other/${chr.element_en}.png`" :width="img_size_sm" :height="img_size_sm">
                      </div>
                      <b class="col px-1">{{ chr.name }}</b>
                    </div>
                    <div style="font-size:12px;">{{ chr.name_en }}</div>
                  </div>
                  <div v-else>
                    <div class="chr_name_sm">
                      <img :src="`./assets/imgs/other/${chr.element_en}.png`" :width="img_size_sm" :height="img_size_sm">
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
                    <div v-for="(material,idx) in chr.materials" class="col px-0 px-lg-2">
                      <img v-if="material==='None'" src="/assets/imgs/other/genshin_avatar_bg.png" :width="img_size" :height="img_size">
                      <img v-if="idx!==4" :src="`./assets/imgs/material/UI_ItemIcon_${material}.png`" :width="img_size" :height="img_size">
                      <div v-else>
                        <img :src="`./assets/imgs/material/UI_ItemIcon_${material}.png`" :width="img_size" :height="img_size">
                        <div v-if="showWday" class="talent_wday">{{ talentIdToWday(material) }}</div>
                      </div>
                    </div>
                  </div>
                </td>
            </tr>
        </tbody>
    </table>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="filterModal" tabindex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="filterModalLabel">フィルタ</h5>
        </div>
        <div class="modal-body">
          <!-- 国 -->
          <div id="filterCountry">
            <div class="row row-cols-auto align-items-center">
              <h6 class="col m-0">国</h6>
              <button @click="checkAll(countries)" class="col btn btn-sm btnx-gv-blue py-0 round-group-left" style="font-size:12px;">全選択</button>
              <button @click="uncheckAll(countries)" class="col btn btn-sm btnx-gv-red py-0 round-group-right" style="font-size:12px;">全解除</button>
            </div>
            <div class="row row-cols-auto align-items-center gx-2 py-2">
              <div v-for="item,name,idx in countries" class="px-1">
                <input v-model="item.checked" type="checkbox" class="btn-check" :id="`btn-country-${idx}`" autocomplete="off" :checked="item.checked">
                <label class="btn btnx-clear-gv-gray" :for="`btn-country-${idx}`">{{ item.name }}</label>
              </div>
            </div>
          </div>
          <!-- 元素 -->
          <div id="filterElement">
            <div class="row row-cols-auto align-items-center">
              <h6 class="col m-0">元素</h6>
              <button @click="checkAll(elementals)" class="col btn btn-sm btnx-gv-blue py-0 round-group-left" style="font-size:12px;">全選択</button>
              <button @click="uncheckAll(elementals)" class="col btn btn-sm btnx-gv-red py-0 round-group-right" style="font-size:12px;">全解除</button>
            </div>
            <div class="row row-cols-auto align-items-center gx-2 py-2">
              <div v-for="item,name,idx in elementals" class="px-1">
                <input v-model="item.checked" type="checkbox" class="btn-check" :id="`btn-elem-${idx}`" autocomplete="off" :checked="item.checked">
                <label class="btn btnx-clear-gv-gray" :for="`btn-elem-${idx}`">{{ item.name }}</label>
              </div>
            </div>
          </div>
          <!-- 武器 -->
          <div id="filterWeapon">
            <div class="row row-cols-auto align-items-center">
              <h6 class="col m-0">武器</h6>
              <button @click="checkAll(weapons)" class="col btn btn-sm btnx-gv-blue py-0 round-group-left" style="font-size:12px;">全選択</button>
              <button @click="uncheckAll(weapons)" class="col btn btn-sm btnx-gv-red py-0 round-group-right" style="font-size:12px;">全解除</button>
            </div>
            <div class="row row-cols-auto align-items-center gx-2 py-2">
              <div v-for="item,name,idx in weapons" class="px-1">
                <input v-model="item.checked" type="checkbox" class="btn-check" :id="`btn-weapon-${idx}`" autocomplete="off" :checked="item.checked">
                <label class="btn btnx-clear-gv-gray" :for="`btn-weapon-${idx}`">{{ item.name }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btnx-gv-blue" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
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