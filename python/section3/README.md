# 파이썬 고급 스크래핑

## http  통신 기초

### http 통신
- 연결 유지에 리소스가 많이 들기 때문에 비 연결 지향이다.
- 상태 정보를 유지 하지 않는다(stateless)
	- 상태 정보가 유지되지 않는다면 페이지마다 로그인해야함
	- 때문에 정보를 유지하기 위해서 쿠키와 세션을 사용한다

### 세션과 쿠키의 간단한 개념
- 쿠키
	- 클라이언트 사이드에서 정보를 저장함
	- 사용은 자동로그인, 장바구니, 팝업 그만열기 등
	- 구글 크롬 apilication 탭에서 확인이 가능하다
- 세션
	- 서버 사이드에서 정보를 저장함

- - -

## requests 모듈 기초

```
pip install requests
```

### requests 모듈 사용법 및 장점
- urllib로 url을 open하여 처리하던것을 모듈 하나로 사용 가능함
- 스레드가 안전함

**예제1)**
```
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
```

**예제2**
```
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
```

**예제3**
```
import requests, json

s = requests.Session()

r = s.get('http://httpbin.org/stream/20')
# print(r.text)
print(r.encoding)

if r.encoding is None :
    r.encoding = 'utf-8'

for line in r.iter_lines(decode_unicode=True):
    # print(line)
    b = json.loads(line)
    # print(b['origin'])
    for e in b.keys():
        print(b[e])
```

### JSON 데이터 핸들링