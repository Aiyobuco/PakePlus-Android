window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })
(function(){
  // 通用广告选择器，可继续追加
  const adSelectors = [
    '.ad', '[class*="ad-"]', '[class*="_ad"]', '[id*="ad"]',
    '.banner','.popup','.advertisement','.ads-box'
  ];

  function removeAds(){
    adSelectors.forEach(sel=>{
      document.querySelectorAll(sel).forEach(el=>{
        if(el){
          el.style.display='none';
          el.remove();
        }
      })
    })
  }
  // 首次执行
  document.addEventListener('DOMContentLoaded',removeAds);
  removeAds();

  // 监听页面新增DOM，拦截动态加载广告
  const observer = new MutationObserver((mutations)=>{
    removeAds();
  });
  observer.observe(document.body,{childList:true,subtree:true});
})();
