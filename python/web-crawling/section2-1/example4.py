
import urllib.request as req
from urllib.parse import urlparse

url = "http://www.encar.com"

mem = req.urlopen(url)

# urlparse는 파싱을 위해 사용, url을 인수로 받음
# result) ParseResult(scheme='http', netloc='www.encar.com', path='', params='', query='', fragment='')
print(urlparse(url))