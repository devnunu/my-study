# 파이썬 기초 스크래핑(3)


## BeautifulSoup 사용법 및 간단 웹 파싱 실습


### 실습내용

1. 다음 금융 시가총액 상위 종목 가져오기
2. 네이버 금융 Top 10 종목 가져오기
3. 인프런 추천 강좌 10개 가져오기

### 다음 금융 시가총액 상위 종목 가져오기

- 다음 금융 페이지에 접속(http://finance.daum.net)
- 시가총액은 topMyListNo1 이라는 id를 가진 ul 태그 아래에 있음

```
import urllib.request as req

url = "http://finance.daum.net/"
res = req.urlopen(url).read()
soup = BeautifulSoup(res, "html.parser")

# print('soup',soup.prettify())

top = soup.select("ul#topMyListNo1 > li")

# enumerate를 사용하면 인덱스를 추가할 수 있다
# enumerate의 두번째 인자는 시작 인덱스이다
for i,e in enumerate(top, 1):
    print(i,",", e.find("a").string," : ", e.find("span").string)
```

### 네이버 금융 Top 10 종목 가져오기
- 네이버 금융 (http://finance.naver.com)에 접속
- Top 종목의 상한가 리스트는 테이블로 만들어져있음
- siselist_tab_0 번이 탑 종목 상한가 리스트임

```
from bs4 import BeautifulSoup
import urllib.request as req

url = "http://finance.naver.com/sise/"
res = req.urlopen(url).read()
soup = BeautifulSoup(res, "html.parser")

# print('soup',soup.prettify())

top10 = soup.select("#siselist_tab_0 > tr")

# 인덱스가 불규칙하므로 외부에 선언함
i = 1

# a 태그가 없다면 NONE이 반환됨
for e in top10:
    if e.find("a") is not None: 
        print(i,",",e.select_one(".tltle").string)
        i += 1
```


### 인프런 추천 강좌 10개 가져오기
- 인프런은 부트스트랩 기반으로 만들어졌다
- 부트스트랩은 