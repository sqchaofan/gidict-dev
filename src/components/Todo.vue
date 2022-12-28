<template>
    <div class="container-xl">
        <h3>やることリスト</h3><hr>
        <ul>
            <li>
                素材->キャラ早見表作成
            </li>
            <li>
                イベントとかバージョン更新までのカウントダウンするやつ作成
            </li>
            <li class="completed">
                各種フィルタ機能追加
            </li>
            
        </ul>
    </div>
</template>

<style lang="scss">
.completed{
    color: map-get($gvdark-colors,gray);
    text-decoration: line-through;
}
</style>