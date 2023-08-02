from flask import *
import sqlite3
import flask_cors
import pendulum

app = Flask(__name__)

flask = flask_cors.CORS(app)


# Pages
@app.route("/")
@flask_cors.cross_origin()
def index():
    return render_template("index.html")


@app.route("/add-bodyweight")
@flask_cors.cross_origin()
def addBodyweight():
    return render_template("addBodyweight.html")


# API
@app.route("/get/bodyweight/week")
@flask_cors.cross_origin()
def getBodyweightWeek():
    args = request.args.get("date")
    con = sqlite3.connect("stats.db")
    db = con.cursor()

    dt = pendulum.from_format(args, "YYYY-MM-DD")

    startDate = dt.start_of("week").to_date_string()
    endDate = dt.end_of("week").to_date_string()

    print(startDate, "-", endDate)

    db.execute(
        f"SELECT * FROM Bodyweight WHERE date BETWEEN ? AND ? ORDER BY date ASC",
        [startDate, endDate],
    )
    rows = db.fetchall()
    return [rows, startDate, endDate]


@app.route("/get/bodyweight/year")
@flask_cors.cross_origin()
def getBodyweightYear():
    con = sqlite3.connect("stats.db")
    db = con.cursor()
    dt = pendulum.today()
    year = dt.year

    startDate = f"{year}-01-01"
    endDate = f"{year}-12-31"

    print(startDate, "-", endDate)

    db.execute(
        f"SELECT * FROM Bodyweight WHERE date BETWEEN ? AND ? ORDER BY date ASC",
        [startDate, endDate],
    )
    rows = db.fetchall()
    return rows


@app.route("/get/percentage")
@flask_cors.cross_origin()
def getPercentage():
    con = sqlite3.connect("stats.db")
    db = con.cursor()
    today = pendulum.now().to_date_string()
    yesterday = pendulum.now().subtract(days=1).to_date_string()

    db.execute(
        f"SELECT * FROM Bodyweight WHERE date BETWEEN ? AND ? ", [yesterday, today]
    )
    rows = db.fetchall()

    return rows


@app.route("/post/add-bodyweight", methods=["post"])
@flask_cors.cross_origin()
def addPostBodyweight():
    weight = request.form["weight"]
    date = request.form["date"]
    con = sqlite3.connect("stats.db")
    db = con.cursor()
    db.execute("SELECT * FROM Bodyweight WHERE date = ? ", [date])
    result = db.fetchall()
    if result == []:
        db.execute("INSERT INTO Bodyweight(date,weight) VALUES (?,?)", [date, weight])
        con.commit()
        return redirect(url_for("index"))
    else:
        return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=6001)
