"use client";

import { useState, useRef } from "react";
import { Upload, FileText, X, CheckCircle, AlertCircle, XCircle, Plus, Eye, ExternalLink } from "lucide-react";

function isImageFile(fileName: string) {
  return /\.(jpg|jpeg|png|webp|gif)$/i.test(fileName);
}

function DocPreviewOverlay({ url, name, onClose }: { url: string; name: string; onClose: () => void }) {
  const isImage = isImageFile(name);
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90">
      <div className="flex shrink-0 items-center justify-between px-5 py-4">
        <span className="text-sm font-semibold text-white">{name}</span>
        <div className="flex items-center gap-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10"
          >
            <ExternalLink size={13} /> Open in new tab
          </a>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center overflow-hidden px-4 pb-4">
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt={name} className="max-h-full max-w-full rounded-lg object-contain" />
        ) : (
          <iframe src={url} title={name} className="h-full w-full rounded-lg bg-white" />
        )}
      </div>
    </div>
  );
}

type CertType = "Certification" | "Training" | "License" | "Degree" | "Other";
type CertStatus = "pending" | "approved" | "rejected";

interface Certification {
  id: string;
  name: string;
  type: CertType;
  issuedBy: string;
  issueDate: string;
  expiryDate: string;
  file: File | null;
  fileName: string;
  previewUrl: string | null;
  status: CertStatus;
  rejectionReason?: string;
}

const CERT_TYPES: CertType[] = ["Certification", "Training", "License", "Degree", "Other"];

const MOCK_EXISTING: Certification[] = [
  {
    id: "c-1",
    name: "Somatic Experiencing Certificate",
    type: "Certification",
    issuedBy: "SE International",
    issueDate: "2021-06-01",
    expiryDate: "",
    file: null,
    fileName: "somatic_cert.pdf",
    previewUrl: null,
    status: "approved",
  },
  {
    id: "c-2",
    name: "Trauma-Informed Care Training",
    type: "Training",
    issuedBy: "NICABM",
    issueDate: "2022-03-15",
    expiryDate: "2025-03-15",
    file: null,
    fileName: "trauma_care.pdf",
    previewUrl: null,
    status: "pending",
  },
];

const inputClass =
  "w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-900 text-sm outline-none focus:border-electric-teal focus:ring-1 focus:ring-electric-teal/30 transition-colors";

function StatusChip({ status, reason }: { status: CertStatus; reason?: string }) {
  if (status === "approved")
    return (
      <span className="flex items-center gap-1 rounded-full bg-electric-teal/10 px-2.5 py-1 text-xs font-semibold text-electric-teal">
        <CheckCircle size={12} /> Approved
      </span>
    );
  if (status === "rejected")
    return (
      <span
        className="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-500"
        title={reason}
      >
        <XCircle size={12} /> Rejected
        {reason && <span className="ml-1 text-red-400">— {reason}</span>}
      </span>
    );
  return (
    <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
      <AlertCircle size={12} /> Under Review
    </span>
  );
}

export default function TeacherCertifications() {
  const [certs, setCerts] = useState<Certification[]>(MOCK_EXISTING);
  const [previewDoc, setPreviewDoc] = useState<{ name: string; url: string } | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Certification, "id" | "file" | "fileName" | "previewUrl" | "status">>({
    name: "",
    type: "Certification",
    issuedBy: "",
    issueDate: "",
    expiryDate: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(f.type)) {
      setFileError("Only PDF, JPG, PNG, or WEBP files are accepted.");
      e.target.value = "";
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setFileError("File must be under 10 MB.");
      e.target.value = "";
      return;
    }
    setFileError(null);
    setFile(f);
  }

  function handleRemoveFile() {
    setFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSubmit() {
    if (!form.name.trim() || !form.issuedBy.trim() || !file) return;
    const previewUrl = URL.createObjectURL(file);
    const newCert: Certification = {
      id: `c-${Date.now()}`,
      ...form,
      file,
      fileName: file.name,
      previewUrl,
      status: "pending",
    };
    setCerts((prev) => [newCert, ...prev]);
    setForm({ name: "", type: "Certification", issuedBy: "", issueDate: "", expiryDate: "" });
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setShowForm(false);
  }

  function handleDelete(id: string) {
    setCerts((prev) => prev.filter((c) => c.id !== id));
  }

  const canSubmit = form.name.trim() && form.issuedBy.trim() && file;

  return (
    <div className="space-y-6">
      {previewDoc && (
        <DocPreviewOverlay
          url={previewDoc.url}
          name={previewDoc.name}
          onClose={() => setPreviewDoc(null)}
        />
      )}
      {/* Existing certs */}
      <div className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg text-neutral-900">Your Certifications</h3>
            <p className="mt-0.5 text-sm text-neutral-500">
              Uploaded documents are reviewed by our admin team. Approved certifications appear on your profile.
            </p>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-1.5 rounded-full bg-energy-gradient px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Plus size={15} />
            Add New
          </button>
        </div>

        {certs.length === 0 && (
          <p className="rounded-xl border border-dashed border-neutral-200 py-10 text-center text-sm text-neutral-400">
            No certifications uploaded yet. Click &ldquo;Add New&rdquo; to get started.
          </p>
        )}

        <div className="space-y-3">
          {certs.map((cert) => (
            <div
              key={cert.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-neutral-100 px-4 py-4"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
                  <FileText size={16} className="text-neutral-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{cert.name}</p>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {cert.type} &middot; {cert.issuedBy}
                    {cert.issueDate && ` · ${new Date(cert.issueDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`}
                    {cert.expiryDate && ` · Expires ${new Date(cert.expiryDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`}
                  </p>
                  <p className="mt-1 text-xs text-neutral-400">{cert.fileName}</p>
                  {cert.status === "rejected" && cert.rejectionReason && (
                    <p className="mt-1 text-xs text-red-400">Reason: {cert.rejectionReason}</p>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <StatusChip status={cert.status} />
                {cert.previewUrl && (
                  <button
                    onClick={() => setPreviewDoc({ name: cert.fileName, url: cert.previewUrl! })}
                    className="flex items-center gap-1 rounded-full border border-neutral-200 px-2.5 py-1 text-xs font-semibold text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900"
                  >
                    <Eye size={12} /> View
                  </button>
                )}
                {cert.status !== "approved" && (
                  <button
                    onClick={() => handleDelete(cert.id)}
                    className="text-neutral-300 hover:text-red-400 transition-colors"
                    title="Remove"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload form */}
      {showForm && (
        <div className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
          <h3 className="mb-5 font-display text-lg text-neutral-900">Add Certification / Training / License</h3>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Document Name <span className="text-red-400">*</span>
              </label>
              <input
                className={inputClass}
                placeholder="e.g. RYT-500 Yoga Certification"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>

            {/* Type + Issued By */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">Type</label>
                <select
                  className={inputClass}
                  value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as CertType }))}
                >
                  {CERT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                  Issued By <span className="text-red-400">*</span>
                </label>
                <input
                  className={inputClass}
                  placeholder="e.g. Yoga Alliance"
                  value={form.issuedBy}
                  onChange={(e) => setForm((f) => ({ ...f, issuedBy: e.target.value }))}
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">Issue Date</label>
                <input
                  type="date"
                  className={inputClass}
                  value={form.issueDate}
                  onChange={(e) => setForm((f) => ({ ...f, issueDate: e.target.value }))}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                  Expiry Date <span className="text-neutral-400 text-xs">(optional)</span>
                </label>
                <input
                  type="date"
                  className={inputClass}
                  value={form.expiryDate}
                  onChange={(e) => setForm((f) => ({ ...f, expiryDate: e.target.value }))}
                />
              </div>
            </div>

            {/* File upload */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Upload Document <span className="text-red-400">*</span>
              </label>
              <p className="mb-2 text-xs text-neutral-400">PDF, JPG, PNG or WEBP · Max 10 MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
              {!file ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 px-4 py-8 text-center transition-colors hover:border-electric-teal/40 hover:bg-electric-teal/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric-teal/10">
                    <Upload size={18} className="text-electric-teal" />
                  </div>
                  <p className="text-sm font-semibold text-neutral-700">Click to upload</p>
                  <span className="rounded-full border border-electric-teal px-4 py-1 text-xs font-semibold text-electric-teal">
                    Choose file
                  </span>
                </button>
              ) : (
                <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-electric-teal" />
                    <span className="text-sm text-neutral-700">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPreviewDoc({ name: file.name, url: URL.createObjectURL(file) })}
                      className="flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-neutral-800"
                    >
                      <Eye size={13} /> Preview
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-600"
                    >
                      <X size={13} /> Remove
                    </button>
                  </div>
                </div>
              )}
              {fileError && <p className="mt-1.5 text-xs font-medium text-red-500">{fileError}</p>}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                disabled={!canSubmit}
                onClick={handleSubmit}
                className="rounded-full bg-energy-gradient px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                Submit for Review
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setFile(null);
                  setFileError(null);
                  setForm({ name: "", type: "Certification", issuedBy: "", issueDate: "", expiryDate: "" });
                }}
                className="rounded-full border border-neutral-200 px-6 py-2.5 text-sm font-semibold text-neutral-500 hover:bg-neutral-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
