# SaaS-Churn-Prediction
Built a churn prediction model on a synthetic SaaS dataset with actionable insights for retention strategies, delivered via notebooks, CSV exports, and business dashboards.

This project predicts **customer churn** using the synthetic **RavenStack SaaS dataset**.  
It combines exploratory data analysis (EDA), feature engineering, and machine learning models to generate **churn risk scores** for each customer.  

Recruiters, hiring managers, or collaborators can explore both the **technical process** and the **business deliverables** (CSV, charts, insights).  

---

## 📦 Repo Contents
- **Notebooks**
  - `RavenStack_Churn_Model_with_Summary_and_Export.ipynb` → main analysis: EDA, modeling, visuals, and CSV export.
  - `RavenStack_Churn_TrainBalanced_TestOriginal.ipynb` → alternate approach: train on balanced data, test on original distribution.
- **Data**
  - `scored_customers.csv` → output dataset with churn risk scores (`churn_risk_score`).
  - *(Optional)* `top_50_high_risk.csv` → priority outreach list of highest-risk accounts.
- **Artifacts**
  - `rf_churn_pipeline.joblib` → trained RandomForest pipeline (can be reloaded for scoring).
- **Visuals**
  - `churn_risk_distribution.png` → distribution of churn risk scores.
  - `churn_risk_by_plan.png` → average churn risk grouped by plan tier.
- **README.md** → project overview, insights, and usage instructions.

---

## 🧠 Problem Statement
SaaS businesses rely heavily on recurring subscriptions.  
**Churn (customers leaving)** is costly because retaining existing users is cheaper than acquiring new ones.  

The goal of this project:  
👉 Predict which customers are most likely to churn, and provide business insights to reduce churn.

---

## 🔎 Methods
1. **EDA (Exploratory Data Analysis)**  
   - Churn rates segmented by plan, industry, and referral source.  
   - Correlations between engagement (usage, support tickets) and churn.

2. **Modeling**  
   - Logistic Regression (baseline)  
   - Random Forest (final model, best performance)  

   Trained on a **balanced dataset** (50/50 churn vs active), evaluated on the **original distribution**.  

3. **Metrics (on original test set)**  
   - **Random Forest**  
     - ROC-AUC: 0.9998  
     - PR-AUC: 0.9999  
     - Accuracy: 78% (at 0.5 threshold)  
   - **Logistic Regression**  
     - ROC-AUC: 0.91  
     - PR-AUC: 0.97  

4. **Deliverables**  
   - Scored dataset with churn risk probability (`scored_customers.csv`).  
   - Visual dashboards (risk distribution, churn by plan/industry).  
   - Top-50 high-risk accounts list for targeted outreach.

---

## 📊 Key Business Insights
- **Basic plan churns more** → upsell incentives (discounted annual, feature gating).  
- **Low engagement** (low usage) strongly correlates with churn → onboarding & product nudges.  
- **High ticket count / long resolution times** predict churn → improve customer success processes.  
- **Beta feature adoption** is linked with retention → invest in product adoption campaigns.  

---
