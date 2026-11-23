'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Play,
  ShieldAlert,
  Terminal,
  Cpu,
  Database,
  Lock,
  Code2,
  RotateCw,
  Zap,
  Layers,
} from 'lucide-react';
import { usePortfolio } from '~/components/PortfolioProvider';
import Tilt3DCard from '~/components/three/Tilt3DCard';
import MagneticButton from '~/components/three/MagneticButton';

type SimKey = 'pg' | 'figma' | 'block';

const LAYERS = [
  {
    idx: 0,
    shortLabel: '01 · Data',
    badge: 'LAYER 01 · PROTECTED CONTEXT & DATA',
    titleEn: 'Read-Only PostgreSQL & Enterprise MCP Connectors',
    titleVi: 'PostgreSQL Chỉ-Đọc & Kết nối MCP Doanh nghiệp',
    descEn:
      'Strict read-only database schema metadata inspection alongside direct Figma, Jira, and Confluence MCP context — empowering agents with zero mutation risk.',
    descVi:
      'Cơ chế kiểm tra lược đồ PostgreSQL chỉ-đọc kết hợp kết nối Figma, Jira và Confluence qua MCP — giúp AI agent hiểu sâu hệ thống mà tuyệt đối an toàn dữ liệu.',
    chips: ['Read-Only PostgreSQL', 'Figma MCP', 'Jira MCP', 'Confluence MCP'],
    actionLabel: 'Test Guard',
    simTarget: 'block' as SimKey,
  },
  {
    idx: 1,
    shortLabel: '02 · Gateway',
    badge: 'LAYER 02 · UNIFIED GATEWAY & AUTH',
    titleEn: 'Bifrost LLM Gateway (Go) + FastMCP Server (Python)',
    titleVi: 'Bifrost LLM Gateway (Go) + FastMCP Server (Python)',
    descEn:
      'Customized Go-based Bifrost gateway centralizing multi-provider LLM API access, paired with a Python FastMCP server authenticated end-to-end via Keycloak.',
    descVi:
      'Tùy biến Bifrost LLM Gateway bằng Go để tập trung hóa truy cập đa nhà cung cấp LLM, kết hợp máy chủ Python FastMCP bảo mật xuyên suốt bằng Keycloak.',
    chips: ['Go', 'Bifrost', 'Python', 'FastMCP', 'Keycloak', 'OAuth 2.0'],
    actionLabel: 'Query Schema',
    simTarget: 'pg' as SimKey,
  },
  {
    idx: 2,
    shortLabel: '03 · Agents',
    badge: 'LAYER 03 · AI-NATIVE WORKFLOWS & SKILLS',
    titleEn: 'Claude Code, Kiro, Codex & Custom Agent Skills',
    titleVi: 'Claude Code, Kiro, Codex & Bộ Agent Skills Tùy chỉnh',
    descEn:
      'Repeatable Agent Skills for MVVM + Clean Architecture feature delivery, automated code review, and XCTest generation — reviewed and validated to banking-grade standards.',
    descVi:
      'Định nghĩa Agent Skills chuẩn hóa cho lập trình MVVM + Clean Architecture, review code và sinh unit test — kết hợp kiểm duyệt chặt chẽ đạt chuẩn ngân hàng.',
    chips: ['Claude Code', 'Kiro', 'Codex', 'Agent Skills', 'Unit Tests'],
    actionLabel: 'Run Skill',
    simTarget: 'figma' as SimKey,
  },
];

const SIMULATIONS: Record<
  SimKey,
  {
    status: string;
    color: string;
    latency: string;
    blocked: boolean;
    focusLayer: number;
    lines: string[];
    codeTitle: string;
    codeSnippet: string;
  }
> = {
  pg: {
    status: '● 200 OK · READ-ONLY VERIFIED',
    color: 'var(--emerald)',
    latency: 'latency: 42ms',
    blocked: false,
    focusLayer: 1,
    lines: [
      '[AGENT: Claude Code]  mcp.call("pg_inspect_schema", { table: "memberships" })',
      '[KEYCLOAK AUTH]       JWT verified · scope: mcp:schema:read',
      '[BIFROST GO GATEWAY]  routed prompt context via unified LLM API',
      '[FASTMCP PYTHON]      SELECT column_name, data_type FROM information_schema...',
      '[POSTGRESQL]          14 columns returned (READ_ONLY_TX enforced) ✓',
    ],
    codeTitle: 'fastmcp_postgres_readonly.py (DBInc Gateway)',
    codeSnippet: `@mcp.tool(name="pg_inspect_schema")
async def inspect_schema(table: str, token: KeycloakJWT) -> dict:
    token.assert_scope("mcp:schema:read")
    async with pool.acquire() as conn:
        await conn.execute("SET TRANSACTION READ ONLY;")
        rows = await conn.fetch(
            "SELECT column_name, data_type, is_nullable "
            "FROM information_schema.columns WHERE table_name = $1",
            table,
        )
        return {"table": table, "mode": "READ_ONLY", "columns": [dict(r) for r in rows]}`,
  },
  figma: {
    status: '● 200 OK · HYPER-P GENERATED',
    color: 'var(--accent)',
    latency: 'latency: 68ms',
    blocked: false,
    focusLayer: 2,
    lines: [
      '[AGENT: Kiro]         skill: "ios-mvvm-clean-feature" invoked',
      '[MCP CONNECTORS]      synced Figma Hyper-P tokens + Jira + Confluence specs',
      '[CODE GENERATION]     emitted BenefitCalculatorViewModel + RxSwift bindings',
      '[UNIT TEST SKILL]     18 XCTest cases synthesized & human-validated ✓',
    ],
    codeTitle: 'BenefitCalculatorViewModel.swift (Techcombank Hyper-P)',
    codeSnippet: `final class BenefitCalculatorViewModel: ViewModelType {
    struct Input { let balanceTrigger: Observable<Decimal> }
    struct Output { let tierUpgradeState: Driver<TierBenefitState> }

    private let calculateUseCase: CalculateTierBenefitUseCaseProtocol
    func transform(input: Input) -> Output {
        let state = input.balanceTrigger
            .distinctUntilChanged()
            .flatMapLatest { [calculateUseCase] in calculateUseCase.execute(balance: $0) }
            .asDriver(onErrorJustReturn: .empty)
        return Output(tierUpgradeState: state)
    }
}`,
  },
  block: {
    status: '✖ 403 BLOCKED · WRITE GUARD',
    color: 'var(--rose)',
    latency: 'blocked in 4ms',
    blocked: true,
    focusLayer: 0,
    lines: [
      '[AGENT]               mcp.call("pg_query", { sql: "DROP TABLE transactions;" })',
      '[KEYCLOAK + FASTMCP]  READ-ONLY AST GUARD TRIGGERED!',
      '[SECURITY POLICY]     ✖ DDL / Write statement rejected before PostgreSQL',
      '[AUDIT LOG]           Incident logged · Production database 100% intact ✓',
    ],
    codeTitle: 'ReadOnlySqlAstGuard.go (Bifrost / FastMCP Security Shield)',
    codeSnippet: `func EnforceReadOnlySQL(rawSQL string) error {
    forbidden := []string{"DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "TRUNCATE"}
    upper := strings.ToUpper(strings.TrimSpace(rawSQL))
    for _, verb := range forbidden {
        if strings.HasPrefix(upper, verb) || strings.Contains(upper, " "+verb+" ") {
            audit.LogSecurityBlock("MCP_WRITE_ATTEMPT_BLOCKED", rawSQL)
            return ErrReadOnlyPolicyViolation // HTTP 403 Forbidden (4ms)
        }
    }
    return nil
}`,
  },
};

export default function AISystemsShowcase() {
  const { lang, pendingSimScenario, clearPendingSimScenario } = usePortfolio();
  const [activeLayer, setActiveLayer] = useState(1);
  const [simKey, setSimKey] = useState<SimKey>('pg');
  const [pulseRunId, setPulseRunId] = useState(1);
  const [consoleTab, setConsoleTab] = useState<'trace' | 'code'>('trace');
  const [isoAngleZ, setIsoAngleZ] = useState(-36);
  const [autoSpin, setAutoSpin] = useState(false);
  const [fannedOut, setFannedOut] = useState(true);
  const dragRef = useRef({ down: false, startX: 0, startZ: -36 });

  const runScenario = (key: SimKey) => {
    setSimKey(key);
    setActiveLayer(SIMULATIONS[key].focusLayer);
    setPulseRunId((v) => v + 1);
  };

  useEffect(() => {
    if (pendingSimScenario) {
      runScenario(pendingSimScenario);
      clearPendingSimScenario();
    }
  }, [pendingSimScenario, clearPendingSimScenario]);

  useEffect(() => {
    if (!autoSpin) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (document.hidden || dragRef.current.down) return;
      setIsoAngleZ(-36 + Math.sin(Date.now() * 0.0012) * 14);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [autoSpin]);

  const sim = SIMULATIONS[simKey];
  const layer = LAYERS[activeLayer];

  return (
    <section id="ai-systems" className="relative z-10 py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <div className="eyebrow" style={{ color: 'var(--emerald)' }}>
            AI-Native Engineering · Interactive 3D Reactor
          </div>
          <h2 className="display-1 mt-3 font-display" style={{ color: 'var(--ink)' }}>
            {lang === 'vi'
              ? 'Mô phỏng trực tiếp Luồng LLM & MCP 3D'
              : 'Run a Live 3D MCP & LLM Gateway Flow'}
          </h2>
          <p className="lede mt-3">
            {lang === 'vi'
              ? 'Tương tác trực tiếp trên khối kiến trúc 3D hoặc thanh điều khiển bên dưới: tách rộng các tầng, bắn xung dữ liệu, xoay góc 3D và kiểm tra cả Execution Trace lẫn mã nguồn thực tế.'
              : 'Interact directly with the 3D architecture plates or the cockpit dock below: fan out layers, fire live data pulses, rotate in 3D, and inspect both execution traces and production code.'}
          </p>
        </div>

        {/* Live Scenario Controls */}
        <div className="mt-7 flex flex-wrap gap-2.5">
          <MagneticButton
            onClick={() => runScenario('pg')}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 font-mono text-xs font-semibold text-white"
            style={{
              background:
                simKey === 'pg'
                  ? 'linear-gradient(135deg, #059669, #0284c7)'
                  : 'rgba(16, 185, 129, 0.18)',
              border: '1px solid rgba(16, 185, 129, 0.45)',
              boxShadow:
                simKey === 'pg' ? '0 10px 26px rgba(16, 185, 129, 0.38)' : 'none',
              color: simKey === 'pg' ? '#ffffff' : 'var(--emerald)',
            }}
          >
            <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            <span>1. Inspect PostgreSQL Schema (DBInc)</span>
          </MagneticButton>

          <MagneticButton
            onClick={() => runScenario('figma')}
            className="spatial-glass inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 font-mono text-xs font-semibold"
            style={{
              color: simKey === 'figma' ? '#ffffff' : 'var(--ink)',
              background:
                simKey === 'figma'
                  ? 'linear-gradient(135deg, #2563eb, #0ea5e9)'
                  : undefined,
            }}
          >
            <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
            <span>2. Figma + Jira MCP → Swift MVVM (TCB)</span>
          </MagneticButton>

          <MagneticButton
            onClick={() => runScenario('block')}
            className="spatial-glass inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 font-mono text-xs font-semibold"
            style={{
              color: simKey === 'block' ? '#ffffff' : 'var(--rose)',
              borderColor: 'rgba(251, 113, 133, 0.42)',
              background:
                simKey === 'block'
                  ? 'linear-gradient(135deg, #e11d48, #f43f5e)'
                  : undefined,
            }}
          >
            <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
            <span>3. Test DROP TABLE (Read-Only Guard)</span>
          </MagneticButton>
        </div>

        {/* 3D Isometric Reactor Stage + Dual-Mode Trace/Code Inspector */}
        <div className="mt-9 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <Tilt3DCard
            maxTilt={3}
            className="flex flex-col justify-between overflow-hidden rounded-[32px] p-5 sm:p-6 lg:col-span-6"
          >
            {/* Top Status & Quick Action Bar (Isolated in z-30 with generous spacing) */}
            <div
              className="relative z-30 flex flex-wrap items-center justify-between gap-2 border-b pb-3 font-mono text-xs"
              style={{ borderColor: 'var(--border)' }}
            >
              <span className="font-semibold" style={{ color: sim.color }}>
                {sim.status}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPulseRunId((v) => v + 1)}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white transition hover:brightness-110"
                  style={{
                    background: 'linear-gradient(135deg, #059669, #0284c7)',
                  }}
                >
                  <Zap className="h-3 w-3" aria-hidden="true" />
                  <span>{lang === 'vi' ? 'Bắn xung' : 'Fire Pulse'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFannedOut((v) => !v)}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition"
                  style={{
                    background: fannedOut
                      ? 'rgba(56, 189, 248, 0.16)'
                      : 'var(--surface-solid)',
                    border: '1px solid var(--border)',
                    color: fannedOut ? 'var(--accent)' : 'var(--ink-2)',
                  }}
                >
                  <Layers className="h-3 w-3" aria-hidden="true" />
                  <span>{fannedOut ? 'Staggered' : 'Compact'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAutoSpin((v) => !v)}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition"
                  style={{
                    background: autoSpin
                      ? 'rgba(16, 185, 129, 0.16)'
                      : 'var(--surface-solid)',
                    border: '1px solid var(--border)',
                    color: autoSpin ? 'var(--emerald)' : 'var(--ink-2)',
                  }}
                >
                  <RotateCw className="h-3 w-3" aria-hidden="true" />
                  <span>{autoSpin ? 'Orbit ON' : 'Orbit'}</span>
                </button>
              </div>
            </div>

            {/* 3D Isometric Stage (Never overlaps header or footer) */}
            <div
              className="iso-stage cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => {
                if ((e.target as HTMLElement).closest('button')) return;
                dragRef.current.down = true;
                dragRef.current.startX = e.clientX;
                dragRef.current.startZ = isoAngleZ;
                setAutoSpin(false);
              }}
              onPointerMove={(e) => {
                if (!dragRef.current.down) return;
                const dx = e.clientX - dragRef.current.startX;
                setIsoAngleZ(dragRef.current.startZ + dx * 0.45);
              }}
              onPointerUp={() => {
                dragRef.current.down = false;
              }}
              onPointerCancel={() => {
                dragRef.current.down = false;
              }}
            >
              <div
                className={`iso-world ${fannedOut ? 'is-fanned' : ''}`}
                style={{
                  transform: `rotateX(55deg) rotateZ(${isoAngleZ.toFixed(1)}deg)`,
                }}
              >
                {/* Vertical 3D Laser Conduits strictly between Layer 0 and Layer 2 */}
                {['34%', '50%', '66%'].map((leftPos, pIdx) => (
                  <div
                    key={leftPos}
                    className="iso-pillar"
                    style={{ left: leftPos, top: '50%' }}
                  >
                    <div
                      key={`${pulseRunId}-${pIdx}`}
                      style={{ animationDelay: `${pIdx * 0.12}s` }}
                      className={`iso-pulse-dot ${
                        sim.blocked ? 'anim-pulse-blocked' : 'anim-pulse-down'
                      }`}
                    />
                  </div>
                ))}

                {/* Layer 0: Protected Context */}
                <div
                  data-layer="0"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveLayer(0)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveLayer(0);
                    }
                  }}
                  className={`iso-plate flex flex-col justify-between p-4 ${
                    activeLayer === 0 ? 'is-active' : ''
                  }`}
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(16,185,129,0.28), rgba(10,16,28,0.95))',
                    border: '1.5px solid rgba(16,185,129,0.72)',
                    boxShadow: '0 24px 50px rgba(0,0,0,0.62)',
                  }}
                >
                  <div className="flex items-center justify-between font-mono text-[11px] text-emerald-300">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Database className="h-3.5 w-3.5" aria-hidden="true" />
                      01 · CONTEXT
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        runScenario('block');
                      }}
                      className="cursor-pointer rounded-full border border-emerald-400/50 bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-200 hover:bg-emerald-500/35"
                    >
                      Test Guard ▶
                    </button>
                  </div>
                  <div className="text-white">
                    <div className="text-sm font-extrabold">PostgreSQL · Figma · Jira</div>
                    <div className="mt-0.5 font-mono text-[10px] text-emerald-200/90">
                      Read-Only Schema &amp; Design Tokens
                    </div>
                  </div>
                </div>

                {/* Layer 1: Unified Gateway */}
                <div
                  data-layer="1"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveLayer(1)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveLayer(1);
                    }
                  }}
                  className={`iso-plate flex flex-col justify-between p-4 ${
                    activeLayer === 1
                      ? 'is-active'
                      : activeLayer < 1
                      ? 'is-peeled'
                      : ''
                  }`}
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(56,189,248,0.32), rgba(10,16,28,0.95))',
                    border: '1.5px solid rgba(56,189,248,0.85)',
                    boxShadow: '0 24px 50px rgba(37,99,235,0.36)',
                  }}
                >
                  <div className="flex items-center justify-between font-mono text-[11px] text-sky-300">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                      02 · GATEWAY
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        runScenario('pg');
                      }}
                      className="cursor-pointer rounded-full border border-sky-400/50 bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-200 hover:bg-sky-500/35"
                    >
                      Query PG ▶
                    </button>
                  </div>
                  <div className="text-white">
                    <div className="text-sm font-extrabold">Bifrost Go + FastMCP</div>
                    <div className="mt-0.5 font-mono text-[10px] text-sky-200/90">
                      Keycloak Auth · Multi-LLM Router
                    </div>
                  </div>
                </div>

                {/* Layer 2: AI Agents */}
                <div
                  data-layer="2"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveLayer(2)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveLayer(2);
                    }
                  }}
                  className={`iso-plate flex flex-col justify-between p-4 ${
                    activeLayer === 2
                      ? 'is-active'
                      : activeLayer < 2
                      ? 'is-peeled'
                      : ''
                  }`}
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(167,139,250,0.32), rgba(10,16,28,0.95))',
                    border: '1.5px solid rgba(167,139,250,0.82)',
                    boxShadow: '0 24px 50px rgba(0,0,0,0.58)',
                  }}
                >
                  <div className="flex items-center justify-between font-mono text-[11px] text-violet-300">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                      03 · AGENTS
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        runScenario('figma');
                      }}
                      className="cursor-pointer rounded-full border border-violet-400/50 bg-violet-500/20 px-2 py-0.5 text-[10px] font-bold text-violet-200 hover:bg-violet-500/35"
                    >
                      Run Skill ▶
                    </button>
                  </div>
                  <div className="text-white">
                    <div className="text-sm font-extrabold">Claude Code · Kiro · Codex</div>
                    <div className="mt-0.5 font-mono text-[10px] text-violet-200/90">
                      Agent Skills · Review · XCTest
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Interactive Layer Dock */}
            <div
              className="relative z-30 flex flex-wrap items-center justify-between gap-2 border-t pt-3 font-mono text-xs"
              style={{ borderColor: 'var(--border)' }}
            >
              <span className="text-[11px]" style={{ color: 'var(--ink-3)' }}>
                {lang === 'vi' ? 'Chọn tầng 3D:' : 'Focus Layer:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[2, 1, 0].map((idx) => {
                  const l = LAYERS[idx];
                  const isAct = activeLayer === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActiveLayer(idx);
                        runScenario(l.simTarget);
                      }}
                      className="cursor-pointer rounded-full px-3 py-1 text-[11px] font-semibold transition"
                      style={
                        isAct
                          ? {
                              background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
                              color: '#ffffff',
                            }
                          : {
                              background: 'var(--surface-solid)',
                              border: '1px solid var(--border)',
                              color: 'var(--ink-2)',
                            }
                      }
                    >
                      {l.shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </Tilt3DCard>

          {/* Right: Dual-Tab Live Execution Trace & Production Code Preview */}
          <div className="space-y-4 lg:col-span-6">
            <Tilt3DCard maxTilt={4} className="rounded-[28px] p-6">
              <div
                className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 font-mono text-xs"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setConsoleTab('trace')}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 font-semibold transition"
                    style={
                      consoleTab === 'trace'
                        ? {
                            background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
                            color: '#ffffff',
                          }
                        : {
                            background: 'var(--surface-solid)',
                            color: 'var(--ink-2)',
                          }
                    }
                  >
                    <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Live Trace</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsoleTab('code')}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 font-semibold transition"
                    style={
                      consoleTab === 'code'
                        ? {
                            background: 'linear-gradient(135deg, #10b981, #0284c7)',
                            color: '#ffffff',
                          }
                        : {
                            background: 'var(--surface-solid)',
                            color: 'var(--ink-2)',
                          }
                    }
                  >
                    <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{lang === 'vi' ? 'Xem Code Thực Tế' : 'Inspect Code'}</span>
                  </button>
                </div>
                <span style={{ color: 'var(--ink-3)' }}>{sim.latency}</span>
              </div>

              {consoleTab === 'trace' ? (
                <div className="mt-3.5 space-y-1.5 font-mono text-xs leading-relaxed">
                  {sim.lines.map((line, i) => (
                    <div
                      key={`${simKey}-${i}`}
                      style={{
                        color:
                          sim.blocked && i >= 1
                            ? 'var(--rose)'
                            : i === sim.lines.length - 1
                            ? 'var(--emerald)'
                            : 'var(--ink-2)',
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-3">
                  <div className="mb-1.5 font-mono text-[11px] font-semibold" style={{ color: 'var(--emerald)' }}>
                    {sim.codeTitle}
                  </div>
                  <pre
                    className="overflow-x-auto rounded-2xl p-3.5 font-mono text-[11px] leading-relaxed"
                    style={{
                      background: 'var(--surface-solid)',
                      border: '1px solid var(--border)',
                      color: 'var(--ink)',
                    }}
                  >
                    <code>{sim.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </Tilt3DCard>

            <Tilt3DCard maxTilt={4} className="rounded-[28px] p-6">
              <div className="font-mono text-xs font-semibold" style={{ color: 'var(--emerald)' }}>
                {layer.badge}
              </div>
              <h3 className="mt-2 font-display text-xl font-extrabold" style={{ color: 'var(--ink)' }}>
                {lang === 'vi' ? layer.titleVi : layer.titleEn}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                {lang === 'vi' ? layer.descVi : layer.descEn}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {layer.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full px-3 py-1 font-mono text-xs font-medium"
                    style={{
                      background: 'rgba(56, 189, 248, 0.12)',
                      border: '1px solid rgba(56, 189, 248, 0.28)',
                      color: 'var(--accent)',
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </Tilt3DCard>
          </div>
        </div>
      </div>
    </section>
  );
}
