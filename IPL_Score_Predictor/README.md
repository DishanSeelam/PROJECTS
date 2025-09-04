# IPL Score Prediction using Linear Regression

## 📌 Project Overview
This project builds a **Linear Regression model** to predict the final IPL cricket score based on match conditions such as batting team, bowling team, current score, overs completed, and performance in the last 5 overs.  
The model is trained using historical IPL match data.

---

## 📂 Dataset
- The dataset used is **`ipl (1).csv`**
- Initial preprocessing steps include:
  - Removing unwanted columns: `['mid', 'venue', 'batsman', 'bowler', 'striker', 'non-striker']`
  - Keeping only consistent IPL teams:
    - Kolkata Knight Riders  
    - Chennai Super Kings  
    - Rajasthan Royals  
    - Mumbai Indians  
    - Kings XI Punjab  
    - Royal Challengers Bangalore  
    - Delhi Daredevils  
    - Sunrisers Hyderabad
  - Converting categorical team names into numerical features using **One-Hot Encoding**
  - Splitting data into **train (till 2016)** and **test (from 2017 onwards)**

---

## ⚙️ Features
The model uses the following features:
- Batting Team (One-hot encoded)  
- Bowling Team (One-hot encoded)  
- Overs  
- Runs  
- Wickets  
- Runs scored in last 5 overs  
- Wickets lost in last 5 overs  

---

## 🧠 Model Training
- **Algorithm Used:** Linear Regression  
- **Train-Test Split:**  
  - Training Data → Matches till 2016  
  - Testing Data → Matches from 2017 onwards  

---

## 📊 Model Evaluation
The model was evaluated using error metrics:

- **Mean Absolute Error (MAE):**  
- **Mean Squared Error (MSE):**  
- **Root Mean Squared Error (RMSE):**

(*Values will be printed when you run the script*)

---

## 🔮 Prediction Function
The project includes a `predict_score()` function to predict the final score:

```python
final_score = predict_score(
    batting_team='Kings XI Punjab',
    bowling_team='Royal Challengers Bangalore',
    overs=12.3,
    runs=93,
    wickets=3,
    runs_in_prev_5=21,
    wickets_in_prev_5=2
)
print("Predicted Score Range:", final_score-10, "to", final_score+5)
