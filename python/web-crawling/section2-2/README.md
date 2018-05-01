# 파이썬 기초 스크래핑(2)

##  BeautifulSoup 사용법 및 간단 웹 파싱 기초

### 파서(parser)
- html의 구성 요소를 가져와 원하는 정보를 파싱함
- BeautifulSoup이 없었을때는 jave등의 언어로 복잡하게 구현됨
- HTML: 태그, 요소, 속성 등

### find, find-all
- find는 가장 상위의 태그를 가져온다
- find-all은 모든 태그를 가져온다
- find-all의 인자로 limit를 걸수 있다
(ex) soup.find_all('a', limit=3)
- find-all의 인자로 해당 스트링만 가져올수 있다.(보통 정규 포현식 사용)
(ex) soup.find_all(string=["naver","google"])

```
html = """
<html>
    <body>
        <ul>
            <li><a href="http://www.naver.com">naver</a></li>
            <li><a href="http://www.daum.net">daum</a></li>
            <li><a href="http://www.daum.com">daum</a></li>
            <li><a href="http://www.google.com">google</a></li>
            <li><a href="http://www.tistory.com">tistory</a></li>
        </ul>
    </body>
</html>
"""

soup = BeautifulSoup(html, 'html.parser')

# 해당 태그를 한번에 가져옴
links = soup.find_all("a")
# print('links',type(links))

# 조건부로 string이 daum 인 a 태그만 가져온다.
a = soup.find_all("a", string="daum")
print('a',a)
# limit 선택으로 결과물 갯수의 제한을 걸수 있음
b = soup.find_all("a",limit=2)
print('b',b)
# 특정 내용을 가진 것만 가져올수 있음
c = soup.find_all(string=["naver","google"])
print('c',type(c))

# 한번에 가져온 태그는 반복문으로 순환가능
for a in links:
    # print('a', type(a),a)
    href = a.attrs['href']
    txt = a.string
    # print('txt >> ', txt, 'href >>', href)


```

### CSS 선택자
- 실제로 파싱을 위해 태그보다 CSS 선택자를 많이 사용한다.
- CSS 선택자를 사용하면 정확한 선택이 가능하다

```
from bs4 import BeautifulSoup

html = """
    <html>
        <body>
            <div id="main">
                <h1>강의목록</h1>
                <ul class="lecs">
                    <li>java 초고수 되기</li>
                    <li>파이썬 기초 프로그래밍</li>
                    <li>파이썬 머신러닝 프로그래밍</li>
                    <li>안드로이드 블루투스 프로그래밍</li>
                </ul>
            </div> 
        </body>
    </html>
"""

soup = BeautifulSoup(html, "html.parser")
# 선택자 사용 예제
h1 = soup.select("div#main > h1")

# 리스트가 반환값이다
print('h1', type(h1))
# print(h1.string)
list_li = soup.select('div#main > ul.lecs > li')

# 리스트는 for 문으로 순회해야함
for li in list_li :
    print(li.string)
```

### css 선택자 활용 예제 모음
- food-list.html을 파싱하는 예제이다
food-list.html
```
<html>
<body>
    <div id="foods">
        <h1>안주 및 주류</h1>
        <ul id="fd-list">
            <li class="food hot" data-lo="ko">닭도리탕</li>
            <li class="food" data-lo="jp">돈까스</li>
            <li class="food hot" data-lo="ko">삼겹살</li>
            <li class="food" data-lo="us">스테이크</li>
        </ul>
        <ul id="ac-list">
            <li class="alcohol" data-lo="ko">소주</li>
            <li class="alcohol" data-lo="en">맥주</li>
            <li class="alcohol" data-lo="ko">막걸리</li>
            <li class="alcohol high" data-lo="cn">양주</li>
            <li class="alcohol" data-lo="ko">동동주</li>
        </ul>
    </div>
</body>
</html>
```

python parsing example
```
from bs4 import BeautifulSoup

fp = open("food-list.html",encoding="utf-8")
soup = BeautifulSoup(fp, "html.parser")

# 모두 '양주'라는 텍스트 값을 얻기위한 스텝
print("1", soup.select_one("li:nth-of-type(8)").string)
print("2", soup.select_one("#ac-list > li:nth-of-type(4)").string)
print("3", soup.select("#ac-list > li[data-lo='cn']")[0].string)
print("4", soup.select("#ac-list > li.alcohol.high")[0].string)

# param을 사용하여 데이터를 가져옴
param = {"data-lo": "cn", "class": "alcohol"}
print("5", soup.find("li",param).string)
print("6", soup.find(id="ac-list").find("li",param).string)

for ac in soup.find_all("li") :
    if ac['data-lo'] == 'us' :
        print('data-lo==us', ac.string)
```


### 함수를 이용한 활용 예제

cars.html
```
<ul id="cars">
    <li id="ge">Genesis</li>
    <li id="av">Avante</li>
    <li id="so">Sonata</li>
    <li id="gr">Grandeur</li>
    <li id="tu">Tucson</li>
</ul>
```

python parsing example
```
from bs4 import BeautifulSoup

fp = open("cars.html",encoding="utf-8")
soup = BeautifulSoup(fp, "html.parser")

# 일반적인 파이썬 함수
def car_func(selector):
    print("car_func", soup.select_one(selector).string)

# Grandeur를 출력하기 위한 코드들
car_func("#gr")
car_func("li#gr")
car_func("ul > li#gr")
car_func("#cars > #gr")
car_func("li[id='gr']")

# 람다식
car_lamda = lambda q : print("car_lambda", soup.select_one(q).string)

# 람다식 코드들
car_lamda("#gr")
car_lamda("li#gr")
car_lamda("ul > li#gr")
car_lamda("#cars > #gr")
car_lamda("li[id='gr']")

print("car_func", soup.select("li")[3].string)
print("car_func", soup.find_all("li")[3].string)
```