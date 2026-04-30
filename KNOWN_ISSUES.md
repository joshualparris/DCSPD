# DCSPrep Known Issues

Current known issues and limitations.

---

## v0.2.0 - IT PD Cockpit

### Non-Critical Issues

1. **next.config.mjs Warning**
   - Description: `experimental.appDir` generates a warning in Next.js 14.2+
   - Impact: None - app works correctly
   - Resolution: Remove `experimental.appDir` in future update

2. **npm Audit Warnings**
   - Description: 9 vulnerabilities (5 moderate, 4 high)
   - Impact: None for local development
   - Resolution: Do NOT run `npm audit fix --force` - may break compatibility

3. **OneDrive File Locking**
   - Description: Running app from OneDrive may cause file locking issues
   - Impact: Potential build/sync conflicts
   - Resolution: Consider moving project to local drive for production use

### Known Limitations

1. **localStorage Only**
   - Description: All progress, PD log, and spaced repetition data stored in browser localStorage
   - Impact: Data resets if browser cache cleared
   - Mitigation: Export PD log regularly via Settings → Export

2. **No Real Authentication**
   - Description: App has no login - designed for personal PD use
   - Impact: Anyone with URL can access
   - Mitigation: Don't include sensitive DCS data

3. **Estimate-Based Readiness**
   - Description: Readiness profiles start at 0% until assessment data collected
   - Impact: Scores are informal estimates initially
   - Mitigation: Complete quizzes to build actual data

---

## v0.1.0 - Original DCSPrep

- (Document original known issues here)