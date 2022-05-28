import axios from "axios";
import { ElMessageBox, ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message-box.css";
import "element-plus/theme-chalk/el-message.css";

export function useSend(save, initData, date, name) {
  const send = async type => {
    save();
    if (!name.value) {
      return ElMessage({
        showClose: true,
        message: "请填写姓名！",
        type: "error"
      });
    }
    await ElMessageBox.confirm("确认发送？", "警告", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    });
    axios
      .get("http://10.0.30.102:80/hello", {
        params: {
          data: JSON.stringify(initData),
          info: {
            date: date.value,
            name: name.value,
            type
          }
        },
        responseType: "blob",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log(res);
        const time = new Date();
        const year = time.getFullYear();
        const mounth = time.getMonth() + 1;
        const date = time.getDate();
        const today = `${year}年${mounth}月${date}日`
        const blobContent = new Blob([res.data], { type: "application/xlsx" });
        const blobUrl = window.URL.createObjectURL(blobContent);
        const eleLink = document.createElement("a");
        eleLink.download = `周报-${name.value}-${today}.xlsx`;
        eleLink.style.display = "none";
        eleLink.href = blobUrl;
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
      });
  };
  return {
    send
  };
}
