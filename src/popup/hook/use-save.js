import { toRaw } from "vue";
export function useSave({initData, name}){
    const save = () => {
        chrome.storage.local.set({ 'initData': toRaw(initData)}, function() {
            console.log(initData);
          });
    }
    const setName = () => {
        chrome.storage.local.set({ "name": name.value}, function() {
            console.log(name);
          });
    }
    const getStorage = () => {
        chrome.storage.local.get(["initData", "name"], function(res) {
            if(res.initData){
            // 不能直接赋值，这样写会丢失响应式数组：inData = res.initData 
            for(const i in initData){
              initData[i].msgList.length = 0
              initData[i].msgList.push(...res.initData[i].msgList)
            }
            }
            if(res.name){
             name.value = res.name
            }
          });
    }
   return{
       save,
       setName,
       getStorage
   }
}