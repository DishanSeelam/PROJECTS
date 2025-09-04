# 🏎️ F1 Race Time Prediction using Qualifying Data  

This project uses **FastF1** and **Machine Learning (Gradient Boosting Regressor)** to predict race performance in the **2025 Australian Grand Prix** based on historical qualifying and race lap data.  

---

## 📂 Dataset Sources  
- **FastF1 API**  
  - Provides Formula 1 telemetry, lap times, and session data.  
  - 2024 Australian GP race data is used for training.  

- **Custom Dataset**  
  - 2025 Qualifying times (Q3) for selected drivers were manually entered.  

---

## ⚙️ Technologies Used  
- **Python**  
- **Libraries**:  
  - `fastf1` → F1 session and lap time data  
  - `pandas`, `numpy` → Data manipulation  
  - `scikit-learn` → Machine Learning (Gradient Boosting Regressor)  
  - `matplotlib`, `seaborn` (optional) → Visualization  

---

## 🔄 Workflow  

1. **Setup FastF1 Cache**  
   - A cache directory (`/content/f1_cache`) is enabled for faster data access.  

2. **Load 2024 Australian GP Race Data**  
   - Extract lap times for all drivers.  
   - Convert lap times to seconds for numerical modeling.  

3. **Prepare 2025 Qualifying Data**  
   - Manual input of driver names and qualifying times (Q3).  
   - Map driver full names to 3-letter FIA codes.  

4. **Merge & Preprocess Data**  
   - Merge 2025 qualifying data with 2024 lap times.  
   - Keep only relevant features:  
     - **X (feature):** Qualifying Time (s)  
     - **y (target):** Race Lap Time (s)  

5. **Train Machine Learning Model**  
   - **Gradient Boosting Regressor** is trained on 2024 race data.  
   - Dataset split: 80% training / 20% testing.  

6. **Predict 2025 Race Performance**  
   - Predict lap times for 2025 drivers using qualifying times.  
   - Rank drivers based on predicted race lap times.  

7. **Evaluate Model**  
   - Model performance is evaluated using **Mean Absolute Error (MAE)**.  
