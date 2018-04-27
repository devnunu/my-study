import requests

# Respense 상태 코드
s = requests.Session()
r = s.get('http://httpbin.org/get')
print(r.status_code)
print(r.ok)

# https://jsonplaceholder.typicode.com

r = s.get('https://jsonplaceholder.typicode.com/posts/1')
print(r.text)
print(r.json().keys())
print(r.json().values())