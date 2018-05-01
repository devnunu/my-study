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