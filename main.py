
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import pandas as pd
import joblib
import io

app = FastAPI(title="RavenStack Churn API", version="1.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

MODEL_PATH = "rf_churn_pipeline.joblib"
try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    model = None
    print("WARN: Model not loaded:", e)

class Records(BaseModel):
    records: List[Dict[str, Any]]

@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": model is not None}

@app.post("/predict")
def predict(payload: Records):
    if model is None:
        return {"status": "error", "error": "Model not loaded."}
    df = pd.DataFrame(payload.records)
    proba = model.predict_proba(df)[:, 1]
    return {"status": "ok", "scores": proba.tolist()}

@app.post("/predict-csv")
async def predict_csv(file: UploadFile = File(...)):
    if model is None:
        return {"status": "error", "error": "Model not loaded."}
    content = await file.read()
    df = pd.read_csv(io.BytesIO(content))
    proba = model.predict_proba(df)[:, 1]
    out = df.copy(); out["churn_risk_score"] = proba
    buf = io.StringIO(); out.to_csv(buf, index=False)
    return {"status": "ok", "csv": buf.getvalue()}
