The issue seems to be that once Excel get's wrapped as an `ExternalWindow` the EXCEL.EXE process seems to create a number of hidden windows with the same identity (Name + UUID).

The various methods of launching Excel (`launchExternalProcess`, `launchExternalProcess(asset + alias)`, `fin.desktop.Excel.run`, launching Excel manually -> `monitorExternalProcess` to add UUID) all yield this same result.
