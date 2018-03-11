
from bs4 import BeautifulSoup
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