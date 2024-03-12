
/**
 * 获取当前网站对应的CSS选择器列表。
 * 该函数会根据当前窗口的地址判断网站域名，并从预设的网站域名与选择器映射中找到对应的选择器列表。
 * 
 * @returns {Array} 返回一个包含CSS选择器的数组。
 */
function getSelectorList() {
  const host = window.location.host // 获取当前窗口的地址中的域名部分
  let list = []
  // 创建一个映射，将域名与对应的CSS选择器列表关联起来
  const siteMap = new Map([
    [/zhihu.com/, ['.QuestionHeader-title']],
    [/36kr.com/, ['.main-left', '.kr-article h1.article-title', '.kr-mobile-article .body-title', '.article-right-container']],
    [/jianshu.com/, ['h1._2zeTMs']]
  ])
  // 遍历映射，寻找与当前域名匹配的项
  for (const [regexp, selectorList] of siteMap) {
    if (regexp.test(host)) {
      list = selectorList; // 将找到的匹配项的选择器列表赋值给list
      break; // 找到匹配项即停止查找
    }
  }
  return list
}

/**
 * 隐藏标题的函数
 */
function hideTitle() {
  const list = getSelectorList()
  list.forEach((item) => {
    dom = document.querySelector(item)
    // 透明效果
    if (dom && dom.style) {
      dom.style.transition = 'all .5s'
      dom.style.opacity = .1

      dom.addEventListener('mouseover', (e) => {
        dom.style.opacity = 1
      })
      dom.addEventListener('mouseout', (e) => {
        dom.style.opacity = .1
      })
    }
  })
}

/**
 * 切换指定选择器的DOM元素的可见性
 * @param {string} selector CSS选择器，用于指定需要切换可见性的元素
 */
function switchDomHide(selector) {
  const targetDom = document.querySelector(selector)
  if (!targetDom) {
    alert('没有找到该元素')
    return
  }

  const isHide = targetDom.style.opacity === 0
  targetDom.style.opacity = isHide ? 1 : 0
}

function main() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log('action发来贺电: ', request)
    const { selector } = request
    switchDomHide(selector)
  })
  hideTitle()
}

main()