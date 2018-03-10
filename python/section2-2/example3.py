from bs4 import BeautifulSoup

html = """
<html>
    <body>
        <ul>
            <li><a href="http://www.naver.com">naver</a></li>
            <li><a href="http://www.daum.net">daum</a></li>
            <li><a href="http://www.google.com">google</a></li>
            <li><a href="http://www.tistory.com">tistory</a></li>
        </ul>
    </body>
</html>
"""

soup = BeautifulSoup(html, 'html.parser')

# 해당 태그를 한번에 가져옴
links = soup.find_all("a")
print('links',type(links))

# 한번에 가져온 태그는 반복문으로 순환가능
for a in links:
    print('a', type(a),a)
    href = a.attrs