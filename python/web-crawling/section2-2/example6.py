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