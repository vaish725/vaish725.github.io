---
date: '1'
title: 'Codesearch: Local-First Symbol-Aware Search Engine'
cover: './image.png'
github: 'https://github.com/vaish725/codesearch.git'
external: ''
tech:
  - Python
  - SQLite-FTS5
  - AST
  - Docker
---
Developed a high-performance code search engine utilizing SQLite FTS5 for full-text indexing and AST-based symbol extraction, achieving sub-millisecond query latency ($p50 < 1ms$) and 20x faster incremental indexing via hash-based change detection for repositories up to 1M+ LOC.