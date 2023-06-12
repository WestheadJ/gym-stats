from flask import *
import sqlite3
import flask_cors
import pendulum

app = Flask(__name__)

flask = flask_cors.CORS(app)

monday = [["Smith Hack Squat (Quads)",3],["Laying Hamstring Curl",3],["Leg Extensions",4],["Leg Press (Calfs)",4],["Leg Press (Adductors",3]]
tuesday = [["Pec Deck",3],["Smith Incline Chest Press",3],["Flat DB Press",2],["Upper Back Pulldown",2],["Lat Row",2],["Rear Delt Row",2]]
wednesday = [["Laying Hamstring Curl",3],["Leg Press (Glutes)",3],["Smith Hack Squats (Glutes & Hams)",2],["Leg Press (Calves)",3],["Leg Extensions",3]]
thursday = [["Smith Shoulder Press",3],["Cable Lat Raise",3],["Tricep Pushdown (Single Arm)",3],["Behind Cable Curls",2],["Overhead Tricep Extensions (Single Arm)",2],["Preacher Curl",2]]
friday = [["Leg Press (Glutes)",3],["RDLs",2],["Leg Extensions",3],["Leg Press (Calf Raises)",2],["Laying Hamstring Curl",2]]


# Pages
@app.route('/')
@flask_cors.cross_origin()

def index():
    return render_template("index.html")


@app.route('/add-bodyweight')
@flask_cors.cross_origin()

def addBodyweight():
    return render_template("addBodyweight.html")

@app.route('/record-session')
@flask_cors.cross_origin()
def recordSession():
    return render_template("recordSession.html")

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

@app.route('/get/percentage')
@flask_cors.cross_origin()
def getPercentage():
    con = sqlite3.connect("stats.db")
    db = con.cursor()
    today = pendulum.now().to_date_string()
    yesterday = pendulum.now().subtract(days=1).to_date_string()

    db.execute(f"SELECT * FROM Bodyweight WHERE date BETWEEN ? AND ?",[yesterday,today])
    rows = db.fetchall()

    return rows


@app.route("/post/add-bodyweight",methods=['post'])
@flask_cors.cross_origin()
def addPostBodyweight():

    weight = request.form["weight"]
    con = sqlite3.connect("stats.db")
    db = con.cursor()
    dt = pendulum.today().date()
    db.execute("SELECT * FROM Bodyweight WHERE date = ?",[str(dt)])
    result = db.fetchall()
    if result == []:
        db.execute("INSERT INTO Bodyweight(date,weight) VALUES (?,?)",[str(dt),weight])
        con.commit()
        return redirect(url_for('addBodyweight'))
    else:
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0',port=6001)
