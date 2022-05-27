import axios from "axios";
import {
  ElMessageBox,
  ElMessage
} from "element-plus";
import 'element-plus/theme-chalk/el-message-box.css';
import 'element-plus/theme-chalk/el-message.css';
export function useSend(save, initData, date, name) {
  const send = async (type) => {
    save()
    if (!name.value) {
      return ElMessage({
        showClose: true,
        message: '请填写姓名！',
        type: 'error'
      })
    }
    await ElMessageBox.confirm('确认发送？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
    axios
      .get("http://10.0.30.102:80/hello", {
        params: {
         
          data: JSON.stringify(initData),
          info: {
            date: date.value,
            name: name.value,
            type,
          }
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        console.log(res);
      });
  }
  return {
    send
  }
}
