'use client'
import { useState } from "react";

// ▼ 各求人媒体へのリンクを管理（翔栄サービス専用求人ページURL版）
const APPS = [
  // ▼ 既存アプリ
  {
    id: "posting-table",
    name: "投稿表作成アプリ",
    desc: "Instagramの投稿計画表を自動生成。スプレッドシートに貼り付け可能な形式で出力。",
    href: "https://chatgpt.com/canvas/shared/68a07c87fbc881919ec8d4d42e40eded",
    tag: "運用",
  },
  {
    id: "image-prompt",
    name: "画像プロンプト生成アプリ",
    desc: "投稿文から画像生成用プロンプトを作成。画像生成アプリにそのまま投入。",
    href: "https://chatgpt.com/canvas/shared/68a07ce42e0c8191a37dbfb6ccb93a2c",
    tag: "クリエイティブ",
  },
  {
    id: "ig-manual",
    name: "Instagram投稿手順書",
    desc: "手順書（社内マニュアル）をWeb表示。スタッフ教育・引き継ぎに。",
    href: "#",
    tag: "ナレッジ",
  },
  {
    id: "analytics",
    name: "応募可視化ダッシュボード（β）",
    desc: "媒体別の掲載状況と応募数の集計・可視化（試験運用）。",
    href: "#",
    tag: "分析",
  },
  {
    id: "job-templates",
    name: "求人原稿テンプレート",
    desc: "媒体別のフォーマットに合わせた原稿テンプレートを生成。",
    href: "#",
    tag: "クリエイティブ",
  },
  {
    id: "files",
    name: "ファイル置き場",
    desc: "共有用の資料・データにアクセス。",
    href: "#",
    tag: "ストレージ",
  },

  // ▼ ChatGPT共有リンク
      
  // ▼ 求人媒体ボタン（翔栄サービス向け固定URL）
  {
    id: "official-careers",
    name: "公式サイト（採用ページ）",
    desc: "自社採用ページにアクセス（ドライバー募集・一般事務など）",
    href: "https://showei-service.com/recruitment/",
    tag: "求人媒体",
  },
  {
    id: "hello-work",
    name: "ハローワーク",
    desc: "ハローワークインターネットサービスの翔栄サービス求人ページ",
    href: "https://www.hellowork.mhlw.go.jp/",
    tag: "求人媒体",
  },
  {
    id: "indeed",
    name: "Indeed（企業ページ）",
    desc: "Indeedの企業ページ／求人一覧",
    href: "https://jp.indeed.com/cmp/%E6%9C%89%E9%99%90%E4%BC%9A%E7%A4%BE-%E7%BF%94%E6%A0%84%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9",
    tag: "求人媒体",
  },
  {
    id: "airwork",
    name: "AirWORK（採用サイト）",
    desc: "採用サイト（JobSuite）",
    href: "https://so8h151c.jbplt.jp/",
    tag: "求人媒体",
  },
  {
    id: "doraever",
    name: "ドラEVER（求人詳細）",
    desc: "小型ワンボックス配送などの求人詳細",
    href: "https://doraever.jp/job-357352",
    tag: "求人媒体",
  },
  {
    id: "hatalike",
    name: "はたらいく",
    desc: "はたらいく内の翔栄サービス求人ページ",
    href: "https://www.hatalike.jp/kw/%E7%BF%94%E6%A0%84%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9/",
    tag: "求人媒体",
  },
  {
    id: "kyujinbox",
    name: "求人ボックス（一覧）",
    desc: "求人ボックス内の翔栄サービス掲載（例：玉村町2tドライバー）",
    href: "https://xn--pckua2a7gp15o89zb.com/%E5%AE%9A%E6%9C%9F%E4%BE%BF-%E3%83%89%E3%83%A9%E3%82%A4%E3%83%90%E3%83%BC%E3%81%AE%E4%BB%95%E4%BA%8B-%E7%BE%A4%E9%A6%AC%E7%9C%8C%E7%8E%89%E6%9D%91%E7%94%BA",
    tag: "求人媒体",
  },
  {
    id: "stanby",
    name: "スタンバイ",
    desc: "スタンバイ内の翔栄サービス求人ページ",
    href: "https://jp.stanby.com/jobs/翔栄サービス",
    tag: "求人媒体",
  },
  {
    id: "google-for-jobs",
    name: "Google for Jobs",
    desc: "Google for Jobsで翔栄サービス求人を確認",
    href: "https://www.google.com/search?q=有限会社翔栄サービス+求人",
    tag: "求人媒体",
  },
  {
    id: "linkedin",
    name: "LinkedIn求人",
    desc: "LinkedInの翔栄サービス求人ページ",
    href: "https://www.linkedin.com/jobs/search/?keywords=翔栄サービス",
    tag: "求人媒体",
  },
  {
    id: "facebook-jobs",
    name: "Facebook求人",
    desc: "Facebook求人検索で翔栄サービスを確認",
    href: "https://www.facebook.com/jobs/search/?q=翔栄サービス",
    tag: "求人媒体",
  },
];

const ROLES = [
  { key: "admin", label: "管理者" },
  { key: "editor", label: "編集権限" },
  { key: "viewer", label: "閲覧のみ" },
];

export default function AdminDashboard() {
  const [tenant, setTenant] = useState("翔栄サービス");
  const [role, setRole] = useState("admin");
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("ALL");

  const filtered = APPS.filter((a) => {
    const byQ = q
      ? a.name.toLowerCase().includes(q.toLowerCase()) ||
        a.desc.toLowerCase().includes(q.toLowerCase())
      : true;
    const byTag = tag === "ALL" ? true : a.tag === tag;
    const byRole =
      role === "admin" ? true : role === "editor" ? a.id !== "google-jobs" : a.tag !== "専門";
    return byQ && byTag && byRole;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">求人媒体ダッシュボード（管理者用）</h1>
          <div className="flex flex-wrap gap-2 items-center">
            <select
              className="px-3 py-2 rounded-xl border shadow-sm"
              value={tenant}
              onChange={(e) => setTenant(e.target.value)}
            >
              <option>翔栄サービス</option>
              <option>デモ用テナントA</option>
              <option>デモ用テナントB</option>
            </select>
            <select
              className="px-3 py-2 rounded-xl border shadow-sm"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {ROLES.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.label}
                </option>
              ))}
            </select>
            <input
              type="search"
              placeholder="媒体検索"
              className="px-3 py-2 rounded-xl border shadow-sm w-48"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <select
              className="px-3 py-2 rounded-xl border shadow-sm"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="ALL">すべて</option>
              <option value="公式">公式</option>
              <option value="公共">公共</option>
              <option value="媒体">媒体</option>
              <option value="専門">専門</option>
                          </select>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((app) => (
            <a key={app.id} href={app.href} className="block group" target="_blank" rel="noreferrer">
              <div className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all p-5 h-full flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold group-hover:underline">{app.name}</h2>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 border">{app.tag}</span>
                </div>
                <p className="text-sm text-gray-600 flex-1">{app.desc}</p>
                <div className="mt-4">
                  <span className="inline-flex items-center gap-1 text-sm font-medium">
                    起動する
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <section className="mt-10">
          <h3 className="text-base font-semibold mb-3">お知らせ</h3>
          <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
            <li>各ボタンをクリックすると新しいタブで求人詳細ページが開きます。</li>
            <li>権限により一部の媒体は非表示になる場合があります。</li>
            <li>最新の掲載状況は各媒体サイトで「社名＋職種」で検索してください。</li>
          </ul>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-10 text-xs text-gray-500">
        © {new Date().getFullYear()} 求人媒体ダッシュボード（サンプル）
      </footer>
    </div>
  );
}
