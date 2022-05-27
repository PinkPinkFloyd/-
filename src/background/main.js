import hotReload from '@/utils/hotReload'
hotReload()
chrome.runtime.onInstalled.addListener(() => {
    alert(`本次更新:
    1.失去焦点自动保存日报，无需点击保存
    2.增加重置、发送二次确认框
    3.去除滚动条
    4.增加姓名必填项校验
    5.生成周报功能开发中，敬请期待`)
  });