from bs4 import BeautifulSoup

html = """
<html>
    <body>
        <ul>
            <li><a href="http://www.naver.com">naver</a></li>
            <li><a href="http://www.daum.net">daum</a></li>
            <li><a href="http://www.daum.com">daum</a></li>
            <li><a href="http://www.google.com">google</a></li>
            <li><a href="http://www.tistory.com">tistory</a></li>
        </ul>
    </body>
</html>
"""

soup = BeautifulSoup(html, 'html.parser')

# 해당 태그를 한번에 가져옴
links = soup.find_all("a")
# print('links',type(links))

# 조건부로 string이 daum 인 a 태그만 가져온다.
a = soup.find_all("a", string="daum")
print('a',a)
# limit 선택으로 결과물 갯수의 제한을 걸수 있음
b = soup.find_all("a",limit=2)
print('b',b)
# 특정 내용을 가진 것만 가져올수 있음
c = soup.find_all(string=["naver","google"])
print('c',type(c))

# 한번에 가져온 태그는 반복문으로 순환가능
for a in links:
    # print('a', type(a),a)
    href = a.attrs['href']
    txt = a.string
    # print('txt >> ', txt, 'href >>', href)

