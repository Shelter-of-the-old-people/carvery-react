
import './App.css'

function App() {
  
  return (
    <>
      <div class="gnb">
        <div class="logo-frame">
          <div class="logo">
            <a href="/">Carvery</a>
          </div>
        </div>
        <div class="menu-frame">
          <div class="menu"><div class="menu-text"><a href="">날씨</a></div></div>
          <div class="menu"><div class="menu-text"><a href="">세차장</a></div></div>
          <div class="menu"><div class="menu-text"><a href="">소식</a></div></div>
          <div class="menu"><div class="menu-text"><a href="">세차용품</a></div></div>
          <div class="menu"><div class="menu-text"><a href="">지도</a></div></div>
        </div>
        <div class="search-bar-frame">
          <form class="gnb-search-bar-frame" action="" method="get">
            <input class="search-input" type="text"/>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
