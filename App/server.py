from flask import *
import sqlite3
import flask_cors
import pendulum

app = Flask(__name__)


flask = flask_cors.CORS(app)



# Pages
@app.route('/')
def index():
    return render_template("index.html")

@app.route('/create-exercise')
def createExercise():
    return render_template("createExercise.html")

# API
@app.route('/get/bodyweight/week')
@flask_cors.cross_origin()

def getBodyweightWeek():
    con = sqlite3.connect("stats.db")
    db = con.cursor()
    dt = pendulum.today()

    startDate = dt.start_of('week').to_date_string()
    endDate = dt.end_of('week').to_date_string()

    print(startDate, "-", endDate)

    db.execute(f"SELECT * FROM Bodyweight WHERE date BETWEEN ? AND ?", [startDate, endDate])
    rows = db.fetchall()
    return rows

@app.route('/get/bodyweight/year')
@flask_cors.cross_origin()
def getBodyweightYear():
    con = sqlite3.connect("stats.db")
    db = con.cursor()
    dt = pendulum.today()
    year = dt.year

    startDate = f"{year}-01-01"
    endDate = f"{year}-12-31"

    print(startDate, "-", endDate)

    db.execute(f"SELECT * FROM Bodyweight WHERE date BETWEEN ? AND ?", [startDate, endDate])
    rows = db.fetchall()
    return rows

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0',port=6001)
