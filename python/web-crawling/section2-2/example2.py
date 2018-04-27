from bs4 import BeautifulSoup

# """이 있으면 줄바꿈이 있는 문자를 입력할 수 있음
html = """
<html>
    <body>
        <h1>파이썬 BeautifulSoup 공부</h1>
        <p>태그 선택자</p>
        <p>CSS 선택자</p>
    </body>
</html>
"""

# print('html', html)

# html를 2번째인자(파서)로 파싱한 객체가 저장됨
soup = BeautifulSoup(html, 'html.parser')
# print('soup', type(soup))

# html이 가지런하게 출력됨
# print('prettify',soup.prettify())

# 태그에 대해 다이렉트로 접근이 가능함
h1 = soup.html.body.h1
print('h1',h1)

# 첫번째 태그만 가져오는것을 알수 있음
p1 = soup.html.body.p
print('p1',p1)

# next_sibling으로 다음 태그를 가져올 수 있음
p2 = p1.next_sibling.next_sibling
print('p2',p2)

# [주의] 줄바꿈이 되었으므로 공백이 출력됨!
p2_1 = p1.next_sibling
print('p2',p2)

# previous_sibling으로 이전 태그를 가져올 수 있음
p3 = p1.previous_sibling.previous_sibling
print('p3',p3)

