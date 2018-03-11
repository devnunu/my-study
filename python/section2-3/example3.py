
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