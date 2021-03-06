import {
  ElMessageBox
} from "element-plus";
import 'element-plus/theme-chalk/el-message-box.css';
export function useOption(initData, save) {
  const add = (key, length) => {
    if (length > 4) {
      ElMessageBox('卷王收手吧，别写了!!!')
      return
    }
    initData[key].msgList.push({
      msg: "",
      index: length + 1
    })
  }
  const del = (key, index) => {
    console.log(key);
    console.log(index);
    initData[key].msgList.splice(
      index, 1
    )
  }
  const reset = async (key) => {
    await ElMessageBox.confirm('确认重置？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
    initData[key].msgList.length = 0
    initData[key].msgList.push({
      msg: "",
      index: 1
    })
    save()
  }

  return {
    add,
    reset,
    del
  }
}
