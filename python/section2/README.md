# 파이썬 기초 스크래핑

## 크롬 개발자 도구

### 기본 개념
- DOM 구조 분석(요소 검사)
- 선택자(Selector) 추출
- Console 도구
- Source - 로딩 한 리소스 분석 및 디버깅
- 네트워크 탭 및 기타

## 파이썬 urlib을 활용한 웹에서 필요한 데이터 추출하기


### urllib 다운로드 ex1
- urllib.request를 통해 다운로드를 받을수 있다.
- urlretrieve([다운 받을 파일의 경로], [로컬 저장 경로])
```
import urllib.request as dw

print('hi')
print('한글')

# 다운로드 할 이미지의 경로
imgUrl = "https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/2xQg/image/kaZJ2LFyI0cBnynD_0rnneuFgYI.jpg"
htmlURL = "http://google.com"

# 다운로드 되어질 이미지의 경로
savePath = "/Users/eunwoo/Desktop/test1.jpg"
savePath2="/Users/eunwoo/Desktop/index.html"

# imgUrl의 이미지를 savePath에 저장함
dw.urlretrieve(imgUrl, savePath)
dw.urlretrieve(htmlURL, savePath2)

# 확인용 로그
print("다운로드 완료!")
```

따라서 브라우저를 열지 않고 여러 파일을 다운로드 할 수 있다.
또한 이를 통해 자동화도 가능하다.

http://docs.python.org 에 접속하면 파이썬 모듈들을 자세히 볼 수 있음


### urllib 다운로드 ex2
```

import urllib.request as dw

print('hi')
print('한글')

# 다운로드 할 이미지의 경로
imgUrl = "https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/2xQg/image/kaZJ2LFyI0cBnynD_0rnneuFgYI.jpg"
htmlURL = "http://google.com"

# 다운로드 되어질 이미지의 경로
savePath1 = "/Users/eunwoo/Desktop/test1.jpg"
savePath2="/Users/eunwoo/Desktop/index.html"

# 파이썬 내부적으로 imgUrl의 이미지 데이터를 읽어와서 f에 저장
f =  dw.urlopen(imgUrl).read()
f2 =  dw.urlopen(htmlURL).read()

# ex1
# w : write, r : read, a : add, b : binary
saveFile1 = open(savePath1, 'wb')
saveFile1.write(f)
saveFile1.close()

# ex2
# with문을 사용하면 close가 자동으로 실행된다.
# 따라서 ex1 보다 with문을 추천한다.
with open(savePath2, 'wb') as saveFile2:
    saveFile2.write(f2)


# 확인용 로그
print("다운로드 완료!")
```

### urlopen vs urlretrieve

urlretrieve
- 저장 후 open하고 변수에 할당하고 파싱하고 저장함
- 따라서 저장 없이 바로 다운로드 할떄 보편적으로 urlretrieve를 사용한다.

urlopen
- 변수 할당을 하고 파싱하고 저장함
- 따라서 변수 할당 및 해당 파일을 가공/분석하기 위해서 urlopen을 사용한다.