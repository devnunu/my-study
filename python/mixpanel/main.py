from Mixpanel import Mixpanel
import pandas as pd


encoded_secret = b'8ad9447dce21e1857ce467dd6b86265a'
api = Mixpanel(api_secret=encoded_secret)

# date
from_date = '2018-01-01'
to_date = '2018-03-31'

# Event List
event_list = ['Clicked Apply P2P Invest', 'Clicked Apply P2P Loan']
# event_result_values = api.request_segmentation(from_date, to_date, event_list)

# print(event_result_values)

date_list = api.getRange(from_date, to_date)
