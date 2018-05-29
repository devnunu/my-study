import base64
import urllib.request
import datetime

try:
    import json
except ImportError:
    import simplejson as json


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

    def request_segmentation(self, from_date, to_date, event_list):
        event_result_values = []
        for event in event_list:
            data = self.request(['segmentation'], {
                'event': event,
                'from_date': from_date,
                'to_date': to_date
            })
            row = [event, *list(data[0]['data']['values'][event].values())]
            event_result_values.append(row)
        return event_result_values

    def getRange(self, from_date, to_date):
        start = datetime.datetime.strptime(from_date, '%Y-%m-%d')
        end = datetime.datetime.strptime(to_date, '%Y-%m-%d')
        step = datetime.timedelta(days=1)
        result_list = []
        while start <= end:
            result_list.append(str(start.date()))
            start += step
        return result_list
