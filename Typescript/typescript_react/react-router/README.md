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

## React-router props

- 우선 라우트를 추가한다. Post라는 펑션 컴포넌트를 만들고 이를 랜더링하는 라우트이다. 여기서 postId값은 파라미터로 들어오게 된다. 이 컴포넌트를 react 크롬 확장 도구로 확인하면 post 내부에 3개의 값이 나온다. 바로 histroy, location, match 이다.

```
const Post = () => {
  return (
    <h3>POST</h3>
  );
};

<Route exact={true} path="/posts/:postId" component={Post}/>
```

### RouteComponentProps

- 위에서 추가한 값에따라 localhost:3000/posts/1 로 접근했다고 할때 1의 값을 얻으려고한다. 즉, postId값을 얻으려고한다. 우선 이를 위해 RouteComponentProps를 추가시키고, 컴포넌트의 인자로 props와 자료형 설정을 해주자.

- 여기서 props로 넘어온 값은 props.match.params로 찾아주면 된다.

- 다시 한번 강조 하는것은 RouteComponentProps가 사용되었다는 것과, 어떤식으로 전달/사용이 되었는지 살펴보는 것이다.

```
// Add RouteCompoenentProp
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from 'react-router-dom';


// define props and props type
const Post = (props:RouteComponentProps<{postId:string}>) => {
  return (
    <h3>POST {props.match.params.postId}</h3>
  );
};
```

### match

- match는 위에서 사용한것과 마찬가지로 <Route>의 'path'에 정의한 것과 매치된 정보를 담고 있다.

1. isExact : 실제로 일치하는 경로인지 boolean값으로 나옴
2. params: 파라미터로 설정한 값들
3. path : 라우트에 정의한 path가 그대로 넘어온다
4. url : 실제로 내가 위치한 경로

### location

- 브라우저의 window.location과 상당히 비슷함. url을 다루기 쉽게 쪼개서 가지고 있음

1. hash : #이 포함된 실제 주소
2. pathname : match의 url과 동일한 정보가 들어간다. 실제로 내가 위치한 경로
3. search : querystring이 들어간다

### history

- 브라우저의 window.history 객체가 들어간다. 주소를 임의로 변경하거나 되돌아갈 수 있다. 또한 주소를 변경하더라도 SPA 동작 방식에 맞게 일부 페이지만 랜더된다.

### 예제: 다음 포스트로 넘기기

```
const Post = (props:RouteComponentProps<{postId:string}>) => {
  function goNextPost(){
    const nextPostId = +props.match.params.postId + 1;
    props.history.push(`/posts/${nextPostId}`);
  }
  
  return (
    <div>
      <h3>POST {props.match.params.postId}</h3>
      <button onClick={goNextPost}>Next Post</button>
    </div>
  );
};
``` 

### query string 파싱

- 에를들어 localhost:3000/posts/22?body=리액트라우터 라는 값이 들어왔을때 이를 파싱 하는 예제이다. 쿼리 스트링이 props.location.search로 들어오기 때문에 이 값을 랜더링해서 올바른 값이 들어오는지 부터 확인한다. 그리고 URLSearchParams 객체와 .get 메소드를 이용해서 파싱을 한다. get 내부에는 원하는 키값을 넣어준다.

- URLSearchParams객체는 브라우저 지원률이 떨어지기 때문에 파싱하는 오픈소스를 많이 이용한다.  

```
const Post = (props:RouteComponentProps<{postId:string}>) => {
  function goNextPost(){
    const nextPostId = +props.match.params.postId + 1;
    props.history.push(`/posts/${nextPostId}`);
  }
  
  return (
    <div>
      <h3>POST {props.match.params.postId}</h3>
      <button onClick={goNextPost}>Next Post</button>
      <p>{new URLSearchParams( props.location.search).get('body')}</p>
    </div>
  );
};
```

## React-router ETC.

### 중첩 라우팅

- 다음과 같이 중첩된 라우팅을 구현할 수 있다. 

```
// 우선 app 내부의 라우터를 다음과 같이 변경한다.
// 컴포넌트 추가를 위해서 PostList 컴포넌트를 생성해 주어야한다.
<Route path="/posts" component={PostList}/>


// PostList 컴포넌트, /posts로 접근할 경우 PostList 라는 텍스트가 랜더링 된다.
// /posts/[number] 값으로 접근할 경우 Post 컴포넌트가 랜더링 된다.
const PostList = (props:RouteComponentProps<{}>) => {
  return (
    <div>
      <Route exact={true} path={`${props.match.url}`} render={() => <h3>PostList</h3>} />
      <Route path={`${props.match.url}/:postId`} component={Post} />
    </div>
  );
};
```

### Switch 모듈

- 우리가 실제로 사용하는 switch-case 문과 비슷하다. 이를 사용하는 이유는 중첩 라우팅을 좀더 간소화하고 정밀하게 구조화 시키기 위함이다. switch 모듈에 부합하는 라우터만 랜더링하게 된다. 방금 본 중첩 라우팅은 Switch를 사용하지 않은 예제이다. 이때의 문제점은 잘못 코딩하다가 두개의 중첩된 컴포넌트가 랜더링 된다는 것이다.

- 사용방법은 간단하다 Swtich로 라우터를 감싸기만 하면 된다. 이때 주의 할 점은 Switch는 접근하는 url과 매치 되는 첫번째 Route만 랜더한다. 만약 아무 path도 지정하지 않으면 해당 라우트에서 Switch문이 걸리게 된다. 

### Switch 예제 - 404 페이지 만들기

```
// 우선 Switch를 import 시켜준다.
import { BrowserRouter as Router, Route, Link, RouteComponentProps, Switch } from 'react-router-dom';


// notFound 펑션 컴포넌트
const notFound = () => {
  return (
    <h3>Not Found</h3>
  );
};

// Switch 문으로 감싸준다.
<Switch>
    <Route exact={true} path="/" render={()=><h3>home</h3>}/>
    <Route path="/intro" render={()=><h3>소개</h3>}/>
    <Route path="/posts" component={PostList}/>
    <Route component={notFound}/>
</Switch>

```

### Redirect

- 말그대로 Redirect를 하는 컴포넌트, 마운트 되면 지정한 경로로 이동함. 기본적으로 현재 주소를 교환하는 replace 방식이다. replace 방식은 history에 남지 않는다. 반대로 push는 history에 남는다. location 객체를 통해 리다이렉트 할수 있음.

### Redirect 예제 - admin

- 조건에 부합하지 못하면 루트 페이지로 redirect 되는 예제이다.

```
// Redirect를 import 해준다
import { BrowserRouter as Router, Route, Link, RouteComponentProps, Switch, Redirect } from 'react-router-dom';

// Admin 페이지를 위한 컴포넌트 생성
// 만약 isAdmin이 false라면 루트(홈) 페이지로 redirect된다.
const Admin = () => {
  const isAdmin = true;
  return isAdmin 
  ? <h3>Admin</h3>
  : <Redirect to="/"/>
  ;
};

<Switch>
    <Route exact={true} path="/" render={()=><h3>home</h3>}/>
    <Route path="/intro" render={()=><h3>소개</h3>}/>
    <Route path="/posts" component={PostList}/>
    <Route path="/admin" component={Admin}/>
    <Route component={notFound}/>
</Switch>
```

### Old path 예제

- 예전 경로에 대한 redirect도 가능하다. 예를들어 예전에는 about으로 사용하던 페이지의 경로가 intro로 변경되었다면 redirect를 사용하여 경로 재설정을 하면 된다. 이때 from 은 예전 주소, to는 현재 주소를 사용한다. 주의할 점은 redirect from 은 항상 switch 아래 있어야 한다는 것이다. 

```
<Switch>
    <Route exact={true} path="/" render={()=><h3>home</h3>}/>
    <Route path="/intro" render={()=><h3>소개</h3>}/>
    <Redirect from="/about" to="/intro"/>
    <Route path="/posts" component={PostList}/>
    <Route path="/admin" component={Admin}/>
    <Route component={notFound}/>
</Switch>
```

### <NavLink>

- 조금 특별한 Link이다. to에 지정한 path와 URL이 매칭되는 경우 특별한 클래스나 스타일을 지정할 수 있다. 이는, 네이게이션에 많이 사용되는 액티브 스타일을 적용하기 위한 컴포넌트이다.

- activeStyle이나 activeClassName로 특정한 클래스나 스타일 지정이 가능하다.

```

// 마찬가지로 NavLink를 import 해준다
import { BrowserRouter as Router, Route, Link, RouteComponentProps, Switch, Redirect, NavLink } from 'react-router-dom';

```

### 추가 사항

- 이것 이외에도 리액트 라우터에 들어가있는 컴포넌트들이 많은데 위의 내용들은 리액트 라우터를 사용하는 필수적인 컴포넌트들이다.

- https://reacttraining.com/react-router/web/guides/philosophy 웹 개발에 대한 레퍼런스는 다음을 참조하도록하자