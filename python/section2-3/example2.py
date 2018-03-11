
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