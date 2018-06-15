from Mixpanel import Mixpanel
from GSheet import GSheet
import pandas as pd

# mixpanel
encoded_secret = b'cd844758282cd9c2bb8a2304510d90c5'
api = Mixpanel(api_secret=encoded_secret)

# # spread sheet
gs = GSheet(sheet_name="Finda")

# date
from_date = '2018-01-01'
to_date = '2018-03-31'
date_range = [""] + api.getRange(from_date, to_date)

# insert date
gs.delete_row(2)
gs.insert_row(date_range, 2)

# cell range
from_col = 'B'
to_col = input('끝 범위를 입력해주세요:')

# Segmentation List
segmentation_list = [{
    'event': "Clicked Apply Credit Card",
    'row': 57
}, {
    'event': "Clicked Apply Personal Loan",
    'row': 58
}]

# update cell
for segmentation in segmentation_list:
    result = api.request_segmentation(from_date, to_date, segmentation)
    write_range = from_col + str(segmentation['row']) + ':' + to_col + str(
        segmentation['row'])
    gs.update_cells(result, write_range)

# Funnel List
funnel_list = [
    {
        'name': '신규소비관리',
        'id': 3917509,
        'row': 15,
        'step': 3
    },
    {
        'name': '신규카드추천',
        'id': 3917525,
        'row': 20,
        'step': 2
    },
    {
        'name': '신규대출추천',
        'id': 3917589,
        'row': 24,
        'step': 2
    },
    # {
    #     'name': 'Spending',
    #     'id': 4175609,
    #     'row': 40,
    #     'step': 3
    # }, {
    #     'name': 'Coin',
    #     'id': 4175625,
    #     'row': 45,
    #     'step': 3
    # }, {
    #     'name': 'Recommend-Card',
    #     'id': 4175629,
    #     'row': 50,
    #     'step': 2
    # }, {
    #     'name': 'Recommend-Loan',
    #     'id': 4226293,
    #     'row': 54,
    #     'step': 2
    # }
]

# update cell
for funnel in funnel_list:
    result = api.request_funnel(from_date, to_date, funnel)

    print('Update ' + funnel['name'] + ' to gsheet...')
    for index in range(len(result)):
        # print(funnel['name'],len(result[index]))
        write_range = from_col + str(
            funnel['row'] + index) + ':' + to_col + str(funnel['row'] + index)
        gs.update_cells(result[index], write_range)
    print('ok!!')