
import urllib.request as req

url = "http://www.encar.com"

mem = req.urlopen(url)

# <http.client.HTTPResponse object at 0x10478a5f8>
# http 객체에 저장됨
print(mem)

# url을 가져옴
print("geturl",mem.geturl())

# http 응답코드 ex) 200, 404, 403, 500
print("status",mem.status)

# 세션, 쿠키, 커넥트 등의 header정보를 가져옴
print("headers", mem.getheaders())

# header가 보기좋게 줄바꿈 처리 되어 출력됨
print("info", mem.info())

# status와 동일
print("code", mem.getcode())

# 데이터를 읽어옴, 인수를 넣으면 해당 숫자만큼 읽어옴
print("read", mem.read(50).decode("utf-8"))