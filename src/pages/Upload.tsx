import { useState, useRef } from "react";
import { predictCSV, getHealth } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload as UploadIcon, FileText, Download, AlertCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<"unknown" | "online" | "offline">("unknown");
  const inputRef = useRef<HTMLInputElement>(null);

  const checkApi = async () => {
    try {
      await getHealth();
      setApiStatus("online");
    } catch {
      setApiStatus("offline");
    }
  };

  const handleFile = (f: File) => {
    if (!f.name.endsWith(".csv")) {
      setErrorMsg("Please upload a CSV file.");
      return;
    }
    setFile(f);
    setErrorMsg("");
    setStatus("idle");
    setDownloadUrl(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const blob = await predictCSV(file);
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setStatus("success");
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "Prediction failed");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Score Customers</h1>
            <p className="text-muted-foreground mt-1">
              Upload a CSV to get churn risk scores from the live model.
            </p>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm">← Dashboard</Button>
          </Link>
        </div>

        {/* API Status */}
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">API Status:</span>
            {apiStatus === "online" && <Badge className="bg-green-100 text-green-800">Online</Badge>}
            {apiStatus === "offline" && <Badge className="bg-red-100 text-red-800">Offline</Badge>}
            {apiStatus === "unknown" && <Badge variant="secondary">Unknown</Badge>}
          </div>
          <Button variant="outline" size="sm" onClick={checkApi}>Check API</Button>
        </Card>

        {/* Drop Zone */}
        <Card
          className="p-10 border-2 border-dashed text-center cursor-pointer hover:border-primary transition-colors"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <UploadIcon className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          {file ? (
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4" />
              {file.name}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Drag & drop a CSV file here, or click to select
            </p>
          )}
        </Card>

        {errorMsg && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            {errorMsg}
          </div>
        )}

        <Button
          className="w-full"
          disabled={!file || status === "loading"}
          onClick={handleSubmit}
        >
          {status === "loading" ? "Scoring…" : "Run Churn Prediction"}
        </Button>

        {status === "success" && downloadUrl && (
          <Card className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-green-700">
              <CheckCircle className="h-4 w-4" />
              Scoring complete — download your results
            </div>
            <a href={downloadUrl} download="scored_output.csv">
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-1" /> Download CSV
              </Button>
            </a>
          </Card>
        )}

        <p className="text-xs text-muted-foreground">
          The API must be running at{" "}
          <code className="bg-muted px-1 rounded">
            {import.meta.env.VITE_API_URL || "http://localhost:8000"}
          </code>
          . Start it with <code className="bg-muted px-1 rounded">uvicorn main:app --reload</code> from the
          repo root, or use <code className="bg-muted px-1 rounded">docker-compose up</code>.
        </p>
      </div>
    </div>
  );
}
