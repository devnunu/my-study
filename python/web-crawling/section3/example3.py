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