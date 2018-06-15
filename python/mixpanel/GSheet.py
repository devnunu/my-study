import gspread
from oauth2client.service_account import ServiceAccountCredentials


class GSheet:
    def __init__(self, sheet_name):
        self.scope = [
            'https://spreadsheets.google.com/feeds',
            'https://www.googleapis.com/auth/drive'
        ]
        self.creds = ServiceAccountCredentials.from_json_keyfile_name(
            'client_secret.json', self.scope)
        self.client = gspread.authorize(self.creds)
        self.sheet = self.client.open(sheet_name).sheet1

    def insert_row(self, data, start_cell):
        self.sheet.insert_row(data, start_cell)

    def delete_row(self, index):
        self.sheet.delete_row(index)

    def update_cells(self, value_list, write_range):
        # Select a range
        cell_list = self.sheet.range(write_range)

        for index in range(len(cell_list)):
            cell_list[index].value = value_list[index]

        # Update in batch
        self.sheet.update_cells(cell_list)
