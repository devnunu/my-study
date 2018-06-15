import base64
import urllib.request
import datetime
import json

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
        headers = {
            'Authorization':
            'Basic {encoded_secret}'.format(encoded_secret=auth)
        }

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
                params.append((
                    param[0],
                    json.dumps(param[1]),
                ))

        return urllib.parse.urlencode([(k, v) for k, v in params])

    def request_segmentation(self, from_date, to_date, segmentation):
        event = segmentation['event']
        result = []

        data = self.request(['segmentation'], {
            'event': event,
            'from_date': from_date,
            'to_date': to_date
        })

        series = data[0]['data']['series']
        unsorted_result = data[0]['data']['values'][event]

        for date in series:
            result.append(unsorted_result[date])
        return result

    def request_funnel(self, from_date, to_date, funnel):
        funnel_id = funnel['id']
        result = []

        data = self.request(['funnels'], {
            'funnel_id': funnel_id,
            'from_date': from_date,
            'to_date': to_date
        })

        series = data[0]['meta']['dates']
        # print('data', data[0]['data'])
        for date in series:
            steps = data[0]['data'][date]['steps']
            for index in range(len(steps)):
                if (len(result) < index + 1):
                    result.append([steps[index]['count']])
                else:
                    result[index].append(steps[index]['count'])
        # print('result', result)
        return result

    def getRange(self, from_date, to_date):
        start = datetime.datetime.strptime(from_date, '%Y-%m-%d')
        end = datetime.datetime.strptime(to_date, '%Y-%m-%d')
        step = datetime.timedelta(days=1)
        result_list = []
        while start <= end:
            result_list.append(str(start.date()))
            start += step
        return result_list
