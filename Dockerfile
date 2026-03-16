
FROM python:3.11-slim
WORKDIR /app
COPY requirements_api.txt ./requirements_api.txt
RUN pip install --no-cache-dir -r requirements_api.txt
COPY main.py ./main.py
COPY rf_churn_pipeline.joblib ./rf_churn_pipeline.joblib
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
