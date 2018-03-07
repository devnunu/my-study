from urllib.parse import urljoin

# html 값을 join 함
baseUrl = "http://test.com/html/a.html"
print(">>", urljoin(baseUrl,"b.html"))
print(">>", urljoin(baseUrl,"sub/b.html"))
print(">>", urljoin(baseUrl,"../index.html"))
print(">>", urljoin(baseUrl,"../img/img.jpg"))
print(">>", urljoin(baseUrl,"../css/img.css"))