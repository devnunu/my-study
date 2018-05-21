
# coding: utf-8

import base64
import urllib.request

try:
    import json
except ImportError:
    import simplejson as json

import gspread
from oauth2client.service_account import ServiceAccountCredentials

scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name(
    'client_secret.json', scope)
client = gspread.authorize(creds)

sheet = client.open("Finda").sheet1


class Mixpanel(object):

    ENDPOINT = 'https://mixpanel.com/api'
    VERSION = '2.0'

    def __init__(self, api_secret):
        self.api_secret = api_secret

    def request(self, methods, params, http_method='GET', format='json'):
        """
            methods - List of methods to be joined, e.g. ['events', 'properties', 'values']
                      will give us http://mixpanel.com/api/2.0/events/properties/values/
            params - Extra parameters associated with method
        """

        request_url = '/'.join([self.ENDPOINT, str(self.VERSION)] + methods)
        if http_method == 'GET':
            data = None
            request_url = request_url + '/?' + self.unicode_urlencode(params)
        else:
            data = self.unicode_urlencode(params)

        auth = base64.b64encode(self.api_secret).decode("ascii")
        headers = {'Authorization': 'Basic {encoded_secret}'.format(
            encoded_secret=auth)}

        request = urllib.request.Request(request_url, data, headers)
        response = urllib.request.urlopen(request, timeout=120)
        str_response = response.read().decode('utf8')
        lines = str_response.splitlines(True)
        records = []
        for line in lines:
            obj = json.loads(line)
            records.append(obj)
        return records

    def unicode_urlencode(self, params):
        """
            Convert lists to JSON encoded strings, and correctly handle any
            unicode URL parameters.
        """
        if isinstance(params, dict):
            params = list(params.items())
        for i, param in enumerate(params):
            if isinstance(param[1], list):
                params.remove(param)
                params.append((param[0], json.dumps(param[1]),))

        return urllib.parse.urlencode(
            [(k, v) for k, v in params]
        )


# api
encoded_secret = b'8ad9447dce21e1857ce467dd6b86265a'
api = Mixpanel(api_secret=encoded_secret)

# date
from_date = '2018-01-01'
to_date = '2018-03-31'

# Event List
event_list = ['Clicked Apply P2P Invest', 'Clicked Apply P2P Loan']
event_result_values = []

for event in event_list:
    data = api.request(['segmentation'], {
        'event': event,
        'from_date': from_date,
        'to_date': to_date
    })
    keys = ['', *data[0]['data']['series']]
    row = [event, *list(data[0]['data']['values'][event].values())]
    event_result_values.append(row)

print(keys)

sheet.insert_row(keys, 1)

start_cell = 2
for event in event_result_values:
    print(event)
    sheet.insert_row(event, start_cell)
    start_cell += 1
