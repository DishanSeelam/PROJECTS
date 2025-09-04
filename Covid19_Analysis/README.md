🌍 COVID-19 vs World Happiness Analysis

This project explores the relationship between COVID-19 confirmed cases and World Happiness factors such as GDP per capita, life expectancy, and social support. Using real datasets from 2020, it highlights how global health crises intersect with socioeconomic well-being.

📂 Project Overview

Dataset 1: COVID-19 confirmed cases (as of 2020-05-01).

Dataset 2: Worldwide Happiness Report.

Goal: To analyze correlations between COVID-19 impact and happiness-related factors across countries.

Approach: Data cleaning, merging, correlation analysis, and scatter plot visualizations.

⚙️ Technologies Used

Python 3

Pandas → Data cleaning and preprocessing

NumPy → Numerical operations

Matplotlib & Seaborn → Visualization

Plotly Express → Interactive visualization

📊 Workflow
1. Data Preprocessing

Removed unnecessary columns from the COVID-19 dataset (Lat, Long).

Aggregated data by Country/Region to compute total confirmed cases.

Selected relevant happiness factors and set Country or region as index.

2. Merging Datasets

Merged COVID-19 total confirmed cases with Happiness Report using country names.

3. Correlation & Insights

Explored correlations between happiness indicators and COVID-19 cases.

Created scatter plots with regression lines for:

GDP per capita vs COVID-19 cases

Healthy life expectancy vs COVID-19 cases

Social support vs COVID-19 cases

📈 Key Insights

The latest COVID-19 data used is from May 1, 2020.

Top 10 countries by confirmed cases are generally large, globally connected economies.

Happiness factors like GDP per capita and social support are strongly correlated with overall happiness.

Wealthier countries did not always have fewer COVID-19 cases, possibly due to:

Higher global mobility

More widespread testing

Healthy life expectancy and social support systems may have helped certain countries manage the pandemic more effectively.

📷 Example Visualizations
GDP vs COVID-19 Cases

Scatter plot showing the relationship between GDP per capita and total confirmed cases.

Life Expectancy vs COVID-19 Cases

Regression plot analyzing whether healthy life expectancy influenced pandemic outcomes.

Social Support vs COVID-19 Cases

Scatter plot highlighting how social support relates to confirmed case numbers.
📝 Author

Developed by Dishan Hari Seelam — exploring the intersection of data science, global health, and well-being.
