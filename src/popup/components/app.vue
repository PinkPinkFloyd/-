<template>
  <div class="popup_page" ref="content">
    <div class="popup_page_main">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="item.name" :name="key" v-for="(item,key) in initData" :key="key">
           <el-row v-for="(item2, index2) in item.msgList" :key="index2" style="margin-top:6px">
        <el-col :span="2" style="font-size:14px;padding:6px">
          <span>{{item2.index}}.</span>
        </el-col>
        <el-col :span="19">
          <el-input v-model="item2.msg" @blur="save()"> </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" :icon="Plus" circle  @click="add(key,item.msgList.length)">
             <el-icon>
               <plus></plus>
             </el-icon>
          </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="4" style="margin-top:10px;position:fixed;bottom:26px;text-align:center">
        <el-col :span="5">
      <el-input placeholder='姓名' style="width:100%" v-model="name" @blur="setName"></el-input>
       </el-col>
       <el-col :span="5">
      <ElButton @click="reset(key)" type="danger"  plain>重置</ElButton>
       </el-col>
       <el-col :span="7">
      <ElButton @click="send()" type="primary"  plain>发送日报</ElButton>
       </el-col>
       <el-col :span="7">
      <ElButton  type="success"  plain>生成周报</ElButton>
       </el-col>
      </el-row>
        </el-tab-pane>
      </el-tabs>
      <!-- <el-dialog v-model="dialogVisible" title="请输入姓名">
        <el-input v-model="name"></el-input>
      </el-dialog> -->
    </div>
  </div>
</template>

<script>
import {useFormData} from '../hook/use-formData'
import { useSave } from '../hook/use-save'
import { useSend } from '../hook/use-send'
import { useOption} from '../hook/use-option'
import { ElInput, ElButton } from "element-plus";
import { Plus } from '@element-plus/icons-vue'
import { onMounted } from 'vue-demi';
export default {
  components: { ElInput, ElButton, Plus },
  setup() {
    // 引入表单
    const {date, activeName, initData, name} = useFormData()
    // 引入谷歌缓存机制
    const {save, setName, getStorage} = useSave({initData, name})
    // 保存操作
    const {send} = useSend(save, initData, date, name)
    // 操作表单
    const {add, reset} = useOption(initData, save)
   onMounted(() => {
    //  读取缓存
    getStorage()
   })
    return {
      setName,
      date,
      initData,
      activeName,
      name,
      add,
      reset,
      send,
      save,
      getStorage
    };
  }
};
</script>

<style lang="less" scoped>
.popup_page {
  color: blue;
  .popup_page_main {
    width: 350px;
  }
}
</style>
