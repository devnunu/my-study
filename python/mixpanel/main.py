from Mixpanel import Mixpanel
from GSheet import GSheet
import pandas as pd

# mixpanel
encoded_secret = b'8ad9447dce21e1857ce467dd6b86265a'
api = Mixpanel(api_secret=encoded_secret)

# date
from_date = '2018-01-01'
to_date = '2018-03-31'
date_range = api.getRange(from_date, to_date)

# Event List
event_list = ['Clicked Apply P2P Invest', 'Clicked Apply P2P Loan']
event_result_values = api.request_segmentation(from_date, to_date, event_list)

# spread sheet
gs = GSheet(sheet_name="Finda")

start_cell = 1
for event in event_result_values:
    gs.insert_row(event, start_cell)
    start_cell += 1

gs.insert_row([""].extend(date_range), 1)
