# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from model import simulate_sir

app = Flask(__name__)
CORS(app)  # allow frontend requests

@app.route("/simulate", methods=["POST"])
def simulate():
    data = request.json

    try:
        population = int(data["population"])
        initial_infected = int(data["initial_infected"])
        beta = float(data["beta"])
        gamma = float(data["gamma"])
        vaccination_rate = float(data["vaccination_rate"])
        days = int(data["days"])
        closure_day = data.get("closure_day")

        if closure_day is not None:
            closure_day = int(closure_day)

        result = simulate_sir(
            population,
            initial_infected,
            beta,
            gamma,
            vaccination_rate,
            days,
            closure_day
        )

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)