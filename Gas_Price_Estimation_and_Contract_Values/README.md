# ⛽ Natural Gas Price Forecasting & Storage Contract Valuation  

This project combines **time series forecasting** and **contract pricing** to model natural gas prices and estimate the financial value of a **storage contract strategy**.  

---

## 📂 Features  

1. **Polynomial Regression Forecasting**  
   - Uses historical natural gas prices (`Nat_Gas.csv`)  
   - Converts dates to ordinal format for regression  
   - Fits a **4th-degree polynomial model**  
   - Forecasts **next 12 months of gas prices**  
   - Visualizes historical vs forecasted prices  

2. **Price Estimator Function**  
   - `estimate_gas_price(date)` → Predicts natural gas price for a specific date  

3. **Storage Contract Valuation**  
   - Simulates **injection and withdrawal schedules**  
   - Tracks storage levels with constraints:  
     - Injection rate  
     - Withdrawal rate  
     - Maximum storage capacity  
   - Adds **monthly storage costs**  
   - Computes **net present contract value**  

---

## ⚙️ Technologies Used  

- **Python**  
- **Libraries**:  
  - `pandas`, `numpy` → Data handling & transformations  
  - `matplotlib` → Visualization  
  - `scikit-learn` → Polynomial regression model  
  - `collections.defaultdict` → Storage volume tracking  

---

## 🔄 Workflow  

1. **Load & Preprocess Data**  
   - Load `Nat_Gas.csv` (must contain `Dates` and `Prices` columns)  
   - Convert dates to ordinal values  

2. **Fit Polynomial Regression Model**  
   ```python
   degree = 4
   poly = PolynomialFeatures(degree)
   X_poly = poly.fit_transform(X)
   model = LinearRegression().fit(X_poly, y)
   
3. Forecast Prices
   - Generate 12 months of future dates
   - Predict using trained polynomial model
   
4. Plot Historical + Forecasted Prices
   - Blue → Historical Prices
   - Orange (dashed) → Forecasted Prices
    
5. Simulate Storage Contract
   ```python
   contract_value = price_storage_contract(
    injection_dates=['2024-11-01', '2024-12-01', '2025-01-01'],
    withdrawal_dates=['2025-06-01', '2025-07-01', '2025-08-01'],
    injection_rate=100,
    withdrawal_rate=100,
    max_storage_volume=300,
    storage_cost_per_unit=0.5
   )
   print(f"Estimated Contract Value: ${contract_value}")
