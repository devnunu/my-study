# VS Code and Sass Configurations

## SCSS is?

- CSS를 작성하기 위한 작고 가벼운 언어, Sass와 SCSS가 있다
    1. Sass: SCSS를 작성하는데 구조적 차이가 있고, 번거롭고 복잡할수 있다.
    2. SCSS: 기존의 CSS와 유사하기 떄문에 친근하게 느껴지고 배우기쉽다.
- 컴파일을 통해 CSS 파일로 변환된다.


## variables

- SCSS에서는 변수를 생성할 수 있다
- 변수는 $을 붙여 구분되어진다.
- 변수를 사용하여 중복 코드의 제거가 가능
- 변수 이름은 영문, 숫자, 언더스코어, 바로 사용가능하며 숫자로 시작할 수 없다.

```
// scss 파일

$bg-color: #f00

body {
    background-color:$bg-color
}

#box {
    background-color:$bg-color
}

```

## nest

- css를 포함관계로 작성할수 있게 해주는 문법

```
#box {
    background-color:$bg-color
    a {
        font-size:20px;
    }
}
```

- &는 상위에 있는 요소를 지칭한다.

```
#box {
    background-color:$bg-color
    & > a {
        font-size:20px;
    }
}
```

## 명명법
- 상위 구조의 이름을 따서 짓도록 한다

```
<div class='box1'>
    <div class='box1-title'>
        title
    </div>
</div>
```

- 이렇게 작성했을때 다음과 같은 Scss코딩을 사용할수 있다.

```
.box1 {
    &-title {
        font-size : 20px;
    }
}
```

## mixin

- 여러가지 css 속성을 하나로 묶을수 있음

```
font-size:
background-color:

@mixin fontSizeBgColor($fontSize, $bgColor) {
    font-size: $fontSize;
    background-color: $bgColor;
}

.box1 {
    @include fontSizeBgColor(40px, #ffcccc);
}

.box2 {
    @include fontSizeBgColor(30px, #ffffcc);
}
```

- default 값이 들어갈 수도 있다.

```
@mixin fontSizeBgColor($fontSize:20px, $bgColor:#0f0) {
    font-size: $fontSize;
    background-color: $bgColor;
}
```

## extends

- %를 붙여서 선언한다
- @extends로 불러온다.
- mixin과 다른점은, mixin은 속성은 같은데 값이 다를때, extends는 완전히 같은 속성과 값을 사용할때 쓴다.

```
%boxShape {
    border-radius:10px;
    border:1px solid black;
}

.box1 {
    @extends %boxShape
}

.box2 {
    @extends %boxShape
}

```


## partial

- 파일을 별도로 저장하고 불러와서 사용하는 방법
- 믹스인 등과 같은 기능은 범용적으로 사용하기 위하여 partial과 같은 방법을 사용함
- 이러한 파일은 _로 시작하도록하자, 왜냐하면 _로 시작하는 파일의 경우 컴파일이 되지않기 떄문이다
- mixin등은 굳이 컴파일 할 필요가 없으므로, **_로 시작**
- 불러올떄는 _를 제외해도 된다.

```
// [_mixin.scss]
@mixin fontSizeBgColor($fontSize:20px, $bgColor:#0f0) {
    font-size: $fontSize;
    background-color: $bgColor;
}

// [main.scss]
@import "mixin";
```

## if문

- 믹스인과 if를 결합한 코드를 만들어본다

```
@mixin textAndBgColor($textColor, $bgColor) {
    color : $textColor,
    background-color : $bgColor
}

@mixin theme($mood) {
    @if $mood == 'light' {
        @include textAndBgColor(#333, #ff0)
    }
    @else if $mood == 'dark' {
        @include textAndBgColor(#fff, #000)
    }
    @else {
        @include textAndBgColor(#f00, #aaa)
    }
}

.box1 { 
    @inclue theme('light')
}
.box2 { 
    @inclue theme('dark')
}
.box3 { 
    @inclue theme('haha')
}
```

# 미디어 쿼리와 믹스인

- 다음과 같이 @content를 사용해서 미디어쿼리 작성이 가능
```

@mixin mq(){
    @media screen and (min-width:1200px){
        @content
    }
}


@include mq() {
  // css 관련 코드  
};

```

- 또한 if 문을 사용하면 여러개의 미디어 쿼리를 사용할 수 있다.
```
@mixin mq($screen-width){
    @if $screen-width == 'desktop-big' {
        @media screen and (min-width:1200px){
            @content
        }
    }
    @else if $screen-width == 'tablet' {
        @media screen and (min-width:601px) and (max-width:899px){
            @content
        }
    }
    @else if $screen-width == 'phone' {
        @media screen and (max-width:600px){
            @content
        }
    }
}


@include mq('tablet') {
  // css 관련 코드  
};
```

## css의 단위

- px, em, rem, vh, wh가 있다.
- px는 절대적 단위, 나머지는 모두 상대적 단위이다.

1. em
    - 해당 엘리먼트의 font-size를 기준으로한다
    - font-size:20px이라면 1em도 20px이 된다.
2. rem
    - root의 font-size를 기준으로 한다.
    - html의 font-size가 16px이라면 16px이 1rem이다.
    - html의 폰트 크기를 변경하는것 만으로 모바일/데스크탑에서 유동적으로 글자 크기가 변경 가능하다.
    - ex) html의 폰트 사이즈가 font-size:62.5% -> 데스트탑에서는 10px이 된다
3. vw(viewport width),vh(viewport height)
    - 전체 뷰 포트의 넓이, 높이이다.

## 이외의 css 기법

### 백그라운드 이미지 그라디언트 처리

```
bakground-image: linear-gradient(
    to right,#285a91 0%, #1f9cfd 100%
), url('../../image/photo.png')
// 자연스럽게 그라디언트와 이미지를 합성시키는 속성
background-blend-mode: multiply;
```
- 또는 구글에 css gradient generator라고 검색하면 제너레이팅 가능

### 애니메이션

- 애니메이션은 keyframes로 정의한다
- 사용하기 위해서는 적용되어질 엘리먼트 내부에 animation-name으로 불러온다
- 해당 애니메이션의 지속시간은 animation-duration을 사용한다.
- keyframes는 지속시간에 대한 비율로 실행된다
- 예를 들어 지속시간이 5초 이면 10%는 5초의 10%에 해당하는 시간에서 속성 적용을 정의한다.
- animation-fill-mode:forwards를 정의하면 100%때 정의된 작성된 속성을 유지한다.
- animation-fill-mode:backwards 정의하면 delay 시간동안 0%에 해당하는 속성이 적용된다.
- animation-fill-mode:both는 forwards, backwards를 모두 적용한다..
- animation-delay는 선언된 시간만큼 애니메이션 시작 시간을 늦춘다.

```
@keyframes ani1 {
0% {
    opacity: .2;
    transform: translate(100px, -30px);
}
50% {
    opacity: 1;
}
100% {
    opacity: 0.5;
}
}

.example1 {
    animation-name:ani1;
    animation-duration:5s;
    animation-fill-mode:forwards;
    animation-iteration-count: 3;
}
```

### float의 부모가 자식을 인식하도록 처리

```

// html
<div className={'box-parent'}>
    <div class='box'></box>
    <div class='box'></box>
    <div class='box'></box>
</div>

// css
.box {
    width:200px;
    height:200px;
    float: left;
}

.box-parent::after {
    content:'';
    display:block;
    clear:left;
}

```

- float 사용시 이름 그대로 '부유'하게 되므로 부모 엘리먼트가 자식 엘리먼트를 감지하지 못한다.
- 따라서 별도의 div를 만들어 float를 clear해준다.
- 또한 아래와 같이 sass에서는 mixin으로 생성 가능

```
@mixin clearfix(){
    &::after {
    content:'';
    display:block;
    clear:left;
}

@include clearfix();
```

### 특정 값을 제외한 값에 대해 이미지 적용

- not을 사용하면 해당 엘리먼트가 아닌 것에 대한 지정이다.
- 아래는 마지막 엘리먼트를 제외하고 margin-left를 적용하는 예제이다

```
// last-child가 아닌 것들을 지정함
.box {
    &:not(:last-child) {
        margin-left:20px;
    }
}
```


### 다단 나누기

- column-count를 사용하면 다단을 나눌수 있다.
- column-gap은 다단 사이의 간격을 설정한다.
- column-rule-style는 다단 사이 구분자의 스타일이다.
- column-rule-width는 구분자의 두께이다.
- column-rule-color는 구분자의 색이다.

```
// css
p {
    column-count:3;
    column-gap:20px;
    column-rule-style:dashed;
    column-rule-width:2px;
    column-rule-color:white;
}
```

### 텍스트 컬러에 그라데이션 처리

```
    // 그라데이션 처리
    bankground: linear-gradient(left,#091920,#a9a9b);
    // 텍스트로 그라데이션을 옮김
    -webkit-background-clip:text;
    // 텍스트 컬러를 투명으로
    -webkit-text-fill-color:transparent
```

### 1~ 으로 반복되는 동일한 이름의 엘리먼트 스타일 지정

- 아래의 코드는 id 속성이 etc-로 시작하는 모든 엘리먼트에 대한 지정이다.

```
    <div id='section-etc'>
        <div id='etc-1'>
            //...
        </div>
        <div id='etc-2'>
            //...
        </div>
        <div id='etc-3'>
            //...
        </div>
    </div>
    #section-etc {
        [id^="etc-"] {

        }
    }
```

- 또는 다음과 같이 src 속성이 'image'로 시작하는 태그를 지정할 수도 있다.

```
    #section-etc {
        [src^="image1/"] {

        }
    }
```