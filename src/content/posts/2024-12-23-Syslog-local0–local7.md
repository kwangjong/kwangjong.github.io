---
title: Syslog local0–local7
tags: [ "linux" ]
date: 2024-12-23 11:08:24 +09:00
visibility: public #private unlisted
---

- `local0`–`local7` are custom (user-defined) syslog facilities.
- They allow applications to send logs to a distinct syslog channel.

##### Configuration
- **rsyslog**: `/etc/rsyslog.conf` or files under `/etc/rsyslog.d/`.
```
local2.*   /var/log/haproxy.log
```
- to route `local2` into a dedicated file.

##### Default Log Locations
- **Red Hat/CentOS/Rocky Linux**:
	- By default, custom facility logs go to `/var/log/messages` unless otherwise configured.
- **Debian/Ubuntu**:
	- By default, they go to `/var/log/syslog` unless otherwise configured.
