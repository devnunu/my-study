import urllib.request as req
from urllib.parse import urlencode

# https://www.ipify.org/ 
# 자신의 ip를 반환하는 임의의 api를 제공
API = "https://api.ipify.org"

values = {
    'format' : 'json'
}
print('before', values)
params = urlencode(values)
print('after', params)

url = API + "?" + params
print("요청 url", url)

reqData = req.urlopen(url).read().decode('utf-8')
print("출력", reqData)