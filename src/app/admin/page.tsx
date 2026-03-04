"use client";

import { useState, useRef } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Project } from "../../lib/supabase";

type FormData = {
  title: string;
  slug: string;
  short_desc: string;
  long_desc: string;
  cover_url: string;
  tags: string;
  metrics: string;
  client: string;
  date: string;
  url: string;
  github_url: string;
  featured: boolean;
  order_index: number;
};

const emptyForm: FormData = {
  title: "",
  slug: "",
  short_desc: "",
  long_desc: "",
  cover_url: "",
  tags: "",
  metrics: "",
  client: "",
  date: "",
  url: "",
  github_url: "",
  featured: false,
  order_index: 0,
};

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

let supabaseInstance: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
  }
  return supabaseInstance;
}

function sanitizeFileName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-+/g, "-");
}

function sanitizeFolder(slug: string): string {
  return (
    slug
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/(^-|-$)/g, "") || "projet"
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: "10px 14px",
    color: "#fff",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
  };

  const labelStyle: React.CSSProperties = {
    color: "var(--text3)",
    fontSize: 12,
    fontWeight: 600,
    display: "block",
    marginBottom: 6,
  };

  async function fetchProjects(pwd: string) {
    const res = await fetch("/api/projects", {
      headers: { "x-admin-password": pwd },
    });
    const data = await res.json();
    if (Array.isArray(data)) setProjects(data);
  }

  async function handleLogin() {
    setAuthError("");
    const res = await fetch("/api/projects", {
      headers: { "x-admin-password": password },
    });
    if (res.ok) {
      setAuthed(true);
      fetchProjects(password);
    } else {
      setAuthError("Mot de passe incorrect");
    }
  }

  function handleEdit(project: Project) {
    setEditingId(project.id);
    setForm({
      title: project.title || "",
      slug: project.slug || "",
      short_desc: project.short_desc || "",
      long_desc: project.long_desc || "",
      cover_url: project.cover_url || "",
      tags: (project.tags || []).join(", "),
      metrics: (project.metrics || []).join("\n"),
      client: project.client || "",
      date: project.date || "",
      url: project.url || "",
      github_url: project.github_url || "",
      featured: project.featured || false,
      order_index: project.order_index || 0,
    });
    setGalleryImages(project.images || []);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleNew() {
    setEditingId(null);
    setForm(emptyForm);
    setGalleryImages([]);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleImageUpload(files: FileList) {
    if (!files.length) return;
    setUploadingImages(true);
    const supabase = getSupabase();
    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const baseName = file.name.replace(/\.[^.]+$/, "");
      const safeName = sanitizeFileName(baseName);
      const safeFolder = sanitizeFolder(form.slug);
      const fileName = `${Date.now()}-${safeName}.${ext}`;
      const filePath = `gallery/${safeFolder}/${fileName}`;

      const { error } = await supabase.storage
        .from("projects")
        .upload(filePath, file, { upsert: false });

      if (error) {
        setMessage(`❌ Erreur upload ${file.name} : ${error.message}`);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("projects")
        .getPublicUrl(filePath);

      if (urlData?.publicUrl) {
        uploaded.push(urlData.publicUrl);
      }
    }

    setGalleryImages((prev) => [...prev, ...uploaded]);
    setUploadingImages(false);
    if (uploaded.length > 0) {
      setMessage(`✅ ${uploaded.length} image(s) uploadée(s)`);
    }
  }

  async function handleRemoveImage(url: string) {
    setGalleryImages((prev) => prev.filter((img) => img !== url));
  }

  async function handleSubmit() {
    if (!form.title || !form.slug) {
      setMessage("⚠️ Titre et slug sont obligatoires");
      return;
    }
    setLoading(true);
    setMessage("");

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      metrics: form.metrics.split("\n").map((m) => m.trim()).filter(Boolean),
      images: galleryImages,
    };

    const url = editingId ? `/api/admin/projects/${editingId}` : "/api/projects";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setMessage(editingId ? "✅ Projet modifié !" : "✅ Projet créé !");
      setForm(emptyForm);
      setGalleryImages([]);
      setEditingId(null);
      setShowForm(false);
      fetchProjects(password);
    } else {
      const data = await res.json();
      setMessage(`❌ Erreur : ${data.error}`);
    }
    setLoading(false);
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Supprimer "${title}" ? Cette action est irréversible.`)) return;
    const res = await fetch(`/api/admin/projects/${id}`, {
      method: "DELETE",
      headers: { "x-admin-password": password },
    });
    if (res.ok) {
      setMessage("✅ Projet supprimé");
      fetchProjects(password);
    }
  }

  if (!authed) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 18,
            padding: 40,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
            Administration
          </h1>
          <p style={{ color: "var(--text3)", fontSize: 14, marginBottom: 24 }}>
            fullstack-pointvirgule.fr
          </p>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            style={{ ...inputStyle, marginBottom: 12 }}
          />
          {authError && (
            <p style={{ color: "#f87171", fontSize: 13, marginBottom: 12 }}>{authError}</p>
          )}
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(135deg, var(--blue), var(--blue-d))",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Connexion
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", padding: "40px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <div>
            <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800 }}>Administration</h1>
            <p style={{ color: "var(--text3)", fontSize: 14 }}>
              {projects.length} réalisation{projects.length > 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={handleNew}
            style={{
              padding: "12px 24px",
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(135deg, var(--blue), var(--blue-d))",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            + Nouvelle réalisation
          </button>
        </div>

        {message && (
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "12px 16px",
              marginBottom: 24,
              color: "#fff",
              fontSize: 14,
            }}
          >
            {message}
          </div>
        )}

        {/* Formulaire */}
        {showForm && (
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 18,
              padding: 32,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>
                {editingId ? "Modifier la réalisation" : "Nouvelle réalisation"}
              </h2>
              <button
                onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); setGalleryImages([]); }}
                style={{
                  background: "none",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--text3)",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                Annuler
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={labelStyle}>Titre *</label>
                <input
                  style={inputStyle}
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setForm((f) => ({
                      ...f,
                      title,
                      slug: editingId ? f.slug : slugify(title),
                    }));
                  }}
                  placeholder="Trésors d'Ambre"
                />
              </div>
              <div>
                <label style={labelStyle}>Slug * (URL)</label>
                <input
                  style={inputStyle}
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                  placeholder="tresors-dambre"
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Description courte</label>
                <input
                  style={inputStyle}
                  value={form.short_desc}
                  onChange={(e) => setForm((f) => ({ ...f, short_desc: e.target.value }))}
                  placeholder="Migration Shopify → Saleor headless..."
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Description longue</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 140, resize: "vertical" as const }}
                  value={form.long_desc}
                  onChange={(e) => setForm((f) => ({ ...f, long_desc: e.target.value }))}
                  placeholder="Description détaillée du projet, contexte, enjeux, solutions apportées..."
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>URL image de couverture</label>
                <input
                  style={inputStyle}
                  value={form.cover_url}
                  onChange={(e) => setForm((f) => ({ ...f, cover_url: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label style={labelStyle}>Tags / Stack (séparés par des virgules)</label>
                <input
                  style={inputStyle}
                  value={form.tags}
                  onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                  placeholder="Next.js, TypeScript, PostgreSQL"
                />
              </div>
              <div>
                <label style={labelStyle}>Métriques (une par ligne : Label:Valeur)</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 90, resize: "vertical" as const }}
                  value={form.metrics}
                  onChange={(e) => setForm((f) => ({ ...f, metrics: e.target.value }))}
                  placeholder={"Produits:750\nStack:Headless\nStatut:En cours"}
                />
              </div>
              <div>
                <label style={labelStyle}>Client</label>
                <input
                  style={inputStyle}
                  value={form.client}
                  onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))}
                  placeholder="Nom du client"
                />
              </div>
              <div>
                <label style={labelStyle}>Date</label>
                <input
                  style={inputStyle}
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  placeholder="2025"
                />
              </div>
              <div>
                <label style={labelStyle}>URL du site</label>
                <input
                  style={inputStyle}
                  value={form.url}
                  onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                  placeholder="https://monsite.fr"
                />
              </div>
              <div>
                <label style={labelStyle}>URL GitHub</label>
                <input
                  style={inputStyle}
                  value={form.github_url}
                  onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value }))}
                  placeholder="https://github.com/..."
                />
              </div>
              <div>
                <label style={labelStyle}>Ordre d&apos;affichage</label>
                <input
                  style={inputStyle}
                  type="number"
                  value={form.order_index}
                  onChange={(e) => setForm((f) => ({ ...f, order_index: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 24 }}>
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                  style={{ width: 16, height: 16, cursor: "pointer" }}
                />
                <label htmlFor="featured" style={{ ...labelStyle, margin: 0, cursor: "pointer" }}>
                  Mettre en avant (featured)
                </label>
              </div>

              {/* ── GALERIE D'IMAGES ── */}
              <div style={{ gridColumn: "1 / -1", marginTop: 8 }}>
                <div
                  style={{
                    borderTop: "1px solid var(--border)",
                    paddingTop: 24,
                    marginBottom: 16,
                  }}
                >
                  <label style={{ ...labelStyle, fontSize: 14, color: "#fff", marginBottom: 4 }}>
                    Galerie de screenshots
                  </label>
                  <p style={{ color: "var(--text3)", fontSize: 12, marginBottom: 16 }}>
                    JPG, PNG, WebP — plusieurs fichiers acceptés simultanément
                  </p>

                  {/* Zone d'upload */}
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column" as const,
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      border: "2px dashed rgba(255,255,255,0.15)",
                      borderRadius: 12,
                      padding: "28px 20px",
                      cursor: uploadingImages ? "not-allowed" : "pointer",
                      background: "rgba(255,255,255,0.02)",
                      transition: "border-color 0.2s, background 0.2s",
                      opacity: uploadingImages ? 0.6 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!uploadingImages) {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(33,150,243,0.5)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(33,150,243,0.04)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={uploadingImages}
                      style={{ display: "none" }}
                      onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                    />
                    <span style={{ fontSize: 28 }}>🖼️</span>
                    <span style={{ color: "var(--text2)", fontSize: 14, fontWeight: 600 }}>
                      {uploadingImages ? "Upload en cours..." : "Cliquer pour ajouter des images"}
                    </span>
                    <span style={{ color: "var(--text3)", fontSize: 12 }}>
                      Sélection multiple possible (Ctrl+clic)
                    </span>
                  </label>
                </div>

                {/* Miniatures existantes */}
                {galleryImages.length > 0 && (
                  <div>
                    <p style={{ color: "var(--text3)", fontSize: 12, marginBottom: 10 }}>
                      {galleryImages.length} image{galleryImages.length > 1 ? "s" : ""} dans la galerie
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                        gap: 10,
                      }}
                    >
                      {galleryImages.map((img, i) => (
                        <div
                          key={i}
                          style={{
                            position: "relative",
                            borderRadius: 10,
                            overflow: "hidden",
                            border: "1px solid var(--border)",
                            aspectRatio: "16/10",
                            background: "var(--surface)",
                          }}
                        >
                          <img
                            src={img}
                            alt={`Galerie ${i + 1}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                          {/* Bouton supprimer */}
                          <button
                            onClick={() => handleRemoveImage(img)}
                            title="Retirer de la galerie"
                            style={{
                              all: "unset",
                              cursor: "pointer",
                              position: "absolute",
                              top: 6,
                              right: 6,
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              background: "rgba(248,113,113,0.9)",
                              color: "#fff",
                              fontSize: 12,
                              fontWeight: 700,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              lineHeight: 1,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                              transition: "background 0.15s, transform 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.background = "#ef4444";
                              (e.currentTarget as HTMLElement).style.transform = "scale(1.15)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.9)";
                              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* ── FIN GALERIE ── */}

            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                marginTop: 24,
                width: "100%",
                padding: 16,
                borderRadius: 10,
                border: "none",
                background: loading
                  ? "rgba(33,150,243,0.4)"
                  : "linear-gradient(135deg, var(--blue), var(--blue-d))",
                color: "#fff",
                fontSize: 16,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Enregistrement..." : editingId ? "Enregistrer les modifications" : "Créer la réalisation"}
            </button>
          </div>
        )}

        {/* Liste des projets */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {projects.length === 0 ? (
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: 40,
                textAlign: "center",
                color: "var(--text3)",
              }}
            >
              Aucune réalisation pour l&apos;instant. Créez la première !
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span
                        style={{
                          background: "rgba(33,150,243,0.15)",
                          color: "var(--blue)",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: 4,
                        }}
                      >
                        FEATURED
                      </span>
                    )}
                    {project.images && project.images.length > 0 && (
                      <span
                        style={{
                          background: "rgba(16,185,129,0.12)",
                          color: "#10B981",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: 4,
                        }}
                      >
                        {project.images.length} photo{project.images.length > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                  <p style={{ color: "var(--text3)", fontSize: 13, marginTop: 2 }}>
                    /{project.slug} · {(project.tags || []).join(", ")}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <button
                    onClick={() => handleEdit(project)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      background: "rgba(255,255,255,0.04)",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 8,
                      border: "1px solid rgba(248,113,113,0.3)",
                      background: "rgba(248,113,113,0.08)",
                      color: "#f87171",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}