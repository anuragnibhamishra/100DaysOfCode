# backend/model.py

def simulate_sir(
    population,
    initial_infected,
    beta,
    gamma,
    vaccination_rate,
    days,
    closure_day=None
):
    S = float(population - initial_infected)
    I = float(initial_infected)
    R = 0.0
    N = float(population)

    susceptible = []
    infected = []
    recovered = []

    peak_infected = I
    peak_day = 0

    original_beta = beta  # preserve original

    for day in range(days):
        # Apply closure effect
        if closure_day is not None and day >= closure_day:
            beta = original_beta * 0.3  # reduce infection rate

        # Calculations
        new_infected = (beta * S * I) / N
        new_recovered = gamma * I
        vaccinated = vaccination_rate * S

        # Update compartments
        S = S - new_infected - vaccinated
        I = I + new_infected - new_recovered
        R = R + new_recovered + vaccinated

        # Safety checks
        S = max(S, 0)
        I = max(I, 0)
        R = max(R, 0)

        # Store values
        susceptible.append(S)
        infected.append(I)
        recovered.append(R)

        # Track peak
        if I > peak_infected:
            peak_infected = I
            peak_day = day

    return {
        "susceptible": susceptible,
        "infected": infected,
        "recovered": recovered,
        "peak_infected": peak_infected,
        "peak_day": peak_day
    }