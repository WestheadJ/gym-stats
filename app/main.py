from __future__ import print_function

import os.path
import datetime

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
x = datetime.datetime.now()
# The ID and range of a sample spreadsheet.
SAMPLE_SPREADSHEET_ID = '1XgdSUgbqJ21N0nV6rKjivQPP2Crw9mu3rAJga13EHUA'

creds = None
# The file token.json stores the user's access and refresh tokens, and is
# created automatically when the authorization flow completes for the first
# time.
if os.path.exists('token.json'):
    creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
        creds = flow.run_local_server(port=36969)

    with open('token.json', 'w') as token:
        token.write(creds.to_json())

try:
    service = build('sheets', 'v4', credentials=creds)

    # Call the Sheets API
    sheet = service.spreadsheets()


    ran = False
    while True:

        x = datetime.datetime.now()

        day=x.strftime("%a")


        SAMPLE_RANGE_NAME = ""
        if(day == "Sat" or day == "Sun"):
            SAMPLE_RANGE_NAME = f'{day}!A7:B'
        else:
            SAMPLE_RANGE_NAME = f'{day}!D2:I14'

        if(x.strftime('%I-%M')== "07-25"):
            if(ran==False):
                result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID, range=SAMPLE_RANGE_NAME).execute()
                values = result.get('values', [])
                ran = True
                if not values:
                    print('No data found.')

                for i in values:
                    print(i)
            else:
                pass
        elif(x.strftime('%I-%M')== "07-26"):
            ran=False
        else:
            pass
except HttpError as err:
    print(err)
