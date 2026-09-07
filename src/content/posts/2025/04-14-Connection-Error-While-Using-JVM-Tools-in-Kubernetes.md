---
title: Connection Error While Using JVM Tools in Kubernetes
tags: [ 'jvm', 'troubleshooting', 'k8s']
date: 2025-04-14 17:30:37 +09:00
visibility: public #private unlisted
---

Our team recently encountered a memory leak in a Java backend service deployed on a Kubernetes cluster. This issue was not detected during performance testing, as we simulated multiple concurrent users using a single user account. In production, the leak emerged under real traffic and was later traced to logic within the login process.

To investigate, we attempted to capture a heap dump by accessing the running pod via a shell and using standard JVM tools such as `jps`, `jcmd`, `jmap`, and `jstat`. However, all these tools failed to function correctly, throwing connection or socket-related errors.

##Root Cause

After some investigation, we identified the root cause: the pod was running with a `readOnlyRootFilesystem: true` security context, as mandated by CWPP (Cloud Workload Protection Platform) compliance policies. This setting prevents any writes to the root filesystem unless the target path is explicitly mounted as a writable volume.

During JVM startup, it creates a directory at `/tmp/hsperfdata_<usernam>/` and writes a file named after the process ID (PID), e.g., `/tmp/hsperfdata_appuser/1234`. These files are essential for performance tools (`jps`, `jcmd`, `jstat`, etc.) to connect to the JVM process.

Because the `/tmp` directory was part of the read-only root filesystem, the JVM failed to write this metadata, rendering the performance tools inoperable.

## Solution

We resolved the issue by explicitly mounting a writable volume to `/tmp`. In our case, we used an `emptyDir` volume. This allowed the JVM to write the necessary `hsperfdata` files and restored full functionality to the monitoring tools.

### Kubernetes Deployment Snippet:

```yaml
securityContext:
  readOnlyRootFilesystem: true

volumeMounts:
  - mountPath: /tmp
    name: tmp-volume

volumes:
  - name: tmp-volume
    emptyDir: {}
```

## Alternate Option: Custom tmpdir

Alternatively, the JVM can be configured to use a different temp directory via the `-Djava.io.tmpdir` option. This is useful if you prefer to mount a custom path:

```yaml
env:
  - name: JAVA_TOOL_OPTIONS
    value: "-Djava.io.tmpdir=/mnt/tmp"

volumeMounts:
  - mountPath: /mnt/tmp
    name: custom-tmp

volumes:
  - name: custom-tmp
    emptyDir: {}
```

However, note that this changes the location of **all** temporary files, not just the `hsperfdata` files.

## Key Takeaways

- Tools like `jps`, `jcmd`, `jstat`, and `jmap` depend on the JVM’s ability to write to a temporary directory.
- Ensure `/tmp` or a custom temp directory is writable via a Kubernetes volume mount to enable full JVM observability.
