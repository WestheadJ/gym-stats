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


@app.route('/add-bodyweight')
def addBodyweight():
    return render_template("addBodyweight.html")

@app.route('/record-session')
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
