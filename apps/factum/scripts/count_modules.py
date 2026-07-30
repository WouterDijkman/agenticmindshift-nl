"""Re-derive the Factum platform counts from the product source.

Every number the website states about the platform has to be reproducible from
the code that actually runs, not from a strategy document. This reads the
Factum product repo and prints the figures that `lib/site.ts` hard-codes, so
the claim can be re-checked whenever the product changes.

Counting rules, chosen so the total can only ever understate:
  * A module is an entry in `MODULE_WAVES` (which equals the `ModuleSlug` union).
  * A sub-agent is an entry in a graph's `agents: [...]` array. For the handful
    of hand-built graphs, it is a named `*_agent` node, excluding the intake /
    synthesis / reviewer / process_investigations infrastructure nodes.
  * A node that delegates into another module's graph is NOT counted, because
    that module's own sub-agents are already in the total.

Usage: python3 scripts/count_modules.py [path-to-factum-repo]
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

DEFAULT_REPO = Path.home() / "Documents/Claude/Projects/factum"

# Hand-built graphs that do not use the createDDGraph() factory, with the
# sub-agent count taken from the product's own MODULE_AGENT_COUNTS snapshot
# (ai-dd) or from the named specialist nodes in the graph (portfolio-health,
# whose vigil_subgraph node delegates to the vigil module and is excluded).
HAND_BUILT = {"ai-dd": 9, "portfolio-health": 2}

# Graph file per module slug, where the filename is not simply <slug>-dd-graph.
GRAPH_OVERRIDES = {
    "deal-economics": "deal-economics-graph.ts",
    "exit-readiness": "exit-readiness-graph.ts",
    "ic-report": "ic-report-graph.ts",
    "im-screener": "im-screener-graph.ts",
    "mbr": "mbr-graph.ts",
    "pmi": "pmi-graph.ts",
    "portfolio-health": "portfolio-health-graph.ts",
}


def read_waves(registry: str) -> dict[int, list[str]]:
    block = re.search(
        r"MODULE_WAVES:\s*Record<number,\s*ModuleSlug\[\]>\s*=\s*\{(.*?)\n\};",
        registry,
        re.S,
    )
    assert block, "MODULE_WAVES not found"
    waves: dict[int, list[str]] = {}
    for wave, body in re.findall(r"(\d+):\s*\[(.*?)\]", block.group(1), re.S):
        waves[int(wave)] = re.findall(r"'([a-z0-9-]+)'", body)
    return waves


def count_agents(graphs: Path, slug: str) -> int:
    if slug in HAND_BUILT:
        return HAND_BUILT[slug]
    name = GRAPH_OVERRIDES.get(slug, f"{slug}-dd-graph.ts")
    source = (graphs / name).read_text(encoding="utf-8")
    block = re.search(r"agents:\s*\[(.*?)\n\s*\],", source, re.S)
    assert block, f"no agents array in {name}"
    return len(re.findall(r"\bnode:\s*[\"']", block.group(1)))


def main() -> int:
    repo = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_REPO
    registry = (repo / "src/lib/dispatch/module-registry.ts").read_text(encoding="utf-8")
    graphs = repo / "src/lib/graphs"

    waves = read_waves(registry)
    zdr = re.search(r"ZDR_REQUIRED_MODULES.*?\[(.*?)\]", registry, re.S)
    zdr_modules = re.findall(r"'([a-z0-9-]+)'", zdr.group(1)) if zdr else []

    total = 0
    for wave in sorted(waves):
        print(f"\nwave {wave}")
        for slug in waves[wave]:
            n = count_agents(graphs, slug)
            total += n
            print(f"  {slug:<18} {n:>3}")

    modules = sum(len(v) for v in waves.values())
    print("\n" + "=" * 34)
    print(f"modules          {modules:>3}")
    print(f"waves            {len(waves):>3}")
    print(f"sub-agents       {total:>3}")
    print(f"ZDR-gated        {len(zdr_modules):>3}  ({', '.join(zdr_modules)})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
