import requests

# 세션이 열림
s = requests.Session()
r = s.get('https://www.naver.com')
# print('1',r.text)

# httpbin.org로 테스트 api를 호출 할 수 있다.
# r = s.get('http://httpbin.org/cookies', cookies={'from':'myName'})
# print(r.text)

url = 'http://httpbin.org/get'
headers = {'user-agent':'myPythonApp_1.0.0'}

r = s.get(url, headers=headers)
print(r.text)

# 세션을 닫아줘야함
s.close()

with requests.Session() as s :
    r = s.get('http://www.naver.com')
    print(r.text)