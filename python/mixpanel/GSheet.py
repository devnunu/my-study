import gspread
from oauth2client.service_account import ServiceAccountCredentials


class GSheet:

    def __init__(self, sheet_name):
        self.scope = ['https://spreadsheets.google.com/feeds',
                      'https://www.googleapis.com/auth/drive']
        self.creds = ServiceAccountCredentials.from_json_keyfile_name(
            'client_secret.json', self.scope)
        self.client = gspread.authorize(self.creds)
        self.sheet = self.client.open(sheet_name).sheet1

    def insert_row(self, data, start_cell):
        self.sheet.insert_row(data, 1)

    def create