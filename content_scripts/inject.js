
/**
 * 获取当前网站名称
 * 该函数没有参数。
 * @return {string} 返回当前网站的名称。如果无法识别网站，则返回'unknow'。
 */
function getCurrentSiteName() {
  let name = 'unknow'; // 默认设置为未知网站
  try {
    const host = window.location.host; // 获取当前窗口的主机名和端口号

    // 使用Map存储域名与网站名称的映射关系，提高查找效率和代码的可维护性
    const siteMap = new Map([
      [/zhihu.com/, 'zhihu'],
      [/36kr.com/, '36kr'],
      [/jianshu.com/, 'jianshu']
    ]);

    // 遍历Map以查找匹配的网站名称
    for (const [regexp, siteName] of siteMap) {
      if (regexp.test(host)) {
        name = siteName;
        break; // 找到匹配项即停止查找
      }
    }
  } catch (error) {
    console.error("Error occurred while getting current site name:", error);
  }

  return name; // 返回识别出的网站名称
}

/**
 * 隐藏标题的函数
 */
function hideTitle() {
  const siteName = getCurrentSiteName()
  let dom = null
  let logo = null
  switch (siteName) {
    case 'zhihu':
      dom = document.querySelector('.QuestionHeader-title')
      break
    case '36kr':
      dom = document.querySelector('.kr-article h1.article-title') || document.querySelector('.kr-mobile-article .body-title')
      logo = document.querySelector('.logo')
      break
    case 'jianshu':
      dom = document.querySelector('h1._2zeTMs')
  }

  // 透明效果
  if (dom && dom.style) {
    dom.style.transition = 'all .5s'
    dom.style.opacity = .02
  }
  if (logo?.style) {
    logo.style.opacity = .02
  }
}

/**
 * 切换指定选择器的DOM元素的可见性
 * @param {string} selector CSS选择器，用于指定需要切换可见性的元素
 */
function switchDomHide(selector) {
  // 根据选择器查询DOM元素
  const targetDom = document.querySelector(selector)
  // 如果未找到元素，则提示并返回
  if (!targetDom) {
    alert('没有找到该元素')
    return
  }
  // 判断元素当前是否隐藏
  const isHide = targetDom.style.visibility === 'hidden'
  // 根据当前可见性状态切换元素的可见性
  targetDom.style.visibility = isHide ? 'visible' : 'hidden'
}

function main() {
  // 监听 action 的信息，做处理
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log('action发来贺电: ', request)
    const { selector } = request
    switchDomHide(selector)
  })
  hideTitle()
}

main()