
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