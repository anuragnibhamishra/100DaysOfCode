import math

def predict_enrollment(initial_students, growth_rate, max_capacity, days):
    predictions = []

    for t in range(days + 1):
        try:
            exponent = -growth_rate * t
            denom = 1 + ((max_capacity - initial_students) / initial_students) * math.exp(exponent)
            students = max_capacity / denom
        except ZeroDivisionError:
            students = 0

        predictions.append(round(students, 2))

    return predictions


def check_capacity(predictions, max_capacity):
    if predictions[-1] >= max_capacity:
        return "FULL"
    return "AVAILABLE"