from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict_enrollment, check_capacity

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend is running!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    initial_students = float(data.get("initial_students"))
    growth_rate = float(data.get("growth_rate"))
    max_capacity = float(data.get("max_capacity"))
    days = int(data.get("days"))

    predictions = predict_enrollment(
        initial_students,
        growth_rate,
        max_capacity,
        days
    )

    status = check_capacity(predictions, max_capacity)

    return jsonify({
        "predictions": predictions,
        "final_count": predictions[-1],
        "status": status
    })


if __name__ == "__main__":
    app.run(debug=True)