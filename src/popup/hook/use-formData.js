import { ref, reactive } from "vue"
export function useFormData(){
    // 获取今日周几
    const date = ref('')
    date.value = new Date().toString().slice(0, 3)
    // 默认为今天的tab页
    const activeName = date.value
    // 初始化表单数据
    const initData = reactive({
        Mon: {
        msgList: [{msg: "", index: 1}],
        name: '星期一'
        },
        Tue: {
        msgList: [{msg: "", index: 1}],
        name: '星期二'
        },
        Wed: {
        msgList: [{msg: "", index: 1}],
        name: '星期三'
        },
        Thu: {
        msgList: [{msg: "", index: 1}],
        name: '星期四'
        },
        Fri: {
        msgList: [{msg: "", index: 1}],
        name: '星期五'
        },
        Sat: {
        msgList: [{msg: "", index: 1}],
        name: '星期六'
        }
      })
      const name = ref('')
    return{
        date,
        activeName,
        initData,
        name
    }
}