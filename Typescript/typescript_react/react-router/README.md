# React-router

## React-router란?

- 일반적인 웹 페이지는 서버사이드 랜더링, 그러나 리액트는 클라이언트 사이드 랜더링을 한다. 따라서 주소가 다르더라도 같은 페이지를 출력하고, 이는 주소로 페이지의 유의미한 변경을 바랄수 없다는 뜻이기도 하다. 이것을 해결하기 위해서 만든것이 react-router이다.

- react-router란 이러한 맥락에서 주소값을 읽어와 필요한 데이터를 클라이언트 사이드에서 랜더링하기위해 만들어진 것이다. 즉, 특정 url로 접근했을때, 개발자가 선언한 방식대로 url을 해석하여 알맞는 react component를 랜더링해서 보여주게 된다.

- react-router는 facebook의 공식 라이브러리는 아니다. 그러나 react 관련 router중에 가장 많은 사용자를 보유하고 있다.

- 현재(2017년 08월) 기준으로 react-router v4가 최신 버전이며, 이전버전이 v3와는 API에서 큰 차이를 보인다. v3는 여전히 유지 보수가 진행중이다. 특징으로는 대부분의 동작이 react component로 이루어진다는 것이다.

- 따라서 react-router v4의 기본적인 동작 방식에 대해서 알아보도록하자.

## react-router 맛보기

- 우선 react-router를 설치하자. 그리고 상단에 모듈을 import 해준다.

 ```
 // install react-router
 npm install react-router-dom @types/react-router-dom
 
 // 상단에 추가
 import { BrowserRouter as Router, Route, Link } from 'react-route-dom'
 ```


- 또한 내부에 Router로 묶게 된다면, 어느곳에서나 Router를 사용할 수 있다. 아래에 코드는 Router 내부에 다시 <Route/>로 랜더 설정을 해주었다. `<Route path="/" render={()=><h3>home</h3>}/>`란, 루트 경로로 접근 했을때 home이라는 글자가 랜더 되게 만들어 주는 것이다.

- `<Route path="/intro" render={()=><h3>소개</h3>}/>`는 intro로 접근했을때, 소개라는 글자를 랜더링하게 만든다. 이와 같이  Route와 Router를 사용해서 경로에 다른 랜더링을 만들어 주는 것이다.

- 그러나 실제로 해당 경로로 접근하면 / 루트이건 /intro이건 `<h3>home</h3>`이 계속 출력된다. 이유는 설정된 / 값을 모두 만족하기 때문이다. 다시말해 /intro도 /값을 가지고 있기 때문에 home이 출력되는 것이다. 이를 막기위해 앞에 exact={ture} 키워드를 추가해 줘야한다. 이는 path와 정확히 매치 했을때만 동작하도록 설정하는 것이다.

- `<Route exact={true} path="/" render={()=><h3>home</h3>}/>`와 같이 수정할 수 있다.

- Link는 HTML의 앵커 태그와 비슷한 기능을 한다. Link에서 to="[경로]"를 설정하면 해당 텍스트를 클릭할 때, 페이지 리로딩 없이 랜더링이 가능하다. 실제로 react 확장 프로그램으로 해당 페이지를 보면 Link는 a태그로 랜더링 되어진다.

 ```
<Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <nav>
            <ul>
              <li><Link to="/">홈으로</Link></li>
              <li><Link to="/intro">소개</Link></li>
            </ul>
          </nav>
          <Route path="/" render={()=><h3>home</h3>}/>
          <Route path="/intro" render={()=><h3>소개</h3>}/>
        </div>
</Router>
 ```

 ## 컴포넌트 설명

 ### <Browser Router>

 - 다른 라우팅 컴포넌트(Link, Route)를 사용하기 위해서 기본적으로 감싸줘야함. 또한 오직 하나의 자식만을 가질수 있다.

 - 'window.history.pushState()'로 동작하는 라우터이다. 이것은 주소를 페이지 리로드 없이 갱신하는 함수이다. 우리나라에서는 브라우저 지원율이 조금 떨어지는 면이 있어서 이와 비슷하게 동작하는 HashRouter를 사용해도 된다. 이는 Hash(#/)로 동작하는 라우터이다.

 ### <Route>

 - path 속성으로 경로를 지정하고 render, component, children 속성으로 랜더링을 한다. render는 직접 구현하는것이고(인라인), component는 이미 만들어진 컴포넌트를 가져오는 것이다. 이때 앞서 살펴본것과 마찬가지로 지정한 경로가 완벽하게 매치되지않더라도, 경로를 포함만 해도 랜더링한다. 따라서 정확한 매치시 랜더링을 원한다면 exact={true} 옵션을 사용하자.

 - Route는 컴포넌트에 match, location, history속성을 넘긴다.

### <Link>

- `<a>`태그로 랜더링 되고 사용법도 비슷하지만, 실제동작은 a와 다르게 페이지 전체를 리로드 하지 않고, 필요한 부분만 리로드 하게된다.