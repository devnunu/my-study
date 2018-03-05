
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