# 자바스크립트에서의 지연 평가

## 지연평가

- 지연 평가를 시작시키고 유지시키는 함수: map, filter, reject
- 지연 평가를 끝을 내는 함수: take, some, every, find

지연 평가를 테스트해보기 위해서 partial.js라는 라이브러리를 사용하도록 한다.

기본 예제

```javascript
var i = 0;

_.go(
    _range(100),
    _map(function (val) {
        console.log(++i);
        return val * val;
    }),
    console.log)

// (100) [0, 1, 4, 9...]
console.log(i);
```

기본 예제에서 filter 함수와 take 함수를 추가하자.

```javascript
var mi = 0;
var fi = 0;

_.go(
    _range(100),
    _map(function (val) {
        ++mi;
        return val * val;
    }),
    _.filter(function (val) {
        ++fi;
        return val % 2;
    }),
    _.take(5),
    console.log)

console.log(mi, fi);
```

이 코드에서 _를 L로 변경하면 지연평가가 손쉽게 일어나게 된다. 지연 평가를 사용하면 필요없는 루프를 돌지 않고 최적화된 결과를 만들어 낼 수 있다.

```javascript
var mi = 0;
var fi = 0;

_.go(
    _.range(100),
    L.map(function (val) {
        ++mi;
        return val * val;
    }),
    L.filter(function (val) {
        ++fi;
        return val % 2;
    }),
    L.take(5),
    console.log)

console.log(mi, fi);
```

지연 평가가 앞의 코드와 다른 점은, 앞의 코드는 모든 인자가 map을 돌고 나서 filter로 넘어가지만 지연 평가 코드는 map을 거친 결과값이 바로 filter-> take로 들어가게 된다. 그리고 take의 결과 값이 5개를 만족하게 되면 더이상 함수를 실행시키지 않는다.

지연 평가와 상반되는 기존의 방식을 '엄격한 평가'라고 한다.

## 함수형 자바스크립트 요약

- 함수를 되도록 작게 만들기
- 다형성이 높은 함수 만들기
- 상태를 변경하지 않거나 정확히 다루어 부수 효과를 최소화 하기
- 동일한 인자를 받으면 항상 동일한 결과를 리턴하는 순수 함수 만들기
- 복잡한 객체 하나를 인자로 사용하기 보다는 되도록 일반적인 값 여러개를 인자로 사용하기
- 큰 로직을 고차 함수로 만들고 세부 로직을 보조 함수로 완성하기
- 어느곳에서든 바로 혹은 미뤄서 실행할수 있도록 일반 함수이자 순수 함수 선언하기
- 모델이나 컬렉션 등 커스텀 객체보다는 기본 객체를 이용하기
- 로직의 흐름을 최대한 단방향으로 흐르게하기
- 작은 함수를 조합하여 큰 함수를 만들기
- 지연평가 + 병렬성 + 동시성의 특징을 가지고 있다.