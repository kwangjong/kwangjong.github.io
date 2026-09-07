---
title: Prometheus OOM Killed on Restart
tags: [ "observability", "troubleshooting" ]
date: 2025-02-22 13:40:10 +09:00
visibility: public #private unlisted
---

https://prometheus.io/docs/prometheus/latest/storage/#remote-storage-integrations

Prometheus is deployed on an AKS cluster using the `kube-prometheus-stack` Helm chart.

 \*\***Issue: Prometheus Container is OOM Killed on Restart**
- **Cause**: The allocated memory is **smaller than the required memory for WAL replay**.
- **Impact**: When Prometheus restarts, it **reconstructs active series from WAL**, causing memory usage to spike beyond allocated limits.
### What is WAL (Write-Ahead Log)?
  WAL (**Write-Ahead Log**) is an **append-only log stored on disk** that buffers incoming time series data before it is compacted into TSDB blocks.  
  - Located at **`/prometheus/wal/`**.
  - Ensures **durability** (prevents data loss in crashes).
  - Optimized for **high-ingestion sequential writes**.
### Prometheus Storage Key Features
- **Prometheus stores scraped data in TSDB (Time Series Database).**
- It can write data to:
  - **Local TSDB** (default, local disk for pv mounted)
  - **Remote TSDB** (via `remote_write`, e.g., Thanos, Cortex).
- **Memory-Mapped Storage (mmap)**  
  - Prometheus **uses mmap for TSDB block reads**, improving query performance.
  - WAL **does not use mmap**; it is a simple append-only disk log.
### Why Not Write Directly to TSDB?
- **TSDB is optimized for query performance, not frequent writes.**
- **Immutable block format** prevents efficient real-time writes.
- **WAL allows fast ingestion and defers compaction** to avoid excessive disk I/O.
### Why does WAL cause OOM?
  - When Prometheus **restarts**, it **replays WAL to reconstruct active series**.
  - If too many **active time series** exist, memory usage spikes.
  - If WAL **accumulates due to slow compaction**, it increases the number of series to restore, leading to OOM.
  - When Prometheus terminates unexpectedly (or forcibly), **unwritten WAL remains on disk**, increasing WAL size.
### Troubleshooting 
#### Allocate More Memory
Allocate more resources to the prometheus container either by increasing memory limit (manual) or using Vertical Pod Autoscaler (dynamic)
- https://github.com/prometheus-community/helm-charts/issues/4711
#### Enable WAL Compression
- Reduces memory and disk usage for WAL:
  ```yaml
  prometheus:
    prometheusSpec:
      walCompression: true
  ```
#### Reduce Active Series
- **Drop unnecessary high-cardinality labels**:
- **Increase scrape interval** to reduce ingestion rate.
#### Ignoring WAL on Restart
- \*\*This is not an ideal solution, but this can be a solution if retaining scraped data is not necessary.
- Manually delete WAL before restart
-  or **Mount an emptyDir over `/prometheus/wal`** in Kubernetes to prevent WAL persistence
