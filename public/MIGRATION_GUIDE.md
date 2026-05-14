# Project Migration Guide: Moving out of OneDrive

## Why migrate?
Running Node.js projects inside OneDrive (or similar sync services) frequently causes issues:
1. **File Locking**: OneDrive may lock files for syncing while the build process is trying to read/write them, causing build failures.
2. **Performance**: Constant syncing of `node_modules` (thousands of small files) slows down both the PC and the sync service.
3. **Build Conflicts**: Stale `.next` or `dist` files may sync between devices, causing unpredictable runtime errors.

## Recommended Target Path
Move the project to a local, non-synced directory such as:
- `C:\Projects\DCSPrepApp`
- `C:\Dev\DCSPrepApp`

## Migration Steps

1. **Close all IDEs and Terminals**: Ensure Trae, VS Code, and any terminal windows are closed.
2. **Stop Syncing**: If possible, pause OneDrive syncing temporarily.
3. **Copy (don't move) the folder**: 
   - Right-click `DCSPrepApp` in OneDrive.
   - Copy.
   - Go to `C:\Projects` (create it if it doesn't exist).
   - Paste.
4. **Clean up the new copy**:
   - Open a terminal in the NEW path (`C:\Projects\DCSPrepApp`).
   - Delete the `node_modules` and `.next` folders to ensure a fresh start:
     ```powershell
     rm -Recurse -Force node_modules, .next
     ```
5. **Reinstall Dependencies**:
   ```powershell
   npm install
   ```
6. **Verify Build**:
   ```powershell
   npm run build
   ```
7. **Delete the old OneDrive copy**: Once you've verified the new path works, you can safely delete the folder from OneDrive.

## Updating GitHub
Your Git configuration remains inside the `.git` folder. After moving, simply open the new folder in Trae. Your remote origin (`https://github.com/joshualparris/DCSPD`) will still be there.
