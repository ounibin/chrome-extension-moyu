

/**
 * 向当前活动的标签页发送一个选择器字符串，用于选择页面中的元素。
 * @param {HTMLElement} rowDom - 包含输入框的DOM元素，输入框中输入的是选择器字符串。
 */
function tellPageSelector(rowDom) {
  // 在rowDom下查找第一个input元素
  const input = rowDom.querySelector('input')
  // 获取input元素的值，即用户输入的选择器字符串
  const selectorStr = input.value
  // 如果没有输入选择器，则警告用户并返回
  if (!selectorStr) {
    alert('请输入选择器')
    return
  }

  // 查询当前活动的标签页
  chrome.tabs.query({ active: true }, function (tabs) {
    // 获取标签页的ID，如果没有活动的标签页，则tabId为null
    const tabId = tabs.length > 0 ? tabs[0].id : null
    const req = {
      selector: selectorStr // 准备发送的选择器信息
    }
    // 向当前活动的标签页发送消息，包含选择器信息
    chrome.tabs.sendMessage(tabId, req, function (response) { })
  })
}


/**
 * 生成一个包含输入框和按钮的一行DOM元素
 * @param {number} i - 行的索引，用于可能的数据绑定等，此版本未使用
 * @returns {HTMLElement} - 返回创建好的包含输入框和按钮的div元素
 */
function genOneRowDom(i) {
  // 创建行容器
  const rowDiv = document.createElement('div')
  rowDiv.className = 'row'

  // 创建输入框，并设置占位符和初始值
  const inputDom = document.createElement('input')
  inputDom.setAttribute('placeholder', '请输入dom选择器')
  inputDom.setAttribute('value', '')

  // 创建按钮，并添加点击事件监听器
  const btn = document.createElement('button')
  btn.innerText = '隐藏/显示'
  btn.addEventListener('click', () => {
    tellPageSelector(rowDiv)
  })

  // 将输入框和按钮添加到行容器中
  rowDiv.appendChild(inputDom)
  rowDiv.appendChild(btn)
  return rowDiv
}

// 使用js循环插入dom列表


window.onload = () => {
  for (let index = 0; index < 10; index++) {
    const element = genOneRowDom(index)
    document.body.appendChild(element)
  }

}