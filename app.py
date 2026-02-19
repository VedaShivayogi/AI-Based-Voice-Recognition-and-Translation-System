from flask import Flask, render_template, request, redirect, url_for, flash, session
from translate import translatebp  # your translation blueprint

app = Flask(__name__)
app.secret_key = "secret123"

# Register the translation blueprint
app.register_blueprint(translatebp)

# Hardcoded login credentials
EMAIL = "ved@gmail.com"
PASSWORD = "0807"

# Login route
@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        if email == EMAIL and password == PASSWORD:
            session['logged_in'] = True
            return redirect(url_for("dashboard"))
        else:
            flash("❌ Invalid email or password")

    return render_template("login.html")

# Dashboard route
@app.route("/dashboard")
def dashboard():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template("dashboard.html")

# Logout route
@app.route("/logout")
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))

if __name__ == "__main__":
    app.run(debug=True, port=5000)