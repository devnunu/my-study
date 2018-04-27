# 파이썬 기초 스크래핑(3)

## BeautifulSoup 사용법 및 간단 웹 파싱 실습

### 3vs란?
- volume 데이터의 양
- variety 데이터의 다양성
- velocity 데이터의 속도

### 실습내용

1. 다음 금융 시가총액 상위 종목 가져오기
2. 네이버 금융 Top 10 종목 가져오기
3. 인프런 추천 강좌 10개 가져오기
4. 네이버에서 원하는 사진(이미지) 한 번에 다운로드 받기
5. 인프런 추천 강좌 이미지 한 번에 다운로드 & 제목 텍스트 파일 출력하기

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
- 따라서 이에따른 구조 파악을 정확하게 해야한다.

```
from bs4 import BeautifulSoup
import urllib.request as req
import urllib.parse as rep

base = "https://www.inflearn.com/"
# 한글을 유니코드로 만들어줌
quite = rep.quote_plus("추천-강좌")

url = base + quite

res = req.urlopen(url).read()
soup = BeautifulSoup(res, "html.parser")

recommand = soup.select("ul.slides")[0]
for e in recommand :
    print(e.select_one("h4.block_title > a").string)
```

### 네이버에서 원하는 사진(이미지) 한 번에 다운로드 받기
- 네이버의 검색 url을 기반으로 이미지를 다운받음
- imageDown 폴더를 생성
```
from bs4 import BeautifulSoup
import urllib.request as req
import urllib.parse as rep

import os

base = "https://search.naver.com/search.naver?where=image&sm=tab_jum&query="
quote = rep.quote_plus("사나")
url = base + quote

res = req.urlopen(url)
savePath = "/Users/eunwoo/Desktop/imageDown"

# 폴더 생성과 에러 처리 코드
try:
    if not (os.path.isdir(savePath)):
        os.makedirs(os.path.join(savePath))
except OSError as e:
    if e.errno != errno.EEXIST:
        print("폴더 만들기 실패!")
        raise

soup = BeautifulSoup(res, "html.parser")

img_list = soup.select("div.img_area > a.thumb._thumb > img")

for i, img_list in enumerate(img_list,1):
    # print(img_list['data-source'])
    fullFileName = os.path.join(savePath, savePath+'/'+str(i)+'.jpg')
    req.urlretrieve(img_list['data-source'], fullFileName)

print("다운로드 완료")
```

# 인프런 추천 강좌 이미지 한 번에 다운로드 & 제목 텍스트 파일 출력하기

from bs4 import BeautifulSoup
import urllib.request as req
import urllib.parse as rep

import os

base = "http://www.inflearn.com/"
quote = rep.quote_plus("추천-강좌")
url = base + quote

res = req.urlopen(url)
savePath = "/Users/eunwoo/Desktop/imageDown"

# 폴더 생성과 에러 처리 코드
try:
    if not (os.path.isdir(savePath)):
        os.makedirs(os.path.join(savePath))
except OSError as e:
    if e.errno != errno.EEXIST:
        print("폴더 만들기 실패!")
        raise

soup = BeautifulSoup(res, "html.parser")

img_list = soup.select("ul.slides")[0]

for i, e in enumerate(img_list, 1):
    with open(savePath+"text_"+str(i)+".txt","wt") as f:
        f.write(e.select_one("h4.block_title > a").string)
    fullFileName = os.path.join(savePath, savePath+'/'+str(i)+'.png')
    req.urlretrieve(e.select_one("div.block_media > a > img")['src'], fullFileName)

print("다운로드 완료")
```