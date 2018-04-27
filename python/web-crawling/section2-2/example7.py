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