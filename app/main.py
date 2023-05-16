from __future__ import print_function

import os
import datetime
import sqlite3
import pendulum

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

con = sqlite3.connect("stats.db")
db = con.cursor()

service = build('sheets', 'v4', credentials=creds)

# Call the Sheets API
sheet = service.spreadsheets()
db.execute("SELECT * FROM Bodyweight")

rows = db.fetchall()

# print(rows)

def getBodyWeight(date):
    range = f"{date.strftime('%a')}!B7"


    result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID, range=range).execute()
    value = result.get('values', [])[0][0]
    print(value)
    date = date.strftime('%Y/%m/%d')
    print(date)
    if value[0] == '-':
        value=0
    print(value)
    sql = """INSERT INTO Bodyweight(date,weight) VALUES (?,?)"""
    db.execute(sql,[date,value])
    con.commit()

# x = datetime.datetime.now()
#
# day=x.strftime("%a")
# year = x.isocalendar().year
# weekOfTheYear = x.isocalendar().week

# dateGrab = f"{year}/W{weekOfTheYear}"
#
# print(dateGrab)
#
# startDate = datetime.datetime.strptime(dateGrab + '/1', "%Y/W%W/%w")

# if(weekOfTheYear == 52):
#     dateGrab = f"{year+1}/W1"
#     endDate = datetime.datetime.strptime(dateGrab+ '/0',"%Y/W%W/%w")
# else:
#     endDate = datetime.datetime.strptime(dateGrab+ '/0',"%Y/W%W/%w")
# print(startDate)
# print(endDate)

bodyweightChecked = False

def getSheet(range):
    result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID, range=range).execute()
    values = result.get('values', [])
    if not values:
        print('No data found.')
    else:
        for i in values:
            print(i)

try:
    x = datetime.datetime.now()

    day=x.strftime("%a")
    date=x.strftime("")
    match day:
        case "Mon":
            monNotRan = True
            if monNotRan:
                range = 'Mon!C2:O9'
                getSheet(range)
                monNotRan = False

            else:
                print("Not time")
        case "Tue":
            tueNotRan = True
            if tueNotRan:
                range = 'Tue!C2:O8'
                getSheet(range)
                tueNotRan = False
        case "Wed":
            range = 'Wed!C2:O8'
            getSheet(range)
        case "Thu":
            range = 'Thu!C2:O7'
            getSheet(range)
        case "Fri":
            range = 'Fri!C2:O8'
            getSheet(range)

    # ran = False
    # while True:
        # x = datetime.datetime.now()
        #
        # if(x.strftime('%I:%M')=="12:56"):
        #     if bodyweightChecked == False:
        #         getBodyWeight(x)
        #         bodyweightChecked = True
        #
        # else:
        #     bodyweightChecked = False
        #
        # day=x.strftime("%a")
        # year = x.isocalendar().year
        # weekOfTheYear = x.isocalendar().week

        # dateGrab = f"{year}/W{weekOfTheYear}"
        # startDate = datetime.datetime.strptime(dateGrab + '/1', "%Y/W%W/%w")
        #
        # endDate = datetime.datetime.strptime(dateGrab+ '/6',"%Y/W%W/%w")
        # print(endDate)
        #
        # range = ""
        #
        # if(day == "Sat" or day == "Sun"):
        #     range = f'{day}!A7:B'
        # else:
        #     range = f'{day}!D2:I14'
        #
        #
        # if(x.strftime('%I-%M')== "04-22"):
        #     if(ran==False):
        #         getBodyWeight(x)
        #
        #         result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID, range=range).execute()
        #         values = result.get('values', [])
        #         ran = True
        #         if not values:
        #             print('No data found.')
        #
        #         for i in values:
        #             print(i)
        #     else:
        #         pass
        # elif(x.strftime('%I-%M')== "04-23"):
        #     ran=False
        # else:
        #     pass
except HttpError as err:
    print(err)


