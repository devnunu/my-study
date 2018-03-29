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