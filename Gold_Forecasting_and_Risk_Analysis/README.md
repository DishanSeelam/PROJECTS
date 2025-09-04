# 📈 Gold Price Forecasting & Risk Analysis (2025)

This project analyzes and forecasts **gold prices** using historical data and applies **financial risk management techniques** such as **Volatility Analysis, Value at Risk (VaR), Conditional VaR (CVaR), and Drawdown Analysis**. It also implements a **1-year linear regression forecast** on log-transformed prices for trend prediction.  

---

## 📂 Project Overview

- **Dataset**: Historical gold prices (`Gold_price_2025 new.csv`)  
- **Goal**:  
  - Forecast gold prices for the next 1 year using linear regression on log-transformed prices.  
  - Evaluate financial risks using historical returns.  
- **Approach**:  
  - Data cleaning & preprocessing  
  - Time-series forecasting  
  - Volatility, VaR, CVaR, and Drawdown analysis  
  - Visualization of historical & forecasted trends  

---

## ⚙️ Technologies Used

- **Python 3**  
- **Libraries**:  
  - `pandas`, `numpy` → Data processing  
  - `matplotlib`, `seaborn` → Visualization  
  - `scikit-learn` → Linear Regression model  
  - `datetime` → Time handling  

---

## 📊 Workflow

### 1. Data Preprocessing
- Converted timestamps (`timeOpen`, `timeClose`, `timeHigh`, `timeLow`) from milliseconds to datetime.  
- Converted price columns (`priceOpen`, `priceHigh`, `priceLow`, `priceClose`) to float.  
- Sorted by `timeOpen` and set it as index.  
- Engineered time features: year, month, day, day of week, day of year.  
- Computed **daily returns** and **log returns**.  

---

### 2. Forecasting
- Target: `priceClose`  
- Resampled to daily frequency and applied log transformation.  
- Fitted **Linear Regression** model on log prices.  
- Forecasted for **365 days ahead** (1 year).  
- Inverse transformed to get actual prices.  

📈 **Visualization**:  
- Historical vs 1-Year Forecast plotted.  

---

### 3. Risk Analysis

#### 🔹 Volatility
- Calculated **daily return mean and standard deviation**.  
- Computed **annualized volatility**.  
- Visualized **20-day rolling volatility**.  

#### 🔹 Value at Risk (VaR) & Conditional Value at Risk (CVaR)
- Applied **Historical Simulation Method**.  
- Confidence Levels: **95% & 99%**  
- Time Horizons: **1-day, 5-day, 20-day**  

#### 🔹 Drawdown Analysis
- Computed **cumulative returns**.  
- Calculated **rolling peak & drawdowns**.  
- Identified **maximum drawdown** as a measure of worst-case investor loss.  

---

## 📷 Example Visualizations

- **Gold Price Forecast**: Historical vs 1-Year prediction  
- **Rolling Volatility**: 20-day standard deviation  
- **VaR & CVaR Risk Analysis**  
- **Cumulative Returns & Drawdowns**  

---

## 🔍 Features

✅ **1-Year Forecasting** using Linear Regression on log-transformed gold prices  
✅ **User-defined date lookup**: Query predicted or historical prices for specific dates  
✅ **Risk Metrics**: Volatility, VaR, CVaR, Drawdowns  
✅ **Financial Visualizations** for better insights  

---
