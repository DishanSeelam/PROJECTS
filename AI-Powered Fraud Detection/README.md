🛡️ AI-Powered Fraud Detection System

An end-to-end fraud detection pipeline built with Python & Machine Learning, combining supervised and unsupervised learning methods for real-time fraud detection, alerting, and reporting.

This project simulates real-world financial transactions, trains ML models, and continuously monitors new transactions for fraudulent activity with a complete dashboard & alerting system.

🚀 Features

✅ Synthetic Data Generation – Creates realistic normal & fraudulent transaction data with patterns (high amount, odd hours, high device risk, etc.)
✅ Feature Engineering & Preprocessing – Handles categorical encoding, scaling, and derived features (e.g., risk score, unusual hours).
✅ Supervised Learning (Random Forest) – Classifies transactions as fraud/not fraud.
✅ Unsupervised Learning (Isolation Forest) – Detects anomalies without labels.
✅ Ensemble Scoring – Combines supervised & anomaly detection for more reliable predictions.
✅ Real-Time Transaction Simulation – Streams live transactions and evaluates them in real-time.
✅ Multi-Level Decision System – Approve / Review / Block transactions based on risk thresholds.
✅ Alerting System – Sends alerts for high-risk transactions (WARNING / CRITICAL).
✅ Dashboard Reports – Provides system metrics, risk analysis, and high-risk transaction logs.
✅ Model Persistence – Save & load models with joblib for deployment.

🧠 ML Models Used

  Random Forest Classifier (Supervised) – Learns from labeled fraud/non-fraud data.

  Isolation Forest (Unsupervised) – Detects anomalies based on transaction distributions.

  Ensemble Scoring – Weighted combination of supervised & anomaly detection scores.

🔔 Real-Time Alerting

  Fraudulent or suspicious transactions trigger alerts in logs and console:
  WARNING - FRAUD ALERT: BLOCKED: $4789.50 transaction | Risk Score: 0.921


